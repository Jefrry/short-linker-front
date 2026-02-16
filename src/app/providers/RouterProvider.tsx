import { BrowserRouter, Route, Routes } from 'react-router';

import { HomePage } from '@/views/home';
import { DashboardPage } from '@/views/dashboard';

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
