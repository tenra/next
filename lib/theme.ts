import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
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
