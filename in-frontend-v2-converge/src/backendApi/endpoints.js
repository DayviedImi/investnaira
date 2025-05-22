// eslint-disable-next-line
const live_url = `https://www.investnaira.com`;
// eslint-disable-next-line
const test_url = `https://adonis-react.herokuapp.com`;

// Authentication
export const REGISTER = `${test_url}/api/auth/user/signup`;
export const USER_LOGIN = `${test_url}/api/auth/user/login`;
export const ADMIN_LOGIN = `${test_url}/api/auth/admin/login`;
export const LOGOUT = `${test_url}/api/logout`;

// RESET PASSWORD
export const PASSWORD = `${test_url}/api/password`;
export const PASSWORD_RESET = `${test_url}/api/password/reset`;
export const PASSWORD_CHANGE = `${test_url}/api/password/change`;

// User
export const USER = `${test_url}/api/dashboard`;
export const USER_TRANSACTIONS = `${USER}/transactions`;

export const PLANS = `${test_url}/api/plan`;
export const ADD_PLAN = `${test_url}/api/plan/create`;
export const EDIT_PLAN = `${test_url}/api/plan/edit`;
export const DELETE_PLAN = `${test_url}/api/plan/delete`;
export const KID = `${test_url}/api/kid`;
export const ADD_KID = `${test_url}/api/kid/create`;
export const PROFILE = `${test_url}/api/profile`;
export const PROFILE_UPDATE = `${test_url}/api/profile/create`;
export const NUMBER_UPDATE = `${test_url}/api/phone_no/edit`;
export const BANK = `${test_url}/api/bankaccount`;
export const BANK_UPDATE = `${test_url}/api/bankaccount/save`;
export const REFERRALS = `${test_url}/api/referral`;

// Wallet
export const WITHDRAW = `${test_url}/api/withdrawal/create`;
export const TRANSFERS = `${test_url}/api/transfer/create`;
// Verification
export const VERIFY_EMAIL = (emailToken) => `${test_url}/api/verification/email/${emailToken}`;
export const VERIFY_RESEND_EMAIL = `${test_url}/api/verification/resend/email`;

// Admin
const TRANSACTIONS = `${test_url}/api/transactions`;
export const TRANSACTIONS_OFFLINE = (page, statusType, limit) =>
  `${TRANSACTIONS}/offline/page/${page}/limit/${limit}/statusType/${statusType}`;
export const TRANSACTIONS_UPDATE = (reference) => `${TRANSACTIONS}/offline/${reference}`;
