"use client";

import Navbar from "@/components/navbar";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function LayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const hideNavbar = ["/login", "/register", "/verify-otp"].includes(pathname);

    return (
        <AuthProvider>
            {!hideNavbar && <Navbar />}
            <Toaster />
            <main>{children}</main>
        </AuthProvider>
    );
}
