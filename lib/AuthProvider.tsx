"use client";

import React, {
    useContext,
    useState,
    ReactNode,
    createContext,
    useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { logoutUser } from "./api/postMethods";
import { useToast } from "@/components/ui/toast-context";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (userData: User) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<null | User>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { setErrorMsg } = useToast();

    useEffect(() => {
        try {
            const userData = localStorage.getItem("userData");
            if (userData) {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem("userData");
        }
        setIsLoading(false);
    }, []);

    const login = async (userData: User) => {
        const data = {
            ...userData,
            access_token: undefined,
        };

        setUser(userData);
        localStorage.setItem("userData", JSON.stringify(data));

        setTimeout(() => {
            router.push("/");
            router.refresh();
        }, 100);
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            setErrorMsg(
                error instanceof Error ? error.message : "Error logging out"
            );
            console.error("Error logging out:", error);
        }

        setUser(null);
        localStorage.removeItem("userData");
        router.push("/auth");
        router.refresh();
    };

    const value = {
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}
