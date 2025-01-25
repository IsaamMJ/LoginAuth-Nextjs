import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body of the request
    const reqBody = await request.json();
    const { email } = reqBody;

    // Validate email input
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    console.log("Request Body:", reqBody);

    // Find user in the database by email
    const user = await User.findOne({ email });

    // If user does not exist, return an error response
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    console.log("User exists:", user);

    // Return success response with resetPassword flag
    return NextResponse.json(
      {
        message: "User exists in our records! Please reset your password.",
        success: true,
        resetPassword: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/reset-password:", error);

    // Handle unexpected errors
    const errorMessage = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
