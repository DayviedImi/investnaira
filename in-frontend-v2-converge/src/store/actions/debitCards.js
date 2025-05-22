export const SAVE_DEBIT_CARDS = "SAVE_DEBIT_CARDS";

export const saveDebitCards = (debitCards) => {
  return {
    type: SAVE_DEBIT_CARDS,
    debitCards,
  };
};
