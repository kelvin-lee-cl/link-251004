const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const multer = require('multer');
const FormData = require('form-data');
const session = require('express-session');
const admin = require('firebase-admin');

// Session store for production - use Redis in production, MemoryStore in development
const MemoryStore = require('memorystore')(session);
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');

// Load environment variables from .env file if it exists
try {
    require('dotenv').config();
    console.log('📁 Loaded environment variables from .env file');
} catch (error) {
    console.log('📁 No .env file found, using system environment variables');
}
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit for AI API compatibility
const app = express();

// Enable CORS for all routes with credentials
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow localhost for development (more permissive)
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
            return callback(null, true);
        }

        // Allow deployed domains (Render, production)
        if (origin.includes('onrender.com') || origin.includes('link-251004') || origin.includes('marble-run-link-centre')) {
            return callback(null, true);
        }

        // Allow file:// protocol for development (when opening HTML directly)
        if (origin.startsWith('file://')) {
            return callback(null, true);
        }

        // Allow specific development domains
        const allowedOrigins = [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'http://localhost:10000',
            'https://link-251004.onrender.com',
            'https://marble-run-link-centre.onrender.com'
        ];

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // For development, be more permissive
        if (process.env.NODE_ENV !== 'production') {
            console.log('Development mode - allowing origin:', origin);
            return callback(null, true);
        }

        // Reject other origins
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session store based on environment
let sessionStore;
if (false) { // TEMPORARILY DISABLE REDIS - Force MemoryStore to fix authentication
    // Use Redis in production
    const redisClient = createClient({
        url: process.env.REDIS_URL,
        legacyMode: true
    });
    redisClient.connect().catch(console.error);
    sessionStore = new RedisStore({ client: redisClient });
    console.log('Using Redis session store for production');
} else {
    // Use MemoryStore in development AND production (temporary fix)
    sessionStore = new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
        max: 1000, // max sessions
        ttl: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        dispose: function (key, value) {
            console.log('Session disposed:', key);
        },
        errorHandler: function (error) {
            console.error('Session store error:', error);
        }
    });
    console.log('Using MemoryStore for development AND production (temporary fix)');
}

// Session configuration - Production-optimized with explicit settings
const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'link-stem-workshop-2025',
    resave: true, // Resave session on each request to ensure persistence
    saveUninitialized: false, // Don't create session until something stored
    name: 'sessionId', // Custom session name
    rolling: false, // Don't reset expiration on each request
    cookie: {
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        httpOnly: true, // Prevent XSS attacks
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'lax', // CSRF protection
        path: '/', // Ensure cookie is available for all paths
    },
    store: sessionStore
};

console.log('Session configuration:', sessionConfig);
app.use(session(sessionConfig));

// Initialize Firebase Admin SDK
let db;
try {
    // Try to use environment variables first, then fallback to default config
    const serviceAccount = {
        "type": "service_account",
        "project_id": "link-251004",
        "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID || "dummy-key-id",
        "private_key": (process.env.FIREBASE_PRIVATE_KEY || "-----BEGIN PRIVATE KEY-----\nDUMMY_KEY\n-----END PRIVATE KEY-----\n").replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk-xxxxx@link-251004.iam.gserviceaccount.com",
        "client_id": process.env.FIREBASE_CLIENT_ID || "123456789",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk-xxxxx@link-251004.iam.gserviceaccount.com"}`
    };

    // Check if we have real credentials (not dummy ones)
    const hasRealCredentials = process.env.FIREBASE_PRIVATE_KEY &&
        process.env.FIREBASE_PRIVATE_KEY !== "-----BEGIN PRIVATE KEY-----\nDUMMY_KEY\n-----END PRIVATE KEY-----\n" &&
        process.env.FIREBASE_CLIENT_EMAIL &&
        process.env.FIREBASE_CLIENT_EMAIL !== "firebase-adminsdk-xxxxx@link-251004.iam.gserviceaccount.com";

    if (hasRealCredentials) {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://link-251004-default-rtdb.firebaseio.com"
            });
        }
        db = admin.firestore();
        console.log('Firebase initialized successfully with real credentials');
    } else {
        console.log('No real Firebase credentials found, using memory storage only');
        console.log('To enable Firebase, set FIREBASE_PRIVATE_KEY and FIREBASE_CLIENT_EMAIL environment variables');
    }
} catch (error) {
    console.error('Firebase initialization failed:', error.message);
    console.log('Running without Firebase - teams will be stored in memory only');
}

// Initialize in-memory storage as fallback
if (!global.teamsData) {
    global.teamsData = [];
}

// Initialize user login tracking storage
if (!global.userLoginData) {
    global.userLoginData = [];
}

// Log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Serve static files - prioritize public/static for root routes, fallback to public
app.use('/', express.static('public/static'));
app.use(express.static('public'));

// Passcode to user mapping (same as frontend)
const passcodeToUser = {
    // First set (1-35)
    'A1B2': '1', 'C3D4': '2', 'E5F6': '3', 'G7H8': '4', 'J9K1': '5',
    'L2M3': '6', 'N4Q5': '7', 'R6S7': '8', 'T8U9': '9', 'V1W2': '10',
    'X3Y4': '11', 'Z5A6': '12', 'B7C8': '13', 'D9E1': '14', 'F2G3': '15',
    'H4J5': '16', 'K6L7': '17', 'M8N9': '18', 'Q1R2': '19', 'S3T4': '20',
    'U5V6': '21', 'W7X8': '22', 'Y9Z1': '23', 'A2B3': '24', 'C4D5': '25',
    'E6F7': '26', 'G8H9': '27', 'J1K2': '28', 'L3M4': '29', 'N5Q6': '30',
    'R7S8': '31', 'T9U1': '32', 'V2W3': '33', 'X4Y5': '34', 'Z6A7': '35',
    // Second set (36-71)
    'B8C9': '36', 'D1E2': '37', 'F3G4': '38', 'H5J6': '39', 'K7L8': '40',
    'M9N1': '41', 'Q2R3': '42', 'S4T5': '43', 'U6V7': '44', 'W8X9': '45',
    'Y1Z2': '46', 'A3B4': '47', 'C5D6': '48', 'E7F8': '49', 'G9H1': '50',
    'J2K3': '51', 'L4M5': '52', 'N6Q7': '53', 'R8S9': '54', 'T1U2': '55',
    'V3W4': '56', 'X5Y6': '57', 'Z7A8': '58', 'B9C1': '59', 'D2E3': '60',
    'F4G5': '61', 'H6J7': '62', 'K8L9': '63', 'M1N2': '64', 'Q3R4': '65',
    'S5T6': '66', 'U7V8': '67', 'W9X1': '68', 'Y2Z3': '69', 'A4B5': '70',
    'C6D7': '71',
    // Third set (72-107)
    'E8F9': '72', 'G1H2': '73', 'J3K4': '74', 'L5M6': '75', 'N7Q8': '76',
    'R9S1': '77', 'T2U3': '78', 'V4W5': '79', 'X6Y7': '80', 'Z8A9': '81',
    'B1C2': '82', 'D3E4': '83', 'F5G6': '84', 'H7J8': '85', 'K9L1': '86',
    'M2N3': '87', 'Q4R5': '88', 'S6T7': '89', 'U8V9': '90', 'W1X2': '91',
    'Y3Z4': '92', 'A5B6': '93', 'C7D8': '94', 'E9F1': '95', 'G2H3': '96',
    'J4K5': '97', 'L6M7': '98', 'N8Q9': '99', 'R1S2': '100', 'T3U4': '101',
    'V5W6': '102', 'X7Y8': '103', 'Z9A1': '104', 'B2C3': '105', 'D4E5': '106',
    'F6G7': '107',
    // Fourth set (108-143)
    'H8J9': '108', 'K1L2': '109', 'M3N4': '110', 'Q5R6': '111', 'S7T8': '112',
    'U9V1': '113', 'W2X3': '114', 'Y4Z5': '115', 'A6B7': '116', 'C8D9': '117',
    'E1F2': '118', 'G3H4': '119', 'J5K6': '120', 'L7M8': '121', 'N9Q1': '122',
    'R2S3': '123', 'T4U5': '124', 'V6W7': '125', 'X8Y9': '126', 'Z1A2': '127',
    'B3C4': '128', 'D5E6': '129', 'F7G8': '130', 'H9J1': '131', 'K2L3': '132',
    'M4N5': '133', 'Q6R7': '134', 'S8T9': '135', 'U1V2': '136', 'W3X4': '137',
    'Y5Z6': '138', 'A7B8': '139', 'C9D1': '140', 'E2F3': '141', 'G4H5': '142',
    'J6K7': '143',
    // Fifth set (144-179)
    'L8M9': '144', 'N1Q2': '145', 'R3S4': '146', 'T5U6': '147', 'V7W8': '148',
    'X9Y1': '149', 'Z2A3': '150', 'B4C5': '151', 'D6E7': '152', 'F8G9': '153',
    'H1J2': '154', 'K3L4': '155', 'M5N6': '156', 'Q7R8': '157', 'S9T1': '158',
    'U2V3': '159', 'W4X5': '160', 'Y6Z7': '161', 'A8B9': '162', 'C1D2': '163',
    'E3F4': '164', 'G5H6': '165', 'J7K8': '166', 'L9M1': '167', 'N2Q3': '168',
    'R4S5': '169', 'T6U7': '170', 'V8W9': '171', 'X1Y2': '172', 'Z3A4': '173',
    'B5C6': '174', 'D7E8': '175', 'F9G1': '176', 'H2J3': '177', 'K4L5': '178',
    'M6N7': '179',
    // Sixth set (180-200)
    'Q8R9': '180', 'S1T2': '181', 'U3V4': '182', 'W5X6': '183', 'Y7Z8': '184',
    'A9B1': '185', 'C2D3': '186', 'E4F5': '187', 'G6H7': '188', 'J8K9': '189',
    'L1M2': '190', 'N3Q4': '191', 'R5S6': '192', 'T7U8': '193', 'V9W1': '194',
    'X2Y3': '195', 'Z4A5': '196', 'B6C7': '197', 'D8E9': '198', 'F1G2': '199',
    'H3J4': '200', 'M514': '201'
};

