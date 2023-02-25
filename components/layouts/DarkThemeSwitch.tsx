import { Box, IconButton, useTheme } from "@mui/material";
import DarkIcon from "@mui/icons-material/Brightness4";
import LightIcon from "@mui/icons-material/Brightness7";
import React from "react";
import { ThemeContext } from "@/lib/theme/ThemeContext";

export const DarkThemeSwitch = () => {
  const theme = useTheme();
  const themeMode = React.useContext(ThemeContext);
  
  return (
    <>
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={themeMode.toggleThemeMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </>
  );
};
