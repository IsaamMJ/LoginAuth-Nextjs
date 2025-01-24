import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();  // Read the body of the request
    const { email } = reqBody;  // Destructure the email from the request body

    // If no email is provided, return an error
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    console.log(reqBody);

    // Find user in the database by email
    const user = await User.findOne({ email });

    // If user doesn't exist, return an error response
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    console.log("User exists");

    // Send a response indicating that the user exists and should proceed to password reset
    const response = NextResponse.json({
      message: "User exists in our records! Please reset your password.",
      success: true,
      resetPassword: true,  // Flag to indicate that password reset is required
    });

    return response; // Send the response back to the client

  } catch (error: any) {
    // Handle any errors and return a server error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
