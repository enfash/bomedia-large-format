import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { Resend } from 'resend';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Firebase Admin
let adminApp;
try {
  adminApp = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
  console.log('✅ Firebase Admin initialized');
} catch (error) {
  console.warn('⚠️ Firebase Admin not configured:', error.message);
}

const db = adminApp ? getFirestore(adminApp) : null;
const storage = adminApp ? getStorage(adminApp) : null;

// Initialize Resend
let resend;
try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
    console.log('✅ Resend initialized');
  } else {
    console.warn('⚠️ RESEND_API_KEY not configured');
  }
} catch (error) {
  console.warn('⚠️ Resend initialization failed:', error.message);
}

const RESEND_FROM = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const RESEND_TO = process.env.RESEND_TO_EMAIL || 'bomedia03@gmail.com';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads (store in memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB max file size
  },
});

// Email template generator
function generateAdminEmailHTML({ name, phone, email, jobType, message, fileName, fileSize, agreeToUpdates }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Print Order</title>
</head>
<body style="margin:0; padding:0; background:#f5f7f9; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7f9;">
    <tr>
      <td align="center" style="padding: 24px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background:#14b8a6; padding:24px; color:#ffffff; text-align:center;">
              <h1 style="margin:0; font-size:22px; font-weight:600;">🎨 New Print Order Request</h1>
              <p style="margin:8px 0 0; font-size:14px; opacity:0.95;">BOMedia Large Format Printing</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 24px;">
              <div style="margin-bottom:20px;">
                <p style="margin:0; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">CUSTOMER NAME</p>
                <p style="margin:6px 0 0; font-size:15px; color:#111827; font-weight:500;">${name}</p>
              </div>
              <div style="margin-bottom:20px;">
                <p style="margin:0; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">PHONE</p>
                <p style="margin:6px 0 0; font-size:15px; color:#111827;">
                  ${phone}
                  <a href="https://wa.me/${phone.replace(/\D/g, '').replace(/^0/, '234')}" style="display:inline-block; margin-left:8px; color:#16a34a; text-decoration:none; font-weight:600; font-size:13px; background:#dcfce7; padding:2px 8px; border-radius:12px;">
                    Start Chat ↗
                  </a>
                </p>
              </div>
              ${email ? `
              <div style="margin-bottom:20px;">
                <p style="margin:0; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">EMAIL</p>
                <a href="mailto:${email}" style="display:inline-block; margin:6px 0 0; font-size:15px; color:#2563eb; text-decoration:none;">${email}</a>
              </div>` : ''}
              <div style="margin-bottom:20px;">
                <p style="margin:0; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">JOB TYPE</p>
                <p style="margin:6px 0 0; font-size:15px; color:#111827;">
                  ${jobType}
                  <span style="background:#dcfce7; color:#166534; font-size:11px; padding:4px 8px; border-radius:12px; margin-left:8px; font-weight:600;">Priority</span>
                </p>
              </div>
              <div style="margin-bottom:20px;">
                <p style="margin:0; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">MESSAGE / REQUIREMENTS</p>
                <div style="margin-top:8px; padding:14px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; font-size:14px; line-height:1.6; white-space: pre-wrap; color:#374151;">${message}</div>
              </div>
              ${fileName ? `
              <div style="margin-bottom:20px;">
                <p style="margin:0; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">ARTWORK</p>
                <p style="margin:6px 0 0; font-size:14px; color:#2563eb; font-weight:500;">📎 ${fileName} ${fileSize ? `(${(fileSize / 1024).toFixed(2)} KB)` : ''}</p>
              </div>` : ''}
              <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;" />
              ${agreeToUpdates ? `
              <p style="font-size:13px; color:#374151; margin:0;">
                <span style="color:#10b981; margin-right:6px; font-size:16px;">✓</span> Customer agreed to receive order updates
              </p>` : ''}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

function generateCustomerEmailHTML(name, jobType) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background:#f5f7f9; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7f9;">
    <tr>
      <td align="center" style="padding: 24px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background:#14b8a6; padding:24px; color:#ffffff; text-align:center;">
              <h1 style="margin:0; font-size:22px; font-weight:600;">✅ Order Received!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 24px;">
              <h2 style="color:#14b8a6; margin:0 0 16px; font-size:20px;">Thanks for your order, ${name}!</h2>
              <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#374151;">We have received your request for a <strong>${jobType}</strong>.</p>
              <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:#374151;">Our team will review your details and artwork, and we'll get back to you shortly with a quote.</p>
              <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;" />
              <p style="font-size:14px; color:#6b7280; margin:0 0 8px;"><strong style="color:#111827;">Broad Options Media</strong></p>
              <p style="font-size:14px; color:#6b7280; margin:0 0 8px;">Lagos, Nigeria</p>
              <p style="font-size:14px; margin:0;"><a href="https://wa.me/2348022247567" style="color:#14b8a6; text-decoration:none; font-weight:600;">WhatsApp: +234 802 224 7567</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

// Contact form endpoint
app.post('/api/contact', upload.single('file'), async (req, res) => {
  try {
    const { name, phone, email, jobType, message, agreeToUpdates } = req.body;
    const file = req.file;

    // Generate a short unique reference ID (e.g., 5 chars)
    const refId = Math.random().toString(36).substring(2, 7).toUpperCase();

    console.log(`📨 New submission [${refId}]:`, { name, phone, email, jobType, hasFile: !!file });

    // Validate required fields
    if (!name || !phone || !jobType || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    let fileUrl = null;
    let fileName = null;
    let fileSize = null;

    // Upload file to Firebase Storage if available
    if (file && storage) {
      try {
        fileName = file.originalname;
        fileSize = file.size;

        // Map job type to folder name
        const jobTypeToFolder = {
          'Flex Banner': 'flex',
          'Self-Adhesive Vinyl (SAV)': 'sav',
          'Window / Clear Sticker': 'windowgraphics',
          'Other': 'others'
        };

        const categoryFolder = jobTypeToFolder[jobType] || 'others';

        const bucket = storage.bucket();
        const timestamp = Date.now();
        const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
        const storagePath = `submissions/${categoryFolder}/${timestamp}_${sanitizedFileName}`;

        const fileUpload = bucket.file(storagePath);
        await fileUpload.save(file.buffer, {
          metadata: { contentType: file.mimetype },
        });

        await fileUpload.makePublic();
        fileUrl = `https://storage.googleapis.com/${bucket.name}/${storagePath}`;

        console.log(`✅ File uploaded to Storage: ${categoryFolder}/${sanitizedFileName}`);
      } catch (uploadError) {
        console.error('⚠️ File upload failed:', uploadError.message);
      }
    }

    // Save to Firestore if available
    if (db) {
      try {
        await db.collection('submissions').add({
          refId, // Save the reference ID
          name,
          phone,
          email: email || '',
          jobType,
          message,
          agreeToUpdates: agreeToUpdates === 'true',
          fileUrl,
          fileName,
          fileSize,
          createdAt: new Date().toISOString(),
          status: 'new',
        });
        console.log('✅ Saved to Firestore');
      } catch (dbError) {
        console.error('⚠️ Firestore save failed:', dbError.message);
      }
    }

    // Send emails via Resend if available
    if (resend) {
      try {
        const adminEmailHTML = generateAdminEmailHTML({
          name, phone, email, jobType, message, fileName, fileSize, agreeToUpdates: agreeToUpdates === 'true'
        });

        // Prepare attachments
        const attachments = file ? [{ filename: fileName, content: file.buffer }] : [];

        // Send admin email
        await resend.emails.send({
          from: RESEND_FROM,
          to: RESEND_TO,
          subject: `[#${refId}] New Order: ${jobType} - ${name}`,
          html: adminEmailHTML,
          attachments,
        });
        console.log('✅ Admin email sent');

        // Send customer confirmation
        if (email) {
          const customerEmailHTML = generateCustomerEmailHTML(name, jobType);
          await resend.emails.send({
            from: RESEND_FROM,
            to: email,
            subject: `Order Received [#${refId}] - BOMedia`,
            html: customerEmailHTML,
          });
          console.log('✅ Customer confirmation sent');
        }
      } catch (emailError) {
        console.error('⚠️ Email failed:', emailError.message);
      }
    }

    res.json({
      success: true,
      message: 'Order received successfully'
    });

  } catch (error) {
    console.error('❌ Server error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'BOMedia server running',
    timestamp: new Date().toISOString(),
    services: {
      firebase: !!db,
      resend: !!resend,
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 BOMedia Server running on port ${PORT}`);
  console.log(`📦 Firebase: ${db ? 'Connected' : 'Not configured'}`);
  console.log(`📧 Resend: ${resend ? 'Ready' : 'Not configured'}`);
  console.log(`\n✅ Ready to receive submissions!\n`);
});
