import { debug } from 'console';
import { Millisecond } from 'italia-ts-commons/lib/units';
import { DeferredPromise } from 'italia-ts-commons/lib/promises';
import { fromNullable, none } from 'fp-ts/lib/Option';
import { toError } from 'fp-ts/lib/Either';
import { fromPredicate } from 'fp-ts/lib/TaskEither';
import { Client, createClient } from '../generated/definitions/pagopa/client';
import { TransactionStatusResponse } from '../generated/definitions/pagopa/TransactionStatusResponse';
import { getUrlParameter } from './js/urlUtilities';
import idpayguard from './js/idpayguard';
import { initHeader } from './js/header';
import { setTranslateBtns } from './js/translateui';
import { initDropdowns } from './js/dropdowns';
import { constantPollingWithPromisePredicateFetch, retryingFetch } from './utils/fetch';
import {
  getTransactionFromSessionStorageTask,
  getStringFromSessionStorageTask,
  resumeTransactionTask,
  checkStatusTask,
} from './utils/transactionHelper';
import { start3DS2MethodStep, createIFrame, start3DS2AcsChallengeStep } from './utils/iframe';

// eslint-disable-next-line sonarjs/cognitive-complexity
document.addEventListener('DOMContentLoaded', async () => {
  const retries: number = 10;
  const delay: number = 3000;
  const timeout: Millisecond = 20000 as Millisecond;

  const paymentManagerClientWithPollingOnMethod: Client = createClient({
    baseUrl: 'http://localhost:8080',
    fetchApi: constantPollingWithPromisePredicateFetch(
      DeferredPromise<boolean>().e1,
      retries,
      delay,
      timeout,
      async (r: Response): Promise<boolean> => {
        const myJson = (await r.clone().json()) as TransactionStatusResponse;
        // Stop the polling when this condition is false
        return fromNullable(myJson.data.methodUrl).isNone();
      },
    ),
  });

  const paymentManagerClientWithPollingOnPreAcs: Client = createClient({
    baseUrl: 'http://localhost:8080',
    fetchApi: constantPollingWithPromisePredicateFetch(
      DeferredPromise<boolean>().e1,
      retries,
      delay,
      timeout,
      async (r: Response): Promise<boolean> => {
        const myJson = (await r.clone().json()) as TransactionStatusResponse;
        // Stop the polling when this condition is false
        return fromNullable(myJson.data.acsUrl).isNone();
      },
    ),
  });

  const pmClient: Client = createClient({
    baseUrl: 'http://localhost:8080',
    fetchApi: retryingFetch(fetch, 5000 as Millisecond, 5),
  });

  document.body.classList.add('loadingOperations');

  // idpayguard
  idpayguard();

  // initHeader
  initHeader();

  initDropdowns();

  // init translations
  setTranslateBtns();

  // set email address in placeholder
  const useremailPlaceholder = document.querySelectorAll('.windowcont__response__useremail') || null;
  const useremailArray = Array.from(useremailPlaceholder);
  const useremail = sessionStorage.getItem('useremail') || '';
  for (const el of useremailArray) {
    // eslint-disable-next-line functional/immutable-data
    (el as HTMLElement).innerText = useremail;
  }

  // 2. METHOD RESUME and ACS CHALLENGE step on 3ds2
  window.addEventListener(
    'message',
    async function (e) {
      // Addresses must be static
      if (e.origin !== 'http://localhost:7071' || e.data !== '3DS.Notification.Received') {
        return;
      } else {
        debug('MESSAGE RECEIVED: ', e.data);
        await getTransactionFromSessionStorageTask('payment')
          .chain(transaction =>
            getStringFromSessionStorageTask('sessionToken')
              .chain(sessionToken => resumeTransactionTask('Y', sessionToken, transaction.token, pmClient))
              .chain(_ => checkStatusTask(transaction.token, paymentManagerClientWithPollingOnPreAcs)),
          )

          .fold(
            _ => debug('To handle error'),
            transactionStatus =>
              start3DS2AcsChallengeStep(transactionStatus.data.acsUrl, transactionStatus.data.params, document.body),
          )
          .run();
      }
    },

    false,
  );

  await fromPredicate(
    idTransaction => idTransaction !== '',
    toError,
  )(getUrlParameter('id'))
    .fold(
      async _ => {
        // 1. METHOD step on 3ds2
        await getTransactionFromSessionStorageTask('payment')
          .chain(transaction => checkStatusTask(transaction.token, paymentManagerClientWithPollingOnMethod))
          .fold(
            () => undefined,
            transactionStatus =>
              fromNullable(transactionStatus.data.threeDSMethodData).fold(none, threeDSMethodData => {
                sessionStorage.setItem('threeDSMethodData', threeDSMethodData);
                return start3DS2MethodStep(
                  transactionStatus.data.methodUrl,
                  transactionStatus.data.threeDSMethodData,
                  createIFrame(document.body, 'myIdFrame', 'myFrameName'),
                );
              }),
          )
          .run();
      },
      // 3. ACS RESUME step on 3ds2
      async _ => sessionStorage.clear(),
    )
    .run();
});
