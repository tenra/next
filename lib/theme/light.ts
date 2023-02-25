import { ThemeOptions } from "@mui/material";

export const lightTheme: ThemeOptions = {
    palette: {
        mode: "light",
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
