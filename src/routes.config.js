import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import DashboardHome from "./pages/Dashboard";
import ExampleListPage from "./pages/ExampleList";

const routes = [
  {
    path: "/login",
    component: Login,
    routeType: "public",
    isAuthPage: true,
    layout: "auth",
    title: "Login",
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    routeType: "public",
    isAuthPage: true,
    layout: "auth",
    title: "Forgot Password",
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    routeType: "public",
    isAuthPage: true,
    layout: "auth",
    title: "Reset Password",
  },
  {
    path: "/dashboard",
    component: DashboardHome,
    routeType: "private",
    layout: "dashboard",
    title: "Dashboard",
  },
  {
    path: "/dashboard/examples",
    component: ExampleListPage,
    routeType: "private",
    layout: "dashboard",
    title: "Example List",
  },
];

export default routes;