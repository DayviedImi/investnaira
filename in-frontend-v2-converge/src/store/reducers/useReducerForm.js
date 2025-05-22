// Default reducer to be used for forms in useReducer
export const FORM_UPDATE = "FORM_UPDATE";

export const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_UPDATE:
      console.log("form update", action);
      return {
        ...state,
        [action.inputIdentifier]: action.inputValue,
      };
    default:
      return state;
  }
};