// Authentication middleware - Enhanced debugging for session issues
function requireAuth(req, res, next) {
    console.log('=== REQUIRE AUTH CHECK ===');
    console.log('Session ID:', req.sessionID);
    console.log('Session exists:', !!req.session);
    console.log('Session keys:', req.session ? Object.keys(req.session) : 'No session');
    console.log('Session data:', req.session);
    console.log('userId in session:', req.session ? req.session.userId : 'No session');
    console.log('Request cookies:', req.headers.cookie);
    console.log('Session store type:', req.sessionStore ? req.sessionStore.constructor.name : 'Unknown');

    // Check if this is a new session or existing one
    if (req.session && Object.keys(req.session).length === 1 && req.session.cookie) {
        console.log('🔍 New session detected - only cookie data present');
    }

    // Debug session store operations
    if (req.sessionStore) {
        console.log('🔍 Session store info:');
        console.log('  - Store has session?', req.sessionStore);
        if (typeof req.sessionStore.get === 'function') {
            req.sessionStore.get(req.sessionID, (err, sessionData) => {
                console.log('  - Raw session data from store:', err ? err.message : sessionData);
                if (sessionData && sessionData.userId) {
                    console.log('  - userId found in raw store data:', sessionData.userId);
                } else {
                    console.log('  - No userId in raw store data');
                }
            });
        }
    }

    // Simple check: if session exists and has userId, proceed
    if (req.session && req.session.userId) {
        console.log('✅ Authentication passed for user:', req.session.userId);
        return next();
    } else {
        console.log('❌ Authentication failed - no valid session');

        // Additional debugging for session issues
        console.log('🔍 Session debugging:');
        console.log('  - Session object type:', typeof req.session);
        console.log('  - Session constructor:', req.session ? req.session.constructor.name : 'No session');
        console.log('  - Session store type:', req.sessionStore ? req.sessionStore.constructor.name : 'No store');

        return res.status(401).json({
            error: 'Authentication required',
            debug: {
                sessionExists: !!req.session,
                userIdExists: !!(req.session && req.session.userId),
                sessionKeys: req.session ? Object.keys(req.session) : [],
                sessionId: req.sessionID,
                cookies: req.headers.cookie,
                sessionStore: req.sessionStore ? req.sessionStore.constructor.name : 'Unknown',
                timestamp: new Date().toISOString()
            }
        });
    }
}

// User type middleware
function requireUserType(allowedTypes) {
    return (req, res, next) => {
        if (req.session && req.session.userId) {
            const userId = parseInt(req.session.userId);
            const userType = userId <= 16 ? 'marble_run' : 'individual';

            if (allowedTypes.includes(userType)) {
                return next();
            } else {
                return res.status(403).json({
                    error: 'Access denied',
                    message: 'You do not have permission to access this resource',
                    userType: userType
                });
            }
        } else {
            return res.status(401).json({ error: 'Authentication required' });
        }
    };
}

