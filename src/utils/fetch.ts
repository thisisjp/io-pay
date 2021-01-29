/**
 * This module exports an instance of fetch augmented with
 * timeout and retries with exponential backoff.
 */
import { left, right } from 'fp-ts/lib/Either';
import { fromEither, TaskEither } from 'fp-ts/lib/TaskEither';
import { calculateExponentialBackoffInterval } from 'italia-ts-commons/lib/backoff';
import { AbortableFetch, retriableFetch, setFetchTimeout, toFetch } from 'italia-ts-commons/lib/fetch';
import { RetriableTask, TransientError, withRetries } from 'italia-ts-commons/lib/tasks';
import { Millisecond } from 'italia-ts-commons/lib/units';

//
// Returns a fetch wrapped with timeout and retry logic
//

export function retryingFetch(
  fetchApi: typeof fetch,
  timeout: Millisecond = 1000 as Millisecond,
  maxRetries: number = 3,
): typeof fetch {
  // a fetch that can be aborted and that gets cancelled after fetchTimeoutMs
  const abortableFetch = AbortableFetch(fetchApi);
  const timeoutFetch = toFetch(setFetchTimeout(timeout, abortableFetch));
  // configure retry logic with default exponential backoff
  // @see https://github.com/pagopa/io-ts-commons/blob/master/src/backoff.ts
  const exponentialBackoff = calculateExponentialBackoffInterval();
  const retryLogic = withRetries<Error, Response>(maxRetries, exponentialBackoff);
  const retryWithTransient429s = retryLogicForTransientResponseError((_: Response) => _.status === 429, retryLogic);
  return retriableFetch(retryWithTransient429s)(timeoutFetch);
}

//
// Fetch with transient error handling. Handle error that occurs once or at unpredictable intervals.
//
export function retryLogicForTransientResponseError(
  p: (r: Response) => boolean,
  retryLogic: (
    t: RetriableTask<Error, Response>,
    shouldAbort?: Promise<boolean>,
  ) => TaskEither<Error | 'max-retries' | 'retry-aborted', Response>,
): typeof retryLogic {
  return (t: RetriableTask<Error, Response>, shouldAbort?: Promise<boolean>) =>
    retryLogic(
      // when the result of the task is a Response that satisfies
      // the predicate p, map it to a transient error
      t.chain((r: any) => fromEither(p(r) ? left<TransientError, never>(TransientError) : right<never, Response>(r))),
      shouldAbort,
    );
}

// This is a fetch with timeouts, constant backoff and with the logic
// that handles 404s as transient errors, this "fetch" must be passed to
// createFetchRequestForApi when creating "getPaymentId"

export const constantPollingFetch = (
  shouldAbort: Promise<boolean>,
  retries: number,
  delay: number,
  timeout: Millisecond = 1000 as Millisecond,
) => {
  // Override default react-native fetch with whatwg's that supports aborting
  // eslint-disable-next-line
  (global as any).AbortController = require('abort-controller');
  require('./whatwg-fetch');

  // fetch client that can be aborted for timeout
  const abortableFetch = AbortableFetch((global as any).fetch);
  const timeoutFetch = toFetch(setFetchTimeout(timeout, abortableFetch));
  // use a constant backoff
  const constantBackoff = () => delay as Millisecond;
  const retryLogic = withRetries<Error, Response>(retries, constantBackoff);
  // makes the retry logic map 404s to transient errors (by default only
  // timeouts are transient)
  // see also https://github.com/pagopa/io-ts-commons/blob/master/src/fetch.ts#L103
  const retryWithTransient404s = retryLogicForTransientResponseError(_ => _.status === 404, retryLogic);

  // TODO: remove the cast once we upgrade to tsc >= 3.1 (https://www.pivotaltracker.com/story/show/170819445)
  return retriableFetch(retryWithTransient404s, shouldAbort)(timeoutFetch as typeof fetch);
};

export interface ITransientFetchOpts {
  numberOfRetries: number;
  httpCodeMapToTransient: number;
  delay: Millisecond;
  timeout: Millisecond;
}

export const transientConfigurableFetch = (
  myFetch: typeof fetch,
  options: ITransientFetchOpts = {
    numberOfRetries: 3,
    httpCodeMapToTransient: 429,
    delay: 10 as Millisecond,
    timeout: 1000 as Millisecond,
  },
) => {
  const abortableFetch = AbortableFetch(myFetch);
  const timeoutFetch = toFetch(setFetchTimeout(options.timeout, abortableFetch));
  const constantBackoff = () => options.delay;
  const retryLogic = withRetries<Error, Response>(options.numberOfRetries, constantBackoff);
  // makes the retry logic map specific http error code to transient errors (by default only
  // timeouts are transient)
  const retryWithTransientError = retryLogicForTransientResponseError(
    response => response.status === options.httpCodeMapToTransient,
    retryLogic,
  );
  return retriableFetch(retryWithTransientError)(timeoutFetch as typeof fetch);
};
