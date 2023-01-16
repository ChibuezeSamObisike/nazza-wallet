import React, { ReactElement, Suspense, lazy } from "react";

import { Route, Routes } from "react-router-dom";

import Loader from "shared/Loader";

import AuthGuard from "./AuthGuard";

import NavLayOut from "shared/layout/NavLayOut";
import ReferalLayout from "shared/layout/ReferalLayout";
import SignInLayout from "shared/layout/SignInLayout";

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
    auth: true,
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
    path: "create-account",
    component: lazy(() => import("modules/SignIn/CreateAccount")),
    layout: SignInLayout,
    auth: false,
  },
  {
    path: "login",
    component: lazy(() => import("modules/SignIn/Login")),
    layout: SignInLayout,
    auth: false,
  },
  {
    path: "logout",
    component: lazy(() => import("modules/SignIn/Logout")),
    auth: false,
  },
  {
    path: "verify",
    component: lazy(() => import("modules/SignIn/VerifyEmail")),
    layout: SignInLayout,
    auth: false,
  },
  {
    path: "account-setup",
    component: lazy(() => import("modules/SignIn/AccountSetUp")),
    layout: SignInLayout,
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
  auth,
}: {
  component: any;
  layout: any;
  auth: boolean;
}) => {
  const MainLayout = Layout ?? React.Fragment;
  const AuthLayout = auth ? AuthGuard : React.Fragment;
  return (
    <Suspense fallback={<Loader />}>
      <AuthLayout>
        <MainLayout>
          <Component />
        </MainLayout>
      </AuthLayout>
    </Suspense>
  );
};

export default function AppRouter() {
  return (
    <Routes>
      {routes.map((rout) => (
        <Route
          path={rout.path}
          element={
            <LazyLoad
              component={rout.component}
              layout={rout.layout}
              auth={rout.auth}
            />
          }
        />
      ))}
    </Routes>
  );
}
