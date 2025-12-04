import express from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads (store in memory)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
});

// Configure nodemailer transporter
const createTransporter = () => {
  console.log('Creating transporter with:', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    user: process.env.EMAIL_USER,
  });

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 465),
    secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Email endpoint
app.post('/api/email', upload.single('file'), async (req, res) => {
  try {
    const { name, phone, email, jobType, message, agreeToUpdates } = req.body;
    const file = req.file;

    // Validate required fields
    if (!name || !phone || !jobType || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Create email transporter
    const transporter = createTransporter();

    // Verify connection
    try {
      await transporter.verify();
      console.log('✅ SMTP connected successfully');
    } catch (verifyError) {
      console.error('❌ SMTP connection failed:', verifyError);
      throw new Error(`SMTP Connection Failed: ${verifyError.message}`);
    }

    // Prepare email content (Compact Table Layout)
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>New Print Order</title>
</head>
<body style="margin:0; padding:0; background:#f5f7f9; font-family:Arial, Helvetica, sans-serif;">

  <!-- Center wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7f9;">
    <tr>
      <td align="center">

        <!-- Main container -->
        <table width="600" cellpadding="0" cellspacing="0" style="
          background:#ffffff;
          margin:24px auto;
          border-radius:10px;
          overflow:hidden;
        ">

          <!-- Header -->
          <tr>
            <td style="
              background:#4FA89B;
              padding:24px;
              color:#ffffff;
              text-align:center;
            ">
              <h1 style="margin:0; font-size:20px;">🎨 New Print Order Request</h1>
              <p style="margin:6px 0 0; font-size:13px; opacity:0.9;">
                BOMedia Large Format Printing
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:20px;">

              <!-- Field block -->
              <div style="margin-bottom:14px;">
                <p style="margin:0; font-size:12px; color:#6b7280;">CUSTOMER NAME</p>
                <p style="margin:4px 0 0; font-size:14px; color:#111827;">
                  ${name}
                </p>
              </div>

              <div style="margin-bottom:14px;">
                <p style="margin:0; font-size:12px; color:#6b7280;">PHONE</p>
                <p style="margin:4px 0 0; font-size:14px;">${phone}</p>
              </div>

              ${email ? `
              <div style="margin-bottom:14px;">
                <p style="margin:0; font-size:12px; color:#6b7280;">EMAIL</p>
                <a href="mailto:${email}"
                   style="font-size:14px; color:#2563eb; text-decoration:none;">
                  ${email}
                </a>
              </div>
              ` : ''}

              <div style="margin-bottom:14px;">
                <p style="margin:0; font-size:12px; color:#6b7280;">JOB TYPE</p>
                <p style="margin:4px 0 0; font-size:14px;">
                  ${jobType}
                  <span style="
                    background:#dcfce7;
                    color:#166534;
                    font-size:11px;
                    padding:3px 6px;
                    border-radius:999px;
                    margin-left:6px;
                  ">
                    Priority
                  </span>
                </p>
              </div>

              <div style="margin-bottom:14px;">
                <p style="margin:0; font-size:12px; color:#6b7280;">
                  MESSAGE / REQUIREMENTS
                </p>
                <div style="
                  margin-top:6px;
                  padding:10px;
                  background:#f9fafb;
                  border:1px solid #e5e7eb;
                  border-radius:6px;
                  font-size:13px;
                  white-space: pre-wrap;
                ">
                  ${message}
                </div>
              </div>

              ${file ? `
              <div style="margin-bottom:14px;">
                <p style="margin:0; font-size:12px; color:#6b7280;">ARTWORK</p>
                <p style="margin:4px 0 0; font-size:14px; color:#2563eb;">
                  📎 ${file.originalname} (${(file.size / 1024).toFixed(2)} KB)
                </p>
              </div>
              ` : ''}

              <hr style="border:none; border-top:1px solid #e5e7eb; margin:20px 0;" />

              ${agreeToUpdates === 'true' ? `
              <p style="font-size:12px; color:#374151; margin:0;">
                ✔ Customer agreed to receive order updates
              </p>
              ` : ''}
            </td>
          </tr>

        </table>
        <!-- /Main container -->

      </td>
    </tr>
  </table>

</body>
</html>
    `;

    // Prepare plain text version
    const textContent = `
NEW PRINT ORDER REQUEST - BOMedia Large Format Printing
========================================================

Customer Name: ${name}
Phone Number: ${phone}
${email ? `Email Address: ${email}` : ''}
Job Type: ${jobType}

MESSAGE / REQUIREMENTS:
${message}

${file ? `\nARTWORK ATTACHED: ${file.originalname} (${(file.size / 1024).toFixed(2)} KB)` : ''}
${agreeToUpdates === 'true' ? '\n✓ Customer agreed to receive order updates' : ''}

---
This order was submitted via the BOMedia website contact form.
    `.trim();

    // 1. Send Admin Notification (Internal)
    const adminMailOptions = {
      from: `"Broad Options Media" <${process.env.EMAIL_USER}>`,
      replyTo: process.env.EMAIL_USER, // Internal reply-to stays internal
      to: process.env.EMAIL_RECIPIENT,
      subject: `New Order: ${jobType} - ${name}`,
      text: textContent,
      html: htmlContent, // The rich HTML template defined above
      attachments: file ? [{
        filename: file.originalname,
        content: file.buffer,
      }] : [],
    };

    await transporter.sendMail(adminMailOptions);
    console.log('✅ Admin notification sent');

    // 2. Send Customer Confirmation (External)
    if (email) {
      const customerMailOptions = {
        from: `"Broad Options Media" <${process.env.EMAIL_USER}>`,
        replyTo: process.env.EMAIL_USER, // Customer replies to business email
        to: email,
        subject: 'We received your order - BOMedia',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #333;">
            <h2 style="color: #0d9488;">Thanks for your order, ${name}!</h2>
            <p>We have received your request for a <strong>${jobType}</strong>.</p>
            <p>Our team will review your details and artwork, and we'll get back to you shortly with a quote.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 14px; color: #666;">
              <strong>Broad Options Media</strong><br>
              Lagos, Nigeria<br>
              <a href="https://wa.me/2348022247567" style="color: #0d9488; text-decoration: none; font-weight: bold;">
                WhatsApp: +234 802 224 7567
              </a>
            </p>
          </div>
        `,
      };

      try {
        await transporter.sendMail(customerMailOptions);
        console.log('✅ Customer confirmation sent');
      } catch (custError) {
        console.error('⚠️ Failed to send customer confirmation:', custError.message);
        // Don't fail the request if just the confirmation fails
      }
    }

    res.json({
      success: true,
      message: 'Order received successfully'
    });

  } catch (error) {
    console.error('❌ Email sending error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send email',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'BOMedia email server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 BOMedia Email Server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_HOST || 'Not configured'}`);
  console.log(`📬 Sending to: ${process.env.EMAIL_RECIPIENT || 'Not configured'}`);
  console.log(`\n✅ Ready to receive contact form submissions!\n`);
});