// Login endpoint
app.post('/api/login', (req, res) => {
    console.log('=== ENHANCED LOGIN DEBUG ===');
    console.log('🔍 Request Details:');
    console.log('  - Method:', req.method);
    console.log('  - URL:', req.url);
    console.log('  - Headers:', JSON.stringify(req.headers, null, 2));
    console.log('  - Origin:', req.get('origin'));
    console.log('  - User-Agent:', req.get('user-agent'));
    console.log('  - Request body:', req.body);

    console.log('🔐 Pre-Login Session Analysis:');
    console.log('  - Session ID:', req.sessionID);
    console.log('  - Session exists:', !!req.session);
    console.log('  - Session keys:', req.session ? Object.keys(req.session) : 'No session');
    console.log('  - Session data:', req.session);
    console.log('  - Store type:', req.sessionStore ? req.sessionStore.constructor.name : 'Unknown');

    const { passcode } = req.body;

    if (!passcode) {
        return res.status(400).json({ error: 'Passcode is required' });
    }

    const userId = passcodeToUser[passcode.toUpperCase()];

    if (userId) {
        req.session.userId = userId;
        console.log('=== LOGIN SESSION DEBUG ===');
        console.log('Before save - Session ID:', req.sessionID);
        console.log('Before save - Session keys:', Object.keys(req.session));
        console.log('Before save - Session data:', req.session);

        // Track login time
        const loginData = {
            userId: userId,
            passcode: passcode.toUpperCase(),
            loginTime: new Date().toISOString(),
            sessionId: req.sessionID
        };

        // Save to Firebase or memory
        if (db) {
            try {
                db.collection('userLogins').add(loginData);
                console.log('Login tracked in Firebase for user:', userId);
            } catch (firebaseError) {
                console.warn('Firebase login tracking failed:', firebaseError.message);
                if (!global.userLoginData) global.userLoginData = [];
                global.userLoginData.push(loginData);
            }
        } else {
            if (!global.userLoginData) global.userLoginData = [];
            global.userLoginData.push(loginData);
            console.log('Login tracked in memory for user:', userId);
        }

        // Determine user type based on User ID
        const userType = parseInt(userId) <= 16 ? 'marble_run' : 'individual';
        const userRole = userType === 'marble_run' ? 'Marble Run Game Participant' : 'Individual User';
        const isAdmin = userId === '201'; // M514 is admin user

        console.log(`User ${userId} logged in successfully as ${userRole}${isAdmin ? ' (ADMIN)' : ''}`);
        console.log('Session ID after login:', req.sessionID);
        console.log('Session data after login:', req.session);

        // CRITICAL FIX: Save session BEFORE sending response
        req.session.save((err) => {
            if (err) {
                console.error('❌ Error saving session after login:', err);
                console.error('Session save error details:', err.message);
                return res.status(500).json({
                    success: false,
                    error: 'Session save failed',
                    details: err.message
                });
            } else {
                console.log('✅ Session saved successfully after login');
                console.log('After save - Session ID:', req.sessionID);
                console.log('After save - Session keys:', Object.keys(req.session));
                console.log('After save - Session data:', req.session);

                // Verify the session was saved correctly
                if (req.session.userId) {
                    console.log('✅ userId verified in session after save:', req.session.userId);
                } else {
                    console.error('❌ userId NOT found in session after save!');
                }

                // Send response ONLY after session is saved
                res.json({
                    success: true,
                    userId: userId,
                    userType: userType,
                    userRole: userRole,
                    isAdmin: isAdmin,
                    redirectTo: isAdmin ? '/question-booth.html' : null,
                    message: 'Login successful'
                });
            }
        });
    } else {
        console.log('Invalid passcode provided:', passcode.toUpperCase());
        res.status(401).json({ error: 'Invalid passcode' });
    }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Check authentication status endpoint
app.get('/api/auth-status', (req, res) => {
    console.log('=== ENHANCED AUTH STATUS DEBUG ===');
    console.log('🔍 Request Details:');
    console.log('  - Method:', req.method);
    console.log('  - URL:', req.url);
    console.log('  - Headers:', JSON.stringify(req.headers, null, 2));
    console.log('  - Origin:', req.get('origin'));
    console.log('  - User-Agent:', req.get('user-agent'));
    console.log('  - Referer:', req.get('referer'));

    console.log('🍪 Cookie Analysis:');
    console.log('  - Raw cookies:', req.headers.cookie);
    console.log('  - Parsed cookies:', req.cookies);
    console.log('  - Session cookie name:', req.session ? req.session.cookie.name : 'No session');

    console.log('🔐 Session Analysis:');
    console.log('  - Session ID:', req.sessionID);
    console.log('  - Session exists:', !!req.session);
    console.log('  - Session type:', typeof req.session);
    console.log('  - Session constructor:', req.session ? req.session.constructor.name : 'No session');
    console.log('  - Session keys:', req.session ? Object.keys(req.session) : 'No session');
    console.log('  - Full session data:', JSON.stringify(req.session, null, 2));

    console.log('🏪 Session Store Analysis:');
    console.log('  - Store exists:', !!req.sessionStore);
    console.log('  - Store type:', req.sessionStore ? req.sessionStore.constructor.name : 'No store');
    console.log('  - Store methods:', req.sessionStore ? Object.getOwnPropertyNames(Object.getPrototypeOf(req.sessionStore)) : 'No store');

    console.log('🌍 Environment Analysis:');
    console.log('  - NODE_ENV:', process.env.NODE_ENV);
    console.log('  - PORT:', process.env.PORT);
    console.log('  - REDIS_URL exists:', !!process.env.REDIS_URL);
    console.log('  - SESSION_SECRET exists:', !!process.env.SESSION_SECRET);

    // Enhanced session debugging
    if (req.session) {
        console.log('✅ Session loaded from store');
        console.log('  - Session has userId:', !!req.session.userId);
        console.log('  - Session userId value:', req.session.userId);
        console.log('  - Session keys count:', Object.keys(req.session).length);
        console.log('  - Session cookie settings:', req.session.cookie);
        console.log('  - Session isNew:', req.session.isNew);
        console.log('  - Session isModified:', req.session.isModified);
    } else {
        console.log('❌ No session loaded from store');
        console.log('  - This indicates session middleware is not working');
        console.log('  - Check if session middleware is properly configured');
    }

    // Check for specific authentication issues
    if (!req.session) {
        console.log('🚨 CRITICAL: No session object found');
        console.log('  - Session middleware may not be working');
        console.log('  - Check session configuration');
    } else if (!req.session.userId) {
        console.log('🚨 CRITICAL: Session exists but no userId');
        console.log('  - User may not have logged in');
        console.log('  - Session may have been cleared');
        console.log('  - Check login endpoint');
    }

    if (req.session && req.session.userId) {
        const userId = req.session.userId;
        const userType = parseInt(userId) <= 16 ? 'marble_run' : 'individual';
        const userRole = userType === 'marble_run' ? 'Marble Run Game Participant' : 'Individual User';
        const isAdmin = userId === '201'; // M514 is admin user

        console.log(`✅ User ${userId} is authenticated as ${userRole}${isAdmin ? ' (ADMIN)' : ''}`);
        res.json({
            authenticated: true,
            userId: userId,
            userType: userType,
            userRole: userRole,
            isAdmin: isAdmin,
            debug: {
                sessionId: req.sessionID,
                sessionKeys: Object.keys(req.session),
                storeType: req.sessionStore ? req.sessionStore.constructor.name : 'Unknown'
            }
        });
    } else {
        console.log('❌ User is not authenticated');
        console.log('  - Session exists:', !!req.session);
        console.log('  - userId exists:', !!(req.session && req.session.userId));
        console.log('  - userId value:', req.session ? req.session.userId : 'No session');

        res.json({
            authenticated: false,
            debug: {
                sessionExists: !!req.session,
                userIdExists: !!(req.session && req.session.userId),
                sessionId: req.sessionID,
                sessionKeys: req.session ? Object.keys(req.session) : [],
                storeType: req.sessionStore ? req.sessionStore.constructor.name : 'Unknown',
                cookies: req.headers.cookie,
                environment: {
                    nodeEnv: process.env.NODE_ENV,
                    port: process.env.PORT,
                    redisUrl: !!process.env.REDIS_URL
                }
            }
        });
    }
});

// Debug endpoint to test session creation
app.get('/api/debug-session', (req, res) => {
    console.log('=== DEBUG SESSION ENDPOINT ===');
    console.log('🔍 Current Session State:');
    console.log('  - Session ID:', req.sessionID);
    console.log('  - Session exists:', !!req.session);
    console.log('  - Session keys:', req.session ? Object.keys(req.session) : 'No session');
    console.log('  - Session data:', JSON.stringify(req.session, null, 2));
    console.log('  - Store type:', req.sessionStore ? req.sessionStore.constructor.name : 'Unknown');

    // Test session creation
    console.log('🧪 Testing Session Creation:');
    req.session.testValue = 'debug-test-' + Date.now();
    req.session.debugTimestamp = new Date().toISOString();

    console.log('  - Added test values to session');
    console.log('  - Session after modification:', JSON.stringify(req.session, null, 2));

    // Force save session
    req.session.save((err) => {
        if (err) {
            console.error('❌ Error saving debug session:', err);
            res.json({
                success: false,
                error: 'Session save failed',
                details: err.message,
                sessionId: req.sessionID,
                sessionExists: !!req.session,
                storeType: req.sessionStore ? req.sessionStore.constructor.name : 'Unknown'
            });
        } else {
            console.log('✅ Debug session saved successfully');
            res.json({
                success: true,
                message: 'Debug session created and saved',
                sessionId: req.sessionID,
                sessionData: req.session,
                storeType: req.sessionStore ? req.sessionStore.constructor.name : 'Unknown',
                environment: {
                    nodeEnv: process.env.NODE_ENV,
                    port: process.env.PORT,
                    redisUrl: !!process.env.REDIS_URL
                }
            });
        }
    });
});


// Team registration endpoint
app.post('/api/register-team', requireAuth, async (req, res) => {
    try {
        const { teamName, teamMembers } = req.body;
        const userId = req.session.userId;

        if (!teamName || !teamMembers || !Array.isArray(teamMembers) || teamMembers.length === 0) {
            return res.status(400).json({ error: 'Team name and members are required' });
        }

        // Check if user ID is between 1-16 (allowed to create teams)
        const userIdNum = parseInt(userId);
        if (isNaN(userIdNum) || userIdNum < 1 || userIdNum > 16) {
            return res.status(400).json({
                error: 'Only users with ID 1-16 can register teams. Your user ID is not eligible for team registration.'
            });
        }

        console.log('Team registration request:', { teamName, teamMembers, userId });

        // Check if this user already has a team registered
        let existingUserTeam = null;
        let existingTeamByName = null;

        if (db) {
            try {
                // Check if user already has a team
                const userTeamQuery = await db.collection('teams').where('createdBy', '==', userId).get();
                if (!userTeamQuery.empty) {
                    existingUserTeam = userTeamQuery.docs[0].data();
                }

                // Check if team name already exists
                const teamNameQuery = await db.collection('teams').where('name', '==', teamName).get();
                if (!teamNameQuery.empty) {
                    existingTeamByName = teamNameQuery.docs[0].data();
                }
            } catch (firebaseError) {
                console.warn('Firebase query failed, falling back to memory storage:', firebaseError.message);
            }
        }

        // Fallback to in-memory storage
        if (!existingUserTeam || !existingTeamByName) {
            if (!global.teamsData) global.teamsData = [];

            if (!existingUserTeam) {
                const memoryUserTeam = global.teamsData.find(team => team.createdBy === userId);
                if (memoryUserTeam) {
                    existingUserTeam = memoryUserTeam;
                }
            }

            if (!existingTeamByName) {
                const memoryTeamByName = global.teamsData.find(team => team.name === teamName);
                if (memoryTeamByName) {
                    existingTeamByName = memoryTeamByName;
                }
            }
        }

        // Check if user already has a team
        if (existingUserTeam) {
            return res.json({
                success: true,
                isExisting: true,
                teamData: existingUserTeam,
                message: 'Team already exists. You can edit your team information.'
            });
        }

        // Check if team name already exists
        if (existingTeamByName) {
            return res.status(400).json({
                error: 'A team with this name already exists. Please choose a different team name.',
                existingTeam: existingTeamByName
            });
        }

        // Create new team with initial scores set to 0
        const teamData = {
            id: Date.now().toString(),
            name: teamName,
            members: teamMembers,
            totalScore: 0,
            quizScore: 0,
            constructionScore: 0,
            innovationScore: 0,
            achievements: [],
            createdAt: new Date().toISOString(),
            createdBy: userId,
            userId: userId, // Also store userId for easy lookup
            // Additional metadata for Firebase
            lastUpdated: new Date().toISOString(),
            status: 'active'
        };

        // Save to Firebase or memory
        if (db) {
            try {
                const teamsRef = db.collection('teams');
                await teamsRef.doc(teamData.id).set(teamData);
                console.log('Team registered successfully in Firebase:', teamData.name, 'by user', userId);

                // Also save to memory as backup
                if (!global.teamsData) global.teamsData = [];
                global.teamsData.push(teamData);
            } catch (firebaseError) {
                console.warn('Firebase save failed, using memory storage:', firebaseError.message);
                if (!global.teamsData) global.teamsData = [];
                global.teamsData.push(teamData);
                console.log('Team registered successfully in memory storage (Firebase fallback)');
            }
        } else {
            if (!global.teamsData) global.teamsData = [];
            global.teamsData.push(teamData);
            console.log('Team registered successfully in memory storage (no Firebase)');
        }

        res.json({
            success: true,
            userId: userId,
            teamData: teamData,
            teamMembers: teamMembers,
            isNew: true
        });
    } catch (error) {
        console.error('Team registration error:', error);
        res.status(500).json({ error: 'Failed to register team' });
    }
});

// Check if user already has a team
app.get('/api/user-team', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        let userTeam = null;

        if (db) {
            try {
                const userTeamQuery = await db.collection('teams').where('createdBy', '==', userId).get();
                if (!userTeamQuery.empty) {
                    userTeam = userTeamQuery.docs[0].data();
                }
            } catch (firebaseError) {
                console.warn('Firebase query failed, checking memory storage:', firebaseError.message);
            }
        }

        // Fallback to in-memory storage
        if (!userTeam) {
            if (!global.teamsData) global.teamsData = [];
            userTeam = global.teamsData.find(team => team.createdBy === userId);
        }

        if (userTeam) {
            res.json({
                hasTeam: true,
                team: userTeam
            });
        } else {
            res.json({
                hasTeam: false
            });
        }
    } catch (error) {
        console.error('Error checking user team:', error);
        res.status(500).json({ error: 'Failed to check user team' });
    }
});

