import axios from "axios";
import { UserStorage } from "../../storage";

import * as ROUTES from "../../routes/endpoints";
import errorHandler from "../../utils/errorHandler";

import { updateTransactions } from "./transactions";
import { updatePlan } from "./plans";
export const SAVE_WALLET = "SAVE_WALLET";

export const saveWallet = (walletDetails) => {
  return {
    type: SAVE_WALLET,
    ...walletDetails,
  };
};

export const createWithdrawal = (payload) => {
  return async (dispatch) => {
    try {
      console.log("debug", payload);

      const response = await axios.post(ROUTES.WITHDRAW_CREATE, payload, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log("response", response.data);
      //update wallet and transactions

      let entity = response.data.entity;

      if (entity.wallet_id) dispatch(saveWallet(entity));
      dispatch(updateTransactions(response.data.transaction));
      //update data in async storage
      return response.data;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

export const createTransfer = (payload) => {
  return async (dispatch) => {
    try {
      console.log("debug", payload);

      const response = await axios.post(ROUTES.TRANSFER_CREATE, payload, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log("response", response.data);
      //update wallet and transactions

      let transfer = response.data.transfer;

      //update wallet balance and transaction
      if (transfer.debitTransfer.entity.wallet_id) {
        dispatch(saveWallet(transfer.debitTransfer.entity));
      }
      dispatch(updateTransactions(transfer.debitTransfer.transaction));

      // if transfer was to plan, update plan balance and add credit transaction
      if (transfer.creditTransfer.entity.plan_id) {
        dispatch(updateTransactions(transfer.creditTransfer.transaction));
        dispatch(updatePlan(transfer.creditTransfer.entity));
      }
      // dispatch(updateTransactions(transfer.creditTransfer.transaction));
      //update data in async storage
      return response.data;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

export const chargeCard = (payload) => {
  return async (dispatch) => {
    try {
      console.log("debug", payload);

      const response = await axios.post(ROUTES.CHARGE_CARD, payload, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log("response", response.data);
      return response.data;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};