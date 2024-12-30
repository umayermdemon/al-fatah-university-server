import nodemailer from "nodemailer";
import config from "../config";
const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production", // true for port 465, false for other ports
    auth: {
      user: "mamudmdemon@gmail.com",
      pass: "bfbw hird kgku ayvs",
    },
  });
  await transporter.sendMail({
    from: "mamudmdemon@gmail.com", // sender address
    to, // list of receivers
    subject: "Reset your password within 10 minutes!", // Subject line
    text: "", // plain text body
    html, // html body
  });
};

export default sendEmail;
