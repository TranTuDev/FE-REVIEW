"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/ui/authForm";
import Container from "@/components/layout/container";

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const handleRegister = async (
        name: string,
        email: string,
        password: string,
    ) => {
        setError("");
        console.log("RegisterPage send:", { name, email, password });

        try {
            const res = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                router.push("/login");
            } else {
                setError(data.message || "failed");
            }
        } catch (err) {
            setError("Server error");
        }
    };


    return (
        <Container >
            <AuthForm type="register" onSubmit={handleRegister} error={error} />
        </Container>
    );
}
