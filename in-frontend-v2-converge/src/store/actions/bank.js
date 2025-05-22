import * as ROUTES from "../../routes/endpoints";
import { UserStorage } from "../../storage";

import axios from "axios";
import errorHandler from "../../utils/errorHandler";

export const SAVE_BANKS = "SAVE_BANKS";
export const SAVE_BANK_DETAILS = "SAVE_BANK_DETAILS";
export const saveBanks = (banks) => {
  return { type: SAVE_BANKS, banks };
};

export const saveBankDetails = (details) => {
  return { type: SAVE_BANK_DETAILS, ...details };
};
export const bankDetailsUpdate = (endpoint, payload) => {
  return async (dispatch) => {
    try {
      console.log("debug", endpoint, payload);

      const response = await axios.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log("response", payload.bank_name, response.data);
      if (response.data.userBankAccount) {
        //update profile in state
        dispatch(
          saveBankDetails({
            ...response.data.userBankAccount,
            bank_name: response.data.bank ? response.data.bank.bank_name : "",
          })
        );
      }
      return response.data;
    } catch (err) {
      console.log("err", err, err.message);
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

export const getBankDetails = () => {
  return async (dispatch) => {
    try {
      console.log("dispatch get profile");
      const response = await axios.get(ROUTES.BANK_GET, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      // console.log("response", response.data);
      if (response.data.bankAccount) {
        dispatch(
          saveBankDetails({
            ...response.data.bankAccount,
            bank_name: response.data.bankAccount.bank.bank_name,
          })
        );
      }
      if (response.data.banks) {
        dispatch(saveBanks(response.data.banks));
      }
      return response.data.bank;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};
