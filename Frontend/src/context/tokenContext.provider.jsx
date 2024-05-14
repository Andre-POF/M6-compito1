import React, { createContext } from "react";
import { useState } from "react";

export const TokenContext = createContext(null);

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState("");
  const value = {
    token,
    setToken,
  };
  return (
    <>
      <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
    </>
  );
}
