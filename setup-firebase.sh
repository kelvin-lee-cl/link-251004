#!/bin/bash

echo "🔥 Firebase Setup Script for Team Registration"
echo "=============================================="
echo ""

echo "📋 To enable Firebase for team registration, you need to:"
echo ""
echo "1. Go to Firebase Console: https://console.firebase.google.com/"
echo "2. Select project: link-251004"
echo "3. Go to Project Settings (gear icon) → Service Accounts"
echo "4. Click 'Generate new private key' and download the JSON file"
echo "5. Extract the credentials from the JSON file"
echo ""

echo "🔧 Then run these commands with your actual credentials:"
echo ""
echo "export FIREBASE_PRIVATE_KEY=\"-----BEGIN PRIVATE KEY-----\\nYOUR_ACTUAL_PRIVATE_KEY\\n-----END PRIVATE KEY-----\\n\""
echo "export FIREBASE_CLIENT_EMAIL=\"firebase-adminsdk-xxxxx@link-251004.iam.gserviceaccount.com\""
echo "export FIREBASE_PRIVATE_KEY_ID=\"your-private-key-id\""
echo "export FIREBASE_CLIENT_ID=\"your-client-id\""
echo ""
echo "🚀 Then start the server:"
echo "node server.js"
echo ""
echo "✅ You should see: 'Firebase initialized successfully with real credentials'"
echo ""

# Check if environment variables are already set
if [ ! -z "$FIREBASE_PRIVATE_KEY" ] && [ "$FIREBASE_PRIVATE_KEY" != "-----BEGIN PRIVATE KEY-----\nDUMMY_KEY\n-----END PRIVATE KEY-----\n" ]; then
    echo "✅ Firebase credentials are already set!"
    echo "Starting server..."
    node server.js
else
    echo "❌ Firebase credentials not set. Please follow the steps above."
fi
