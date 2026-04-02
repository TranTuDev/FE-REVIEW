"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleVerify = async () => {
    const email = localStorage.getItem("email");

    if (!email || !otp) {
      setError("Thiếu email hoặc OTP");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token, email);
        setTimeout(() => {
          router.replace("/dashboard");
        }, 100);
      } else {
        setError(data.message || "OTP không đúng");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Verify OTP</h1>

      <input
        type="text"
        placeholder="Enter OTP"
        className="border px-3 py-2 rounded"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        onClick={handleVerify}
        className="bg-amber-400 py-2 rounded cursor-pointer"
      >
        Verify
      </button>
    </div>
  );
}
