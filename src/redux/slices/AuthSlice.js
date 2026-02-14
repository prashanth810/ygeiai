import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi, registerApi, oauthLoginApi, logoutApi, getMeApi, getProfilesApi, editProfileApi } from '../services/AuthServices';
import AsyncStorage from '@react-native-async-storage/async-storage';


// 🔐 LOGIN THUNK
export const handlelogin = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            const res = await loginApi(data);

            const accessToken = res.data.accessToken;
            const refreshToken = res.data.refreshToken;
            const user = res.data.user;

            // Save tokens and user
            await AsyncStorage.setItem("accessToken", accessToken);
            await AsyncStorage.setItem("refreshToken", refreshToken);
            await AsyncStorage.setItem("user", JSON.stringify(user));

            return { accessToken, refreshToken, user };

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login Failed"
            );
        }
    }
);

// 📝 REGISTER THUNK
export const handleRegister = createAsyncThunk(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            const res = await registerApi(data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Registration Failed"
            );
        }
    }
);

// 🔑 OAUTH LOGIN THUNK
export const handleOAuthLogin = createAsyncThunk(
    "auth/oauthLogin",
    async (data, thunkAPI) => {
        try {
            const res = await oauthLoginApi(data);

            const accessToken = res.data.accessToken;
            const refreshToken = res.data.refreshToken;
            const user = res.data.user;

            // Save tokens and user
            await AsyncStorage.setItem("accessToken", accessToken);
            await AsyncStorage.setItem("refreshToken", refreshToken);
            await AsyncStorage.setItem("user", JSON.stringify(user));

            return { accessToken, refreshToken, user };

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "OAuth Login Failed"
            );
        }
    }
);

// 🚪 LOGOUT THUNK
export const handleLogout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const refreshToken = await AsyncStorage.getItem("refreshToken");

            if (refreshToken) {
                await logoutApi(refreshToken);
            }

            // Clear all stored data
            await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);

            return true;

        } catch (error) {
            // Even if API fails, clear local data
            await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Logout Failed"
            );
        }
    }
);

// 👤 GET CURRENT USER (ME) THUNK
export const getMe = createAsyncThunk(
    "auth/getMe",
    async (_, thunkAPI) => {
        try {
            const res = await getMeApi();
            return res.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch user"
            );
        }
    }
);

// 👤 GET USER PROFILE THUNK
export const getUserProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, thunkAPI) => {
        try {
            const res = await getProfilesApi();
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch profile"
            );
        }
    }
);

// ✏️ EDIT PROFILE THUNK
export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (formData, thunkAPI) => {
        try {
            const res = await editProfileApi(formData);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update profile"
            );
        }
    }
);


// 🧠 SLICE
const AuthSlice = createSlice({
    name: "Auth",
    initialState: {
        loginuser: {
            logindata: null,
            loginloading: false,
            loginerror: null,
        },
        register: {
            data: null,
            loading: false,
            error: null,
        },
        oauthLogin: {
            data: null,
            loading: false,
            error: null,
        },
        logout: {
            loading: false,
            error: null,
        },
        me: {
            data: null,
            loading: false,
            error: null,
        },
        profile: {
            data: null,
            loading: false,
            error: null,
        },
        updateProfile: {
            loading: false,
            error: null,
        },
    },
    reducers: {
        clearAuthState: (state) => {
            state.loginuser.logindata = null;
            state.profile.data = null;
            state.me.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(handlelogin.pending, (state) => {
                state.loginuser.loginloading = true;
                state.loginuser.loginerror = null;
            })
            .addCase(handlelogin.fulfilled, (state, action) => {
                state.loginuser.loginloading = false;
                state.loginuser.logindata = action.payload;
            })
            .addCase(handlelogin.rejected, (state, action) => {
                state.loginuser.loginloading = false;
                state.loginuser.loginerror = action.payload;
            })
            // Register
            .addCase(handleRegister.pending, (state) => {
                state.register.loading = true;
                state.register.error = null;
            })
            .addCase(handleRegister.fulfilled, (state, action) => {
                state.register.loading = false;
                state.register.data = action.payload;
            })
            .addCase(handleRegister.rejected, (state, action) => {
                state.register.loading = false;
                state.register.error = action.payload;
            })
            // OAuth Login
            .addCase(handleOAuthLogin.pending, (state) => {
                state.oauthLogin.loading = true;
                state.oauthLogin.error = null;
            })
            .addCase(handleOAuthLogin.fulfilled, (state, action) => {
                state.oauthLogin.loading = false;
                state.oauthLogin.data = action.payload;
                state.loginuser.logindata = action.payload; // Also update login state
            })
            .addCase(handleOAuthLogin.rejected, (state, action) => {
                state.oauthLogin.loading = false;
                state.oauthLogin.error = action.payload;
            })
            // Logout
            .addCase(handleLogout.pending, (state) => {
                state.logout.loading = true;
                state.logout.error = null;
            })
            .addCase(handleLogout.fulfilled, (state) => {
                state.logout.loading = false;
                state.loginuser.logindata = null;
                state.profile.data = null;
                state.me.data = null;
            })
            .addCase(handleLogout.rejected, (state, action) => {
                state.logout.loading = false;
                state.logout.error = action.payload;
                // Still clear data even on error
                state.loginuser.logindata = null;
                state.profile.data = null;
                state.me.data = null;
            })
            // Get Me
            .addCase(getMe.pending, (state) => {
                state.me.loading = true;
                state.me.error = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.me.loading = false;
                state.me.data = action.payload;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.me.loading = false;
                state.me.error = action.payload;
            })
            // Get Profile
            .addCase(getUserProfile.pending, (state) => {
                state.profile.loading = true;
                state.profile.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.profile.loading = false;
                state.profile.data = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.profile.loading = false;
                state.profile.error = action.payload;
            })
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.updateProfile.loading = true;
                state.updateProfile.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.updateProfile.loading = false;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.updateProfile.loading = false;
                state.updateProfile.error = action.payload;
            });
    }
});

export const { clearAuthState } = AuthSlice.actions;
export default AuthSlice.reducer;
