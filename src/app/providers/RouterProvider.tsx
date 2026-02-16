import { BrowserRouter, Route, Routes } from 'react-router';

import { DashboardPage } from '@/views/dashboard';
import { HomePage } from '@/views/home';

interface RouterProviderProps {
  children?: React.ReactNode;
}

export const RouterProvider = ({ children }: RouterProviderProps) => (
  <BrowserRouter>
    {children}

    <main className="flex-1">
      <Routes>
        <Route element={<HomePage />} path="/" />

        <Route element={<DashboardPage />} path="/dashboard" />
      </Routes>
    </main>
  </BrowserRouter>
);
