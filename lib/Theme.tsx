import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { usePaletteMode } from "@/recoil/paletteMode";

export const Theme = ({ children }: { children: ReactNode }) => {
    const [paletteMode, setPaletteMode] = usePaletteMode();

    const theme = createTheme({
        palette: {
            mode: paletteMode,
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
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            {children}
        </ThemeProvider>
    )
}
