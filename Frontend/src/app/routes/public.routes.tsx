import { Route } from "react-router-dom";

import PublicRoute from "../guards/PublicRoute";

import LandingPage from "../../modules/auth/pages/LandingPage";
import LoginPage from "../../modules/auth/pages/LoginPage";
import SignupPage from "../../modules/auth/pages/SignupPage";
import VerifyEmailPage from "../../modules/auth/pages/VerifyEmailPage";
import ForgotPasswordPage from "../../modules/auth/pages/ForgotPasswordPage";
import VerifyCodePage from "../../modules/auth/pages/VerifyCodePage";
import ResetPasswordPage from "../../modules/auth/pages/ResetPasswordPage";
import ResetSuccessPage from "../../modules/auth/pages/ResetSuccessPage";

import { ROUTES } from "../../shared/constants/routes";

export const publicRoutes = (
    <>
        <Route element={<PublicRoute />}>
            <Route
                path={ROUTES.auth.LOGIN}
                element={<LoginPage />}
            />

            <Route
                path={ROUTES.auth.SIGNUP}
                element={<SignupPage />}
            />

            <Route
                path={ROUTES.auth.FORGOT_PASSWORD}
                element={<ForgotPasswordPage />}
            />

            <Route
                path={ROUTES.auth.FORGOT_PASSWORD_VERIFY}
                element={<VerifyCodePage />}
            />

            <Route
                path={ROUTES.auth.FORGOT_PASSWORD_RESET}
                element={<ResetPasswordPage />}
            />

            <Route
                path={ROUTES.auth.FORGOT_PASSWORD_SUCCESS}
                element={<ResetSuccessPage />}
            />

            <Route
                path={ROUTES.auth.VERIFY_EMAIL}
                element={<VerifyEmailPage />}
            />

            <Route
                path={ROUTES.public.LANDING}
                element={<LandingPage />}
            />

        </Route>





    </>
);






