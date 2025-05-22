import { SAVE_VIRTUAL_ACCT } from "../actions/virtualAcct";
//TODO: make bank name and code dynamic
// TODO: make this an object of objects to also save for kids
const initialState = {
  account_no: "",
  account_name: "",
  bank_code: "",
  bank_name: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_VIRTUAL_ACCT:
      return {
        account_no: action.account_no,
        account_name: action.account_name,
        bank_code: action.bank_code,
        bank_name: action.bank_name,
      };

    default:
      return state;
  }
};
