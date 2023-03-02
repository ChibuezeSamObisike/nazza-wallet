import React, { createContext, useState, useContext } from "react";
import { useQuery } from "react-query";
import { profile } from "services/authLogin";

const UserContext = createContext<any>(null);

export default function UserProvider({ children }: any) {
  const [user, setUser] = useState({});

  const { isLoading, isFetching } = useQuery("userData", profile, {
    onSuccess(data) {
      setUser(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useGetUser = () => {
  return useContext(UserContext);
};
