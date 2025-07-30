// src/components/ThemeToggle.jsx
import { IconButton, Paper, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { styled } from "@mui/material/styles";

const FloatingToggle = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: 24,
  right: 24,
  zIndex: 1000,
  borderRadius: "50%",
  padding: 6,
  boxShadow: theme.shadows[6],
  backgroundColor: theme.palette.background.paper,
  animation: "slideIn 0.4s ease-out",
  "@keyframes slideIn": {
    from: {
      opacity: 0,
      transform: "translateY(30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

export default function ThemeToggle({ mode, toggle }) {
  return (
    <FloatingToggle>
      <Tooltip title="Toggle dark/light mode" placement="left">
        <IconButton onClick={toggle} color="inherit" size="large">
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Tooltip>
    </FloatingToggle>
  );
}