import { Resend } from "resend";
import { resetPasswordTemplate } from "./templates/template.resetpassword.js";
import env from "@/config/env.js";

const resend = new Resend(env.RESEND_API_KEY);

class EmailService {
  async sendPasswordReset(email: string, link : string) {
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Canny-Clone Password Reset",
      html: resetPasswordTemplate(link),
    });
  }
}

export default new EmailService();
