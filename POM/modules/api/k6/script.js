import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 200 },
    { duration: '15s', target: 250 },
    { duration: '20s', target: 300 },
  ],
};
export default function () {
  const url = 'https://automaticityacademy.ngrok.app/api/v1/auth/login';
  const payload = JSON.stringify({
    email: 'aleksatester@gmail.com',
    password: 'test123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  let res = http.post(url, payload, params);
  check(res, { 'status was 200': r => r.status === 200 });
}

// export function handleSummary(data) {
//   return {
//     'summary.json': JSON.stringify(data), //the default data object
//   };
// }
