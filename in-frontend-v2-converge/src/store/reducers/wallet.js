import { SAVE_WALLET } from "../actions/wallet";

const initialState = {
  balance: 0,
  wallet_id: "0000000000",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_WALLET:
      return {
        balance: action.balance,
        wallet_id: action.wallet_id,
      };
    default:
      return state;
  }
};
