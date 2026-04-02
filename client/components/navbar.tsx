"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { token, logout } = useAuth();

  const hideNav = pathname === "/login" || pathname === "/verify-otp";

  const isLogin = !!token;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="header-default">
      <div className="w-full flex justify-between items-center h-[50px]">

        <div className="header-left">
          <div className="logo-header pl-[15px]">
            <Link href="/">Logo</Link>
          </div>
        </div>

        {!hideNav && (
          <nav className="block max-[1199px]:hidden">
            <ul className="flex items-center gap-3">
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/tasks">Tasks</Link>
              </li>
              <li>
                <Link href="/submission">Submission</Link>
              </li>
              <li>
                <Link href="/chat">Chat</Link>
              </li>
            </ul>
          </nav>
        )}

        <div className="header-right">
          <div>

            {!isLogin ? (
              <Link
                href="/login"
                className="block max-[1199px]:hidden pr-[15px]"
              >
                Login
              </Link>
            ) : (
              !hideNav && (
                <button
                  onClick={handleLogout}
                  className="block max-[1199px]:hidden pr-[15px] cursor-pointer"
                >
                  Logout
                </button>
              )
            )}

            {!hideNav && (
              <button
                onClick={() => setOpen(true)}
                className="hidden max-[1199px]:block w-6 h-[18px] relative cursor-pointer mr-[15px]"
              >
                <span className="absolute left-0 top-0 w-full h-[2px] bg-amber-600"></span>
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-amber-600"></span>
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-600"></span>
              </button>
            )}
          </div>
        </div>
      </div>

      {!hideNav && (
        <div
          className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="p-[20px]">
            <button onClick={() => setOpen(false)} className="mb-5 w-full">
              <div className="flex justify-between items-center">
                <span>X</span>
                <span>Menu</span>
              </div>
            </button>

            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
              </li>

              <li>
                <Link href="/tasks" onClick={() => setOpen(false)}>
                  Tasks
                </Link>
              </li>

              {!isLogin ? (
                <li>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </li>
              ) : (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
