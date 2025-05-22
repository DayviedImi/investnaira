import * as ROUTES from "../../routes/endpoints";
import { UserStorage } from "../../storage";

import axios from "axios";

import errorHandler from "../../utils/errorHandler";

export const SAVE_REFERRALS = "SAVE_REFERRALS";

export const getReferrals = () => {
  return async (dispatch) => {
    try {
      console.log("dispatch get referals");
      const response = await axios.get(ROUTES.REFERRALS_GET, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      // console.log("response", response.data);
      console.log("referral response", response.data);
      if (response.data.referrals) {
        dispatch({
          type: SAVE_REFERRALS,
          referrals: response.data.referrals,
        });
      }
      return response.data.referrals;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};
