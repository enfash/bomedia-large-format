import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not defined in environment variables');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const RESEND_FROM = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
export const RESEND_TO = process.env.RESEND_TO_EMAIL || 'bomedia03@gmail.com';
