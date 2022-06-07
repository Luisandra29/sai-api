import defaultAxios from 'axios';
import interceptors from './interceptors';
import CONFIG_NAMES from '../../configs'

const instance = defaultAxios.create({
    baseURL: CONFIG_NAMES.SOURCE,
});

interceptors(instance, CONFIG_NAMES.AUTH_TOKEN);

export const axios = instance
