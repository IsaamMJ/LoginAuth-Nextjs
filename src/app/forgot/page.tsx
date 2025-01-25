"use client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    // Email validation using regex for basic email format check
    const isValidEmail = /\S+@\S+\.\S+/;
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    if (!isValidEmail.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgot-password", { email });

      if (response.data.success) {
        toast.success(response.data.message || "Password reset link sent!");
        router.push(`/passwordreset?email=${encodeURIComponent(email)}`); // Encode email for query string
      }
    } catch (error: unknown) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Forgot Password
        </h1>
        <hr className="mb-4" />

        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="email"
        >
          Enter your email
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleForgotPassword}
          className={`w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
}
