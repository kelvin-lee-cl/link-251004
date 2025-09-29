# 🚀 Deployment Guide - Marble Run Link Centre

## Deploy to Render.com

### 1. Prerequisites
- GitHub repository with your code
- Render.com account
- Firebase project with Firestore enabled

### 2. Environment Variables Setup

In your Render.com dashboard, set these environment variables:

#### Required Firebase Variables:
- `FIREBASE_PRIVATE_KEY` - Your Firebase service account private key
- `FIREBASE_CLIENT_EMAIL` - Your Firebase service account email
- `FIREBASE_PRIVATE_KEY_ID` - Your Firebase private key ID
- `FIREBASE_CLIENT_ID` - Your Firebase client ID

#### Optional:
- `SESSION_SECRET` - Random string for session security (auto-generated if not provided)
- `NODE_ENV` - Set to "production" (automatically set by Render)

### 3. Deployment Steps

1. **Connect Repository**: Connect your GitHub repository to Render.com
2. **Service Configuration**:
   - **Name**: marble-run-link-centre
   - **Runtime**: Node.js
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
3. **Environment Variables**: Add all required Firebase credentials
4. **Deploy**: Click "Create Web Service"

### 4. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (link-251004)
3. Go to **Project Settings** > **Service Accounts**
4. Generate a new private key
5. Use the downloaded JSON file values for the environment variables

### 5. Post-Deployment

1. **Health Check**: Visit `https://your-app-name.onrender.com/api/test`
2. **Login Test**: Try logging in with M514
3. **Admin Panel**: Access the admin panel to verify functionality

### 6. Troubleshooting

- **Port Issues**: Render automatically sets PORT=10000
- **CORS Issues**: Domain should be automatically allowed
- **Firebase Connection**: Verify credentials are correct
- **Session Issues**: Check SESSION_SECRET is set

### 7. Features Available After Deployment

✅ **User Authentication** - Login system with passcodes
✅ **Quiz System** - Interactive quizzes with scoring
✅ **Team Management** - Team registration and progress tracking
✅ **Admin Panel** - Complete administrative interface
✅ **User Management** - View all users and their activity
✅ **Passcode Randomization** - Admin can randomize all passcodes
✅ **CSV Export** - Export user credentials
✅ **Firebase Integration** - Real-time data storage

## 🔧 Configuration Files

- `render.yaml` - Render.com deployment configuration
- `server.js` - Main application server
- `package.json` - Node.js dependencies

## 📊 API Endpoints

All endpoints are available at `https://your-app-name.onrender.com`:

- `GET /api/test` - Health check
- `POST /api/login` - User authentication
- `GET /api/auth-status` - Check authentication status
- `GET /api/admin/passcodes` - Get all passcodes (admin only)
- `POST /api/admin/randomize-passcodes` - Randomize passcodes (admin only)
- `GET /api/admin/export-csv` - Export user credentials as CSV (admin only)

## 🔐 Security Notes

- Firebase credentials are stored securely as Render secrets
- Session cookies are HTTP-only and secure in production
- Admin functions require proper authentication
- CORS is configured for production domains

## 📝 Admin Access

- **Admin User**: M514 (User ID: 201)
- **Admin Panel**: Automatically available after login
- **Features**: User management, quiz editing, data reset, CSV export