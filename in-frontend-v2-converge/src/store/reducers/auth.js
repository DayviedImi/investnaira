import { LOGIN } from "../actions/auth";

const initialState = {
  id: "",
  firstname: "",
  lastname: "",
  phone_no: "",
  email: "",
  short_id: "",
  picture: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        picture: action.picture,
        id: action.id,
        firstname: action.firstname,
        lastname: action.lastname,
        phone_no: action.phone_no,
        email: action.email,
        short_id: action.short_id,
      };
    default:
      return state;
  }
};
