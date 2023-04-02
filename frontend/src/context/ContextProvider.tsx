import React, { useState, useContext, createContext, ReactNode } from "react";

interface IAddContext {
  add: boolean;
  setadd: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddContext = createContext<IAddContext>({ add: false, setadd: () => {} });

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [add, setadd] = useState<boolean>(false);

  const value = { add, setadd };
  return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
};

export default ContextProvider;
