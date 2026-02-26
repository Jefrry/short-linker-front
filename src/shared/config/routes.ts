export enum AppRoutes {
  HOME = 'home',
  DASHBOARD = 'dashboard',
  LINK_DASHBOARD = 'linkDashboard',
  NOT_FOUND = 'notFound',
}

export const ROUTE_HOME = '/';
export const ROUTE_DASHBOARD = '/dashboard';
export const getRouteLinkDashboard = (id: string) => `/dashboard/${id}`;
export const ROUTE_NOT_FOUND = '*';

export const AppRoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: ROUTE_HOME,
  [AppRoutes.DASHBOARD]: ROUTE_DASHBOARD,
  [AppRoutes.LINK_DASHBOARD]: getRouteLinkDashboard(':id'),
  [AppRoutes.NOT_FOUND]: ROUTE_NOT_FOUND,
};
