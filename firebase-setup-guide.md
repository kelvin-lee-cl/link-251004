# 🔥 Firebase Setup Guide

## Step 1: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `link-251004`
3. Click the gear icon (⚙️) → **Project Settings**
4. Go to **Service Accounts** tab
5. Click **"Generate new private key"**
6. Download the JSON file (keep it secure!)

## Step 2: Extract Credentials from JSON

Open the downloaded JSON file and find these values:

```json
{
  "type": "service_account",
  "project_id": "link-251004",
  "private_key_id": "YOUR_PRIVATE_KEY_ID",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@link-251004.iam.gserviceaccount.com",
  "client_id": "YOUR_CLIENT_ID",
  ...
}
```

## Step 3: Set Environment Variables

### Option A: Using Terminal (Recommended)

```bash
# Set the environment variables
export FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
export FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@link-251004.iam.gserviceaccount.com"
export FIREBASE_PRIVATE_KEY_ID="your-private-key-id"
export FIREBASE_CLIENT_ID="your-client-id"

# Start the server
node server.js
```

### Option B: Using .env file

1. Create a file called `.env` in your project root
2. Add these lines:

```
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@link-251004.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY_ID="your-private-key-id"
FIREBASE_CLIENT_ID="your-client-id"
```

3. Install dotenv: `npm install dotenv`
4. Add to server.js: `require('dotenv').config();`

## Step 4: Test Firebase Connection

After setting up, you should see in the server logs:
```
Firebase initialized successfully with real credentials
Team registered successfully in Firebase
```

## Step 5: Verify Data in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `link-251004`
3. Go to **Firestore Database**
4. You should see a `teams` collection with your registered teams

## Troubleshooting

- **"Invalid PEM formatted message"**: Check that your private key includes `\n` characters
- **"Permission denied"**: Make sure your service account has Firestore permissions
- **"Project not found"**: Verify the project ID is `link-251004`

## Security Notes

- Never commit the `.env` file to git
- Keep your service account JSON file secure
- Consider using Firebase App Check for production
