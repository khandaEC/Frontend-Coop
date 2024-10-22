import { useAuth0 } from "@auth0/auth0-react"
import { Navigate } from "react-router-dom";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function AuthGuard({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className='flex flex-col items-center justify-center h-screen'>
      <Spin indicator={<LoadingOutlined spin />} size="large" ></Spin>
      <span className='ml-2'>Cargando...</span>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;

}

export default AuthGuard