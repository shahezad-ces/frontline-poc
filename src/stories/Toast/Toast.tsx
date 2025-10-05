"use client";
import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "warning";
  onClose: () => void;
};

export default function Toast({
  message,
  type = "success",
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-800"
      : type === "error"
        ? "bg-red-700"
        : "bg-orange-400";

  return (
    <div
      className={`fixed top-6 right-6 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in`}
    >
      {message}
    </div>
  );
}
