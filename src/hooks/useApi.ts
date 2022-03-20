import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        /* Resposta fake (pois a api não e verdadeira) */
        return {
            user: {id: 3, name: 'José', email: 'jose@gmail.com'}
        };

        const response = await api.post('/signin', { token })
        return response.data;
    },
    signin: async (email: string, password: string) => {
        /* Resposta fake (pois a api não e verdadeira) */
        return {
            user: {id: 3, name: 'José', email: 'jose@gmail.com'},
            token: 'bxncb6yuwywb55535dcbnbnf'
        };

        const response = await api.post('/signin', { email, password })
        return response.data;
    },
    logout: async () => {
        /* Resposta fake (pois a api não e verdadeira) */
        return { status : true };
        
        const response = await api.post('/logout')
        return response.data;
    }
})