// Update team information endpoint
app.post('/api/update-team', requireAuth, async (req, res) => {
    try {
        const { teamName, teamMembers } = req.body;
        const userId = req.session.userId;

        if (!teamName || !teamMembers || !Array.isArray(teamMembers) || teamMembers.length === 0) {
            return res.status(400).json({ error: 'Team name and members are required' });
        }

        console.log('Team update request:', { teamName, teamMembers, userId });

        // Find the user's existing team
        let existingTeam = null;
        let teamDocId = null;

        if (db) {
            try {
                const userTeamQuery = await db.collection('teams').where('createdBy', '==', userId).get();
                if (!userTeamQuery.empty) {
                    const teamDoc = userTeamQuery.docs[0];
                    existingTeam = teamDoc.data();
                    teamDocId = teamDoc.id;
                }
            } catch (firebaseError) {
                console.warn('Firebase query failed, checking memory storage:', firebaseError.message);
            }
        }

        // Fallback to in-memory storage
        if (!existingTeam) {
            if (!global.teamsData) global.teamsData = [];
            const teamIndex = global.teamsData.findIndex(team => team.createdBy === userId);
            if (teamIndex !== -1) {
                existingTeam = global.teamsData[teamIndex];
            }
        }

        if (!existingTeam) {
            return res.status(404).json({ error: 'No team found for this user' });
        }

        // Check if the new team name conflicts with another team (excluding current team)
        if (db) {
            try {
                const teamNameQuery = await db.collection('teams').where('name', '==', teamName).get();
                if (!teamNameQuery.empty) {
                    const conflictingTeam = teamNameQuery.docs[0].data();
                    if (conflictingTeam.createdBy !== userId) {
                        return res.status(400).json({
                            error: 'A team with this name already exists. Please choose a different team name.'
                        });
                    }
                }
            } catch (firebaseError) {
                console.warn('Firebase query failed, checking memory storage:', firebaseError.message);
            }
        }

        // Check memory storage for conflicts
        if (!global.teamsData) global.teamsData = [];
        const conflictingTeam = global.teamsData.find(team => team.name === teamName && team.createdBy !== userId);
        if (conflictingTeam) {
            return res.status(400).json({
                error: 'A team with this name already exists. Please choose a different team name.'
            });
        }

        // Update team data
        const updatedTeamData = {
            ...existingTeam,
            name: teamName,
            members: teamMembers,
            lastUpdated: new Date().toISOString()
        };

        // Save to Firebase or memory
        if (db && teamDocId) {
            try {
                await db.collection('teams').doc(teamDocId).update(updatedTeamData);
                console.log('Team updated successfully in Firebase:', updatedTeamData.name, 'by user', userId);
            } catch (firebaseError) {
                console.error('Firebase update failed:', firebaseError);
                // Fallback to memory storage
                const teamIndex = global.teamsData.findIndex(team => team.createdBy === userId);
                if (teamIndex !== -1) {
                    global.teamsData[teamIndex] = updatedTeamData;
                }
            }
        } else {
            // Update in memory storage
            const teamIndex = global.teamsData.findIndex(team => team.createdBy === userId);
            if (teamIndex !== -1) {
                global.teamsData[teamIndex] = updatedTeamData;
            }
        }

        res.json({
            success: true,
            message: 'Team information updated successfully',
            teamData: updatedTeamData
        });

    } catch (error) {
        console.error('Team update error:', error);
        res.status(500).json({ error: 'Failed to update team information' });
    }
});

