import React from 'react'
import { Navigate, useRoutes } from "react-router-dom";
import { Login, Center } from './pages'

const SuspenseWrapper = (Child: React.LazyExoticComponent<() => JSX.Element>) => {
    return <React.Suspense fallback={<>...</>}>
        <Child />
    </React.Suspense>
}
export default () => {
    return useRoutes([
        {
            path: "/center",
            element: SuspenseWrapper(Center),
            children:[
                {
                    path: "/center",
                    element: SuspenseWrapper(Center),
                }
            ]
        },
        {
            path: "/",
            element: SuspenseWrapper(Center)
        },
        {
            path: "/404",
            element: <div>404</div>
        },
        { path: "*", element: <Navigate to="/404" replace /> }
    ])
}