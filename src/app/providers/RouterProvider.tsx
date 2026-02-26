import { BrowserRouter, Route, Routes } from 'react-router';

import { DashboardPage } from '@/views/dashboard';
import { HomePage } from '@/views/home';
import { LinkDashboardPage } from '@/views/linkDashboard';
import { NotFoundPage } from '@/views/notFound';

import { AppRoutePaths } from '@/shared/config/routes';

interface RouterProviderProps {
  children?: React.ReactNode;
}

const routeConfig = [
  {
    path: AppRoutePaths.home,
    element: <HomePage />,
  },
  {
    path: AppRoutePaths.dashboard,
    element: <DashboardPage />,
  },
  {
    path: AppRoutePaths.linkDashboard,
    element: <LinkDashboardPage />,
  },
  {
    path: AppRoutePaths.notFound,
    element: <NotFoundPage />,
  },
];

export const RouterProvider = ({ children }: RouterProviderProps) => (
  <BrowserRouter>
    {children}

    <main className="flex-1">
      <Routes>
        {routeConfig.map(({ path, element }) => (
          <Route element={element} key={path} path={path} />
        ))}
      </Routes>
    </main>
  </BrowserRouter>
);