// Get teams data endpoint
app.get('/api/teams', async (req, res) => {
    try {
        let teams = [];

        if (db) {
            try {
                console.log('Getting teams data from Firebase...');
                const teamsRef = db.collection('teams');
                const snapshot = await teamsRef.orderBy('createdAt', 'desc').get();

                snapshot.forEach(doc => {
                    teams.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                console.log('Retrieved teams from Firebase:', teams.length, 'teams');
            } catch (firebaseError) {
                console.warn('Firebase query failed, falling back to memory storage:', firebaseError.message);
            }
        }

        // Fallback to memory storage if Firebase failed or no teams in Firebase
        if (teams.length === 0 && global.teamsData) {
            teams = global.teamsData;
            console.log('Retrieved teams from memory storage:', teams.length, 'teams');
        }

        res.json({ teams: teams });
    } catch (error) {
        console.error('Get teams error:', error);
        res.status(500).json({ error: 'Failed to get teams data' });
    }
});

// Update team score or info endpoint
app.post('/api/update-team-score', requireAuth, async (req, res) => {
    try {
        const { teamId, scoreType, score, achievements, teamName, teamMembers } = req.body;

        if (!teamId) {
            return res.status(400).json({ error: 'Team ID is required' });
        }

        console.log('Updating team:', { teamId, scoreType, score, achievements, teamName, teamMembers });

        let team = null;
        let updateMethod = 'firebase';

        // Try Firebase first
        if (db) {
            try {
                const teamRef = db.collection('teams').doc(teamId);
                const teamDoc = await teamRef.get();

                if (teamDoc.exists) {
                    team = teamDoc.data();
                }
            } catch (firebaseError) {
                console.warn('Firebase read failed:', firebaseError.message);
                updateMethod = 'memory';
            }
        }

        // Fallback to memory storage
        if (!team) {
            if (!global.teamsData) global.teamsData = [];
            const memoryTeam = global.teamsData.find(t => t.id === teamId);
            if (memoryTeam) {
                team = memoryTeam;
                updateMethod = 'memory';
            }
        }

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        // Update team name if provided
        if (teamName) {
            team.name = teamName;
        }

        // Update team members if provided
        if (teamMembers) {
            team.members = teamMembers;
        }

        // Update specific score type
        if (scoreType && score !== undefined) {
            team[`${scoreType}Score`] = score;
        }

        // Recalculate total score
        team.totalScore = team.quizScore + team.constructionScore + team.innovationScore;

        // Update achievements if provided
        if (achievements) {
            team.achievements = achievements;
        }

        // Save back to storage
        if (updateMethod === 'firebase' && db) {
            try {
                const teamRef = db.collection('teams').doc(teamId);
                await teamRef.update({
                    ...team,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp()
                });
                console.log('Team updated in Firebase');
            } catch (firebaseError) {
                console.warn('Firebase update failed, using memory storage:', firebaseError.message);
                updateMethod = 'memory';
            }
        }

        if (updateMethod === 'memory') {
            // Update in memory
            const teamIndex = global.teamsData.findIndex(t => t.id === teamId);
            if (teamIndex >= 0) {
                global.teamsData[teamIndex] = team;
                console.log('Team updated in memory storage');
            }
        }

        res.json({
            success: true,
            team: team
        });
    } catch (error) {
        console.error('Update team error:', error);
        res.status(500).json({ error: 'Failed to update team' });
    }
});

// Submit question endpoint
app.post('/api/submit-question', async (req, res) => {
    try {
        const { topic, question, name } = req.body;

        if (!topic || !question) {
            return res.status(400).json({ error: 'Topic and question are required' });
        }

        console.log('Question submitted:', { topic, question, name });

        // Store question in Firebase or memory
        const questionData = {
            id: Date.now().toString(),
            topic: topic,
            question: question,
            name: name || 'Anonymous',
            status: 'pending', // pending, answered, rejected
            submittedAt: new Date().toISOString()
        };

        // Try Firebase first
        if (db) {
            try {
                const questionsRef = db.collection('questions');
                await questionsRef.doc(questionData.id).set(questionData);
                console.log('Question saved to Firebase');
            } catch (firebaseError) {
                console.warn('Firebase save failed, using memory storage:', firebaseError.message);
                if (!global.questionsData) global.questionsData = [];
                global.questionsData.push(questionData);
            }
        } else {
            if (!global.questionsData) global.questionsData = [];
            global.questionsData.push(questionData);
            console.log('Question saved to memory storage');
        }

        res.json({
            success: true,
            message: 'Question submitted successfully'
        });
    } catch (error) {
        console.error('Submit question error:', error);
        res.status(500).json({ error: 'Failed to submit question' });
    }
});

// Get questions endpoint (for admin)
app.get('/api/questions', requireAuth, async (req, res) => {
    try {
        let questions = [];

        if (db) {
            try {
                const questionsRef = db.collection('questions');
                const snapshot = await questionsRef.orderBy('submittedAt', 'desc').get();

                snapshot.forEach(doc => {
                    questions.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                console.log('Retrieved questions from Firebase:', questions.length);
            } catch (firebaseError) {
                console.warn('Firebase query failed:', firebaseError.message);
            }
        }

        // Fallback to memory storage
        if (questions.length === 0 && global.questionsData) {
            questions = global.questionsData;
            console.log('Retrieved questions from memory:', questions.length);
        }

        res.json({ questions: questions });
    } catch (error) {
        console.error('Get questions error:', error);
        res.status(500).json({ error: 'Failed to get questions' });
    }
});

// Save quiz result endpoint (public - no auth required)
app.post('/api/save-quiz-result', async (req, res) => {
    try {
        const { topic, topicId, score, totalQuestions, timeTaken, answers, userId } = req.body;

        // Use userId from request body, or fallback to session if available
        const finalUserId = userId || req.session?.userId || 'anonymous';

        if (!topic || !topicId || score === undefined) {
            return res.status(400).json({ error: 'Topic, topicId, and score are required' });
        }

        console.log('Saving quiz result:', { userId: finalUserId, topic, topicId, score, timeTaken });

        // Calculate tokens based on score
        let tokensEarned = 0;
        if (score >= 8) {
            tokensEarned = 10;
        } else if (score >= 5) {
            tokensEarned = 5;
        } else if (score >= 1) {
            tokensEarned = 2;
        }

        const resultData = {
            userId: finalUserId,
            topic: topic,
            topicId: topicId,
            score: score,
            totalQuestions: totalQuestions || 10,
            timeTaken: timeTaken,
            answers: answers,
            tokensEarned: tokensEarned,
            timestamp: new Date().toISOString()
        };

        // Save to Firebase
        if (db) {
            try {
                const resultsRef = db.collection('quizResults');
                await resultsRef.add(resultData);
                console.log('Quiz result saved to Firebase');
            } catch (firebaseError) {
                console.warn('Firebase save failed, using memory storage:', firebaseError.message);
                if (!global.quizResultsData) global.quizResultsData = [];
                global.quizResultsData.push(resultData);
            }
        } else {
            if (!global.quizResultsData) global.quizResultsData = [];
            global.quizResultsData.push(resultData);
            console.log('Quiz result saved to memory storage');
        }

        // Update team progress if user is part of a team (user ID 1-16)
        const userIdNum = parseInt(finalUserId);
        if (userIdNum >= 1 && userIdNum <= 16) {
            await updateTeamQuizProgress(finalUserId, topicId, score);
        }

        res.json({
            success: true,
            message: 'Quiz result saved successfully'
        });
    } catch (error) {
        console.error('Save quiz result error:', error);
        res.status(500).json({ error: 'Failed to save quiz result' });
    }
});

// Get quiz results endpoint (public - no auth required)
app.get('/api/quiz-results', async (req, res) => {
    console.log('GET /api/quiz-results - Request received');
    try {
        let results = [];

        if (db) {
            try {
                const resultsRef = db.collection('quizResults');
                const snapshot = await resultsRef.orderBy('timestamp', 'desc').get();

                snapshot.forEach(doc => {
                    results.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                console.log('Retrieved quiz results from Firebase:', results.length);
            } catch (firebaseError) {
                console.warn('Firebase query failed:', firebaseError.message);
            }
        }

        // Fallback to memory storage
        if (results.length === 0 && global.quizResultsData) {
            results = global.quizResultsData;
            console.log('Retrieved quiz results from memory:', results.length);
        }

        res.json({ results: results });
    } catch (error) {
        console.error('Get quiz results error:', error);
        res.status(500).json({ error: 'Failed to get quiz results' });
    }
});

// Get user quiz results endpoint (for checking completed topics)
app.get('/api/user-quiz-results', async (req, res) => {
    console.log('GET /api/user-quiz-results - Request received');
    try {
        let results = [];

        if (db) {
            try {
                const resultsRef = db.collection('quizResults');
                const snapshot = await resultsRef.get();

                snapshot.forEach(doc => {
                    results.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                console.log('Retrieved user quiz results from Firebase:', results.length);
            } catch (firebaseError) {
                console.warn('Firebase query failed:', firebaseError.message);
            }
        }

        // Fallback to memory storage
        if (results.length === 0 && global.quizResultsData) {
            results = global.quizResultsData;
            console.log('Retrieved user quiz results from memory:', results.length);
        }

        res.json({ results: results });
    } catch (error) {
        console.error('Get user quiz results error:', error);
        res.status(500).json({ error: 'Failed to get user quiz results' });
    }
});

// Get team progress endpoint (public - no auth required)
app.get('/api/team-progress', async (req, res) => {
    try {
        let teams = [];
        let quizResults = [];

        // Get teams data
        if (db) {
            try {
                const teamsRef = db.collection('teams');
                const teamsSnapshot = await teamsRef.get();
                teamsSnapshot.forEach(doc => {
                    teams.push({ id: doc.id, ...doc.data() });
                });

                const resultsRef = db.collection('quizResults');
                const resultsSnapshot = await resultsRef.get();
                resultsSnapshot.forEach(doc => {
                    quizResults.push({ id: doc.id, ...doc.data() });
                });
            } catch (firebaseError) {
                console.warn('Firebase query failed:', firebaseError.message);
            }
        }

        // Fallback to memory storage
        if (teams.length === 0 && global.teamsData) {
            teams = global.teamsData;
        }
        if (quizResults.length === 0 && global.quizResultsData) {
            quizResults = global.quizResultsData;
        }

        // Calculate team progress
        const teamProgress = teams.map(team => {
            const teamResults = quizResults.filter(result => result.userId === team.createdBy);
            const completedTopics = [...new Set(teamResults.map(result => result.topicId))];
            const totalScore = teamResults.reduce((sum, result) => sum + result.score, 0);
            const totalTokens = teamResults.reduce((sum, result) => sum + (result.tokensEarned || 0), 0);
            const averageScore = teamResults.length > 0 ? (totalScore / teamResults.length).toFixed(1) : 0;

            return {
                ...team,
                completedTopics: completedTopics,
                completedCount: completedTopics.length,
                totalTopics: 10,
                totalScore: totalScore,
                totalTokens: totalTokens,
                averageScore: averageScore,
                isComplete: completedTopics.length >= 10,
                lastQuizDate: teamResults.length > 0 ?
                    new Date(Math.max(...teamResults.map(r => new Date(r.timestamp)))) : null
            };
        });

        res.json({ teamProgress: teamProgress });
    } catch (error) {
        console.error('Get team progress error:', error);
        res.status(500).json({ error: 'Failed to get team progress' });
    }
});

// Get quiz topics endpoint (public - no auth required)
app.get('/api/quiz-topics', async (req, res) => {
    try {
        // Return the quiz topics from the configuration
        const { QUIZ_CONFIG } = require('./quiz-config.js');
        res.json({ topics: QUIZ_CONFIG.topics });
    } catch (error) {
        console.error('Get quiz topics error:', error);
        res.status(500).json({ error: 'Failed to get quiz topics' });
    }
});

// Get quiz topics endpoint (for admin with auth)
app.get('/api/quiz-topics-admin', requireAuth, async (req, res) => {
    try {
        // Return the quiz topics from the configuration
        const { QUIZ_CONFIG } = require('./quiz-config.js');
        res.json({ topics: QUIZ_CONFIG.topics });
    } catch (error) {
        console.error('Get quiz topics error:', error);
        res.status(500).json({ error: 'Failed to get quiz topics' });
    }
});

// Update quiz topic endpoint (for admin)
app.post('/api/update-quiz-topic', requireAuth, async (req, res) => {
    try {
        const { topicId, topicData } = req.body;

        if (!topicId || !topicData) {
            return res.status(400).json({ error: 'Topic ID and data are required' });
        }

        console.log('Updating quiz topic:', { topicId, topicData });

        // Save to Firebase
        if (db) {
            try {
                const topicsRef = db.collection('quizTopics');
                await topicsRef.doc(topicId).set(topicData);
                console.log('Quiz topic updated in Firebase');
            } catch (firebaseError) {
                console.warn('Firebase save failed:', firebaseError.message);
                // Fallback to memory storage
                if (!global.quizTopicsData) global.quizTopicsData = {};
                global.quizTopicsData[topicId] = topicData;
            }
        } else {
            if (!global.quizTopicsData) global.quizTopicsData = {};
            global.quizTopicsData[topicId] = topicData;
            console.log('Quiz topic updated in memory storage');
        }

        res.json({
            success: true,
            message: 'Quiz topic updated successfully'
        });
    } catch (error) {
        console.error('Update quiz topic error:', error);
        res.status(500).json({ error: 'Failed to update quiz topic' });
    }
});

// Helper function to update team quiz progress
async function updateTeamQuizProgress(userId, topicId, score) {
    try {
        let team = null;

        // Find team by user ID
        if (db) {
            try {
                const teamQuery = await db.collection('teams').where('createdBy', '==', userId).get();
                if (!teamQuery.empty) {
                    team = teamQuery.docs[0];
                }
            } catch (firebaseError) {
                console.warn('Firebase query failed:', firebaseError.message);
            }
        }

        // Fallback to memory storage
        if (!team && global.teamsData) {
            team = global.teamsData.find(t => t.createdBy === userId);
        }

        if (team) {
            // Update team's quiz score
            const teamData = team.data ? team.data() : team;
            const newQuizScore = Math.max(teamData.quizScore || 0, score);
            const newTotalScore = newQuizScore + (teamData.constructionScore || 0) + (teamData.innovationScore || 0);

            const updateData = {
                quizScore: newQuizScore,
                totalScore: newTotalScore,
                lastUpdated: new Date().toISOString()
            };

            // Save to Firebase
            if (db && team.ref) {
                try {
                    await team.ref.update(updateData);
                    console.log('Team quiz progress updated in Firebase');
                } catch (firebaseError) {
                    console.warn('Firebase update failed:', firebaseError.message);
                }
            }

            // Update memory storage
            if (global.teamsData) {
                const teamIndex = global.teamsData.findIndex(t => t.createdBy === userId);
                if (teamIndex >= 0) {
                    global.teamsData[teamIndex] = { ...global.teamsData[teamIndex], ...updateData };
                    console.log('Team quiz progress updated in memory');
                }
            }
        }
    } catch (error) {
        console.error('Error updating team quiz progress:', error);
    }
}

// Test endpoint to verify API key - requires authentication
app.post('/api/verify-key', requireAuth, async (req, res) => {
    console.log('Received API key verification request');

    if (!req.body.apiKey) {
        console.error('No API key provided');
        return res.status(400).json({
            status: 'error',
            message: 'No API key provided'
        });
    }

    try {
        console.log('Testing API key...');

        const response = await fetch('https://external.api.recraft.ai/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.body.apiKey}`
            },
            body: JSON.stringify({
                prompt: 'test',
                style: 'digital_illustration'
            })
        });

        console.log('API Response Status:', response.status);
        console.log('API Response Headers:', response.headers);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('API Key Test Error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData
            });
            throw new Error(errorData.error || `API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response Data:', data);

        res.json({
            status: 'success',
            message: 'API key is valid'
        });
    } catch (error) {
        console.error('API Key Test Error:', error);
        res.status(401).json({
            status: 'error',
            message: 'Invalid API key',
            details: error.message
        });
    }
});

// Proxy endpoint for text-to-image generation - requires authentication
app.post('/api/generate-image', requireAuth, async (req, res) => {
    try {
        const requestBody = {
            prompt: req.body.prompt,
            style: req.body.style,
            size: req.body.size
        };

        console.log('Sending request to Recraft AI:', {
            url: 'https://external.api.recraft.ai/v1/images/generations',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.body.apiKey}`
            },
            body: requestBody
        });

        const response = await fetch('https://external.api.recraft.ai/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.body.apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Recraft API Error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData,
                url: response.url
            });
            throw new Error(errorData.error || `API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Recraft API Response:', data);

        // Transform the response to match the expected format
        const transformedData = {
            imageUrl: data.data[0].url
        };

        res.json(transformedData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: error.message || 'Failed to generate image',
            details: error.message
        });
    }
});

// Proxy endpoint for image-to-image generation - requires authentication
app.post('/api/generate-from-image', requireAuth, upload.single('image'), async (req, res) => {
    try {
        console.log('Received image-to-image request');
        console.log('Request headers:', req.headers);
        console.log('Request body:', req.body);
        console.log('Request file:', req.file ? {
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            size: req.file.size,
            buffer: req.file.buffer ? `Buffer of ${req.file.buffer.length} bytes` : 'No buffer'
        } : 'No file');

        if (!req.file) {
            throw new Error('No image file provided');
        }

        // Create a new FormData instance
        const formData = new FormData();

        // Create a readable stream from the buffer
        const { Readable } = require('stream');
        const stream = Readable.from(req.file.buffer);

        // Append the stream to formData
        formData.append('image', stream, {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        // Append other fields
        formData.append('prompt', req.body.prompt);
        formData.append('style', req.body.style);
        formData.append('strength', req.body.strength);

        // Debug FormData contents using Node.js form-data methods
        console.log('FormData contents being sent to Recraft:');
        console.log('- image: Stream with filename:', req.file.originalname);
        console.log('- prompt:', req.body.prompt);
        console.log('- style:', req.body.style);
        console.log('- strength:', req.body.strength);

        console.log('Sending request to Recraft AI:', {
            url: 'https://external.api.recraft.ai/v1/images/imageToImage',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${req.body.apiKey}`
            },
            hasImage: true,
            prompt: req.body.prompt,
            style: req.body.style,
            strength: req.body.strength
        });

        const response = await fetch('https://external.api.recraft.ai/v1/images/imageToImage', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${req.body.apiKey}`
            },
            body: formData
        });

        console.log('Recraft API Response Status:', response.status);
        console.log('Recraft API Response Headers:', Object.fromEntries(response.headers.entries()));

        const responseText = await response.text();
        console.log('Recraft API Raw Response:', responseText);

        if (!response.ok) {
            let errorData;
            try {
                errorData = JSON.parse(responseText);
            } catch (e) {
                errorData = { error: responseText };
            }
            console.error('Recraft API Error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData,
                url: response.url
            });
            // Handle specific Recraft AI errors
            if (errorData.code === 'image_too_big') {
                throw new Error('Image file is too large for the AI service. Please use an image smaller than 10MB.');
            }
            throw new Error(errorData.message || errorData.error || `API Error: ${response.status} ${response.statusText}`);
        }

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse Recraft API response as JSON:', e);
            throw new Error('Invalid JSON response from Recraft API');
        }

        console.log('Recraft API Response Data:', data);

        // Transform the response to match the expected format
        const transformedData = {
            imageUrl: data.data[0].url
        };

        res.json(transformedData);
    } catch (error) {
        console.error('Error in image-to-image generation:', error);
        res.status(500).json({
            error: error.message || 'Failed to generate image',
            details: error.message
        });
    }
});

// Test endpoint to verify server is running
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

// Admin reset endpoint - reset all data
app.post('/api/admin-reset', async (req, res) => {
    try {
        const { adminPasscode } = req.body;

        // Check admin passcode
        if (adminPasscode !== 'M514') {
            return res.status(401).json({
                success: false,
                error: 'Invalid admin passcode'
            });
        }

        console.log('Admin reset requested with passcode verification');

        // Clear Firebase collections
        if (db) {
            // Clear quiz results
            const resultsRef = db.collection('quizResults');
            const resultsSnapshot = await resultsRef.get();
            const batch = db.batch();
            resultsSnapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();

            // Clear teams
            const teamsRef = db.collection('teams');
            const teamsSnapshot = await teamsRef.get();
            const teamsBatch = db.batch();
            teamsSnapshot.docs.forEach(doc => {
                teamsBatch.delete(doc.ref);
            });
            await teamsBatch.commit();

            // Clear judge scoring data
            const judgeScoringRef = db.collection('judgeScoring');
            const judgeScoringSnapshot = await judgeScoringRef.get();
            const judgeScoringBatch = db.batch();
            judgeScoringSnapshot.docs.forEach(doc => {
                judgeScoringBatch.delete(doc.ref);
            });
            await judgeScoringBatch.commit();

            // Clear user logins
            const userLoginsRef = db.collection('userLogins');
            const userLoginsSnapshot = await userLoginsRef.get();
            const userLoginsBatch = db.batch();
            userLoginsSnapshot.docs.forEach(doc => {
                userLoginsBatch.delete(doc.ref);
            });
            await userLoginsBatch.commit();

            console.log('Firebase data cleared successfully');
        }

        // Clear in-memory data
        global.quizResultsData = [];
        global.teamsData = [];
        global.judgeScoring = [];
        global.userLoginData = [];

        res.json({
            success: true,
            message: 'All data has been reset successfully',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Admin reset error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to reset data'
        });
    }
});

// Get user login history endpoint (admin only)
app.get('/api/admin/user-logins', requireAuth, async (req, res) => {
    try {
        const currentUserId = req.session.userId;

        // Check if current user is admin
        if (currentUserId !== '201') {
            return res.status(403).json({
                success: false,
                error: 'Admin access required'
            });
        }

        let loginHistory = [];

        // Try Firebase first
        if (db) {
            try {
                const snapshot = await db.collection('userLogins')
                    .orderBy('loginTime', 'desc')
                    .get();

                loginHistory = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log('User login history loaded from Firebase:', loginHistory.length, 'records');
            } catch (firebaseError) {
                console.warn('Firebase read failed:', firebaseError.message);
            }
        }

        // Fallback to memory storage
        if (loginHistory.length === 0 && global.userLoginData) {
            loginHistory = global.userLoginData;
            console.log('User login history loaded from memory:', loginHistory.length, 'records');
        }

        // Group by user and get latest login for each
        const userLatestLogins = {};
        loginHistory.forEach(login => {
            const userId = login.userId;
            if (!userLatestLogins[userId] || new Date(login.loginTime) > new Date(userLatestLogins[userId].loginTime)) {
                userLatestLogins[userId] = login;
            }
        });

        const uniqueUsers = Object.values(userLatestLogins).sort((a, b) =>
            new Date(b.loginTime) - new Date(a.loginTime)
        );

        res.json({
            success: true,
            users: uniqueUsers
        });

    } catch (error) {
        console.error('Get user login history error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get user login history'
        });
    }
});

// Update user passkey endpoint (admin only)
app.post('/api/admin/update-passkey', requireAuth, async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { userId, newPasscode } = req.body;

        // Check if current user is admin
        if (currentUserId !== '201') {
            return res.status(403).json({
                success: false,
                error: 'Admin access required'
            });
        }

        if (!userId || !newPasscode) {
            return res.status(400).json({
                success: false,
                error: 'User ID and new passcode are required'
            });
        }

        // Validate passcode format (4 characters, alphanumeric)
        if (!/^[A-Z0-9]{4}$/.test(newPasscode.toUpperCase())) {
            return res.status(400).json({
                success: false,
                error: 'Passcode must be exactly 4 alphanumeric characters'
            });
        }

        const upperPasscode = newPasscode.toUpperCase();

        // Check if passcode is already in use
        const existingUserId = passcodeToUser[upperPasscode];
        if (existingUserId && existingUserId !== userId) {
            return res.status(400).json({
                success: false,
                error: 'This passcode is already assigned to another user'
            });
        }

        // Update the passcode mapping
        passcodeToUser[upperPasscode] = userId;

        console.log(`Admin updated passcode for user ${userId} to ${upperPasscode}`);

        res.json({
            success: true,
            message: 'Passcode updated successfully'
        });

    } catch (error) {
        console.error('Update passkey error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update passcode'
        });
    }
});

// Get all available passcodes (admin only)
app.get('/api/admin/passcodes', requireAuth, async (req, res) => {
    try {
        const currentUserId = req.session.userId;

        // Check if current user is admin
        if (currentUserId !== '201') {
            return res.status(403).json({
                success: false,
                error: 'Admin access required'
            });
        }

        // Convert passcodeToUser mapping to array format for frontend
        const passcodes = Object.entries(passcodeToUser).map(([passcode, userId]) => ({
            passcode,
            userId
        })).sort((a, b) => a.passcode.localeCompare(b.passcode));

        res.json({
            success: true,
            passcodes
        });

    } catch (error) {
        console.error('Get passcodes error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get passcodes'
        });
    }
});

// Export user credentials as CSV (admin only)
app.get('/api/admin/export-csv', requireAuth, async (req, res) => {
    try {
        const currentUserId = req.session.userId;

        // Check if current user is admin
        if (currentUserId !== '201') {
            return res.status(403).json({
                success: false,
                error: 'Admin access required'
            });
        }

        // Create CSV content
        const csvHeader = 'User ID,Password\n';
        const csvRows = Object.entries(passcodeToUser).map(([passcode, userId]) =>
            `${userId},${passcode}`
        ).join('\n');

        const csvContent = csvHeader + csvRows;

        // Set headers for CSV download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="user_credentials_${new Date().toISOString().split('T')[0]}.csv"`);
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

        // Send CSV content
        res.send(csvContent);

        console.log('User credentials CSV exported successfully');

    } catch (error) {
        console.error('Export CSV error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to export CSV'
        });
    }
});

