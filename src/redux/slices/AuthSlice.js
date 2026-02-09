import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi } from '../../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';


// 🔐 LOGIN THUNK
export const handlelogin = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            const res = await loginApi(data);

            const access = res.data.accessToken;
            const refresh = res.data.refreshToken;

            // Save tokens
            await AsyncStorage.setItem("accessToken", access);
            await AsyncStorage.setItem("refreshToken", refresh);

            return { access, refresh };

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login Failed"
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
    },
    reducers: {
        logout: (state) => {
            state.loginuser.logindata = null;
        },
    },
    extraReducers: (builder) => {
        builder
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
            });
    }
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
