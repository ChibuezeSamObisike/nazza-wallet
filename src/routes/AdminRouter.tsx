import { Suspense, lazy, Fragment, ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

interface IProps {
  component: React.LazyExoticComponent<() => JSX.Element>;
  path: string;
  auth: boolean;
  layout?: typeof Fragment;
}

const AdminAuthGuard = ({ children }: { children: ReactNode }) => {
  let notAuth = true;
  if (notAuth) {
    return <Navigate to='/admin-login' />;
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
