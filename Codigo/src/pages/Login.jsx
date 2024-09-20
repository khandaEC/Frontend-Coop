import BotonNormal from '../componentes/Atomos/BotonNormal';
import { useAuth0 } from "@auth0/auth0-react";

function Login() {

  const { loginWithRedirect } = useAuth0();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm flex flex-col">
        <h2 className="text-2xl font-semibold text-center mb-4">Bienvenido</h2>
        <p className="text-center mb-6">
          Cooperativa de Ahorro y Crédito César Vásquez presione el botón para continuar.
        </p>
        <BotonNormal texto="Continuar" width="auto" height="40px" color="#233C5A" onClick={() => loginWithRedirect()}/>
      </div>
    </div>
  );
};

export default Login;