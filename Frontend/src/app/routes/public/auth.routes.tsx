import { Route } from 'react-router-dom';

import LoginPage from '../../../modules/auth/pages/LoginPage';
import SignupPage from '../../../modules/auth/pages/SignupPage';
import ForgotPasswordPage from '../../../modules/auth/pages/ForgotPasswordPage';
import VerifyEmailPage from '../../../modules/auth/pages/VerifyEmailPage';
import VerifyCodePage from '../../../modules/auth/pages/VerifyCodePage';
import ResetPasswordPage from '../../../modules/auth/pages/ResetPasswordPage';
import ResetSuccessPage from '../../../modules/auth/pages/ResetSuccessPage';

import { ROUTES } from '../../../shared/constants/routes';

export const authRoutes = (
  <>
    <Route
      path={ROUTES.AUTH.LOGIN}
      element={<LoginPage />}
    />

    <Route
      path={ROUTES.AUTH.SIGNUP}
      element={<SignupPage />}
    />

    <Route
      path={ROUTES.AUTH.FORGOT_PASSWORD}
      element={<ForgotPasswordPage />}
    />

    <Route
      path={ROUTES.AUTH.FORGOT_PASSWORD_VERIFY}
      element={<VerifyCodePage />}
    />

    <Route
      path={ROUTES.AUTH.FORGOT_PASSWORD_RESET}
      element={<ResetPasswordPage />}
    />

    <Route
      path={ROUTES.AUTH.FORGOT_PASSWORD_SUCCESS}
      element={<ResetSuccessPage />}
    />

    <Route
      path={ROUTES.AUTH.VERIFY_EMAIL}
      element={<VerifyEmailPage />}
    />
  </>
);