"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";



export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> 
        <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl text-center font-bold mb-4 text-gray-800 ">{loading ? "Processing" : "Login"}</h1>
        <hr className="mb-4" />
        
        <label className="text font-bold" htmlFor="email">Email</label>
        <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            type="email"
            value={user.email}
            onChange={(e)=> setUser({...user,email: e.target.value})}
            placeholder="Enter Your Email"/>

        <label className="font-bold" htmlFor="password">Password</label>
        <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            value={user.password}
            onChange={(e)=> setUser({...user,password: e.target.value})}
            placeholder="Enter Your Password"/>

        <button
        onClick={onLogin}
        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300">SignUp Here</button>
        <Link href="/signup">
        <button 
            className="w-full bg-gray-500 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition duration-300 mt-2">
            Visit Sign Up Page
        </button>
        </Link>
        <Link href="/forgot">
        <button 
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition duration-300 mt-2">
            Forgot Password
        </button>
        </Link>
        </div>
        </div>
    )
} 