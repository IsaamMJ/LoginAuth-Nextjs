import nodemailer, { Transporter } from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

interface EmailOptions {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailOptions) => {
  try {
    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userId, 10);

    // Update the user's token and expiry fields based on email type
    const updateFields =
      emailType === "VERIFY"
        ? { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
        : { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 };

    await User.findByIdAndUpdate(userId, updateFields);

    // Configure the email transporter
    const transport: Transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10), // Use default SMTP port 587 if undefined
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    // Define email content
    const emailSubject =
      emailType === "VERIFY" ? "Verify your email" : "Reset your password";

    const emailHtml = `
      <p>
        Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
        here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"},
        or copy and paste the link below in your browser:
        <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>
    `;

    const mailOptions = {
      from: "hitesh@gmail.com",
      to: email,
      subject: emailSubject,
      html: emailHtml,
    };

    // Send the email
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error("Error in sendEmail:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
