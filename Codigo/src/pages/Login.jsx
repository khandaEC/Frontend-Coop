import React from 'react';
import BotonLogin from '../componentes/BotonLogin';

function Login() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Welcome</h2>
        <p className="text-center mb-6">
          Please log in to continue to the app and access all features.
        </p>
        <div className="space-y-4">
          <BotonLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;