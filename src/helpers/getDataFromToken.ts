import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest): string | null => {
  try {
    // Retrieve the token from cookies
    const token = request.cookies.get("token")?.value || "";
    
    if (!token) {
      console.error("No token found in cookies");
      return null;  // If there's no token, return null or handle accordingly
    }

    // Verify the token using the secret
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    // Return the ID from the decoded token
    return decodedToken.id;
  } catch (error: any) {
    // Handle errors
    console.error("Error decoding token:", error.message);
    return null;  // Return null if token is invalid or expired
  }
};
