"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { notifyError, notifySuccess } from "@/src/lib/notify";
import { login } from "@/src/services/auth";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "patient">("admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await login(email, password);

      localStorage.setItem("clinic_token", data.tokens.accessToken);
      localStorage.setItem("clinic_refresh_token", data.tokens.refreshToken);

      // Store logged-in user and role
      localStorage.setItem("clinic_user", JSON.stringify(data.user));

      document.cookie = `clinic_token=${data.tokens.accessToken}; path=/; max-age=86400`;

      notifySuccess("Logged in successfully 🎉");

      router.replace("/admin/dashboard");
    } catch (err) {
      console.error("Login error:", err);

      setError("Invalid credentials. Please try again.");
      notifyError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return {
    email,
    password,
    role,
    loading,
    error,
    setEmail,
    setPassword,
    setRole,
    handleLogin,
  };
}
