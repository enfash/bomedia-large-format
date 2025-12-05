# Firebase + Resend Setup Guide

## Overview

Your contact form now uses:
- **Firebase Firestore** - Stores all submissions
- **Firebase Storage** - Stores uploaded files
- **Resend** - Sends professional branded emails

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Name it "bomedia-large-format"
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In Firebase Console, click "Firestore Database" in left menu
2. Click "Create database"
3. Select "Production mode"
4. Choose location (e.g., "us-central1")
5. Click "Enable"

## Step 3: Enable Firebase Storage

1. In Firebase Console, click "Storage" in left menu
2. Click "Get started"
3. Click "Next" (use default security rules)
4. Click "Done"

## Step 4: Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ → "Project settings"
2. Scroll down to "Your apps" section
3. Click the Web icon `</>`
4. Register app with nickname "bomedia-web"
5. Copy the `firebaseConfig` object values
6. Add these to your `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=bomedia-large-format.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=bomedia-large-format
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=bomedia-large-format.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Step 5: Get Firebase Admin Credentials

1. In Firebase Console → Project Settings
2. Click "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Open the JSON file and copy these values to `.env.local`:

```env
FIREBASE_ADMIN_PROJECT_ID=bomedia-large-format
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@bomedia-large-format.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourKeyHere\n-----END PRIVATE KEY-----\n"
```

**Important:** Keep the quotes around FIREBASE_ADMIN_PRIVATE_KEY and preserve the `\n` characters!

## Step 6: Create Resend Account

1. Go to https://resend.com
2. Click "Sign Up"
3. Verify your email
4. Once logged in, you'll see your API key

## Step 7: Configure Resend

1. Copy your API key from Resend dashboard
2. Add to `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
```

### Option A: Use Test Email (For Testing)

```env
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=bomedia03@gmail.com
```

### Option B: Verify Your Domain (For Production)

1. In Resend dashboard, click "Domains"
2. Click "Add Domain"
3. Enter `bomedia.ng`
4. Add DNS records shown to your domain provider
5. Wait for verification
6. Then use:

```env
RESEND_FROM_EMAIL=info@bomedia.ng
RESEND_TO_EMAIL=bomedia03@gmail.com
```

## Step 8: Update .env.local

Your complete `.env.local` should look like:

```env
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=bomedia-large-format.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=bomedia-large-format
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=bomedia-large-format.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxx

# Firebase Admin Configuration
FIREBASE_ADMIN_PROJECT_ID=bomedia-large-format
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@bomedia-large-format.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourKeyHere\n-----END PRIVATE KEY-----\n"

# Resend Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=bomedia03@gmail.com
```

## Step 9: Test the Form

1. Restart your dev server: `npm run dev`
2. Navigate to http://localhost:5173
3. Fill out the contact form
4. Upload a test file
5. Submit

## Verify Everything Works

1. **Check Firestore Console** - You should see a new document in "submissions" collection
2. **Check Storage Console** - You should see the uploaded file in "submissions/" folder
3. **Check Email** - You should receive the branded email in your inbox
4. **Check Console Logs** - Should show "✅ Submission saved to Firestore" and "✅ Admin email sent"

## Troubleshooting

### "Firebase: Error initializing Firebase"
- Check that all `NEXT_PUBLIC_FIREBASE_*` variables are set correctly
- Make sure there are no extra spaces or quotes

### "RESEND_API_KEY is not defined"
- Verify `RESEND_API_KEY` is in `.env.local`
- Restart dev server after adding env variables

### "Permission denied" for Storage
- Ensure you created the Firebase Admin service account
- Check `FIREBASE_ADMIN_PRIVATE_KEY` is properly formatted with `\n` characters

### Email not received
- Check spam folder
- Verify `RESEND_TO_EMAIL` is correct
- If using custom domain, ensure DNS records are verified
- Use `onboarding@resend.dev` for testing

## What's Next?

Once everything works:
1. ✅ You can view all submissions in Firebase Console
2. ✅ Build an admin panel later to manage inquiries
3. ✅ Download files anytime from Storage
4. ✅ Emails are delivered reliably with professional branding
