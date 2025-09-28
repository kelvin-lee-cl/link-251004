# 🔥 Firebase Environment Variables Setup

## Current Issue
Your server is running with "No real Firebase credentials found, using memory storage only" because the Firebase environment variables are not set.

## Quick Fix - Set Environment Variables

### Step 1: Get Firebase Credentials
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **link-251004**
3. Click gear icon (⚙️) → **Project Settings**
4. Go to **Service Accounts** tab
5. Click **"Generate new private key"**
6. Download the JSON file

### Step 2: Extract Values from JSON
Open the downloaded JSON file and find these values:
```json
{
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@link-251004.iam.gserviceaccount.com",
  "private_key_id": "your-private-key-id",
  "client_id": "your-client-id"
}
```

### Step 3: Set Environment Variables

#### Option A: Terminal Commands (Recommended)
```bash
export FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
export FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@link-251004.iam.gserviceaccount.com"
export FIREBASE_PRIVATE_KEY_ID="your-private-key-id"
export FIREBASE_CLIENT_ID="your-client-id"

# Then start the server
node server.js
```

#### Option B: Create .env file
1. Create a file called `.env` in your project root
2. Add these lines (replace with your actual values):
```
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@link-251004.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY_ID="your-private-key-id"
FIREBASE_CLIENT_ID="your-client-id"
```

3. Install dotenv: `npm install dotenv`
4. The server will automatically load these variables

### Step 4: Verify Connection
After setting up, you should see in the server logs:
```
✅ Firebase initialized successfully with real credentials
✅ Team registered successfully in Firebase
```

Instead of:
```
❌ No real Firebase credentials found, using memory storage only
```

## Test Team Registration
1. Start the server with Firebase credentials
2. Go to http://localhost:3000
3. Login with a valid passcode (1-16)
4. Register a team
5. Check Firebase Console → Firestore Database → teams collection

## Troubleshooting

### "Invalid PEM formatted message"
- Make sure your private key includes `\n` characters
- The key should look like: `"-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"`

### "Permission denied"
- Make sure your service account has Firestore permissions
- Check Firebase Console → Firestore Database → Rules

### "Project not found"
- Verify the project ID is `link-251004`
- Check the client_email matches your project

## Security Notes
- Never commit the `.env` file to git
- Keep your service account JSON file secure
- These credentials give full access to your Firebase project
