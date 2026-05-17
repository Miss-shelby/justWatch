import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  },
});

// Request interceptor - attach token before every request
httpClient.interceptors.request.use(
  async (config) => {
    const accessTokenString = await AsyncStorage.getItem("access_token");
    let accessTokenObject: AccessToken | null = null;

    if (accessTokenString) {
      accessTokenObject = JSON.parse(accessTokenString);
    }

    if (accessTokenObject) {
      config.headers.Authorization = `Bearer ${accessTokenObject.token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - return data directly
httpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpClient;