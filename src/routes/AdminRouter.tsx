import { lazy } from "react";
import { RouteProps, Routes, Route } from "react-router-dom";
import { LazyLoad } from "./Router";

export default function AdminRouter() {
  const routes = [
    {
      path: "123",
      component: lazy(() => import("modules/Admin/Dashboard")),
      auth: false,
      layout: <></>,
    },
  ];
  return (
    <>
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
    </>
  );
}
