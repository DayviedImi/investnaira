import { SAVE_TRANSACTIONS, UPDATE_TRANSACTIONS } from "../actions/transactions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TRANSACTIONS:
      return [...action.transactions];
    case UPDATE_TRANSACTIONS:
      return [action.transaction, ...state];
    default:
      return state;
  }
};
