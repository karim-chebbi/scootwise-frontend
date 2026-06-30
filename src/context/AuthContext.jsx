import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  login as loginRequest,
  register as registerRequest,
} from "../services/auth.service";

const AuthContext = createContext(null);

const normalizeRole = (role) => {
  if (!role) return "RIDER";
  const normalized = String(role).toUpperCase();
  if (normalized === "TECHNICIAN" || normalized === "MAINTENANCE") {
    return normalized;
  }
  return normalized;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("scootwise_user");
    if (!storedUser) return null;
    const parsed = JSON.parse(storedUser);
    return { ...parsed, role: normalizeRole(parsed?.role) };
  });
  const [token, setToken] = useState(() =>
    localStorage.getItem("scootwise_token"),
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("scootwise_token", token);
    } else {
      localStorage.removeItem("scootwise_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("scootwise_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("scootwise_user");
    }
  }, [user]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await loginRequest(credentials);
      const normalizedUser = {
        ...response.user,
        role: normalizeRole(response.user?.role),
      };
      setToken(response.token);
      setUser(normalizedUser);
      return { ...response, user: normalizedUser };
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      return await registerRequest(payload);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const role = normalizeRole(user?.role);

  const value = useMemo(
    () => ({
      user: user ? { ...user, role } : user,
      token,
      loading,
      login,
      register,
      logout,
      isAuthenticated: Boolean(token),
      isAdmin: role === "ADMIN",
      isMaintenance: role === "TECHNICIAN" || role === "MAINTENANCE",
      role,
    }),
    [user, token, loading, role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
