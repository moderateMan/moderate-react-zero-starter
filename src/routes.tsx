import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Login, Center, NotFund } from "./pages";
type CutonFallBackT =
  | boolean
  | React.ReactChild
  | React.ReactFragment
  | React.ReactPortal
  | null;
type ChildT = React.LazyExoticComponent<() => JSX.Element>;

// 加载异步组件的loading
const SuspenseWrapper = (Child: ChildT, cutonFallBack?: CutonFallBackT) => {
  return (
    <React.Suspense fallback={cutonFallBack || <>...</>}>
      <Child />
    </React.Suspense>
  );
};
export default () => {
  return useRoutes([
    {
      path: "/center",
      element: SuspenseWrapper(Center),
      children: [
        {
          path: "/center",
          element: SuspenseWrapper(Center),
        },
      ],
    },
    {
      path: "/",
      element: SuspenseWrapper(Login),
    },
    {
      path: "/404",
      element: SuspenseWrapper(NotFund),
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};
