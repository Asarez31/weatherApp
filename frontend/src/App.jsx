import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home.jsx";
import SignOut from "./components/SignOut.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import TestIcon from "./TestIcon";

function AppRoutes() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
      />
      <Route
        path="/register"
        element={isLoggedIn ? <Navigate to="/home" /> : <Register />}
      />
      <Route
        path="/home"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="/signout" element={<SignOut />} />
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
}

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <TestIcon />
      </div>
    </>
  );
}