import axios, { CreateAxiosDefaults } from "axios";

export const RequestService = <T = any>(config: CreateAxiosDefaults<T> = {}) =>
  axios.create({ ...config, baseURL: "http://localhost:3000" });
