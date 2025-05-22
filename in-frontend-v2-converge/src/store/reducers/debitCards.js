import { SAVE_DEBIT_CARDS } from "../actions/debitCards";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DEBIT_CARDS:
      return [...action.debitCards];
    default:
      return state;
  }
};
