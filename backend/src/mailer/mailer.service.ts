import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  private transporter =
    process.env.SMTP_HOST
      ? nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT ?? 587),
          secure: false,
          auth:
            process.env.SMTP_USER && process.env.SMTP_PASS
              ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
              : undefined,
        })
      : // Sin SMTP, no falla: imprime el email en consola
        nodemailer.createTransport({ jsonTransport: true });

  async send(to: string, subject: string, html: string) {
    try {
      const from = process.env.EMAIL_FROM || 'no-reply@redvoluntariado.local';
      const info = await this.transporter.sendMail({ from, to, subject, html });
      this.logger.log(`Email preparado/enviado a ${to}: ${info.messageId ?? 'console'}`);
    } catch (e) {
      this.logger.warn(`No se pudo enviar email a ${to}: ${e?.message}`);
    }
  }
}