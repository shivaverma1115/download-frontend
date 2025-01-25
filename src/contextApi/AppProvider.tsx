"use client";
import React, { createContext, useState } from "react";
import { AppContextType, IUser } from "@/interface/interFace";

export const AppContext = createContext<AppContextType | undefined>(undefined);
const AppProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<IUser>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const contextValue: AppContextType = {
    user,
    setUser,
    setLoggedIn,
    setLoading,
    loading,
    loggedIn,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;

