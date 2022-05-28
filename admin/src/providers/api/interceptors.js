export default (instance, tokenName) => {
    // Request interceptor
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem(tokenName);

            const newConfig = config;

            // When a 'token' is available set as token.
            if (token) {
                newConfig.headers.Authorization = `${token}`;
            }

            return newConfig;
        },
        (err) => Promise.reject(err),
    );
};
