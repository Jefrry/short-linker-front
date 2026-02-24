export enum AppRoutes {
  HOME = 'home',
  DASHBOARD = 'dashboard',
  LINK_DASHBOARD = 'link_dashboard',
}

export const getRouteHome = () => '/';
export const getRouteDashboard = () => '/dashboard';
export const getRouteLinkDashboard = (id: string) => `/dashboard/${id}`;

export const AppRoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: getRouteHome(),
  [AppRoutes.DASHBOARD]: getRouteDashboard(),
  [AppRoutes.LINK_DASHBOARD]: getRouteLinkDashboard(':id'),
};
