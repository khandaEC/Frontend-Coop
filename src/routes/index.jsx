import { lazy, Fragment, Suspense } from 'react';
import { Route, Outlet } from 'react-router-dom';
import { PATH_INTERES_SOCIOS, PATH_CREDITOS, PATH_AHORROS, PATH_APORTE_SOCIOS } from './paths';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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
          <Suspense
            fallback={
              <div className='flex flex-col items-center justify-center h-screen'>
                <Spin indicator={<LoadingOutlined spin />} size="large" ></Spin>
                <span className='ml-2'>Cargando...</span>
              </div>
            }>
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
    path: "/login",
    element: () => import('../pages/Login'),
  },
  {
    layout: () => import('../layouts/AppLayout'),
    guard: () => import('../guards/AuthGuard'),
    children: [
      {
        path: "/",
        element: () => import('../pages/Dashboard'),
      },
      {
        path: PATH_AHORROS,
        element: () => import('../pages/Ahorros'),
      },
      {
        path: PATH_CREDITOS,
        element: () => import('../pages/Creditos'),
      },
      {
        path: PATH_INTERES_SOCIOS,
        element: () => import('../pages/InteresSocios'),
      },
      {
        path: PATH_APORTE_SOCIOS,
        element: () => import('../pages/AporteSocios'),
      },
      {
        path: `${PATH_CREDITOS}/:idCredito`,
        element: () => import('../componentes/AmortizationTable'),
      }
    ]
  }
]

export default renderRoutes;