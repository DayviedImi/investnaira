import * as Sentry from "@sentry/react";

export default async (err) => {
  // let errorMsg = err.message;
  // console.log("An error occured", err, err.message);
  // const networkState = await getNetworkStateAsync();
  // console.log("networkState", networkState);
  // if (networkState.isInternetReachable)
  Sentry.captureException(err);
};
