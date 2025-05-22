import {
  SAVE_CHILDREN,
  UPDATE_CHILD,
  SAVE_CHILD_PROFILE,
  SAVE_CHILD_VIRTUAL_ACCT,
  SAVE_CHILD_VCARD,
  DELETE_CHILD_VCARD,
} from "../actions/children";
// import { SAVE_TASK, UPDATE_TASK } from "../actions/tasks";
// import { updateObjectInArray } from "../../utils/helperFxns";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CHILDREN:
      return { ...state, ...action.children };
    case UPDATE_CHILD:
      return { ...state, [action.childId]: action.child };
    case SAVE_CHILD_PROFILE:
      return {
        ...state,
        [action.childId]: {
          ...state[action.childId],
          profile: { ...action.profile },
        },
      };
    case SAVE_CHILD_VIRTUAL_ACCT:
      return {
        ...state,
        [action.childId]: {
          ...state[action.childId],
          virtualBankAccount: { ...action.virtualBankAccount },
        },
      };
    case DELETE_CHILD_VCARD:
      return {
        ...state,
        [action.childId]: {
          ...state[action.childId],
          virtualCards: state[action.childId].virtualCards.filter(
            (vCard) => vCard.id !== action.vCardId
          ),
        },
      };
    case SAVE_CHILD_VCARD:
      return {
        ...state,
        [action.childId]: {
          ...state[action.childId],
          virtualCards: [action.vCard],
        },
      };
    // case SAVE_TASK:
    //   const currentTasks = state[action.userId].tasks ? state[action.userId].tasks : [];
    //   console.log(
    //     "states",
    //     action.task,
    //     currentTasks,
    //     state[action.userId],
    //     state[action.userId].tasks
    //   );
    //   return {
    //     ...state,
    //     [action.userId]: {
    //       ...state[action.userId],
    //       tasks: [action.task, ...currentTasks],
    //     },
    //   };
    // case UPDATE_TASK:
    //   const updatedTasks = updateObjectInArray(state[action.userId].tasks, action.task, "id");
    //   return {
    //     ...state,
    //     [action.userId]: {
    //       ...state[action.userId],
    //       tasks: updatedTasks,
    //     },
    //   };
    default:
      return state;
  }
};
