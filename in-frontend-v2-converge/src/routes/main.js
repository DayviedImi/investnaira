import React from "react";
import { Switch } from "react-router-dom";
import * as ROUTES from "./routes";

import Home from "../views/home";
import Signup from "../views/signup";
import Login from "../views/login";
import Faq from "../views/faq";
import Vision from "../views/vision";
import Converge from "../views/convergeLanding";
import ForgotPassword from "../views/forgotPassword";
import ResetPassword from "../views/resetPassword";
import Dashboard from "../views/dashboard";
import Wallet from "../views/wallet";
import Profile from "../views/profile";
import Settings from "../views/settings";
import ConvergeDashboard from "../views/converge";
import CampaignOverview from "../views/campaignOverview";
import Overview from "../views/offlineOverview";
import Create from "../views/campaign";
import ConHome from "../views/conHome";
import NotFound from "../views/notFound";
import ResendVerification from "../views/resendVerification";
import VerifyEmail from "../views/verifyEmail";

// import ProtectedRoute from "../layouts/ProtectedRoute";
import DefaultLayout from "../layouts/DefaultLayout";
import ProtectedRoute from "../layouts/ProtectedRoute";

export default function Main() {
  return (
    <Switch>
      <DefaultLayout exact path={ROUTES.HOME} component={Home} />
      <DefaultLayout exact path={ROUTES.SIGNUP} component={Signup} />
      <DefaultLayout exact path={ROUTES.REF_SIGNUP} component={Signup} />
      <DefaultLayout exact path={ROUTES.LOGIN} component={Login} />
      <DefaultLayout exact path={ROUTES.FAQ} component={Faq} />
      <DefaultLayout exact path={ROUTES.VISION} component={Vision} />
      <DefaultLayout exact path={ROUTES.CONVERGE} component={Converge} />
      <DefaultLayout exact path={ROUTES.CONOVERVIEW} component={Overview} />
      <ProtectedRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
      <ProtectedRoute exact path={ROUTES.WALLET} component={Wallet} />
      <ProtectedRoute exact path={ROUTES.PROFILE} component={Profile} />
      <ProtectedRoute exact path={ROUTES.SETTINGS} component={Settings} />
      <ProtectedRoute exact path={ROUTES.CONVERGEDASHBOARD} component={ConvergeDashboard} />
      <ProtectedRoute exact path={ROUTES.OVERVIEW} component={CampaignOverview} />
      <ProtectedRoute exact path={ROUTES.CREATE} component={Create} />
      <ProtectedRoute exact path={ROUTES.CONHOME} component={ConHome} />
      <DefaultLayout exact path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
      <DefaultLayout exact path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
      <DefaultLayout exact path={ROUTES.RESEND} component={ResendVerification} />
      <DefaultLayout exact path={ROUTES.VERIFY_EMAIL} component={VerifyEmail} />

      {/* <DefaultLayout exact path="/faq" component={FAQ} />
      <DefaultLayout exact path="/privacy" component={privacy} />
      <DefaultLayout exact path="/terms" component={terms} />
      <DefaultLayout exact path={ROUTES.VISION} component={vision} />
      <DefaultLayout exact path={ROUTES.RESET_PASSWORD} component={reset} />
      <DefaultLayout exact path={ROUTES.RESEND} component={resend} />
      <DefaultLayout exact path={ROUTES.VERIFY_EMAIL} component={verify} />
      */}
      <DefaultLayout component={NotFound} />
    </Switch>
  );
}
