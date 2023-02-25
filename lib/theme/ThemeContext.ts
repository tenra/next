import React from "react";

interface ThemeContextSchema {
    toggleThemeMode: () => void;
}

export const ThemeContext = React.createContext<ThemeContextSchema>(
    {} as ThemeContextSchema
);
