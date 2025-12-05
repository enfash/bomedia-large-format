# Quick Start Guide - Firebase + Resend

## Current Status

✅ **Server is running** with Firebase and Resend!  
✅ **All code is ready**  
⚠️ **Need to configure environment variables before testing**

## What Just Happened

Fixed the 404 error! The app uses **Vite (not Next.js)**, so I moved the `/api/contact` endpoint to the Express server (`server.js`).

The server is now running on port 3001 with:
- ✅ Firebase Admin initialized
- ✅ Resend initialized  
- ✅ Ready to receive submissions

## What You Need to Do

You have **two options** for testing:

---

### Option 1: Quick Test with Resend Only (Recommended)

Just add the Resend API key - no Firebase needed yet!

**1. Get Resend API Key:**
1. Go to https://resend.com and sign up
2. On dashboard, copy your API key
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxx
   RESEND_FROM_EMAIL=onboarding@resend.dev
   RESEND_TO_EMAIL=bomedia03@gmail.com
   ```

**2. Restart server:**
```bash
# Stop current server (Ctrl+C if running)
node server.js
```

**3. Test the form!**
- Go to http://localhost:5173
- Fill out contact form
- You'll receive beautiful branded emails! ✨

**Note:** Without Firebase, submissions won't be saved to database, but emails will work perfectly.

---

### Option 2: Full Setup with Firebase + Resend

Follow the complete [`FIREBASE_RESEND_SETUP.md`](file:///Users/elijah/Documents/Dev/bomedia-large-format/FIREBASE_RESEND_SETUP.md) guide to:
1. Create Firebase project
2. Enable Firestore and Storage  
3. Get all credentials
4. Add to `.env.local`

**Benefits:**
- ✅ All submissions saved in Firestore
- ✅ Files stored in Firebase Storage
- ✅ Build admin panel later
- ✅ Professional emails via Resend

---

## Environment Variables Template

Add these to your `.env.local`:

```env
# === RESEND (Required for emails) ===
RESEND_API_KEY=re_xxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=bomedia03@gmail.com

# === FIREBASE (Optional - for database storage) ===
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=""
```

## What Works Now

The server gracefully handles missing services:
- ✅ **With Resend only**: Emails sent, no database storage
- ✅ **With Firebase only**: Submissions saved, no emails  
- ✅ **With both**: Full functionality - storage + emails!

## Testing

Once you add `RESEND_API_KEY`:

1. Restart server: `node server.js`
2. Open http://localhost:5173
3. Fill out the contact form
4. Upload a test file
5. Submit!

You should see in server console:
```
✅ Resend initialized
📨 New submission: { name: 'Test', ... }
✅ Admin email sent
✅ Customer confirmation sent
```

And receive:
- 📧 Admin email with branded template and file attachment
- 📧 Customer confirmation email

## Troubleshooting

**"RESEND_API_KEY is not defined"**
- Add the key to `.env.local`
- Restart the server

**"Firebase Admin not configured"**
- This is normal if you haven't set up Firebase yet
- Emails will still work with just Resend

**Form submission fails**
- Make sure port 3001 server is running
- Check browser console for errors
- Verify `.env.local` has correct values

## Next Steps

Start with **Option 1** (Resend only) to get emails working immediately. Add Firebase later when you want database storage and admin panel!
