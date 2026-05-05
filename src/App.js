import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes.config";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  const getLayout = (layout) => {
    if (layout === "auth") return AuthLayout;
    if (layout === "dashboard") return DashboardLayout;
    return PublicLayout;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {routes.map((route, index) => {
          const Layout = getLayout(route.layout);
          const Page = route.component;

          if (route.routeType === "public") {
            return (
              <Route
                key={index}
                element={
                  <PublicRoute isAuthPage={route.isAuthPage}>
                    <Layout />
                  </PublicRoute>
                }
              >
                <Route path={route.path} element={<Page />} />
              </Route>
            );
          }

          return (
            <Route
              key={index}
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route path={route.path} element={<Page />} />
            </Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;