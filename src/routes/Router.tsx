import React, { ReactElement, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "shared/Loader";
import NavLayOut from "shared/layout/NavLayOut";
import ReferalLayout from "shared/layout/ReferalLayout";

interface IRoute {
  path: string;
  component: React.Component | ReactElement | JSX.Element | Function;
  auth: boolean;
  layout?: React.Component | ReactElement | JSX.Element | Function;
}

const routes: IRoute[] = [
  {
    path: "/",
    component: lazy(() => import("modules/Dasboard")),
    auth: false,
    layout: NavLayOut,
  },
  {
    path: "/wallet",
    component: lazy(() => import("modules/Wallet")),
    auth: false,
    layout: NavLayOut,
  },
  {
    path: "/referrals",
    component: lazy(() => import("modules/Refferals")),
    auth: false,
    layout: ReferalLayout,
  },
  {
    path: "kyc-sidebar",
    component: lazy(() => import("modules/Sidebar")),
    auth: false,
  },
  {
    path: "*",
    component: () => <h1>Seems you are lost</h1>,
    auth: false,
  },
];

const LazyLoad = ({
  component: Component,
  layout: Layout,
}: {
  component: any;
  layout: any;
}) => {
  const MainLayout = Layout ?? React.Fragment;
  return (
    <Suspense fallback={<Loader />}>
      <MainLayout>
        <Component />
      </MainLayout>
    </Suspense>
  );
};

export default function AppRouter() {
  return (
    <Routes>
      {routes.map((rout) => (
        <Route
          path={rout.path}
          element={<LazyLoad component={rout.component} layout={rout.layout} />}
        />
      ))}
    </Routes>
  );
}
