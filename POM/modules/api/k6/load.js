import http from 'k6/http';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { check } from 'k6';

export const options = {
  stages: [{ duration: '10s', target: 200 }],
};

export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data),
  };
}

const tokens = new SharedArray('Token data', function () {
  return JSON.parse(
    open('/home/academy-06/Desktop/playwrightProject/fixtures/tokens.json')
  );
});

export default function () {
  const tokenData = tokens[randomIntBetween(0, 2)];
  const url = 'https://automaticityacademy.ngrok.app/api/v1/products/';

  const params = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${tokenData}`,
    },
  };

  let req = http.get(url, params);
  check(req, {
    'status is 200': r => r.status === 200,
  });
}
