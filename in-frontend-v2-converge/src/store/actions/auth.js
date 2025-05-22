/* eslint-disable camelcase */
import axios from "axios";
import * as ENDPOINTS from "../../routes/endpoints";
import * as ROUTES from "../../routes/routes";
import { UserStorage } from "../../storage";
import errorHandler from "../../utils/errorHandler";

/**
 * Function used to set token and user info to storage
 * @function saveDataToStorage
 * @param {string} token
 * @param {string} refreshToken
 * @param {object} userInfo
 */
const saveDataToStorage = (token) => {
  UserStorage.token = token;
};

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";

/**
 * Function to be dispatched upon login
 * @function
 * @param {string} email - User e-mail
 * @param {string} password - User password
 * @returns {async}
 */
export const login = ({ email, password, push_token, brand, model_name }) => {
  console.log(email, password, push_token, brand, model_name);
  return async (dispatch) => {
    console.log(UserStorage.token);
    try {
      const response = await axios.post(ENDPOINTS.USER_LOGIN, {
        email,
        password,
        push_token,
        brand,
        model_name,
      });
      dispatch({ type: LOGIN, ...response.data.user });

      //Save the token, and user data to storage
      saveDataToStorage(response.data.token);

      return response.data;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response.data.errors
          ? `${Object.values(err.response.data.errors).join(" ")}`
          : err.message
      );
    }
  };
};

/**
 * Function to be dispatched upon login
 * @function signup
 * @param {string} referrer - User e-mail
 * @param {string} firstname - User password
 * @param {string} lastname - User e-mail
 * @param {number} age - User password
 * @param {string} email - User e-mail
 * @param {number} phone_no - User password
 * @param {string} password - User password
 * @returns {async}
 */
export const signup = ({
  referrer,
  firstname,
  lastname,
  age,
  email,
  phone_no,
  password,
  recaptcha,
}) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(ENDPOINTS.REGISTER, {
        referrer,
        firstname,
        lastname,
        age: age || 20,
        email,
        phone_no,
        password,
        recaptcha,
        source: "website",
      });
      console.log(response);

      // dispatch({ type: SIGNUP });
      return response.data;
    } catch (err) {
      errorHandler(err);
      console.log(err.response);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

export const logout = () => {
  console.log("logout start");
  return async (dispatch) => {
    const token = UserStorage.token;
    try {
      // const data = await AsyncStorage.getItem("userData");
      if (token) {
        const response = await axios.post(ENDPOINTS.LOGOUT, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response", response);
      }
    } catch (err) {
      errorHandler(err);
    } finally {
      UserStorage.unsetToken();
      dispatch({ type: LOGOUT });
      window.location.replace(ROUTES.HOME);
    }
  };
};

/**
 * Forgot Password function dispatched
 * @function forgot
 * @param {string} email - Registered user's email
 * @returns {async}
 */
export const forgot = ({ email }) => {
  //TODO: try and catch
  return async (dispatch) => {
    try {
      const response = await axios.post(ENDPOINTS.PASSWORD_FORGOT, {
        email,
      });
      // dispatch({ type: SIGNUP });
      return response.data;
    } catch (err) {
      console.log("forgot err", err);
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

/**
 * Reset password action dispatched
 * @function reset
 * @param {string} token - token param
 * @param {string} password - User's password
 * @param {string} password_confirm - User's confirmed password
 */
export const reset = ({ token, password, password_confirm }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(ENDPOINTS.PASSWORD_RESET(token), {
        password,
        password_confirm,
      });

      return response.data;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

/**
 * Resend verification link action dispatched
 * @function resend
 * @param {string} email - Registered user's email
 * @returns {async}
 */
export const resend = ({ email }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(ENDPOINTS.RESEND_EMAIL_VERIFY, {
        email,
      });

      // dispatch({ type: RESEND });
      return response.data;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

/**
 * Function to be dispatched upon verification of email
 * @function
 * @param {string} token - E-mail verification token
 * @returns {async}
 */

export const verify = ({ token }) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(ENDPOINTS.VERIFY_EMAIL(token));

      // dispatch({ type: VERIFY });
      return response.data;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

/**
 * Subscribe for email newsletter action
 * @param {string} email - User e-mail
 */
export const emailSubscribe = ({ email }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(ENDPOINTS.EMAIL_SUBSCRIBE, {
        email,
      });

      return response.data;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};
