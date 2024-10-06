export const URLS = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
};

export const BASE_API_URL = 'https://automaticityacademy.ngrok.app/api/v1/auth';

export const END_POINTS = {
  BASE_API_URL,
  REGISTER_ENDPOINT: `${BASE_API_URL}${URLS['REGISTER']}`,
  LOGIN_ENDPOINT: `${BASE_API_URL}${URLS['LOGIN']}`,
  DASHBOARD_ENDPOINT: `${BASE_API_URL}${URLS['DASHBOARD']}`,
};
