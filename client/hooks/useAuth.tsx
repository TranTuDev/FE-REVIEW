"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    token: string | null;
    user: string | null;
    loading: boolean;
    login: (token: string, email: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedEmail = localStorage.getItem("email");

        setToken(savedToken);
        setUser(savedEmail);
        setLoading(false);
    }, []);

    const login = (token: string, email: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);

        document.cookie = `token=${token}; path=/`;

        setToken(token);
        setUser(email);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");

        document.cookie =
            "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
