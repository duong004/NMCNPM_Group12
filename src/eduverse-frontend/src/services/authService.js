import apiClient from './apiClient';

/*export const login = async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};*/

export const login = async (email, password) => {
    try {
        const response = await apiClient.post('/auth/login', { email, password });
        if (response.data.token) {
            console.log('Saving token:', response.data.token); // Thêm dòng này
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error; 
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

/*export const getUserProfile = async () => {
    const response = await apiClient.get('/profile', {
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
};*/

export const getUserProfile = async () => {
    const response = await apiClient.get('/profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};


// Hàm giải mã JWT
export const parseJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};
