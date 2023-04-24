import { Suspense, lazy, Fragment } from "react";
import { Routes, Route } from "react-router-dom";

interface IProps {
  component: React.LazyExoticComponent<() => JSX.Element>;
  path: string;
  auth: boolean;
  layout?: typeof Fragment;
}

export default function AdminRouter() {
  const routes: IProps[] = [
    {
      path: "123",
      component: lazy(() => import("modules/Admin/Dashboard")),
      auth: false,
    },
  ];
  return (
    <>
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route
            path={path}
            element={
              <Suspense fallback={<>Loading....</>}>
                <Component />
              </Suspense>
            }
          />
        ))}
      </Routes>
    </>
  );
}
