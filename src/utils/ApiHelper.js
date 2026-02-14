import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Get stored access token
 */
export const getAccessToken = async () => {
    try {
        const token = await AsyncStorage.getItem("accessToken");
        return token;
    } catch (error) {
        console.error("Error getting access token:", error);
        return null;
    }
};

/**
 * Get stored user data
 */
export const getUserData = async () => {
    try {
        const userData = await AsyncStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error("Error getting user data:", error);
        return null;
    }
};

/**
 * Clear auth data on logout
 */
export const clearAuthData = async () => {
    try {
        await AsyncStorage.multiRemove(["accessToken", "user"]);
    } catch (error) {
        console.error("Error clearing auth data:", error);
    }
};

/**
 * Create FormData for profile edit API
 * @param {Object} profileData - Profile data object
 * @returns FormData object
 */
export const createProfileFormData = (profileData) => {
    const formData = new FormData();

    if (profileData.name) formData.append('name', profileData.name);
    if (profileData.gender) formData.append('gender', profileData.gender);
    if (profileData.height) formData.append('height', profileData.height.toString());
    if (profileData.heightUnit) formData.append('heightUnit', profileData.heightUnit);
    if (profileData.weight) formData.append('weight', profileData.weight.toString());
    if (profileData.phone) formData.append('phone', profileData.phone);
    if (profileData.address) formData.append('address', profileData.address);
    if (profileData.dob) formData.append('dob', profileData.dob);

    // Avatar file upload
    if (profileData.avatar) {
        formData.append('avatar', {
            uri: profileData.avatar.uri,
            type: profileData.avatar.type || 'image/jpeg',
            name: profileData.avatar.fileName || 'avatar.jpg',
        });
    }

    return formData;
};
