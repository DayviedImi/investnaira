import axios from "axios";
import { UserStorage } from "../../storage";

import * as ROUTES from "../../routes/endpoints";
import errorHandler from "../../utils/errorHandler";

export const SAVE_VIRTUAL_ACCT = "SAVE_VIRTUAL_ACCT";

export const saveVirtualAcct = (details) => {
  return { type: SAVE_VIRTUAL_ACCT, ...details };
};
export const getVirtualAcct = () => {
  return async (dispatch) => {
    try {
      console.log("debug", ROUTES.VIRTUAL_ACCT_GET);

      const response = await axios.get(ROUTES.VIRTUAL_ACCT_GET, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });

      console.log("response", response.data);
      if (response.data.userVirtualAcct) {
        //update profile in state
        dispatch(
          saveVirtualAcct({
            ...response.data.userVirtualAcct,
            bank_name: "Wema Bank",
          })
        );
      }
      return response.data;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

export const createVirtualAcct = (bvn) => {
  return async (dispatch) => {
    try {
      console.log("debug", ROUTES.VIRTUAL_ACCT_GET);

      const response = await axios.post(
        ROUTES.VIRTUAL_ACCT_GET,
        { bvn: bvn },
        {
          headers: {
            Authorization: `Bearer ${UserStorage.token}`,
          },
        }
      );

      console.log("response", response.data);
      if (response.data.userVirtualAcct) {
        //update profile in state
        dispatch(
          saveVirtualAcct({
            ...response.data.userVirtualAcct,
            bank_name: "Wema Bank",
          })
        );
      }
      return response.data;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};
