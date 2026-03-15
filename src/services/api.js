import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const sendMessageToAPI = async (message, chatId = null) => {
    try {
        const response = await apiClient.post('/chat', { message, chatId });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
