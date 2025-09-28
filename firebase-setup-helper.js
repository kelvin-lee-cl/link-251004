#!/usr/bin/env node

console.log('🔥 Firebase Setup Helper for Team Registration');
console.log('==============================================');
console.log('');

console.log('📋 Current Status:');
console.log('❌ Firebase environment variables are NOT set');
console.log('❌ Team registration is using memory storage only');
console.log('');

console.log('🔧 To fix this, you need to:');
console.log('');
console.log('1. Go to Firebase Console: https://console.firebase.google.com/');
console.log('2. Select project: link-251004');
console.log('3. Go to Project Settings (gear icon) → Service Accounts');
console.log('4. Click "Generate new private key" and download the JSON file');
console.log('5. Extract the credentials from the JSON file');
console.log('');

console.log('📝 Then add these to your .env file:');
console.log('');
console.log('FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_ACTUAL_PRIVATE_KEY\\n-----END PRIVATE KEY-----\\n"');
console.log('FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@link-251004.iam.gserviceaccount.com"');
console.log('FIREBASE_PRIVATE_KEY_ID="your-private-key-id"');
console.log('FIREBASE_CLIENT_ID="your-client-id"');
console.log('');

console.log('🚀 After setting up, restart the server and you should see:');
console.log('✅ Firebase initialized successfully with real credentials');
console.log('✅ Team registered successfully in Firebase');
console.log('');

// Check current environment
const hasFirebaseKey = process.env.FIREBASE_PRIVATE_KEY &&
    process.env.FIREBASE_PRIVATE_KEY !== "-----BEGIN PRIVATE KEY-----\nDUMMY_KEY\n-----END PRIVATE KEY-----\n";

if (hasFirebaseKey) {
    console.log('✅ Firebase credentials are already set!');
} else {
    console.log('❌ Firebase credentials not found. Please follow the steps above.');
}
