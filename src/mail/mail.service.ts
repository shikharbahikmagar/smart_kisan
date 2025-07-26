import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as path from 'path';
import * as fs from 'fs';

interface TemplateContext {
  [key: string]: string | number | boolean | undefined | null;
}

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  private compileTemplate(
    templateName: string,
    context: TemplateContext,
  ): string {
    const templatePath = path.join(
      process.cwd(),
      'src',
      'mail',
      'templates',
      `${templateName}.hbs`,
    );
    const source = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(source);
    return template(context);
  }

  async sendEmailVerificationMail(
    to: string,
    subject: string,
    templateName: string,
    context: TemplateContext,
  ) {
    const html = this.compileTemplate(templateName, context);

    const mailOptions = {
      from: process.env.MAIL_FROM || 'no-reply@example.com',
      to,
      subject,
      html,
    };

    try {
      return this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  //reset password mail
  async sendForgotPasswordMail(
    to: string,
    subject: string,
    templateName: string,
    context: TemplateContext,
  ) {
    const html = this.compileTemplate(templateName, context);

    const mailOptions = {
      from: process.env.MAIL_FROM || 'no-reply@example.com',
      to,
      subject,
      html,
    };

    try {
      return this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  //order created mail
  async sendOrderCreatedMail(
    to: string,
    subject: string,
    templateName: string,
    context: TemplateContext,
  ) {
    const html = this.compileTemplate(templateName, context);

    const mailOptions = {
      from: process.env.MAIL_FROM || 'no-reply@example.com',
      to,
      subject,
      html,
    };

    try {
      return this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }

  }

}