// Randomize all passcodes (admin only)
app.post('/api/admin/randomize-passcodes', requireAuth, async (req, res) => {
    try {
        const currentUserId = req.session.userId;

        // Check if current user is admin
        if (currentUserId !== '201') {
            return res.status(403).json({
                success: false,
                error: 'Admin access required'
            });
        }

        // Generate random passcodes for all users except admin (M514)
        const newPasscodeToUser = {};

        // Preserve M514 for admin user
        newPasscodeToUser['M514'] = '201';

        // Generate random passcodes for all other users
        Object.entries(passcodeToUser).forEach(([passcode, userId]) => {
            if (passcode !== 'M514') {
                const newPasscode = generateRandomPasscode();
                newPasscodeToUser[newPasscode] = userId;
                console.log(`Changed passcode for user ${userId} from ${passcode} to ${newPasscode}`);
            }
        });

        // Update the global passcode mapping
        Object.keys(passcodeToUser).forEach(passcode => {
            delete passcodeToUser[passcode];
        });
        Object.assign(passcodeToUser, newPasscodeToUser);

        console.log('All passcodes randomized successfully (except M514)');

        res.json({
            success: true,
            message: 'All passcodes randomized successfully',
            randomizedCount: Object.keys(newPasscodeToUser).length - 1 // Exclude M514
        });

    } catch (error) {
        console.error('Randomize passcodes error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to randomize passcodes'
        });
    }
});

