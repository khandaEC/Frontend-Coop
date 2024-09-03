import { useEffect } from "react";
import { authService } from "../services/authServices";
import { useNavigate } from "react-router-dom";

export function AuthProvider({ children }) {

  return (
    <>
      {children}
    </>
  )
}