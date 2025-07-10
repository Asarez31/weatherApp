import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function SignOut() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // clear token and auth state
    navigate("/login"); // redirect to login page
  }, [logout, navigate]);

  return null; // no UI needed for sign out
}
