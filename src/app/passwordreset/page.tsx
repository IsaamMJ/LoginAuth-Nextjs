"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation"; // For managing query parameters
import axios from "axios";

export default function PasswordReset() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook for accessing query parameters
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryEmail = searchParams.get("email"); // Retrieve the 'email' query parameter
    if (queryEmail) {
      setEmail(queryEmail);
    } else {
      toast.error("Invalid or missing email parameter");
    }
  }, [searchParams]);

  const handlePasswordReset = async () => {
    if (!email) {
      toast.error("Email is missing. Please try again.");
      return;
    }

    // Check if the passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Check if the password is not empty
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/reset-password", { newPassword, email });
      toast.success(response.data.message || "Password reset successful!");
      router.push("/login"); // Redirect to login after successful password reset
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Reset Your Password
        </h1>
        <hr className="mb-4" />
        <p className="text-gray-600 text-center mb-4">
          Resetting password for: <strong>{email || "Loading..."}</strong>
        </p>
        
        <label className="block text-gray-700 font-bold mb-2" htmlFor="newPassword">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handlePasswordReset}
          className={`w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
