import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// sending access token in the header
// The request interceptor is used here to modify the request before it is sent to the server.
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// extend the life span of access token with the help refresh.
//This part of the code sets up an Axios response interceptor that handles 401 Unauthorized errors by attempting to refresh the access token when it expires.
Axios.interceptors.request.use(
  (res) => {
    return res;
  },
  async (error) => {
    let originRequest = error.config;

    if (error.response.status === 401 && !originRequest.retry) {
      originRequest.retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);

        if (newAccessToken) {
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios({
      ...SummaryApi.refreshToken,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const accessToken = response.data.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export default Axios;
