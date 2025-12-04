# Email Setup Instructions (Domain SMTP)

## Quick Start

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` and fill in your credentials:**
   - `EMAIL_USER`: `mail.domainname.com`
   - `EMAIL_PASS`: Your email account password
   - `EMAIL_RECIPIENT`: `yourgmail@gmail.com` (forwarding destination)

## Configuration Details

### Domain SMTP Settings (BOMedia)
```env
EMAIL_HOST=mail.domainname.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=hostmail
EMAIL_PASS=your-password-here
EMAIL_RECIPIENT=yourgmail@gmail.com
PORT=3001
```

### Important Rules
1. **From Address:** Emails are sent from `"Broad Options Media" <info@bomedia.ng>`. This MUST match the authenticated user (`EMAIL_USER`) to avoid spam filters.
2. **Forwarding:** Emails are sent to `EMAIL_RECIPIENT` (your Gmail). Ensure forwarding is set up in cPanel if you want copies elsewhere.
3. **Ports:** Use port **465** with `EMAIL_SECURE=true` (SSL). Do not use port 587 or TLS.

### Dual Email System
The system now sends two emails per order:
1. **Admin Notification:** Rich HTML email sent to `EMAIL_RECIPIENT` with full order details and attachments.
2. **Customer Confirmation:** Polite confirmation email sent to the customer's email address.

## Running the Application

You need to run **two servers** simultaneously:

### Terminal 1: Backend Email Server
```bash
npm run server
```
This starts the Express server on port 3001

### Terminal 2: Frontend Development Server
```bash
npm run dev
```
This starts Vite on port 5173

## Troubleshooting

### "SMTP Connection Failed"
- Verify your password in `.env.local`
- Ensure `EMAIL_HOST` is reachable (no firewall blocking port 465)
- Check that the email account `info@bomedia.ng` exists and is active

### Backend server not starting
- Run `npm install` to install dependencies
- Check that `.env.local` exists
- Verify port 3001 is not already in use

### Form submission fails
- Ensure both servers are running
- Check browser console for errors
- Verify proxy is working (should forward to port 3001)
