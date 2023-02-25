import { ThemeOptions } from "@mui/material";

export const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: '#ff8e88',
    },
  },
  components: {
    MuiTextField: {
        styleOverrides: {
            root: {
                marginTop: 10,
                marginBottom: 10,
            },
        },
    },
  },
};
