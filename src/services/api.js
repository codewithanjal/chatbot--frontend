import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Resilience: Ensure the URL ends with /api if it's directed at Vercel or localhost
if (API_URL && !API_URL.endsWith('/api')) {
    API_URL = API_URL.replace(/\/$/, '') + '/api';
}

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
