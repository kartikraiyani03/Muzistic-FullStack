# Authentication & Redirect Flow - Implementation Summary

## Overview
This document describes the implemented authentication system with automatic redirect to user profile on successful login/registration.

## Changes Made

### Backend (Server)

#### 1. **UserController.js** - Enhanced Authentication Responses
- **Register Endpoint** (`POST /user/register`)
  - Added JWT token generation and inclusion in response
  - Added `success` boolean flag for consistent response handling
  - Added `redirect: "/account"` field to guide frontend
  - Improved error response with `success: false`
  - Fixed typo: "messgae" → "message"

- **Login Endpoint** (`POST /user/login`)
  - Changed from `User.find()` to `User.findOne()` for cleaner code
  - Added user existence check before accessing properties
  - Added JWT token generation and inclusion in response
  - Added `success` boolean flag
  - Added `redirect: "/account"` field
  - Improved error messages with `success: false`

Response format for both endpoints on success:
```json
{
  "message": "User Registered/Login successfully",
  "success": true,
  "token": "jwt_token_here",
  "redirect": "/account",
  "data": {
    "id": "user_id",
    "name": "user_name",
    "email": "user_email",
    "image": "avatar_url"
  }
}
```

#### 2. **Auth.js Middleware** (Created)
- Authentication middleware to protect routes
- Verifies JWT tokens from request headers
- Supports token in Authorization header (`Bearer token`) or `x-auth-token` header
- Returns 401 for invalid/missing tokens

Usage:
```javascript
const { authMiddleware } = require('../middlewares/Auth.js');
router.post('/protected-route', authMiddleware, controller);
```

### Frontend (Client)

#### 1. **axiosConfig.js** (Created) - Axios Interceptor Setup
- Centralized axios configuration with automatic token handling
- Request interceptor: Automatically adds token to all requests
- Response interceptor: Handles 401 errors by clearing auth data and redirecting to login
- Base URL configured to `http://localhost:3000`

#### 2. **Redux Slice - accountSlice.jsx**
- Updated `signupHandler` to store token in localStorage
- Updated `logoutHandler` to clear token and user data from localStorage
- **Added `restoreUser` action**: Restores user session from localStorage on app startup

#### 3. **Pages - Login.jsx**
- Updated to use configured `axiosInstance` instead of direct axios
- Stores token and user data in localStorage on successful login
- Checks for `success` flag in response
- Navigates using the `redirect` field from API response
- Improved error handling with proper response validation

#### 4. **Utils - useValidation.jsx** (Signup Hook)
- Updated to use configured `axiosInstance`
- Stores token and user data in localStorage on successful registration
- Checks for `success` flag in response
- Navigates using the `redirect` field from API response
- Consistent error handling with Login

#### 5. **App.jsx**
- Integrated Redux for global login state management
- Added `useEffect` to restore user from localStorage on app mount using `restoreUser` action
- Removed local login state management (now using Redux)
- Removed unnecessary login/setLogin prop passing to navbar
- Simplified route declarations

#### 6. **NavBar.jsx**
- Already configured to get login state from Redux store
- Automatically reflects login/logout status

## Authentication Flow

### Registration Flow
1. User fills signup form
2. Frontend validates form data
3. Sends POST request to `/user/register`
4. Backend validates, hashes password, creates user, generates JWT
5. Response includes token and redirect path
6. Frontend stores token and user in localStorage
7. Redux state updated via `signupHandler`
8. User automatically redirected to `/account` (profile page)

### Login Flow
1. User enters credentials
2. Frontend validates email and password
3. Sends POST request to `/user/login`
4. Backend finds user, verifies password, generates JWT
5. Response includes token and redirect path
6. Frontend stores token and user in localStorage
7. Redux state updated via `signupHandler`
8. User automatically redirected to `/account` (profile page)

### Session Persistence
1. On app load, `App.jsx` dispatches `restoreUser` action
2. Redux restores user data from localStorage
3. User remains logged in even after page refresh
4. Token is automatically included in subsequent API requests

### Logout Flow
1. User clicks logout button
2. `logoutHandler` dispatches from NavBar
3. Redux clears user state
4. localStorage data cleared
5. User redirected to home page

## API Request/Response Examples

### Register Request
```bash
POST http://localhost:3000/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Register Response (Success)
```json
{
  "message": "User Registered Successfully",
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "redirect": "/account",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "image": "https://api.dicebear.com/5.x/initials/svg?seed=JohnDoe"
  }
}
```

### Login Request
```bash
POST http://localhost:3000/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Protected Route Usage (Example)
```javascript
// In routes
const { authMiddleware } = require('../middlewares/Auth.js');

router.get('/user/profile', authMiddleware, (req, res) => {
  // req.user.id contains the authenticated user's ID
  res.json({ userId: req.user.id });
});
```

## Frontend Token Usage

All subsequent API requests automatically include the token:
```javascript
// No need to manually add token - interceptor handles it
const response = await axiosInstance.get('/user/profile');
// Token is automatically added: 
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Files Modified

### Backend
- `server/controllers/UserController.js` - Enhanced auth responses
- `server/middlewares/Auth.js` - Created auth middleware

### Frontend
- `client/src/api/axiosConfig.js` - Created (NEW)
- `client/src/pages/Login.jsx` - Updated auth handling
- `client/src/pages/Signup.jsx` - Already uses useValidation
- `client/src/utils/useValidation.jsx` - Updated auth handling
- `client/src/redux/slice/accountSlice.jsx` - Added restoreUser action
- `client/src/App.jsx` - Added Redux integration and restore logic
- `client/src/components/NavBar.jsx` - Already integrated with Redux

## Environment Variables Required

Make sure your `.env` file in the server directory contains:
```
PORT=3000
JWT_SECRET=your_secret_key_here
MONGODB_URI=your_mongodb_connection_string
```

## Next Steps (Optional Enhancements)

1. Add refresh token logic for longer sessions
2. Implement rate limiting on auth endpoints
3. Add email verification on registration
4. Add password reset functionality
5. Add protected routes on frontend (Route wrappers)
6. Add loading states during auth operations
7. Add error notifications/toast messages
8. Add remember-me functionality
9. Add two-factor authentication
10. Add social login options
