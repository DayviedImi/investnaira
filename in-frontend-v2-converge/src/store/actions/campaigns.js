import axios from "axios";
import { UserStorage } from "../../storage";

import errorHandler from "../../utils/errorHandler";
import * as ROUTES from "../../routes/endpoints";

export const SAVE_CAMPAIGNS = "SAVE_CAMPAIGNS";
export const SAVE_MY_CAMPAIGNS = "SAVE_MY_CAMPAIGNS";
export const SAVE_CAMPAIGN = "SAVE_CAMPAIGN";
export const UPDATE_CAMPAIGN = "UPDATE_CAMPAIGN";
export const REMOVE_CAMPAIGN = "REMOVE_CAMPAIGN";

export const saveCampaigns = (campaigns) => {
  return {
    type: SAVE_CAMPAIGNS,
    campaigns,
  };
};

export const saveCampaign = (campaign) => {
  return {
    type: SAVE_CAMPAIGN,
    campaign,
  };
};

export const saveMyCampaigns = (myCampaign) => {
  return {
    type: SAVE_MY_CAMPAIGNS,
    myCampaign,
  };
};

export const updateCampaign = (campaign) => {
  return { type: UPDATE_CAMPAIGN, id: [campaign.id], campaign };
};

export const removeCampaign = (id) => {
  return { type: REMOVE_CAMPAIGN, id };
};

export const getAllCampaigns = () => {
  return async (dispatch) => {
    try {
      console.log("dispatch get campaigns");
      const response = await axios.get(ROUTES.CAMPAIGNS_GET_ALL, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log("response", response);
      if (response.data.campaigns) {
        dispatch(saveCampaigns(response.data.campaigns));
      }
      console.log("camp", response.data.campaigns);
      return response.data.campaigns;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

export const getFundedCampaigns = () => {
  return async (dispatch) => {
    try {
      console.log("dispatch get campaigns");
      const response = await axios.get(ROUTES.CAMPAIGNS_FUNDED, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log("response", response);
      if (response.data.fundedCampaigns) {
        dispatch(saveCampaigns(response.data.fundedCampaigns));
      }
      console.log("camp", response.data.fundedCampaigns);
      return response.data.fundedCampaigns;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

export const getByShortId = (id) => {
  return async (dispatch) => {
    try {
      console.log("dispatch get campaigns");
      const response = await axios.get(`${ROUTES.CAMPAIGNS_SHORT_ID}/${id}`, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log(response);
      if (response.data.campaign) {
        dispatch(saveCampaign(response.data.campaign));
      }
      return response.data.campaign;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

export const getOne = (id) => {
  return async (dispatch) => {
    try {
      console.log("dispatch get campaign");
      const response = await axios.get(`${ROUTES.CAMPAIGNS_GET_ONE}/${id}`, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log("transaction", response.data.transactions);
      if (response.data.transactions) {
        dispatch(saveCampaign(response.data.transactions));
      }
      return response.data.transactions;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

export const getMyCampaigns = () => {
  return async (dispatch) => {
    try {
      console.log("dispatch get campaigns");
      const response = await axios.get(ROUTES.CAMPAIGNS_GET_MINE, {
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      console.log("response", response);
      if (response.data.campaigns) {
        dispatch(saveMyCampaigns(response.data.campaigns));
      }
      return response.data.campaigns;
    } catch (err) {
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

export const createCampaign = (endpoint, payload) => {
  return async (dispatch) => {
    try {
      console.log("debug", endpoint, payload);
      console.log("token", UserStorage.token);
      const response = await axios({
        method: "post",
        url: endpoint,
        data: payload.data,
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=--------------------------785836152121676101226920`,
        },
        params: payload.params,
      });
      console.log("response", response.data);
      if (response.data.campaigns) {
        dispatch(updateCampaign(response.data.campaigns));
      }
      return response.data;
    } catch (err) {
      console.log("err", err.response);
      console.log("err", err.message);
      errorHandler(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};

export const deleteCampaign = (campaignId) => {
  return async (dispatch) => {
    try {
      console.log("debug", ROUTES.CAMPAIGNS_DELETE, campaignId);
      const response = await axios({
        method: "post",
        url: `${ROUTES.CAMPAIGNS_DELETE}/${campaignId}`,
        headers: {
          Authorization: `Bearer ${UserStorage.token}`,
        },
      });
      // const response = await axios.post(`${ROUTES.CAMPAIGNS_DELETE}/${campaignId}`, {
      //   headers: {
      //     Authorization: `Bearer ${UserStorage.token}`,
      //   },
      // });
      console.log("response", response);

      if (campaignId) dispatch(removeCampaign(campaignId));
      //update data in async storage
      return response.data;
    } catch (err) {
      errorHandler(err);
      console.log(err);
      throw new Error(
        err.response ? `${Object.values(err.response.data.errors).join(" ")}` : err.message
      );
    }
  };
};
