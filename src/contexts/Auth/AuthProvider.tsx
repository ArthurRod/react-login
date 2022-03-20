import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  /* O useEffect é executado sempre que o component AuthProvider for chamado */
  useEffect(() => {
    validateToken();
  }, [api]);

  const validateToken = async () => {
    const storageData = localStorage.getItem('authToken');
    if(storageData) {
      const data = await api.validateToken(storageData);
      if(data.user) {
        setUser(data.user)
      }
    }
  };

  const signin = async (email: string, password: string) => {
    const data = await api.signin(email, password);
    if (data.user && data.token) {
      setUser(data.user);
      setToken(data.token);
      return true;
    }
    return false;
  };

  const signout = async () => {
    setToken('')
    setUser(null);
    await api.logout();
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
