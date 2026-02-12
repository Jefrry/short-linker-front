import { BrowserRouter, Route, Routes } from 'react-router';

import { HomePage } from '@/views/home';

interface RouterProviderProps {
  children?: React.ReactNode;
}

export const RouterProvider = ({ children }: RouterProviderProps) => (
  <BrowserRouter>
    <main className="flex-1">
      <Routes>
        <Route element={<HomePage />} path="/" />
      </Routes>
    </main>

    {children}
  </BrowserRouter>
);
