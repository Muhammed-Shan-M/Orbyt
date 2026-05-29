import { ROUTES } from '../constants/routes'

export const getDashboardRouteByRole = (role: string) => {
  switch (role) {
    case 'founder':
      return ROUTES.FOUNDER.DASHBOARD

    case 'investor':
      return ROUTES.INVESTOR.DASHBOARD

    case 'admin':
      return ROUTES.ADMIN.DASHBOARD

    default:
      return ROUTES.auth.LOGIN
  }
}