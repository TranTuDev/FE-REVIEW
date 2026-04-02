"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
    type: "login" | "register";
    onSubmit: (name: string, email: string, password: string) => void;
    error?: string;
};

export default function AuthForm({ type, onSubmit, error }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("AuthForm submit:", { name, email, password });

        if (type === "register") {
            onSubmit(name, email, password);
        } else {
            onSubmit("", email, password);
        }
    };



    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-20 flex flex-col gap-4"
        >
            <h1 className="text-2xl font-bold text-center">
                {type === "login" ? "Login" : "Register"}
            </h1>
            {type === "register" && (
                <input
                    type="text"
                    placeholder="Name"
                    className="border px-3 py-2 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            )}
            <input
                type="email"
                placeholder="Email"
                className="border px-3 py-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="border px-3 py-2 rounded w-full pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                    {showPassword ? "🙈" : "👁️"}
                </span>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
                type="submit"
                className="bg-amber-300 text-white text-2xl py-2 rounded cursor-pointer"
            >
                {type === "login" ? "Login" : "Register"}
            </button>

            {type === "login" ? (
                <p className="text-center">
                    Chưa Có Tài Khoản? <Link href="/register">Register</Link>
                </p>
            ) : (
                <p className="text-center">
                    Đã có tài khoản? <Link href="/login">Login</Link>
                </p>
            )}
        </form>
    );
}
