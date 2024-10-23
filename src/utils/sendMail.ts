"use server";
import nodemailer from "nodemailer";

const SMTP_SERVER_USERNAME =  "dyoniquemusic@gmail.com";
const SMTP_SERVER_PASSWORD = "naep pfhz gyrn nmev";
const SITE_MAIL_RECIEVER = "ydixit007@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendMail({
  name,
  email,
  message,
  country
}: {
  name: string,
  email: string,
  message: string,
  country?: string,
}) {
  try {
    const isVerified = await transporter.verify();
  } catch (error) {
    console.error(
      "Something Went Wrong",
      SMTP_SERVER_USERNAME,
      SMTP_SERVER_PASSWORD,
      error
    );
    return;
  }
  const info = await transporter.sendMail({
    from: SMTP_SERVER_USERNAME,
    to: SITE_MAIL_RECIEVER,
    subject: `New form submission! - ${name}`,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Lead Contact</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .content {
            background-color: white;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .field {
            margin-bottom: 15px;
        }
        .label {
            font-weight: bold;
            color: #666;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
    </style>
    </head>
    <body>
        <div class="header">
            <h2>New Form submission - jeffersonpharmaindia.com</h2>
        </div>
        
        <div class="content">
            <div class="field">
                <p class="label">Country:</p>
                <p>${country || "N/A"}</p>
            </div>

            <div class="field">
                <p class="label">Name:</p>
                <p>${name}</p>
            </div>
            
            <div class="field">
                <p class="label">Email:</p>
                <p><a href="mailto:${email}">${email}</a></p>
            </div>
            
            <div class="field">
                <p class="label">Message:</p>
                <p>${message}</p>
            </div>
        </div>
        
        <div class="footer">
            <p>This is an automated message from your contact form.</p>
            <p>© 2024 Jefferson Pharma. All rights reserved.</p>
        </div>
    </body>
    </html>`,
  });
  console.log("Message Sent", info.messageId);
  return info;
}
