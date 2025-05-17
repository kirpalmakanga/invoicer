import axios from 'axios';

const instance = axios.create({
    baseURL: `https://api.invoicer.dev`,
});

function getAccessToken() {
    try {
        const serializedState = localStorage.getItem('auth');

        if (serializedState) {
            const {
                state: { accessToken },
            } = JSON.parse(serializedState);

            console.log({ accessToken });

            return accessToken;
        }

        return null;
    } catch (error) {
        return null;
    }
}

instance.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    console.log('useToken?', accessToken);

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

export default instance;
