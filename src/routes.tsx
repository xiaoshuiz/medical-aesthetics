import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Booking } from './pages/Booking';
import { BookingConfirm } from './pages/BookingConfirm';
import { BookingSuccess } from './pages/BookingSuccess';
import { History } from './pages/History';
import { Membership } from './pages/Membership';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'booking',
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        ),
      },
      {
        path: 'booking/confirm',
        element: (
          <ProtectedRoute>
            <BookingConfirm />
          </ProtectedRoute>
        ),
      },
      {
        path: 'booking/success',
        element: (
          <ProtectedRoute>
            <BookingSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: 'history',
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        ),
      },
      {
        path: 'membership',
        element: (
          <ProtectedRoute>
            <Membership />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
