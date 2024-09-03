import { lazy, Fragment, Suspense } from 'react';
import { Route, Outlet } from 'react-router-dom';
import { } from './paths';

export const renderRoutes = (routes) => {
  return routes.map((route, index) => {
    const Component = route.element ? lazy(() => route.element()) : Fragment;
    const Layout = route.layout ? lazy(() => route.layout()) : Fragment;
    const Guard = route.guard ? lazy(() => route.guard()) : Fragment;
    
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <Guard>
              <Layout>
                {route.children ? <Outlet /> : <Component />}
              </Layout>
            </Guard>
          </Suspense>
        }
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    )
  })
}

export const routes = [
  {
    path: "/",
    element: () => import('../pages/Dashboard'),
  },
  {
    layout: () => import('../layouts/AppLayout'),
    guard: () => import('../guards/AuthGuard'),
    children: [

    ]
  }
]

export default renderRoutes;