// Helper function to generate random passcode with 2 letters and 2 numbers
function generateRandomPasscode() {
    // Safe letters (excluding confusing ones: I, O, 0, q, Q, L)
    const safeLetters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const numbers = '123456789';

    // Generate 2 random letters and 2 random numbers
    const letters = [];
    const nums = [];

    for (let i = 0; i < 2; i++) {
        letters.push(safeLetters[Math.floor(Math.random() * safeLetters.length)]);
        nums.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }

    // Combine and shuffle
    const combined = [...letters, ...nums];
    for (let i = combined.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combined[i], combined[j]] = [combined[j], combined[i]];
    }

    return combined.join('');
}

// Track token consumption from redemption booth
app.post('/api/consume-tokens', async (req, res) => {
    try {
        const { teamId, tokensConsumed, itemName } = req.body;

        if (!teamId || !tokensConsumed || tokensConsumed <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Team ID and valid token amount required'
            });
        }

        console.log('Token consumption:', { teamId, tokensConsumed, itemName });

        // Save to Firebase
        if (db) {
            const consumptionData = {
                teamId: teamId,
                userId: teamId, // Store userId for individual user filtering
                tokensConsumed: tokensConsumed,
                itemName: itemName || 'Redemption Item',
                timestamp: new Date().toISOString()
            };

            await db.collection('tokenConsumption').add(consumptionData);
            console.log('Token consumption saved to Firebase');
        }

        res.json({
            success: true,
            message: 'Token consumption recorded successfully'
        });

    } catch (error) {
        console.error('Token consumption error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to record token consumption'
        });
    }
});

