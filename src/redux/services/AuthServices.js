import Baseurl from "./Baseurl";

// Authentication APIs
export const loginApi = (data) => Baseurl.post("/auth/login", data);
export const registerApi = (data) => Baseurl.post("/auth/register", data);
export const oauthLoginApi = (data) => Baseurl.post("/auth/oauth-login", data);
export const refreshTokenApi = (refreshToken) => Baseurl.post("/auth/refresh", { refreshToken });
export const logoutApi = (refreshToken) => Baseurl.post("/auth/logout", { refreshToken });
export const getMeApi = () => Baseurl.get("/auth/me");

// User Profile APIs
export const getProfilesApi = () => Baseurl.get("/user/profiles");
export const editProfileApi = (formData) => Baseurl.put("/user/edit-profile", formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
