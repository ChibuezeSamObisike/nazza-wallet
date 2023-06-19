import React, { createContext, useState, useContext } from "react";
import { useQuery } from "react-query";
import { profile } from "services/AppService";

const UserContext = createContext<
  Partial<{
    user: Object;
    setUser: React.Dispatch<React.SetStateAction<{}>>;
    isLoading: boolean;
  }>
>({});

export default function UserProvider({ children }: any) {
  const [user, setUser] = useState({});

  const { isLoading } = useQuery("userData", profile, {
    enabled: true,
    onSuccess(data) {
      setUser(data);
    },
    onError(error) {},
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
