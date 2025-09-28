# 🚀 Deployment Guide for Marble Run x LINK Centre

## Deploy to Render.com

### Prerequisites
- GitHub repository with your code
- Firebase project with credentials
- Render.com account

### Step 1: Prepare Environment Variables

You'll need to set these environment variables in Render:

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your-client-cert-url
NODE_ENV=production
```

### Step 2: Deploy on Render.com

1. **Go to [Render.com](https://render.com)** and sign up/login
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**: `kelvin-lee-cl/link-251004`
4. **Configure the service**:
   - **Name**: `marble-run-link-centre`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: `Free` (or upgrade as needed)

5. **Add Environment Variables**:
   - Click "Advanced" → "Environment Variables"
   - Add all the Firebase credentials from your `.env` file
   - Make sure to wrap the private key in quotes

6. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Your app will be available at: `https://your-app-name.onrender.com`

### Step 3: Update Firebase Security Rules

Make sure your Firebase Firestore rules allow public access for the quiz system:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read/write for quiz system
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Step 4: Test Your Deployment

1. Visit your deployed URL
2. Test the quiz system
3. Test the admin dashboard
4. Test the redemption booth
5. Test the public display

### Troubleshooting

- **Build fails**: Check that all dependencies are in `package.json`
- **Environment variables**: Make sure all Firebase credentials are set correctly
- **Database connection**: Verify Firebase project ID and credentials
- **CORS issues**: The server already handles CORS for all origins

### Monitoring

- Check Render dashboard for logs
- Monitor Firebase usage in Firebase console
- Set up alerts for errors if needed

## Alternative Deployment Options

### Vercel (Serverless)
- Good for static sites with API routes
- May need to adapt for session-based auth

### Railway
- Similar to Render
- Easy environment variable management

### Heroku
- Classic PaaS option
- Requires credit card for free tier

## Security Considerations

- Never commit `.env` files to Git
- Use environment variables for all secrets
- Regularly rotate Firebase service account keys
- Monitor Firebase usage and costs
