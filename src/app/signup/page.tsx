"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    }) 

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    
    const [loading, setLoading] = React.useState(false);
    
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup" ,user);
            console.log("Signup Success", respose.data);
            router.push("/login");
        } catch (error:any) {

            console.log("SignUp Failed", error);
            toast.error(error.message);

            
        }finally{
            
        }
    }


    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> 
        <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl text-center font-bold mb-4 text-gray-800 "> {loading ? "Processing" : "Sign Up"}</h1>
        <hr className="mb-4"/>
        <label className="text font-bold" htmlFor="username">Username</label>
        <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            type="text"
            value={user.username}
            onChange={(e)=> setUser({...user,username: e.target.value})}/>

        <label className="font-bold" htmlFor="email">Email</label>
        <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            type="email"
            value={user.email}
            onChange={(e)=> setUser({...user,email: e.target.value})}
            placeholder="Enter Email"/>

        <label className="font-bold" htmlFor="password">Password</label>
        <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            value={user.password}
            onChange={(e)=> setUser({...user,password: e.target.value})}
            placeholder="Enter Password"/>



        <button
        onClick={onSignup}
        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300">{buttonDisabled ? "No Sign Up" : "SignUp"}</button>
        
        
        <Link href="/login">
        <button 
            className="w-full bg-gray-500 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition duration-300 mt-2">
            Visit Login Page
        </button>
        </Link>


        
        </div>
        </div>
    )
} 