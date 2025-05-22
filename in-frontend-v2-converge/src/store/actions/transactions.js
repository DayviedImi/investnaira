export const SAVE_TRANSACTIONS = "SAVE_TRANSACTIONS";
export const UPDATE_TRANSACTIONS = "UPDATE_TRANSACTIONS";

export const saveTransactions = (transactions) => {
  return {
    type: SAVE_TRANSACTIONS,
    transactions,
  };
};

export const updateTransactions = (trx) => {
  return {
    type: UPDATE_TRANSACTIONS,
    transaction: trx,
  };
};
