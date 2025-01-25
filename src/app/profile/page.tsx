"use client";
import React from "react";

import Sidebar from "@/app/components/Sidebar"; // Use absolute path if needed

export default function ProfilePage() {
    return (
        <div>
            <Sidebar /> {/* Sidebar component included */}
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>Profile</h1>
                <hr />
                <p>Profile Page</p>
            </div>
        </div>
    );
}
