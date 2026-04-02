"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/ui/authForm";
import Container from "@/components/layout/container";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (
    _name: string,
    email: string,
    password: string
  ) => {
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("email", email);
        router.push("/verify-otp");
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Server error");
    }
  };


  return (
    <Container>
      <AuthForm type="login" onSubmit={handleLogin} error={error} />
    </Container>
  );
}
