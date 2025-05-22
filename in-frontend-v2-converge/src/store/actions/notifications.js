import * as ROUTES from "../../routes/endpoints";
import axios from "axios";
import errorHandler from "../../utils/errorHandler";

export const NOTIFY = "NOTIFY";
export const TOKEN = "TOKEN";
export const SAVE_NOTIFICATIONS = "SAVE_NOTIFICATIONS";

/**
 * Function to  dispatch push notification
 * @function notify
 * @param {string} token - User User Expo Device Token
 * @param {string} title - Notification Title
 * @param {string} body - Subtext of notification
 * @param {object} data - Notification Payload
 * @returns {async}
 */

export const saveNotifications = (notifications) => {
  return {
    type: SAVE_NOTIFICATIONS,
    notifications,
  };
};
export const notify = (token, title, body, data) => {
  return async (dispatch) => {
    try {
      const message = {
        to: token,
        sound: "default",
        title: title,
        body: body,
        data: { data: data },
        _displayInForeground: true,
      };

      const response = await axios.post(ROUTES.NOTIFY, message, {
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      errorHandler(err);
    }
    // dispatch({ type: NOTIFY });
  };
};

export const storeToken = (token) => {
  return {
    type: TOKEN,
    deviceId: token,
  };
};
