"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

// Define user type
interface User {
  email: string;
  password: string;
  username: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Signup failed");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isButtonDisabled =
      user.email.trim() === "" ||
      user.password.trim() === "" ||
      user.username.trim() === "";
    setButtonDisabled(isButtonDisabled);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">
        {loading ? "Processing..." : "Signup"}
      </h1>
      <hr className="mb-4 w-full max-w-md border-gray-300" />
      
      <label htmlFor="username" className="w-full max-w-md text-left mb-2">
        Username
      </label>
      <input
        className="w-full max-w-md p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter your username"
      />

      <label htmlFor="email" className="w-full max-w-md text-left mb-2">
        Email
      </label>
      <input
        className="w-full max-w-md p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
      />

      <label htmlFor="password" className="w-full max-w-md text-left mb-2">
        Password
      </label>
      <input
        className="w-full max-w-md p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your password"
      />

      <button
        onClick={onSignup}
        disabled={buttonDisabled || loading}
        className={`w-full max-w-md p-2 rounded-lg mb-4 text-white ${
          buttonDisabled || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Signup"}
      </button>

      <Link href="/login" className="text-blue-500 hover:underline">
        Already have an account? Login here
      </Link>
    </div>
  );
}
