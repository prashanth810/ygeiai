# API Integration Guide

## Authentication APIs Integrated

All authentication APIs have been successfully integrated into your React Native app.

### Base URL

```
http://216.158.226.71/api
```

### Available APIs

#### 1. Login API

- **Endpoint:** `/auth/login`
- **Method:** POST
- **Payload:**

```javascript
{
  "email": "user@mail.com",
  "password": "Exato@123"
}
```

- **Response:**

```javascript
{
  "status": 200,
  "message": "User logged in",
  "accessToken": "eyJhbGc...",
  "expiresIn": "1h",
  "user": {
    "id": "3ae311b6-7782-4677-89d0-a30b460863a9",
    "name": "user",
    "email": "user@mail.com",
    "role": "USER",
    "isVerified": true,
    "profile": { ... }
  }
}
```

#### 2. Register API

- **Endpoint:** `/auth/register`
- **Method:** POST

#### 3. Refresh Token API

- **Endpoint:** `/auth/refresh`
- **Method:** POST

#### 4. Get Current User API

- **Endpoint:** `/auth/me`
- **Method:** GET
- **Headers:** `Authorization: Bearer {token}`

#### 5. Get User Profiles API

- **Endpoint:** `/user/profiles`
- **Method:** GET
- **Headers:** `Authorization: Bearer {token}`
- **Response:**

```javascript
{
  "status": 200,
  "data": [
    {
      "id": "08447c95-aba3-4024-b02e-ae5b1e7df8ae",
      "displayName": "user",
      "gender": "male",
      "height": 173,
      "heightUnit": "CM",
      "weight": 176,
      "phone": "7033668173",
      "address": "jaipur"
    }
  ]
}
```

#### 6. Edit Profile API

- **Endpoint:** `/user/edit-profile`
- **Method:** PUT
- **Headers:** `Authorization: Bearer {token}`
- **Content-Type:** `multipart/form-data`
- **Fields:**
  - `name` (string)
  - `gender` (string)
  - `height` (number)
  - `heightUnit` (string)
  - `weight` (number)
  - `phone` (string)
  - `address` (string)
  - `dob` (date: YYYY-MM-DD)
  - `avatar` (file)

---

## Files Modified/Created

### 1. `/src/redux/services/Baseurl.js`

- Updated base URL to `http://216.158.226.71/api`
- Automatic token attachment via interceptors
- Auto-refresh token handling on 401 errors

### 2. `/src/redux/services/AuthServices.js`

- Added all authentication endpoints:
  - `loginApi(data)`
  - `registerApi(data)`
  - `refreshTokenApi(refreshToken)`
  - `getMeApi()`
  - `getProfilesApi()`
  - `editProfileApi(formData)`

### 3. `/src/redux/slices/AuthSlice.js`

- Added Redux thunks for:
  - `handlelogin` - Login functionality
  - `handleRegister` - Registration
  - `getUserProfile` - Fetch user profiles
  - `updateProfile` - Update user profile
- State management for all auth operations
- Loading and error states

### 4. `/src/screens/authentication/LoginScreen.jsx`

- Integrated Redux for login
- Added loading indicator
- Success/Error alerts
- Auto-navigation on successful login

### 5. `/src/utils/ApiHelper.js` (NEW)

- Helper functions for:
  - Getting access token
  - Getting user data
  - Clearing auth data
  - Creating FormData for profile edit

### 6. `/src/examples/ProfileExample.jsx` (NEW)

- Complete example showing how to use profile APIs
- Fetch profile data
- Update profile with FormData

---

## How to Use in Your Components

### Login Example

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { handlelogin } from '../../redux/slices/AuthSlice';

const LoginComponent = () => {
  const dispatch = useDispatch();
  const { loginloading, loginerror } = useSelector(
    state => state.Auth.loginuser,
  );

  const handleLogin = async () => {
    try {
      await dispatch(
        handlelogin({
          email: 'user@mail.com',
          password: 'Exato@123',
        }),
      ).unwrap();
      // Navigate on success
    } catch (error) {
      console.error(error);
    }
  };
};
```

### Get Profile Example

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/slices/AuthSlice';

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const { data: profileData, loading } = useSelector(
    state => state.Auth.profile,
  );

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <View>
      {profileData && profileData[0] && (
        <Text>{profileData[0].displayName}</Text>
      )}
    </View>
  );
};
```

### Update Profile Example

```javascript
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/slices/AuthSlice';
import { createProfileFormData } from '../../utils/ApiHelper';

const EditProfileComponent = () => {
  const dispatch = useDispatch();

  const handleUpdate = () => {
    const profileData = {
      name: 'John Doe',
      gender: 'male',
      height: 180,
      heightUnit: 'CM',
      weight: 75,
      phone: '1234567890',
      address: 'New York',
      dob: '1990-01-01',
      // For avatar upload
      avatar: {
        uri: 'file://path/to/image.jpg',
        type: 'image/jpeg',
        fileName: 'avatar.jpg',
      },
    };

    const formData = createProfileFormData(profileData);

    dispatch(updateProfile(formData))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Profile updated!');
      })
      .catch(err => {
        Alert.alert('Error', err);
      });
  };
};
```

### Logout Example

```javascript
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/AuthSlice';
import { clearAuthData } from '../../utils/ApiHelper';

const LogoutComponent = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await clearAuthData();
    dispatch(logout());
    // Navigate to login screen
  };
};
```

---

## Testing

### Test Login

Use these credentials:

```
Email: user@mail.com
Password: Exato@123
```

### Run the app

```bash
# Android
npx react-native run-android

# iOS
npx react-native run-ios
```

---

## Features Implemented

✅ Login with email/password  
✅ Auto token storage in AsyncStorage  
✅ Auto token attachment to API requests  
✅ Auto token refresh on 401 errors  
✅ Get user profile data  
✅ Update profile with multipart/form-data  
✅ Upload avatar image  
✅ Redux state management  
✅ Loading states  
✅ Error handling  
✅ Success/Error alerts

---

## Notes

1. Access token automatically attached to all API requests via Axios interceptors
2. Token is stored in AsyncStorage and persists across app restarts
3. All profile images should be uploaded using FormData (see ApiHelper.js)
4. The app automatically refreshes expired tokens
5. On 401 errors, tokens are cleared and user should login again

---

## Next Steps

1. Implement Register screen using `handleRegister` thunk
2. Add image picker for avatar upload in profile edit
3. Add forgot password functionality if API is available
4. Implement proper navigation guards for authenticated routes
5. Add token expiry handling and auto-logout

---

## Support

For any issues or questions, check:

- Redux DevTools for state inspection
- Console logs for API errors
- Network tab in Chrome DevTools for API calls
