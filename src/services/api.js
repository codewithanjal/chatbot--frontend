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
    const maxRetries = 3;
    let delay = 1000; // Start with 1s delay

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await apiClient.post('/chat', { message, chatId });
            return response.data;
        } catch (error) {
            const isRetryable = error.response && (error.response.status === 503 || error.response.status === 429);
            const isNetworkError = !error.response;

            if ((isRetryable || isNetworkError) && i < maxRetries - 1) {
                console.warn(`API Attempt ${i + 1} failed. Retrying in ${delay}ms...`, error.message);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff
                continue;
            }
            
            console.error('API Error:', error);
            throw error;
        }
    }
};
