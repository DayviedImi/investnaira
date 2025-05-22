// Public Routes
// const live_url = `https://623f-102-67-16-19.ngrok.io`;
// const live_url = `https://adonis-react.herokuapp.com`;
const live_url = `https://www.investnaira.com`;

// Authentication
export const EMAIL_SUBSCRIBE = `${live_url}/api/v1/auth/user/emailSubscribe`;

export const REGISTER = `${live_url}/api/v1/auth/user/signup`;
export const USER_LOGIN = `${live_url}/api/v1/auth/user/login`;
export const LOGOUT = `${live_url}/api/v1/logout`;
export const PASSWORD_FORGOT = `${live_url}/api/v1/password/reset`;
export const PASSWORD_RESET = (token) => `${live_url}/api/v1/password/reset/${token}`;
export const PASSWORD_RESET_OTP = `${live_url}/api/v1/password/reset_otp`;
// export const USER_VERIFY = `${live_url}/api/v1/verification/email_otp`;

// Verification
export const VERIFY_EMAIL = (emailToken) => `${live_url}/api/v1/verification/email/${emailToken}`;
export const RESEND_EMAIL_VERIFY = `${live_url}/api/v1/verification/resend/email`;

//DASHBOARD

export const DASHBOARD_GET = `${live_url}/api/v1/dashboard`;
export const PROFILE_PICTURE = `${live_url}/api/v1/profile_pic/save`;
export const PROFILE_UPDATE = `${live_url}/api/v1/adult/profile/create`;
export const PROFILE_GET = `${live_url}/api/v1/adult/profile`;
export const BANK_GET = `${live_url}/api/v1/adult/bankaccount`;
export const VIRTUAL_ACCT_GET = `${live_url}/api/v1/adult/virtual_bank_account`;
export const REFERRALS_GET = `${live_url}/api/v1/referral`;
export const BANK_ACCOUNT_SAVE = `${live_url}/api/v1/adult/bankaccount/save`;
export const RESOLVE_BVN = `${live_url}/api/v1/adult/resolve_bvn`;
export const CONFIRM_BVN = `${live_url}/api/v1/adult/confirm_bvn_mobile_no`;
export const USER_UPDATE = `${live_url}/api/v1/user/edit`;
export const PASSWORD_UPDATE = `${live_url}/api/v1/password/change`;
export const PLAN_CREATE = `${live_url}/api/v1/plan/create`;
export const PLAN_EDIT = `${live_url}/api/v1/plan/edit`;
export const PLAN_DELETE = `${live_url}/api/v1/plan/delete`;

export const WITHDRAW_CREATE = `${live_url}/api/v1/adult/withdrawal/create`;
export const TRANSFER_CREATE = `${live_url}/api/v1/transfer/create`;
export const CHARGE_CARD = `${live_url}/api/v1/adult/card/charge`;
export const EMAIL_CUSTOMER_SUPPORT = `${live_url}/api/v1/emailCustomerSupport`;

//EXPO
export const NOTIFY = `https://exp.host/--/api/v2/push/send/`;

//CAMPAIGNS
export const CAMPAIGNS_GET_ALL = `${live_url}/api/v1/campaigns/all`;
export const CAMPAIGNS_GET_ONE = `${live_url}/api/v1/campaigns/id`;
export const CAMPAIGNS_GET_MINE = `${live_url}/api/v1/campaigns/mine`;
export const CAMPAIGNS_SHORT_ID = `${live_url}/api/v1/campaigns/short_id`;
export const CAMPAIGNS_FUNDED = `${live_url}/api/v1/campaigns/funded`;
export const CAMPAIGNS_CREATE = `${live_url}/api/v1/campaigns/create`;
export const CAMPAIGNS_END = `${live_url}/api/v1/campaigns/end`;
export const CAMPAIGNS_DELETE = `${live_url}/api/v1/campaigns/delete`;
