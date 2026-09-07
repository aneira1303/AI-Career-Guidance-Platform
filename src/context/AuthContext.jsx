import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import authService
    from "../services/authService";


const AuthContext =
    createContext(null);


export const AuthProvider = ({
    children
}) => {

    const [user, setUser] =
        useState(() => {

            const storedUser =
                localStorage.getItem(
                    "user"
                );

            return storedUser
                ? JSON.parse(storedUser)
                : null;
        });


    const [token, setToken] =
        useState(() => {

            return localStorage.getItem(
                "token"
            );
        });


    const [loading, setLoading] =
        useState(true);


    // ======================================
    // CHECK LOGIN
    // ======================================

    useEffect(() => {

        const checkAuth =
            async () => {

                const storedToken =
                    localStorage.getItem(
                        "token"
                    );

                if (!storedToken) {

                    setLoading(false);

                    return;
                }

                try {

                    const response =
                        await authService.getMe();

                    const currentUser =
                        response.data;

                    setUser(
                        currentUser
                    );

                    localStorage.setItem(
                        "user",
                        JSON.stringify(
                            currentUser
                        )
                    );

                } catch (error) {

                    console.error(
                        "Authentication check failed:",
                        error
                    );

                    logout();

                } finally {

                    setLoading(false);

                }
            };


        checkAuth();

    }, []);


    // ======================================
    // REGISTER
    // ======================================

    const register = async (
        userData
    ) => {

        const response =
            await authService.register(
                userData
            );

        const {
            user,
            token
        } = response.data;

        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setToken(token);

        setUser(user);

        return response;

    };


    // ======================================
    // LOGIN
    // ======================================

    const login = async (
        credentials
    ) => {

        const response =
            await authService.login(
                credentials
            );

        const {
            user,
            token
        } = response.data;

        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setToken(token);

        setUser(user);

        return response;

    };


    // ======================================
    // LOGOUT
    // ======================================

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        setToken(null);

        setUser(null);

    };


    const value = {

        user,

        token,

        loading,

        isAuthenticated:
            Boolean(token && user),

        register,

        login,

        logout

    };


    return (

        <AuthContext.Provider
            value={value}
        >

            {children}

        </AuthContext.Provider>

    );

};


export const useAuthContext = () =>
    useContext(AuthContext);