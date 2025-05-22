import { SAVE_NOTIFICATIONS } from "../actions/notifications";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_NOTIFICATIONS:
      return [...action.notifications];
    default:
      return state;
  }
};
