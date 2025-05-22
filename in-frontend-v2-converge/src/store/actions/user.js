import axios from "axios";
import { UserStorage } from "../../storage";
import * as Sentry from "@sentry/react";

// import * as ROUTES from "../../routes/endpoints";
import { convertArrayToObject } from "../../utils/helperFxns";
import { LOGIN } from "./auth";

import { saveChildren } from "./children";
import { saveWallet } from "./wallet";
import { saveTransactions } from "./transactions";
import { savePlans } from "./plans";
import { saveProfile, verifiedBVN } from "./profile";
import { saveNotifications } from "./notifications";

import { saveVirtualAcct } from "./virtualAcct";
import { saveDebitCards } from "./debitCards";

export const UPDATE_USER = "UPDATE_USER"; //Note: always use action creators

export const updateUser = (userDetails) => {
  return { type: UPDATE_USER, ...userDetails };
};
// export const pictureUpdate = profile_picture => {
//   // Split file path by . seperators
//   let uriParts = profile_picture.split(".");

//   // Pick the last value which is the file type
//   let fileType = uriParts[uriParts.length - 1];

//   // Split file path by  / seperators, pick the last which is the file name
//   let filename = profile_picture.split("/").pop();

//   let formData = new FormData();
//   // append the picture to the form data
//   formData.append("profile_pic", {
//     uri: profile_picture,
//     name: `${filename}`,
//     type: `image/${fileType}`
//   });

//   return async () => {
//     try {
//       //get token and post picture update
//       console.log(ROUTES.PROFILE_PICTURE, token);

//       const response = await axios.post(ROUTES.PROFILE_PICTURE, formData, {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "multipart/form-data",
//           // Set user token
//           Authorization: `Bearer ${token}`
//         }
//       });
//       console.log("response", response.data);
//       //update data in async storage
//       return response.data;
//     } catch (err) {
//       errorHandler(err);
//       throw new Error(
//         err.response
//           ? `${Object.values(err.response.data.errors).join(" ")}`
//           : err.message
//       );
//     }
//     // const response = await fetch(ROUTES.PROFILE_PICTURE, options);
//     // const resData = await response.json();
//     // if (!response.ok) {
//     //   throw resData.msg;
//     // }
//     // return resData;
//   };
// };

export const userUpdate = (endpoint, payload) => {
  console.log(UserStorage.token);
  return async (dispatch) => {
    try {
      console.log("debug", endpoint, payload);

      const response = await axios.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log("response", response.data);
      if (response.data.user) {
        dispatch(updateUser(response.data.user));
      }
      if (response.data.status === "BVN Verified") {
        dispatch(verifiedBVN());
      }
      //update data in async storage
      return response.data;
    } catch (err) {
      Sentry.captureException(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

export const getDashboard = (endpoint) => {
  return async (dispatch) => {
    try {
      console.log("debug", endpoint);

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      dispatch({ type: LOGIN, ...response.data.user });

      console.log("user response", response.data);
      dispatch(saveWallet(response.data.user.wallet));

      if (response.data.user.transactions && response.data.user.transactions.length > 0) {
        dispatch(saveTransactions(response.data.user.transactions));
      }

      if (response.data.user.plans && response.data.user.plans.length > 0) {
        // convert plans to object
        const plansObj = convertArrayToObject(response.data.user.plans, "plan_id");
        console.log("plansObj", plansObj);
        dispatch(savePlans(plansObj));
      }
      if (response.data.user.notifications && response.data.user.notifications.length > 0) {
        dispatch(saveNotifications(response.data.user.notifications));
      }
      console.log("profile", response.data.user.profile);
      if (response.data.user.profile && response.data.user.profile.created_at) {
        dispatch(saveProfile(response.data.user.profile));
      }
      if (
        response.data.user.virtualBankAccount &&
        response.data.user.virtualBankAccount.account_no
      ) {
        dispatch(
          saveVirtualAcct({
            ...response.data.user.virtualBankAccount,
            bank_name: "Wema Bank",
          })
        );
      }
      let { children } = response.data;
      if (children && children.length > 0) {
        // convert children to object
        const childrenObj = convertArrayToObject(children, "child_id", "child");
        console.log("childrenObj", childrenObj);

        dispatch(saveChildren(childrenObj));
      }

      if (response.data.user.cards && response.data.user.cards.length > 0) {
        dispatch(saveDebitCards(response.data.user.cards));
      }
      // console.log("token", UserStorage.token);

      //update data in async storage
      return response.data;
    } catch (err) {
      Sentry.captureException(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};
