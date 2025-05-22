import HTTP, { generateBearer } from "../../utils/http";
import * as ENDPOINTS from "./endpoints";

export default class UserApi {
  /**
   * Get all previous transactions of a user.
   */
  static getTransactions = async ({ token }) =>
    HTTP.get(ENDPOINTS.USER_TRANSACTIONS, generateBearer(token));

  /**
   * Create Goals.
   */
  static createGoal = async ({ plan_name, fund, maturity_date, frequency, target, token }) =>
    HTTP.post(
      ENDPOINTS.ADD_PLAN,
      {
        plan_name,
        fund,
        maturity_date,
        frequency,
        target,
      },
      generateBearer(token)
    );

  /**
   * Edit Goals.
   */
  static editGoal = async ({ plan_name, maturity_date, plan_id, target, token }) =>
    HTTP.post(
      ENDPOINTS.EDIT_PLAN,
      {
        plan_name,
        target,
        plan_id,
        maturity_date,
      },
      generateBearer(token)
    );

  /**
   * Delete Goals.
   */
  static deleteGoalApi = async ({ plan_id, token }) => {
    HTTP.post(ENDPOINTS.DELETE_PLAN, { plan_id }, generateBearer(token));
  };

  /**
   * Withdraw
   */
  static withdraw = async ({ amount, reason, password, token }) =>
    HTTP.post(
      ENDPOINTS.WITHDRAW,
      {
        amount,
        reason,
        password,
      },
      generateBearer(token)
    );

  /**
   * Withdraw
   */
  static transfer = async ({ amount, plan, token }) =>
    HTTP.post(
      ENDPOINTS.TRANSFERS,
      {
        amount,
        plan,
      },
      generateBearer(token)
    );

  /**
   * Add Kids.
   */
  static addKid = async ({
    firstname,
    lastname,
    gender,
    date_of_birth,
    frequency,
    maturity_date,
    token,
  }) =>
    HTTP.post(
      ENDPOINTS.ADD_KID,
      {
        firstname,
        lastname,
        gender,
        date_of_birth,
        frequency,
        maturity_date,
      },
      generateBearer(token)
    );

  /**
   * Get dashboard of user.
   */
  static getDashboard = async ({ token }) => HTTP.get(ENDPOINTS.USER, generateBearer(token));

  /**
   * Get profile of user.
   */
  static getProfile = async ({ token }) => HTTP.get(ENDPOINTS.PROFILE, generateBearer(token));

  /**
   * Get bank of user.
   */
  static getBank = async ({ token }) => HTTP.get(ENDPOINTS.BANK, generateBearer(token));

  /**
   * Get plans of user.
   */
  static getPlans = async ({ token }) => HTTP.get(ENDPOINTS.PLANS, generateBearer(token));

  /**
   * Get referrals of user.
   */
  static getReferrals = async ({ token }) => HTTP.get(ENDPOINTS.REFERRALS, generateBearer(token));

  /**
   * Update user profile.
   */
  static updateProfile = async ({
    gender,
    address,
    city,
    state,
    next_of_kin_name,
    next_of_kin_phone,
    date_of_birth,
    place_of_birth,
    token,
  }) =>
    HTTP.post(
      ENDPOINTS.PROFILE_UPDATE,
      {
        gender,
        address,
        city,
        state,
        next_of_kin_name,
        next_of_kin_phone,
        date_of_birth,
        place_of_birth,
      },
      generateBearer(token)
    );

  static updatePhoneNumber = async ({ phone_no, token }) =>
    HTTP.post(
      ENDPOINTS.NUMBER_UPDATE,
      {
        phone_no,
      },
      generateBearer(token)
    );

  /**
   * Update user bank details.
   */
  static updateBank = async ({ account_no, bank_code, token }) =>
    HTTP.post(
      ENDPOINTS.BANK_UPDATE,
      {
        account_no,
        bank_code,
      },
      generateBearer(token)
    );

  /**
   * Changes a user's password.
   */
  static changePassword = async ({ oldPassword, newPassword, newPasswordConfirm, token }) =>
    HTTP.post(
      ENDPOINTS.PASSWORD_CHANGE,
      {
        old_password: oldPassword,
        new_password: newPassword,
        new_password_confirm: newPasswordConfirm,
      },
      generateBearer(token)
    );

  /**
   * Get kids of user.
   */
  static getKid = async ({ token }) => HTTP.get(ENDPOINTS.KID, generateBearer(token));

  /**
   * Resend email verification link
   */
  static resendEmailVerificationLink = async ({ email }) =>
    HTTP.post(ENDPOINTS.VERIFY_RESEND_EMAIL, { email });
}
