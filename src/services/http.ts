import axios, { AxiosInstance } from 'axios';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

const MAIN_URL: string = `http://192.168.1.11:5113`;

const SERVER_IP: string | undefined = process.env.NEXT_PUBLIC_SERVER_IP;

// console.log('LIVE URL HERE', SERVER_IP);
const http: AxiosInstance = axios.create({
  baseURL: `${SERVER_IP}/api/`,
  headers: {
    Accept: 'application/json',
  },
});

http.interceptors.request.use((request: any) => {
  //console.log(`REQUEST: ${request}`)
  return request;
});

http.interceptors.response.use(
  (response: any) => {
    //console.log(`RESPONSE: ${response}`)
    if (response.data?.code == 401) {
      //LOGOUT USER
      // location.pathname = '/';
      signOut({ redirect: false }).then(() => {
        location.pathname = '/login';
      });
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      console.log(`Please check your Internet connection`);
      // toast.error('Please check your Internet connection');
    }
    if (error.response.status === 401) {
      // location.pathname = '/';
      signOut({ redirect: false }).then(() => {
        location.pathname = '/login';
      });
      // console.log(`401 Error: ${error}`);
    }

    return Promise.reject(error);
  }
);

export default http;