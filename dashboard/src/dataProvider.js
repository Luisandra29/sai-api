import apiClient from '@jodaz_/data-provider';

const providers = apiClient(`http://localhost:8000/api`, {
    withCredentials: true,
    offsetPageNum: 0
}, `sasi`);

export const dataProvider = providers.endpoints;

export const axios = providers.client;
