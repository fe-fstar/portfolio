"use server";

import nodemailer from "nodemailer";

export default async function sendMail(_, formData) {
    if (!formData.get("name") || !formData.get("message")) {
        return { success: false, message: "fields_missing" };
    }

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_MAIL,
            pass: process.env.NODEMAILER_SECRET,
        },
    });

    const mailOptions = {
        from: process.env.NODEMAILER_MAIL,
        to: process.env.NODEMAILER_RECEIVER,
        subject: "Message from website",
        html: `<p>From: ${formData.get("name")}</p>
                <p>Email: ${formData.get("email")}</p>
                <p>Message: ${formData.get("message")}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: "email_sent" };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}
