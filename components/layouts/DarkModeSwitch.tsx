import React, { useState, useEffect } from "react";
import { usePaletteMode } from "@/recoil/paletteMode";

import { Box, Switch } from "@mui/material";

export const DarkModeSwitch = () => {
  const [paletteMode, setPaletteMode] = usePaletteMode();
  const [isDarkMode, setIsDarkMode] = useState(paletteMode === 'dark');

  useEffect(() => {
      setIsDarkMode(paletteMode === 'dark');
  }, [paletteMode]);

  const handleChangePaletteMode =(event: React.ChangeEvent<HTMLInputElement>) => {
      const paletteMode = event.target.checked ? 'dark' : 'light';
      setPaletteMode(paletteMode);
      setIsDarkMode(event.target.checked);
  };
  
  return (
    <Box>
        ダークモード
        <Switch checked={isDarkMode} onChange={handleChangePaletteMode} />
    </Box>
  );
};
