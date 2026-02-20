import 'dotenv/config';
import axios from 'axios';

const baseURL = process.env.API_BASE_URL ?? 'http://localhost:4000';

export const api = axios.create({
  baseURL,
  timeout: 20_000
});
