import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  const signup = async (username) => {
    try {
      const response = await await fetch(API + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
  // TODO: authenticate
  const authenticate = async () => {
    if (!token) throw new Error("No token found");

    try {
      const response = await fetch(`${API}/authenticate`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Authentication failed`);
      }

      setLocation("TUNNEL");
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  };
  const value = { location, token, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
