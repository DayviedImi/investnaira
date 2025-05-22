// Public Routes
export const HOME = "/";
export const LOGIN = "/login";
export const SIGNUP = "/signup";
export const FAQ = "/faq";
export const VISION = "/vision";
export const REF_SIGNUP = "/signup/ref/:shid";
export const CONVERGE = "/converge";

// // User Routes
export const FORGOT_PASSWORD = "/password/forgot";
export const RESET_PASSWORD = "/password/reset/:token";

export const RESEND = "/verification/email";
export const VERIFY_EMAIL = "/verification/email/:token";
// export const CHANGE = '/dashboard/change';

// // Dashboard Routes
export const DASHBOARD = "/dashboard";
export const WALLET = `${DASHBOARD}/wallet`;
export const CONVERGEDASHBOARD = `${DASHBOARD}/converge`;
export const PROFILE = `${DASHBOARD}/profile`;
export const SETTINGS = `${DASHBOARD}/settings`;

// Converge Routes
export const OVERVIEW = `${CONVERGEDASHBOARD}/overview`;
export const CREATE = `${CONVERGEDASHBOARD}/create`;
export const CONHOME = `${CONVERGEDASHBOARD}/dashboard`;
export const CONOVERVIEW = `${CONVERGE}/:shid`;

// export const ADMIN = '/admin';
// export const ADMIN_LOGIN = '/admin/login';
