import * as t from 'io-ts';
import mixpanel from 'mixpanel-browser';
import { track } from '../__mocks__/mocks';

export const PAYMENT_CHECK_INIT = t.literal('PAYMENT_CHECK_INIT');
export type PAYMENT_CHECK_INIT = t.TypeOf<typeof PAYMENT_CHECK_INIT>;

export const PAYMENT_CHECK_NET_ERR = t.literal('PAYMENT_CHECK_NET_ERR');
export type PAYMENT_CHECK_NET_ERR = t.TypeOf<typeof PAYMENT_CHECK_NET_ERR>;
export const PAYMENT_CHECK_SVR_ERR = t.literal('PAYMENT_CHECK_SVR_ERR');
export type PAYMENT_CHECK_SVR_ERR = t.TypeOf<typeof PAYMENT_CHECK_SVR_ERR>;
export const PAYMENT_CHECK_RESP_ERR = t.literal('PAYMENT_CHECK_RESP_ERR');
export type PAYMENT_CHECK_RESP_ERR = t.TypeOf<typeof PAYMENT_CHECK_RESP_ERR>;
export const PAYMENT_CHECK_SUCCESS = t.literal('PAYMENT_CHECK_SUCCESS');
export type PAYMENT_CHECK_SUCCESS = t.TypeOf<typeof PAYMENT_CHECK_SUCCESS>;
export const PAYMENT_RESOURCES_INIT = t.literal('PAYMENT_RESOURCES_INIT');
export type PAYMENT_RESOURCES_INIT = t.TypeOf<typeof PAYMENT_RESOURCES_INIT>;
export const PAYMENT_RESOURCES_NET_ERR = t.literal('PAYMENT_RESOURCES_NET_ERR');
export type PAYMENT_RESOURCES_NET_ERR = t.TypeOf<typeof PAYMENT_RESOURCES_NET_ERR>;
export const PAYMENT_RESOURCES_SVR_ERR = t.literal('PAYMENT_RESOURCES_SVR_ERR');
export type PAYMENT_RESOURCES_SVR_ERR = t.TypeOf<typeof PAYMENT_RESOURCES_SVR_ERR>;
export const PAYMENT_RESOURCES_RESP_ERR = t.literal('PAYMENT_RESOURCES_RESP_ERR');
export type PAYMENT_RESOURCES_RESP_ERR = t.TypeOf<typeof PAYMENT_RESOURCES_RESP_ERR>;
export const PAYMENT_RESOURCES_SUCCESS = t.literal('PAYMENT_RESOURCES_SUCCESS');
export type PAYMENT_RESOURCES_SUCCESS = t.TypeOf<typeof PAYMENT_RESOURCES_SUCCESS>;
export const PAYMENT_START_SESSION_INIT = t.literal('PAYMENT_START_SESSION_INIT');
export type PAYMENT_START_SESSION_INIT = t.TypeOf<typeof PAYMENT_START_SESSION_INIT>;
export const PAYMENT_START_SESSION_NET_ERR = t.literal('PAYMENT_START_SESSION_NET_ERR');
export type PAYMENT_START_SESSION_NET_ERR = t.TypeOf<typeof PAYMENT_START_SESSION_NET_ERR>;
export const PAYMENT_START_SESSION_SVR_ERR = t.literal('PAYMENT_START_SESSION_SVR_ERR');
export type PAYMENT_START_SESSION_SVR_ERR = t.TypeOf<typeof PAYMENT_START_SESSION_SVR_ERR>;
export const PAYMENT_START_SESSION_RESP_ERR = t.literal('PAYMENT_START_SESSION_RESP_ERR');
export type PAYMENT_START_SESSION_RESP_ERR = t.TypeOf<typeof PAYMENT_START_SESSION_RESP_ERR>;
export const PAYMENT_START_SESSION_SUCCESS = t.literal('PAYMENT_START_SESSION_SUCCESS');
export type PAYMENT_START_SESSION_SUCCESS = t.TypeOf<typeof PAYMENT_START_SESSION_SUCCESS>;
export const PAYMENT_APPROVE_TERMS_INIT = t.literal('PAYMENT_APPROVE_TERMS_INIT');
export type PAYMENT_APPROVE_TERMS_INIT = t.TypeOf<typeof PAYMENT_APPROVE_TERMS_INIT>;
export const PAYMENT_APPROVE_TERMS_NET_ERR = t.literal('PAYMENT_APPROVE_TERMS_NET_ERR');
export type PAYMENT_APPROVE_TERMS_NET_ERR = t.TypeOf<typeof PAYMENT_APPROVE_TERMS_NET_ERR>;
export const PAYMENT_APPROVE_TERMS_SVR_ERR = t.literal('PAYMENT_APPROVE_TERMS_SVR_ERR');
export type PAYMENT_APPROVE_TERMS_SVR_ERR = t.TypeOf<typeof PAYMENT_APPROVE_TERMS_SVR_ERR>;
export const PAYMENT_APPROVE_TERMS_RESP_ERR = t.literal('PAYMENT_APPROVE_TERMS_RESP_ERR');
export type PAYMENT_APPROVE_TERMS_RESP_ERR = t.TypeOf<typeof PAYMENT_APPROVE_TERMS_RESP_ERR>;
export const PAYMENT_APPROVE_TERMS_SUCCESS = t.literal('PAYMENT_APPROVE_TERMS_SUCCESS');
export type PAYMENT_APPROVE_TERMS_SUCCESS = t.TypeOf<typeof PAYMENT_APPROVE_TERMS_SUCCESS>;
export const PAYMENT_WALLET_INIT = t.literal('PAYMENT_WALLET_INIT');
export type PAYMENT_WALLET_INIT = t.TypeOf<typeof PAYMENT_WALLET_INIT>;
export const PAYMENT_WALLET_NET_ERR = t.literal('PAYMENT_WALLET_NET_ERR');
export type PAYMENT_WALLET_NET_ERR = t.TypeOf<typeof PAYMENT_WALLET_NET_ERR>;
export const PAYMENT_WALLET_SVR_ERR = t.literal('PAYMENT_WALLET_SVR_ERR');
export type PAYMENT_WALLET_SVR_ERR = t.TypeOf<typeof PAYMENT_WALLET_SVR_ERR>;
export const PAYMENT_WALLET_RESP_ERR = t.literal('PAYMENT_WALLET_RESP_ERR');
export type PAYMENT_WALLET_RESP_ERR = t.TypeOf<typeof PAYMENT_WALLET_RESP_ERR>;
export const PAYMENT_WALLET_SUCCESS = t.literal('PAYMENT_WALLET_SUCCESS');
export type PAYMENT_WALLET_SUCCESS = t.TypeOf<typeof PAYMENT_WALLET_SUCCESS>;
export const PAYMENT_PAY3DS2_INIT = t.literal('PAYMENT_PAY3DS2_INIT');
export type PAYMENT_PAY3DS2_INIT = t.TypeOf<typeof PAYMENT_PAY3DS2_INIT>;
export const PAYMENT_PAY3DS2_NET_ERR = t.literal('PAYMENT_PAY3DS2_NET_ERR');
export type PAYMENT_PAY3DS2_NET_ERR = t.TypeOf<typeof PAYMENT_PAY3DS2_NET_ERR>;
export const PAYMENT_PAY3DS2_SVR_ERR = t.literal('PAYMENT_PAY3DS2_SVR_ERR');
export type PAYMENT_PAY3DS2_SVR_ERR = t.TypeOf<typeof PAYMENT_PAY3DS2_SVR_ERR>;
export const PAYMENT_PAY3DS2_RESP_ERR = t.literal('PAYMENT_PAY3DS2_RESP_ERR');
export type PAYMENT_PAY3DS2_RESP_ERR = t.TypeOf<typeof PAYMENT_PAY3DS2_RESP_ERR>;
export const PAYMENT_PAY3DS2_SUCCESS = t.literal('PAYMENT_PAY3DS2_SUCCESS');
export type PAYMENT_PAY3DS2_SUCCESS = t.TypeOf<typeof PAYMENT_PAY3DS2_SUCCESS>;
export const TRANSACTION_POLLING_M_CHECK_INIT = t.literal('TRANSACTION_POLLING_M_CHECK_INIT');
export type TRANSACTION_POLLING_M_CHECK_INIT = t.TypeOf<typeof TRANSACTION_POLLING_M_CHECK_INIT>;
export const TRANSACTION_POLLING_M_CHECK_NET_ERR = t.literal('TRANSACTION_POLLING_M_CHECK_NET_ERR');
export type TRANSACTION_POLLING_M_CHECK_NET_ERR = t.TypeOf<typeof TRANSACTION_POLLING_M_CHECK_NET_ERR>;
export const TRANSACTION_POLLING_M_CHECK_SVR_ERR = t.literal('TRANSACTION_POLLING_M_CHECK_SVR_ERR');
export type TRANSACTION_POLLING_M_CHECK_SVR_ERR = t.TypeOf<typeof TRANSACTION_POLLING_M_CHECK_SVR_ERR>;
export const TRANSACTION_POLLING_M_CHECK_RESP_ERR = t.literal('TRANSACTION_POLLING_M_CHECK_RESP_ERR');
export type TRANSACTION_POLLING_M_CHECK_RESP_ERR = t.TypeOf<typeof TRANSACTION_POLLING_M_CHECK_RESP_ERR>;
export const TRANSACTION_POLLING_M_CHECK_SUCCESS = t.literal('TRANSACTION_POLLING_M_CHECK_SUCCESS');
export type TRANSACTION_POLLING_M_CHECK_SUCCESS = t.TypeOf<typeof TRANSACTION_POLLING_M_CHECK_SUCCESS>;
export const THREEDSMETHODURL_STEP1_REQ = t.literal('THREEDSMETHODURL_STEP1_REQ');
export type THREEDSMETHODURL_STEP1_REQ = t.TypeOf<typeof THREEDSMETHODURL_STEP1_REQ>;
export const THREEDSMETHODURL_STEP1_RESP_ERR = t.literal('THREEDSMETHODURL_STEP1_RESP_ERR');
export type THREEDSMETHODURL_STEP1_RESP_ERR = t.TypeOf<typeof THREEDSMETHODURL_STEP1_RESP_ERR>;
export const THREEDSMETHODURL_STEP1_SUCCESS = t.literal('THREEDSMETHODURL_STEP1_SUCCESS');
export type THREEDSMETHODURL_STEP1_SUCCESS = t.TypeOf<typeof THREEDSMETHODURL_STEP1_SUCCESS>;
export const TRANSACTION_RESUME3DS2_STEP1_INIT = t.literal('TRANSACTION_RESUME3DS2_STEP1_INIT');
export type TRANSACTION_RESUME3DS2_STEP1_INIT = t.TypeOf<typeof TRANSACTION_RESUME3DS2_STEP1_INIT>;
export const TRANSACTION_RESUME3DS2_STEP1_NET_ERR = t.literal('TRANSACTION_RESUME3DS2_STEP1_NET_ERR');
export type TRANSACTION_RESUME3DS2_STEP1_NET_ERR = t.TypeOf<typeof TRANSACTION_RESUME3DS2_STEP1_NET_ERR>;
export const TRANSACTION_RESUME3DS2_STEP1_SVR_ERR = t.literal('TRANSACTION_RESUME3DS2_STEP1_SVR_ERR');
export type TRANSACTION_RESUME3DS2_STEP1_SVR_ERR = t.TypeOf<typeof TRANSACTION_RESUME3DS2_STEP1_SVR_ERR>;
export const TRANSACTION_RESUME3DS2_STEP1_RESP_ERR = t.literal('TRANSACTION_RESUME3DS2_STEP1_RESP_ERR');
export type TRANSACTION_RESUME3DS2_STEP1_RESP_ERR = t.TypeOf<typeof TRANSACTION_RESUME3DS2_STEP1_RESP_ERR>;
export const TRANSACTION_RESUME3DS2_STEP1_SUCCESS = t.literal('TRANSACTION_RESUME3DS2_STEP1_SUCCESS');
export type TRANSACTION_RESUME3DS2_STEP1_SUCCESS = t.TypeOf<typeof TRANSACTION_RESUME3DS2_STEP1_SUCCESS>;
export const TRANSACTION_POLLING_A_CHECK_INIT = t.literal('TRANSACTION_POLLING_A_CHECK_INIT');
export type TRANSACTION_POLLING_A_CHECK_INIT = t.TypeOf<typeof TRANSACTION_POLLING_A_CHECK_INIT>;
export const TRANSACTION_POLLING_A_CHECK_NET_ERR = t.literal('TRANSACTION_POLLING_A_CHECK_NET_ERR');
export type TRANSACTION_POLLING_A_CHECK_NET_ERR = t.TypeOf<typeof TRANSACTION_POLLING_A_CHECK_NET_ERR>;
export const TRANSACTION_POLLING_A_CHECK_SVR_ERR = t.literal('TRANSACTION_POLLING_A_CHECK_SVR_ERR');
export type TRANSACTION_POLLING_A_CHECK_SVR_ERR = t.TypeOf<typeof TRANSACTION_POLLING_A_CHECK_SVR_ERR>;
export const TRANSACTION_POLLING_A_CHECK_RESP_ERR = t.literal('TRANSACTION_POLLING_A_CHECK_RESP_ERR');
export type TRANSACTION_POLLING_A_CHECK_RESP_ERR = t.TypeOf<typeof TRANSACTION_POLLING_A_CHECK_RESP_ERR>;
export const TRANSACTION_POLLING_A_CHECK_SUCCESS = t.literal('TRANSACTION_POLLING_A_CHECK_SUCCESS');
export type TRANSACTION_POLLING_A_CHECK_SUCCESS = t.TypeOf<typeof TRANSACTION_POLLING_A_CHECK_SUCCESS>;
export const THREEDSACSCHALLENGEURL_STEP2_REQ = t.literal('THREEDSACSCHALLENGEURL_STEP2_REQ');
export type THREEDSACSCHALLENGEURL_STEP2_REQ = t.TypeOf<typeof THREEDSACSCHALLENGEURL_STEP2_REQ>;
export const THREEDSACSCHALLENGEURL_STEP2_RESP_ERR = t.literal('THREEDSACSCHALLENGEURL_STEP2_RESP_ERR');
export type THREEDSACSCHALLENGEURL_STEP2_RESP_ERR = t.TypeOf<typeof THREEDSACSCHALLENGEURL_STEP2_RESP_ERR>;
export const THREEDSACSCHALLENGEURL_STEP2_SUCCESS = t.literal('THREEDSACSCHALLENGEURL_STEP2_SUCCESS');
export type THREEDSACSCHALLENGEURL_STEP2_SUCCESS = t.TypeOf<typeof THREEDSACSCHALLENGEURL_STEP2_SUCCESS>;
export const TRANSACTION_RESUME3DS2_STEP2_INIT = t.literal('TRANSACTION_RESUME3DS2_STEP2_INIT');
export type TRANSACTION_RESUME3DS2_STEP2_INIT = t.TypeOf<typeof TRANSACTION_RESUME3DS2_STEP2_INIT>;
export const TRANSACTION_RESUME3DS2_STEP2_NET_ERR = t.literal('TRANSACTION_RESUME3DS2_STEP2_NET_ERR');
export type TRANSACTION_RESUME3DS2_STEP2_NET_ERR = t.TypeOf<typeof TRANSACTION_RESUME3DS2_STEP2_NET_ERR>;
export const TRANSACTION_RESUME3DS2_STEP2_SVR_ERR = t.literal('TRANSACTION_RESUME3DS2_STEP2_SVR_ERR');
export type TRANSACTION_RESUME3DS2_STEP2_SVR_ERR = t.TypeOf<typeof TRANSACTION_RESUME3DS2_STEP2_SVR_ERR>;
export const TRANSACTION_RESUME3DS2_STEP2_RESP_ERR = t.literal('TRANSACTION_RESUME3DS2_STEP2_RESP_ERR');
export type TRANSACTION_RESUME3DS2_STEP2_RESP_ERR = t.TypeOf<typeof TRANSACTION_RESUME3DS2_STEP2_RESP_ERR>;
export const TRANSACTION_RESUME3DS2_STEP2_SUCCESS = t.literal('TRANSACTION_RESUME3DS2_STEP2_SUCCESS');
export type TRANSACTION_RESUME3DS2_STEP2_SUCCESS = t.TypeOf<typeof TRANSACTION_RESUME3DS2_STEP2_SUCCESS>;
export const TRANSACTION_POLLING_F_CHECK_INIT = t.literal('TRANSACTION_POLLING_F_CHECK_INIT');
export type TRANSACTION_POLLING_F_CHECK_INIT = t.TypeOf<typeof TRANSACTION_POLLING_F_CHECK_INIT>;
export const TRANSACTION_POLLING_F_CHECK_NET_ERR = t.literal('TRANSACTION_POLLING_F_CHECK_NET_ERR');
export type TRANSACTION_POLLING_F_CHECK_NET_ERR = t.TypeOf<typeof TRANSACTION_POLLING_F_CHECK_NET_ERR>;
export const TRANSACTION_POLLING_F_CHECK_SVR_ERR = t.literal('TRANSACTION_POLLING_F_CHECK_SVR_ERR');
export type TRANSACTION_POLLING_F_CHECK_SVR_ERR = t.TypeOf<typeof TRANSACTION_POLLING_F_CHECK_SVR_ERR>;
export const TRANSACTION_POLLING_F_CHECK_RESP_ERR = t.literal('TRANSACTION_POLLING_F_CHECK_RESP_ERR');
export type TRANSACTION_POLLING_F_CHECK_RESP_ERR = t.TypeOf<typeof TRANSACTION_POLLING_F_CHECK_RESP_ERR>;
export const TRANSACTION_POLLING_F_CHECK_SUCCESS = t.literal('TRANSACTION_POLLING_F_CHECK_SUCCESS');
export type TRANSACTION_POLLING_F_CHECK_SUCCESS = t.TypeOf<typeof TRANSACTION_POLLING_F_CHECK_SUCCESS>;

// ini MIX TODO: enable on deploy

// mixpanel.init('c3db8f517102d7a7ebd670c9da3e05c4', {
//   api_host: 'https://api-eu.mixpanel.com',
//   cross_site_cookie: true,
// }); // secret
