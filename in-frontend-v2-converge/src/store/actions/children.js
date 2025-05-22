// import * as ROUTES from "../../routes/endpoints";

// import axios from "axios";
// import { updateTransactions } from "./transactions";


export const SAVE_CHILDREN = "SAVE_CHILDREN";
export const UPDATE_CHILD = "UPDATE_CHILD";
export const SAVE_CHILD_PROFILE = "SAVE_CHILD_PROFILE";
export const SAVE_CHILD_VCARD = "SAVE_CHILD_VCARD";
export const DELETE_CHILD_VCARD = "DELETE_CHILD_VCARD";
export const SAVE_CHILD_VIRTUAL_ACCT = "SAVE_CHILD_VIRTUAL_ACCT";

// export const deleteChildVCard = (vCard) => {
//   return {
//     type: DELETE_CHILD_VCARD,
//     childId: vCard.user_id,
//     vCardId: vCard.card_id,
//   };
// };

// export const saveChildVCard = (vCard) => {
//   return {
//     type: SAVE_CHILD_VCARD,
//     childId: vCard.user_id,
//     vCard,
//   };
// };

// export const saveChildVirtualAcct = (virtualBankAccount) => {
//   return {
//     type: SAVE_CHILD_VIRTUAL_ACCT,
//     childId: virtualBankAccount.user_id,
//     virtualBankAccount,
//   };
// };

export const saveChildren = (childrenObj) => {
  return { type: SAVE_CHILDREN, children: childrenObj };
};

export const updateChild = (child) => {
  return {
    type: UPDATE_CHILD,
    childId: child.id,
    child,
  };
};

export const saveChildProfile = (profile) => {
  return {
    type: SAVE_CHILD_PROFILE,
    childId: profile.user_id,
    profile,
  };
};

// //utilize this for both creating and adding child
// export const createChild = (payload, signedUp) => {
//   return async (dispatch) => {
//     try {
//       const token = await SecureStore.getItemAsync("token");
//       console.log("debug", payload, token);
//       const endpoint = signedUp ? ROUTES.CHILD_VERIFY : ROUTES.CHILD_CREATE;
//       const response = await axios.post(endpoint, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("response", response.data);
//       let child = response.data.child;

//       if (child) dispatch(updateChild(child));

//       //update data in async storage
//       return response.data;
//     } catch (err) {
//       throw new Error(
//         err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
//       );
//     }
//   };
// };

// export const getChild = (user_id) => {
//   return async (dispatch) => {
//     try {
//       const token = await SecureStore.getItemAsync("token");
//       console.log("debug", user_id, token);

//       const response = await axios.post(
//         ROUTES.CHILD_GET,
//         { user_id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       // console.log("response", response.data);
//       let child = response.data.child;
//       dispatch(updateChild(child));
//       //update data in async storage
//       return response.data;
//     } catch (err) {
//       errorHandler(err);
//       throw new Error(
//         err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
//       );
//     }
//   };
// };

// export const updateChildProfile = (payload) => {
//   return async (dispatch) => {
//     try {
//       const token = await SecureStore.getItemAsync("token");
//       console.log("debug", payload, token);

//       const response = await axios.post(ROUTES.CHILD_PROFILE_UPDATE, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("response", response.data);
//       //update wallet and transactions

//       let childProfile = response.data.childProfile;

//       //update wallet balance and transaction
//       if (childProfile) {
//         dispatch(saveChildProfile(childProfile));
//       }

//       return response.data;
//     } catch (err) {
//       errorHandler(err);
//       throw new Error(
//         err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
//       );
//     }
//   };
// };

// export const getChildVirtualAcct = (user_id) => {
//   return async (dispatch) => {
//     try {
//       const token = await SecureStore.getItemAsync("token");
//       console.log("debug", ROUTES.CHILD_VIRTUAL_ACCT_GET, token);

//       const response = await axios.post(
//         ROUTES.CHILD_VIRTUAL_ACCT_GET,
//         { user_id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("response", response.data);
//       if (response.data.userVirtualAcct) {
//         //update profile in state
//         dispatch(
//           saveChildVirtualAcct({
//             ...response.data.userVirtualAcct,
//             bank_name: "Wema Bank",
//           })
//         );
//       }
//       return response.data;
//     } catch (err) {
//       errorHandler(err);
//       throw new Error(
//         err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
//       );
//     }
//   };
// };

// //createVCard

// export const createVCard = (payload) => {
//   return async (dispatch) => {
//     try {
//       const token = await SecureStore.getItemAsync("token");
//       console.log("debug", payload, token);

//       const response = await axios.post(ROUTES.VCARD_CREATE, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("response", response.data);
//       //update wallet and transactions

//       let virtualCard = response.data.virtualCard;

//       //update wallet balance and transaction
//       if (virtualCard) {
//         dispatch(saveChildVCard(virtualCard));
//       }

//       return response.data;
//     } catch (err) {
//       errorHandler(err);
//       throw new Error(
//         err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
//       );
//     }
//   };
// };

// //createVCard

// export const manageVCard = (payload) => {
//   return async (dispatch) => {
//     try {
//       const token = await SecureStore.getItemAsync("token");
//       console.log("debug", payload, token);

//       const response = await axios.post(`${ROUTES.VCARD_MANAGE}${payload.action}`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("response", response.data);
//       //update wallet and transactions

//       let virtualCard = response.data.virtualCard;
//       let terminatedCard = response.data.terminatedCard;
//       let transaction = response.data.transaction;

//       //update wallet balance and transaction
//       if (virtualCard) {
//         dispatch(saveChildVCard(virtualCard));
//       } else if (terminatedCard) {
//         dispatch(deleteChildVCard(terminatedCard));
//         //keep in mind, the refund for card termination goes to the child
//         // if (transaction) dispatch(updateTransactions(transaction));
//       }

//       return response.data;
//     } catch (err) {
//       errorHandler(err);
//       throw new Error(
//         err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
//       );
//     }
//   };
// };
