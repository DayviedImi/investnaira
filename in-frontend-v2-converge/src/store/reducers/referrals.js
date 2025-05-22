import { SAVE_REFERRALS } from "../actions/referrals";

const initialState = {
  referrals: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_REFERRALS:
      console.log("referral action", action);
      return {
        ...state,
        referrals: action.referrals,
      };
    // case LOGOUT:
    //   return initialState;
    default:
      return state;
  }
};
