import { createContext, useContext } from "react";

export const CableContext = createContext({});

export function useCable(): any {
  return useContext(CableContext);
}
