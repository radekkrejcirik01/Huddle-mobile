import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchError, defer, map, Observable, of } from 'rxjs';
import { axiosInstance } from '@utils/Axios/Axios.instance';

const catchErrorFunction = (error: AxiosError) => {
    console.error(error);
    return of(null);
};

export const getRequest = <T>(
    endpoint: string,
    id: number,
    config?: AxiosRequestConfig
): Observable<T> =>
    defer(() =>
        axiosInstance.get(
            `https://w2gdfxt8dc.execute-api.eu-central-1.amazonaws.com/${endpoint}${id}`,
            config
        )
    ).pipe(
        map((result: AxiosResponse<T>) => result.data),
        catchError((err: AxiosError) => catchErrorFunction(err))
    );

export const postRequest = <T, B>(
    endpoint: string,
    data: B,
    config?: AxiosRequestConfig
): Observable<T> =>
    defer(() => axiosInstance.post(endpoint, data, config)).pipe(
        map((result: AxiosResponse<T>) => result.data),
        catchError((err: AxiosError) => catchErrorFunction(err))
    );

export const updateRequest = <T, B>(
    endpoint: string,
    data: B,
    config?: AxiosRequestConfig
): Observable<T> =>
    defer(() =>
        axiosInstance.put(
            `https://w2gdfxt8dc.execute-api.eu-central-1.amazonaws.com/${endpoint}`,
            data,
            config
        )
    ).pipe(
        map((result: AxiosResponse<T>) => result.data),
        catchError((err: AxiosError) => catchErrorFunction(err))
    );
