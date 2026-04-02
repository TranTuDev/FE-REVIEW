"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
        toast.error("Unexpected error");
    }, [error]);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold">Có lỗi hệ thống</h2>

            <button
                onClick={() => reset()}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
                Retry
            </button>
        </div>
    );
}
