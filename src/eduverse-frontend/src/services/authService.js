import apiClient from './apiClient';

export const login = async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const getUserProfile = async () => {
    const response = await apiClient.get('/auth/profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    const userProfileResponse = await apiClient.get(`/users/${response.data.user_id}/personal`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    return { ...response.data, profile_picture: userProfileResponse.data.profile_picture };
};