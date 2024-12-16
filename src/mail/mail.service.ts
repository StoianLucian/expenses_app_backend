import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { TemplatesTypes } from './types/email';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  // Method to send an email using a template
  async sendEmail(
    to: string,
    subject: string,
    template: TemplatesTypes,
    context: Record<string, any>,
  ): Promise<void> {
    const email = await this.mailerService.sendMail({
      to: to,
      subject: subject,
      template: `./${template}`,
      context: context,
    });

    console.log(email);
  }
}
