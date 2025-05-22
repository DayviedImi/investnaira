import { UPDATE_CAMPAIGN, SAVE_CAMPAIGNS, REMOVE_CAMPAIGN } from "../actions/campaigns";

const initialState = {
  // name: "",
  // description: "",
  // type: "",
  // status: "",
  // balance: 0,
  // target: "",
  // maturity_date: "",
  // maturity_trigger: "",
  // logo_pic: "",
  // cover_pic: "",
  // supporting_docs: "",
  // color_code: "",
  // user_id: "",
  // created_at: "",
  // updated_at: "",
  // id: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CAMPAIGNS:
      return {
        ...state,
        ...action.campaigns,
      };
    case SAVE_MY_CAMPAIGNS:
      return {
        ...state,
        ...action.myCampaigns,
      };
    case SAVE_CAMPAIGN:
      return {
        ...state,
        ...action.campaign,
      };
    case UPDATE_CAMPAIGN:
      return { ...state, [action.id]: action.campaign };
    case REMOVE_CAMPAIGN:
      const { [action.id]: removed, ...newState } = state;
      return newState;
    default:
      return state;
  }
};
