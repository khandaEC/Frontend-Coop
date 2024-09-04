import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return <button className="w-full py-2 border rounded-xl text-white bg-green p-2 w-3/4" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;