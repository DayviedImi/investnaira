import axios from "axios";
import { UserStorage } from "../../storage";

import * as ROUTES from "../../routes/endpoints";
import errorHandler from "../../utils/errorHandler";

export const UPDATE_PLAN = "UPDATE_PLAN";
export const SAVE_PLANS = "SAVE_PLANS";
export const REMOVE_PLAN = "REMOVE_PLAN";

export const savePlans = (plans) => {
  return { type: SAVE_PLANS, plans };
};

export const updatePlan = (plan) => {
  return { type: UPDATE_PLAN, planId: [plan.plan_id], plan };
};

export const removePlan = (planId) => {
  return { type: REMOVE_PLAN, planId };
};

export const createPlan = (payload) => {
  return async (dispatch) => {
    try {
      console.log("debug", ROUTES.PLAN_CREATE, payload);

      const response = await axios.post(ROUTES.PLAN_CREATE, payload, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log("response", response.data);
      let plan = response.data.plan;

      if (plan) dispatch(updatePlan(plan));

      //update data in async storage
      return response.data;
    } catch (err) {
      console.log(err.message);
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

export const editPlan = (payload) => {
  return async (dispatch) => {
    try {
      console.log("debug", ROUTES.PLAN_EDIT, payload);

      const response = await axios.post(ROUTES.PLAN_EDIT, payload, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log("response", response.data);
      let plan = response.data.plan;

      if (plan) dispatch(updatePlan(plan));

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

export const deletePlan = (payload) => {
  return async (dispatch) => {
    try {
      console.log("debug", ROUTES.PLAN_DELETE, payload);
      const response = await axios.post(ROUTES.PLAN_DELETE, payload, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log("response", response.data);
      let plan_id = response.data.plan_id;

      if (plan_id) dispatch(removePlan(plan_id));

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
