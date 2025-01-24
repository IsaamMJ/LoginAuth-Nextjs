import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest): string | null => {
  try {
    // Retrieve the token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      console.error("No token found in cookies");
      return null; // Return null if there's no token
    }

    // Verify the token using the secret
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

    // Return the ID from the decoded token
    return decodedToken?.id || null;
  } catch (error) {
    // Log error details for debugging
    if (error instanceof Error) {
      console.error("Error decoding token:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null; // Return null if token is invalid or expired
  }
};
