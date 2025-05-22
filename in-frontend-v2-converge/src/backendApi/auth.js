import HTTP, { generateBearer } from "../../utils/http";
import * as ENDPOINTS from "./endpoints";

export default class AuthApi {
  /**
   * Performs a login request to backend.
   */
  static login = async ({ email, password, isAdmin }) => {
    if (isAdmin) return HTTP.post(ENDPOINTS.ADMIN_LOGIN, { email, password });
    return HTTP.post(ENDPOINTS.USER_LOGIN, { email, password });
  };

  /**
   * Performs a registration request to backend.
   */
  static register = async ({
    email,
    firstname,
    lastname,
    password,
    phone_no,
    recaptcha,
    source,
    referrer,
  }) =>
    HTTP.post(ENDPOINTS.REGISTER, {
      email,
      firstname,
      lastname,
      password,
      phone_no,
      recaptcha,
      source,
      referrer,
    });

  /**
   * Performs a login request to backend.
   */
  static logout = async ({ email, refreshToken, token }) =>
    HTTP.post(ENDPOINTS.LOGOUT, { email, refresh_token: refreshToken }, generateBearer(token));

  /**
   * Sends in an email for password reset request.
   */
  static requestChangePassword = async ({ email }) =>
    HTTP.post(ENDPOINTS.PASSWORD_RESET, { email });

  /**
   * Resets a user's password.
   */
  static resetPassword = async ({ password, password_confirm, passwordToken }) =>
    HTTP.post(`${ENDPOINTS.PASSWORD_RESET}/${passwordToken}`, {
      password,
      password_confirm,
    });

  /**
   * Verifies a user's email.
   */
  static verifyEmail = async ({ emailToken }) => HTTP.get(ENDPOINTS.VERIFY_EMAIL(emailToken));
}
