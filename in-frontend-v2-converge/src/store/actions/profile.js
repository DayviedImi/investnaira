import axios from "axios";
import { UserStorage } from "../../storage";

import errorHandler from "../../utils/errorHandler";
import * as ROUTES from "../../routes/endpoints";

export const SAVE_PROFILE = "SAVE_PROFILE";
export const VERIFIED_BVN = "VERIFIED_BVN";

export const saveProfile = (profile) => {
  return {
    type: SAVE_PROFILE,
    profile,
  };
};

export const verifiedBVN = () => {
  return {
    type: VERIFIED_BVN,
  };
};

export const profileUpdate = (endpoint, payload) => {
  return async (dispatch) => {
    try {
      console.log("debug", endpoint, payload);

      const response = await axios.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log("response", response.data);
      if (response.data.profile) {
        //update profile in state
        dispatch(saveProfile(response.data.profile));
      }
      //update data in async storage
      return response.data;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

export const getProfile = () => {
  return async (dispatch) => {
    try {
      console.log("dispatch get profile");
      const response = await axios.get(ROUTES.PROFILE_GET, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log("response", response.data);
      if (response.data.profile) {
        dispatch(saveProfile(response.data.profile));
      }

      return response.data.profile;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};
