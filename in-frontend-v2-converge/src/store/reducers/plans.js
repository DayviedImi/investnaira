import { UPDATE_PLAN, SAVE_PLANS, REMOVE_PLAN } from "../actions/plans";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PLANS:
      return { ...state, ...action.plans };
    case UPDATE_PLAN:
      return { ...state, [action.planId]: action.plan };
    case REMOVE_PLAN:
      const { [action.planId]: removed, ...newState } = state;
      return newState;
    default:
      return state;
  }
};
