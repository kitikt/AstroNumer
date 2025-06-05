/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-empty */
import axios, { AxiosRequestConfig } from 'axios';

export interface FetchResponse<T> {
    success: boolean;
    data: T[];
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

axios.interceptors.response.use(async (res: any) => {
    if (res.status === 401) {
        try {
            const api = new ApiClient<any>('/auth/refresh-token');
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await api.postUnauthen({ refreshToken });
            if (response.success) {
                localStorage.setItem('access_token', response.data.token);
                localStorage.setItem('refresh_token', response.data.refreshToken);
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        return res;
    }
});

class ApiClient<T> {
    endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    setAuthHeader = (config?: AxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            return {
                ...config,
                headers: {
                    ...config?.headers,
                    'Authorization': `Bearer ${token}`
                }
            };
        }
        return config;
    };

    postUnauthen = (data: T, config?: AxiosRequestConfig) => {
        return axiosInstance
            .post<T>(this.endpoint, data, config)
            .then((res) => res.data)
    }

    getUnauthen = (config?: AxiosRequestConfig) => {
        return axiosInstance
            .get<T>(this.endpoint, config)
            .then((res) => res.data);
    };

    getAuthen = (config?: AxiosRequestConfig) => {
        return axiosInstance
            .get<T>(this.endpoint, this.setAuthHeader(config))
            .then((res) => res.data)
    }

    getDetailUnauthen = (id: string, config?: AxiosRequestConfig) => {
        return axiosInstance
            .get<T>(this.endpoint + '/' + id, config)
            .then((res) => res.data)
    }

    getDetail = (id: string, config?: AxiosRequestConfig) => {
        return axiosInstance
            .get<T>(this.endpoint + '/' + id, this.setAuthHeader(config))
            .then((res) => res.data)
    }

    create = (data: T, config?: AxiosRequestConfig) => {
        return axiosInstance
            .post<T>(this.endpoint, data, this.setAuthHeader(config))
            .then((res) => res.data)
    }

    createWithId = (id: string, config?: AxiosRequestConfig) => {
        return axiosInstance
            .post<T>(this.endpoint + '/' + id, {}, this.setAuthHeader(config))
            .then((res) => res.data)
    }

    createWithIdAndData = (id: string, data: T, config?: AxiosRequestConfig) => {
        return axiosInstance
            .post<T>(this.endpoint + '/' + id, data, this.setAuthHeader(config))
            .then((res) => res.data)
    }

    update = (data: T, config?: AxiosRequestConfig) => {
        return axiosInstance
            .put<T>(this.endpoint, data, this.setAuthHeader(config))
            .then((res) => res.data)
    }

    updateWithId = (id: string, config?: AxiosRequestConfig) => {
        return axiosInstance
            .put<T>(this.endpoint + '/' + id, {}, this.setAuthHeader(config))
            .then((res) => res.data)
    }

    updateWithIdAndData = (id: string, data: T, config?: AxiosRequestConfig) => {
        return axiosInstance
            .put<T>(this.endpoint + '/' + id, data, this.setAuthHeader(config))
            .then((res) => res.data)
    }

    delete = (id: string, config?: AxiosRequestConfig) => {
        return axiosInstance
            .delete<T>(this.endpoint + '/' + id, this.setAuthHeader(config))
            .then((res) => res.data)
    }

    patchStatus = (id: string, status: string, config?: AxiosRequestConfig) => {
        return axiosInstance
            .patch<T>(this.endpoint + '/' + id + '/' + status, this.setAuthHeader(config))
            .then((res) => res.data);
    }
}

export default ApiClient;
