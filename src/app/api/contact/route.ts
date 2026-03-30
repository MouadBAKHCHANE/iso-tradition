import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, location, date } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nom et email sont requis." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ISO Tradition – Site Web" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: "charline.fabbro@naoenergy.ch",
      replyTo: email,
      subject: `Nouvelle demande de contact – ${service || "Général"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #215e84; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; font-size: 20px; margin: 0;">Nouvelle demande de contact</h1>
          </div>
          <div style="background: #f9f9f7; padding: 32px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666; font-size: 14px; width: 130px;">Nom</td>
                <td style="padding: 10px 0; color: #215e84; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; font-size: 14px;">Email</td>
                <td style="padding: 10px 0; color: #215e84; font-size: 14px; font-weight: 600;">
                  <a href="mailto:${email}" style="color: #215e84;">${email}</a>
                </td>
              </tr>
              ${phone ? `<tr>
                <td style="padding: 10px 0; color: #666; font-size: 14px;">Téléphone</td>
                <td style="padding: 10px 0; color: #215e84; font-size: 14px; font-weight: 600;">
                  <a href="tel:${phone}" style="color: #215e84;">${phone}</a>
                </td>
              </tr>` : ""}
              ${service ? `<tr>
                <td style="padding: 10px 0; color: #666; font-size: 14px;">Service</td>
                <td style="padding: 10px 0; color: #215e84; font-size: 14px; font-weight: 600;">${service}</td>
              </tr>` : ""}
              ${location ? `<tr>
                <td style="padding: 10px 0; color: #666; font-size: 14px;">Localisation</td>
                <td style="padding: 10px 0; color: #215e84; font-size: 14px; font-weight: 600;">${location}</td>
              </tr>` : ""}
              ${date ? `<tr>
                <td style="padding: 10px 0; color: #666; font-size: 14px;">Date souhaitée</td>
                <td style="padding: 10px 0; color: #215e84; font-size: 14px; font-weight: 600;">${date}</td>
              </tr>` : ""}
            </table>
            <hr style="border: none; border-top: 1px solid #e5e5e0; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px; margin: 0;">
              Ce message a été envoyé depuis le formulaire de contact du site isotradition.ch
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
