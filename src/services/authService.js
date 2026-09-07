import api from "./api";


// ==========================================
// REGISTER
// ==========================================

const register = async (userData) => {

    const response =
        await api.post(
            "/auth/register",
            userData
        );

    return response.data;
};


// ==========================================
// LOGIN
// ==========================================

const login = async (credentials) => {

    const response =
        await api.post(
            "/auth/login",
            credentials
        );

    return response.data;
};


// ==========================================
// GET CURRENT USER
// ==========================================

const getMe = async () => {

    const response =
        await api.get(
            "/auth/me"
        );

    return response.data;
};


const authService = {
    register,
    login,
    getMe
};


export default authService;