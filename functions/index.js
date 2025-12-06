import { onRequest } from "firebase-functions/v2/https";
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { Resend } from 'resend';

// Helper to keep the function warm or handle cold starts
// Note: Cloud Functions v2 supports .env files automatically if they exist in functions/ directory

// Load environment variables (fallback if not loaded by Firebase)
dotenv.config();

const app = express();

// Initialize Firebase Admin
let adminApp;
try {
    // In Cloud Functions, initializeApp() automatically uses the default service account credentials
    // No need for manual cert() or private keys!
    adminApp = initializeApp({
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
    console.log('✅ Firebase Admin initialized (ADC)');
} catch (error) {
    // If already initialized
    console.log('Using existing Firebase Admin app');
}

// Get services (singleton style pattern for functions)
// Note: In functions, we often initialize outside the handler to reuse connections across invocations
const db = getFirestore(); // Uses default app
const storage = getStorage();

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
app.use(cors({ origin: true })); // Allow all origins for simplicity, or lock down to your domain
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads (store in memory)
// Cloud Functions: Write to /tmp is allowed, but memoryStorage is cleaner for small files.
// Caution: Cloud Functions has memory limits (default 256MB). Large files might crash it.
// We accepted 25MB files. We might need to increase function memory in firebase.json or options.
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // Reduced to 10MB safety limit for default function memory
    },
});

// Email template generator
function generateAdminEmailHTML({ name, phone, email, jobType, message, fileName, fileSize, agreeToUpdates }) {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; }
  </style>
</head>
<body>
  <h1>🎨 New Print Order Request</h1>
  <p><strong>BOMedia Large Format Printing</strong></p>
  <hr />
  <p><strong>CUSTOMER NAME:</strong> ${name}</p>
  <p><strong>PHONE:</strong> ${phone} <a href="https://wa.me/${phone.replace(/\D/g, '').replace(/^0/, '234')}">Start Chat ↗</a></p>
  ${email ? `<p><strong>EMAIL:</strong> ${email}</p>` : ''}
  <p><strong>JOB TYPE:</strong> ${jobType}</p>
  <p><strong>MESSAGE:</strong></p>
  <pre>${message}</pre>
  ${fileName ? `<p><strong>ARTWORK:</strong> ${fileName} (${(fileSize / 1024).toFixed(2)} KB)</p>` : ''}
  <hr />
  ${agreeToUpdates ? '<p>✓ Customer agreed to receive order updates</p>' : ''}
</body>
</html>`;
}

function generateCustomerEmailHTML(name, jobType) {
    return `
<!DOCTYPE html>
<html>
<body>
  <h1>✅ Order Received!</h1>
  <p>Thanks for your order, ${name}!</p>
  <p>We have received your request for a <strong>${jobType}</strong>.</p>
  <p>Our team will review your details and artwork, and we'll get back to you shortly with a price.</p>
  <hr />
  <p><strong>Broad Options Media</strong><br>Lagos, Nigeria</p>
  <p><a href="https://wa.me/2348022247567">WhatsApp: +234 802 224 7567</a></p>
</body>
</html>`;
}

// Contact form endpoint
// Note: Path is '/' because the function name 'api' will be the prefix.
// If rewrite is /api/** -> function api, then /api/contact hits this function at /contact
app.post('/contact', upload.single('file'), async (req, res) => {
    try {
        const { name, phone, email, jobType, message, agreeToUpdates } = req.body;
        const file = req.file;
        const refId = Math.random().toString(36).substring(2, 7).toUpperCase();

        // Validate required fields
        if (!name || !phone || !jobType || !message) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        let fileUrl = null;
        let fileName = null;
        let fileSize = null;

        if (file) {
            fileName = file.originalname;
            fileSize = file.size;
            // In Cloud Functions, file processing is tricky without direct Storage access to 'upload' stream
            // But since we use firebase-admin, we can write the buffer
            try {
                const bucket = storage.bucket();
                const timestamp = Date.now();
                const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
                const storagePath = `submissions/${jobType.replace(/\W/g, '')}/${timestamp}_${sanitizedFileName}`;
                const fileUpload = bucket.file(storagePath);
                await fileUpload.save(file.buffer, {
                    metadata: { contentType: file.mimetype },
                });
                await fileUpload.makePublic(); // Optional, depending on rules
                fileUrl = fileUpload.publicUrl();
            } catch (e) {
                console.error("Upload error", e);
            }
        }

        // Firestore
        try {
            await db.collection('submissions').add({
                refId, name, phone, email: email || '', jobType, message,
                agreeToUpdates: agreeToUpdates === 'true',
                fileUrl, fileName, fileSize,
                createdAt: new Date().toISOString(),
                status: 'new',
            });
        } catch (e) {
            console.error("Firestore error", e);
        }

        // Email
        if (resend) {
            try {
                const attachments = file ? [{ filename: fileName, content: file.buffer }] : [];
                // Admin Email
                await resend.emails.send({
                    from: RESEND_FROM,
                    to: RESEND_TO,
                    subject: `[#${refId}] New Order: ${jobType} - ${name}`,
                    html: generateAdminEmailHTML({ name, phone, email, jobType, message, fileName, fileSize, agreeToUpdates: agreeToUpdates === 'true' }),
                    attachments
                });
                // Customer Email
                if (email) {
                    await resend.emails.send({
                        from: RESEND_FROM,
                        to: email,
                        subject: `Order Received [#${refId}] - BOMedia`,
                        html: generateCustomerEmailHTML(name, jobType)
                    });
                }
            } catch (e) {
                console.error("Email error", e);
            }
        }

        res.json({ success: true, message: 'Order received', refId });

    } catch (error) {
        console.error('SERVER ERROR:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', environment: 'firebase-functions' });
});

// Export the Express app as a Cloud Function
// Memory option: Set to 512MB or 1GB to handle file uploads better
export const api = onRequest({ memory: "512MiB", timeoutSeconds: 60 }, app);
