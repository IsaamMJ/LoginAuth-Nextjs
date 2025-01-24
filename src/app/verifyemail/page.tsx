"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const verifyUserEmail = useCallback(async () => {
        if (!token) {
            setError(true);
            return;
        }

        setLoading(true);
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data || "Unknown error occurred");
            } else {
                console.error("An unexpected error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get("token");
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token) {
            verifyUserEmail();
        }
    }, [token, verifyUserEmail]);

    return (
        <div className="verify-email-page">
            {loading && <p>Verifying your email, please wait...</p>}

            {verified && (
                <div>
                    <h1>Email Verified!</h1>
                    <p>Your email has been successfully verified. You can now proceed.</p>
                    <Link href="/login">Go to Login</Link>
                </div>
            )}

            {error && (
                <div>
                    <h1>Verification Failed</h1>
                    <p>There was an issue verifying your email. Please try again later.</p>
                </div>
            )}
        </div>
    );
}
