import { SAVE_BANK_DETAILS, SAVE_BANKS } from "../actions/bank";

const initialState = {
  bankAccount: {
    account_no: "",
    account_name: "",
    bank_code: "",
    bank_name: "",
  },
  banks: [
    {
      bank_code: "044",
      bank_name: "Access Bank",
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_BANK_DETAILS:
      return {
        ...state,
        bankAccount: {
          account_no: action.account_no,
          account_name: action.account_name,
          bank_code: action.bank_code,
          bank_name: action.bank_name,
        },
      };
    case SAVE_BANKS:
      return {
        ...state,
        banks: action.banks,
      };

    default:
      return state;
  }
};