// Judge scoring update endpoint
app.post('/api/judge-scoring', async (req, res) => {
    try {
        const { teamId, longestTime, judgePasscode } = req.body;

        // Verify judge passcode
        if (judgePasscode !== 'PH46') {
            return res.status(401).json({
                success: false,
                error: 'Invalid judge passcode'
            });
        }

        if (!teamId || !longestTime) {
            return res.status(400).json({
                success: false,
                error: 'Team ID and longest time are required'
            });
        }

        console.log('Judge scoring update:', { teamId, longestTime });

        const scoringData = {
            teamId: teamId,
            longestTime: parseFloat(longestTime),
            updatedAt: new Date().toISOString(),
            judgePasscode: judgePasscode
        };

        // Save to Firebase
        if (db) {
            try {
                // Check if scoring already exists for this team
                const existingQuery = await db.collection('judgeScoring').where('teamId', '==', teamId).get();

                if (!existingQuery.empty) {
                    // Update existing record
                    const docId = existingQuery.docs[0].id;
                    await db.collection('judgeScoring').doc(docId).update(scoringData);
                    console.log('Judge scoring updated in Firebase for team:', teamId);
                } else {
                    // Create new record
                    await db.collection('judgeScoring').add(scoringData);
                    console.log('Judge scoring created in Firebase for team:', teamId);
                }
            } catch (firebaseError) {
                console.warn('Firebase save failed:', firebaseError.message);
                // Fallback to memory storage
                if (!global.judgeScoring) global.judgeScoring = [];
                const existingIndex = global.judgeScoring.findIndex(item => item.teamId === teamId);
                if (existingIndex >= 0) {
                    global.judgeScoring[existingIndex] = scoringData;
                } else {
                    global.judgeScoring.push(scoringData);
                }
                console.log('Judge scoring saved to memory for team:', teamId);
            }
        } else {
            // Fallback to memory storage
            if (!global.judgeScoring) global.judgeScoring = [];
            const existingIndex = global.judgeScoring.findIndex(item => item.teamId === teamId);
            if (existingIndex >= 0) {
                global.judgeScoring[existingIndex] = scoringData;
            } else {
                global.judgeScoring.push(scoringData);
            }
            console.log('Judge scoring saved to memory for team:', teamId);
        }

        res.json({
            success: true,
            message: 'Judge scoring updated successfully'
        });

    } catch (error) {
        console.error('Judge scoring update error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update judge scoring'
        });
    }
});

// Get judge scoring data endpoint
app.get('/api/judge-scoring', async (req, res) => {
    try {
        let scoringData = [];

        // Try Firebase first
        if (db) {
            try {
                const snapshot = await db.collection('judgeScoring').get();
                scoringData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log('Judge scoring data loaded from Firebase:', scoringData.length, 'records');
            } catch (firebaseError) {
                console.warn('Firebase read failed:', firebaseError.message);
            }
        }

        // Fallback to memory storage
        if (scoringData.length === 0 && global.judgeScoring) {
            scoringData = global.judgeScoring;
            console.log('Judge scoring data loaded from memory:', scoringData.length, 'records');
        }

        res.json({
            success: true,
            scoringData
        });

    } catch (error) {
        console.error('Get judge scoring error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get judge scoring data'
        });
    }
});

// Get token consumption data
app.get('/api/token-consumption', async (req, res) => {
    try {
        let consumptionData = [];

        if (db) {
            const snapshot = await db.collection('tokenConsumption').get();
            consumptionData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        }

        res.json({ consumptionData });

    } catch (error) {
        console.error('Get token consumption error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get token consumption data'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Test the API key at: http://localhost:${PORT}/img-gen/img_gen.html`);
    console.log(`Test server at: http://localhost:${PORT}/api/test`);
}); 