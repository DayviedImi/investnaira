import { SAVE_PROFILE, VERIFIED_BVN } from "../actions/profile";

const initialState = {
  gender: "male",
  address: "",
  city: "",
  state: "",
  next_of_kin_name: "",
  next_of_kin_phone: "",
  date_of_birth: "",
  place_of_birth: "",
  bvn_verified: false,
  allowance: 0,
  allowance_frequency: 2,
  spend_limit: 0,
  spend_limit_frequency: 2,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PROFILE:
      return {
        ...action.profile,
      };
    case VERIFIED_BVN:
      return {
        ...state,
        bvn_verified: true,
      };
    default:
      return state;
  }
};
