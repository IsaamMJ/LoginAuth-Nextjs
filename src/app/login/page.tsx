"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      console.log("Login success:", response.data);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error: unknown) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Login failed. Please try again.";
      console.error("Login failed:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl text-center font-bold mb-4 text-gray-800">
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr className="mb-4" />

        <label className="font-bold mb-2 block" htmlFor="email">
          Email
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />

        <label className="font-bold mb-2 block" htmlFor="password">
          Password
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />

        <button
          onClick={onLogin}
          disabled={buttonDisabled || loading}
          className={`w-full bg-blue-500 text-white font-semibold py-3 rounded-lg transition duration-300 ${
            buttonDisabled || loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex flex-col space-y-2 mt-4">
          <Link href="/signup" passHref>
            <button className="w-full bg-gray-500 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition duration-300">
              Visit Sign Up Page
            </button>
          </Link>

          <Link href="/forgot" passHref>
            <button className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300">
              Forgot Password
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
