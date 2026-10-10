"use client";

import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { notifyError, notifySuccess } from "@/src/lib/notify";
import { login } from "@/src/services/auth";
import { saveSession } from "@/src/lib/authStorage";

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

      // Tokens + user in localStorage, and the cookie used by middleware.ts
      saveSession(data.tokens, data.user);

      notifySuccess("Logged in successfully 🎉");

      router.replace("/admin/dashboard");
    } catch (err) {
      // Show the backend's real reason (wrong password, deactivated account,
      // validation error...) and a generic one only when the server is unreachable.
      const message =
        (isAxiosError(err) && err.response?.data?.message) ||
        "Unable to sign in. Please check your connection and try again.";

      setError(message);
      notifyError(message);
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
