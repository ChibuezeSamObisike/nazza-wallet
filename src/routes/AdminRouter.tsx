import { Suspense, lazy, Fragment, ReactNode } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "utils/auth";

interface IProps {
  component: React.LazyExoticComponent<() => JSX.Element> | Function;
  path: string;
  auth: boolean;
  layout?: typeof Fragment;
}

const AdminAuthGuard = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  if (!isAuthenticated("adminToken")) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} />;
  }
  return <div>{children}</div>;
};

export default function AdminGuard() {
  const routes: IProps[] = [
    {
      path: "",
      component: lazy(() => import("modules/Admin/Dashboard")),
      auth: true,
    },
    {
      path: "login/*",
      component: lazy(() => import("modules/Admin/Login")),
      auth: false,
    },
    {
      path: "login/:userId",
      component: lazy(() => import("modules/Admin/Login")),
      auth: false,
    },
    {
      path: "settings",
      component: lazy(() => import("modules/Admin/Settings")),
      auth: false,
    },
    {
      path: "orders",
      component: lazy(() => import("modules/Admin/Orders")),
      auth: true,
    },
    {
      path: "payout-history",
      component: lazy(() => import("modules/Admin/PayoutHistory")),
      auth: true,
    },
    {
      path: "customers",
      component: lazy(() => import("modules/Admin/Customers")),
      auth: true,
    },
    {
      path: "customers/:id",
      component: lazy(() => import("modules/Admin/TradeByUser")),
      auth: true,
    },
    {
      path: "wallet",
      component: lazy(() => import("modules/Admin/Wallet")),
      auth: true,
    },
    {
      path: "*",
      component: () => <h2>You see to be lost</h2>,
      auth: false,
    },
  ];
  return (
    <>
      <Routes>
        {routes.map(({ path, component: Component, auth }, index) => {
          const Parent = auth ? AdminAuthGuard : Fragment;
          return (
            <Route
              key={index}
              path={path}
              element={
                <Suspense fallback={<>Loading....</>}>
                  <Parent>
                    <Component />
                  </Parent>
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}
