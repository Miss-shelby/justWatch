import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Redirect } from "expo-router";
import { signOutGlobal } from "@/context/AuthContext";

interface AccessToken {
  token: string;
  type: string;
  expires_in: string;
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL + "/v1";


const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
  },
});

// Request interceptor - attach token before every request
httpClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access_token");

    // console.log(token,'token string from api fetcher ');
    // Don't attach token to login/register endpoints
    if (!config.url?.includes('/auth/login') && !config.url?.includes('/auth/register')) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    // console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - return data directly
httpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async  (error) => {
    // console.log(error.response,'raw error from config');
    const status = error.response?.status;
    const message = error.response?.data?.message;
    // console.log(message,'config error message ');
    // console.log(status,'error status');
    
    
    // Handle token expiration (401 or 400 with expired message)
    if (status === 401 || (status === 400 && message?.includes('Token Invalid'))) {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("refresh_token");
      Alert.alert('Session Expired', 'Please login again');
      signOutGlobal(); // This triggers isSignedIn = false
    //  return <Redirect href= '/(auth)/signIn' />
    }
    return Promise.reject(error);
  }
);

export default httpClient;