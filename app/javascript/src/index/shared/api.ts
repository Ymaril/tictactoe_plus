import { createContext, useContext } from "react";
import { AxiosInstance } from "axios";
import api from "src/api";

export const ApiContext = createContext(api);

export function useApi(): AxiosInstance {
  return useContext(ApiContext);
}
