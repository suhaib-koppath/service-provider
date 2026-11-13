import ForgotPasswordPage from '../pages/ForgotPasswordPage.jsx'
import LoadingPage from '../pages/LoadingPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import MarketplacePage from '../pages/MarketplacePage.jsx'
import { AdminDashboard, AdminGuard, AdminLoginPage, AdminNotFound, AdminSection } from '../pages/AdminPage.jsx'

const routes = [
  { path: '/home', element: <MarketplacePage page="home" /> },
  { path: '/services', element: <MarketplacePage page="services" /> },
  { path: '/services/:slug', element: <MarketplacePage page="detail" /> },
  { path: '/about', element: <MarketplacePage page="about" /> },
  { path: '/contact', element: <MarketplacePage page="contact" /> },
  { path: '/become-provider', element: <MarketplacePage page="provider" /> },
  { path: '/faq', element: <MarketplacePage page="faq" /> },
  { path: '/reviews', element: <MarketplacePage page="reviews" /> },
  { path: '/terms', element: <MarketplacePage page="terms" /> },
  { path: '/privacy', element: <MarketplacePage page="privacy" /> },
  { path: '/404', element: <MarketplacePage page="not-found" /> },
  { path: '/admin/login', element: <AdminLoginPage /> },
  {
    path: '/admin',
    element: <AdminGuard />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: ':section', element: <AdminSection /> },
      { path: '*', element: <AdminNotFound /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/',
    element: <LoadingPage />,
  },
  {
    path: '*',
    element: <MarketplacePage page="not-found" />,
  },
]

export default routes
