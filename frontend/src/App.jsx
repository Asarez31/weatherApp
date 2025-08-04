// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useMemo, useContext, useEffect } from "react";
import getTheme from "./theme";
// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home.jsx";
// Components
import SignOut from "./components/SignOut.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import ThemeToggle from "./components/ThemeToggle";
// Styles
import { ThemeProvider, CssBaseline } from "@mui/material";

function AppRoutes({ mode, toggleColorMode }) {
  const { isLoggedIn } = useContext(AuthContext);
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="min-h-screen min-w-screen flex-col"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
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
      </div>

      <ThemeToggle mode={mode} toggle={toggleColorMode} />
    </ThemeProvider>
  );
}

export default function App() {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  return (
    <BrowserRouter>
      <AppRoutes mode={mode} toggleColorMode={toggleColorMode} />
    </BrowserRouter>
  );
}
