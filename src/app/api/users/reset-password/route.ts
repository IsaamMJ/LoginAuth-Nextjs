import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Import bcrypt for hashing passwords

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json(); // Read the body of the request
    const { newPassword, email } = reqBody; // Destructure newPassword and email from the request body

    // Validate the input
    if (!newPassword || !email) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    console.log(reqBody);

    // Find the user in the database by email
    const user = await User.findOne({ email });

    // If user doesn't exist, return an error response
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    console.log("User exists");

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save(); // Save the updated user document

    // Send a success response
    return NextResponse.json({
      message: "Password updated successfully!",
      success: true,
    });
  } catch (error: any) {
    // Handle any errors and return a server error response
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
