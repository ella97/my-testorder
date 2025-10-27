import axios, { AxiosError } from 'axios';
import { MFS100Response } from '@/amaryllis-types';

export const config = {
  baseUrl: {
    secure: 'https://localhost:8003/mfs100/',
    nonSecure: 'http://localhost:8004/mfs100/',
  },
  useSecure: false,
};

const mfs100Api = axios.create({
  baseURL: config.useSecure ? config.baseUrl.secure : config.baseUrl.nonSecure,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

const handleAxiosError = (error: AxiosError): string => {
  if (!error.response) {
    return 'Service Unavailable';
  }

  switch (error.response.status) {
    case 404:
      return 'Requested endpoint not found';
    case 500:
      return 'Internal Server Error';
    default:
      return `Unhandled Error: ${error.message}`;
  }
};

export const getMFS100Data = async <T>(
  endpoint: string
): Promise<MFS100Response<T>> => {
  try {
    const response = await mfs100Api.get<T>(endpoint);
    return {
      httpStatus: true,
      data: response.data,
    };
  } catch (error) {
    return {
      httpStatus: false,
      error: handleAxiosError(error as AxiosError),
    };
  }
};

export const postMFS100Data = async <T, R>(
  endpoint: string,
  data: T
): Promise<MFS100Response<R>> => {
  try {
    const response = await mfs100Api.post<R>(endpoint, data);
    return {
      httpStatus: true,
      data: response.data,
    };
  } catch (error) {
    return {
      httpStatus: false,
      error: handleAxiosError(error as AxiosError),
    };
  }
};