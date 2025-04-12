import { createContext, useEffect, useContext, ReactNode } from "react";

const ThemeContext = createContext({ toggleTheme: () => { } });

export function ThemeProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        document.documentElement.classList.add("dark");
    }, []);

    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;