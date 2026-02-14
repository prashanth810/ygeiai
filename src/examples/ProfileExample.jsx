import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateProfile } from '../../redux/slices/AuthSlice';
import { createProfileFormData } from '../../utils/ApiHelper';

/**
 * Example: How to use Profile API
 */
const ProfileExample = () => {
    const dispatch = useDispatch();
    const { data: profileData, loading, error } = useSelector(state => state.Auth.profile);
    const { loading: updateLoading } = useSelector(state => state.Auth.updateProfile);

    useEffect(() => {
        // Fetch profile on component mount
        dispatch(getUserProfile());
    }, []);

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error);
        }
    }, [error]);

    const handleUpdateProfile = () => {
        // Example profile data to update
        const updatedData = {
            name: 'Updated Name',
            gender: 'male',
            height: 175,
            heightUnit: 'CM',
            weight: 70,
            phone: '1234567890',
            address: 'New Address',
            dob: '2000-01-01',
            // For avatar, you need to get from image picker
            // avatar: {
            //     uri: 'file://path/to/image.jpg',
            //     type: 'image/jpeg',
            //     fileName: 'avatar.jpg'
            // }
        };

        const formData = createProfileFormData(updatedData);

        dispatch(updateProfile(formData))
            .unwrap()
            .then(() => {
                Alert.alert('Success', 'Profile updated successfully');
                // Refetch profile
                dispatch(getUserProfile());
            })
            .catch((err) => {
                Alert.alert('Error', err);
            });
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Data</Text>

            {profileData && profileData.length > 0 && (
                <View style={styles.profileContainer}>
                    <Text style={styles.label}>Name: {profileData[0].displayName}</Text>
                    <Text style={styles.label}>Gender: {profileData[0].gender}</Text>
                    <Text style={styles.label}>Height: {profileData[0].height} {profileData[0].heightUnit}</Text>
                    <Text style={styles.label}>Weight: {profileData[0].weight}</Text>
                    <Text style={styles.label}>Phone: {profileData[0].phone}</Text>
                    <Text style={styles.label}>Address: {profileData[0].address}</Text>
                </View>
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={handleUpdateProfile}
                disabled={updateLoading}
            >
                {updateLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Update Profile</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.refreshButton]}
                onPress={() => dispatch(getUserProfile())}
            >
                <Text style={styles.buttonText}>Refresh Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileContainer: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    refreshButton: {
        backgroundColor: '#34C759',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileExample;
