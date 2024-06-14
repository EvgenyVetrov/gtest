import { boot } from 'quasar/wrappers'
import axios from 'axios'
function getAccessToken() {
  return localStorage.getItem('accessToken');
}
function setAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

const baseUrl = 'http://zakupator.loc:49070/api';

const api = axios.create({ baseURL: baseUrl, withCredentials: true })

// Функция для повторной отправки запроса и установки нового accessToken
async function retryRequest(error) {
  const originalRequest = error.config;
  originalRequest._retry = true;
  setAccessToken(error.response.data.newToken);
  originalRequest.headers.Authorization = `Bearer ${error.response.data.newToken}`;
  console.log('error.response.data', error.response.data);
  return api(originalRequest);
}

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const originalRequest = error.config;
  if (error.response && error.response.status === 401 && !originalRequest._retry && error.response.data.code === 'access_token_expired') {
    return retryRequest(error);
  }
  return Promise.reject(error);
});


export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { axios, api }