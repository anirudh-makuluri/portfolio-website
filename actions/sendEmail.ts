"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");
  const botcheck = formData.get("botcheck");

  // Honeypot check - if filled, it's a bot
  if (botcheck) {
    return {
      error: "Spam detected",
    };
  }

  // simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  // Check for spam patterns - random strings with no spaces or very few words
  const messageStr = message as string;
  const wordCount = messageStr.trim().split(/\s+/).length;
  const hasNumbers = /\d/.test(messageStr);
  const hasLetters = /[a-zA-Z]/.test(messageStr);
  
  // If message is a single word/string with mixed case and numbers, likely spam
  if (wordCount === 1 && hasNumbers && hasLetters && messageStr.length > 15) {
    return {
      error: "Invalid message format",
    };
  }

  // Check if message is too short (less than 10 characters)
  if (messageStr.trim().length < 1) {
    return {
      error: "Message is too short",
    };
  }

  let data;
  try {
    data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "anirudh.makuluri@gmail.com",
      subject: "Message from contact form",
      reply_to: senderEmail,
      react: React.createElement(ContactFormEmail, {
        message: message,
        senderEmail: senderEmail,
      }),
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};
