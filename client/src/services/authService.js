import axiosInstance from "../utils/axiosInstance";

export async function register(username, email, password) {
    const response = await axiosInstance.post('/auth/register', { username, email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
}

export async function login(username, email, password) {
    const response = await axiosInstance.post('/auth/login', { username, email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
}

export function logout() {
    localStorage.removeItem('token');
}
