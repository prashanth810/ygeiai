import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    handlelogin,
    handleRegister,
    handleOAuthLogin,
    handleLogout,
    getMe,
    getUserProfile,
} from '../../redux/slices/AuthSlice';
import { COLORS } from '../../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthTestScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    // Selectors
    const { loginloading, loginerror, logindata } = useSelector(state => state.Auth.loginuser);
    const { loading: registerLoading, error: registerError, data: registerData } = useSelector(state => state.Auth.register);
    const { loading: logoutLoading } = useSelector(state => state.Auth.logout);
    const { data: meData, loading: meLoading } = useSelector(state => state.Auth.me);
    const { data: profileData, loading: profileLoading } = useSelector(state => state.Auth.profile);

    // Form States
    const [loginEmail, setLoginEmail] = useState('user@mail.com');
    const [loginPassword, setLoginPassword] = useState('Exato@123');

    const [registerName, setRegisterName] = useState('Test User');
    const [registerEmail, setRegisterEmail] = useState('testuser@example.com');
    const [registerPassword, setRegisterPassword] = useState('password123');
    const [registerPhone, setRegisterPhone] = useState('9876543210');
    const [registerAddress, setRegisterAddress] = useState('New Delhi');

    const [oauthProvider, setOauthProvider] = useState('google');
    const [oauthToken, setOauthToken] = useState('mock-google-token');

    const [testResults, setTestResults] = useState([]);

    // Add test result
    const addTestResult = (testName, status, message) => {
        setTestResults(prev => [...prev, { testName, status, message, timestamp: new Date().toISOString() }]);
    };

    // Test 1: Login
    const testLogin = async () => {
        try {
            addTestResult('Login Test', 'running', 'Testing login API...');
            const result = await dispatch(handlelogin({
                email: loginEmail,
                password: loginPassword
            })).unwrap();

            if (result.accessToken && result.user) {
                addTestResult('Login Test', 'success', `✅ Login successful! User: ${result.user.name}`);
            } else {
                addTestResult('Login Test', 'fail', '❌ Login response missing data');
            }
        } catch (error) {
            addTestResult('Login Test', 'fail', `❌ Login failed: ${error}`);
        }
    };

    // Test 2: Register
    const testRegister = async () => {
        try {
            addTestResult('Register Test', 'running', 'Testing register API...');
            const result = await dispatch(handleRegister({
                name: registerName,
                email: registerEmail,
                password: registerPassword,
                phone: registerPhone,
                address: registerAddress
            })).unwrap();

            if (result.success) {
                addTestResult('Register Test', 'success', `✅ Registration successful! User ID: ${result.data?.userId}`);
            } else {
                addTestResult('Register Test', 'fail', '❌ Registration response invalid');
            }
        } catch (error) {
            addTestResult('Register Test', 'fail', `❌ Registration failed: ${error}`);
        }
    };

    // Test 3: Get Me
    const testGetMe = async () => {
        try {
            addTestResult('Get Me Test', 'running', 'Testing /me API...');
            const result = await dispatch(getMe()).unwrap();

            if (result && result.id) {
                addTestResult('Get Me Test', 'success', `✅ Get Me successful! User: ${result.name}`);
            } else {
                addTestResult('Get Me Test', 'fail', '❌ Get Me response invalid');
            }
        } catch (error) {
            addTestResult('Get Me Test', 'fail', `❌ Get Me failed: ${error}`);
        }
    };

    // Test 4: Get Profile
    const testGetProfile = async () => {
        try {
            addTestResult('Get Profile Test', 'running', 'Testing profile API...');
            const result = await dispatch(getUserProfile()).unwrap();

            if (result && result.length > 0) {
                addTestResult('Get Profile Test', 'success', `✅ Profile fetched! Name: ${result[0].displayName}`);
            } else {
                addTestResult('Get Profile Test', 'fail', '❌ Profile response invalid');
            }
        } catch (error) {
            addTestResult('Get Profile Test', 'fail', `❌ Get Profile failed: ${error}`);
        }
    };

    // Test 5: OAuth Login (Mock)
    const testOAuthLogin = async () => {
        try {
            addTestResult('OAuth Test', 'running', 'Testing OAuth login API...');
            const result = await dispatch(handleOAuthLogin({
                provider: oauthProvider,
                idToken: oauthToken
            })).unwrap();

            if (result.accessToken && result.user) {
                addTestResult('OAuth Test', 'success', `✅ OAuth login successful! User: ${result.user.name}`);
            } else {
                addTestResult('OAuth Test', 'fail', '❌ OAuth response missing data');
            }
        } catch (error) {
            addTestResult('OAuth Test', 'fail', `❌ OAuth login failed: ${error}`);
        }
    };

    // Test 6: Logout
    const testLogout = async () => {
        try {
            addTestResult('Logout Test', 'running', 'Testing logout API...');
            await dispatch(handleLogout()).unwrap();
            addTestResult('Logout Test', 'success', '✅ Logout successful!');
        } catch (error) {
            addTestResult('Logout Test', 'fail', `❌ Logout failed: ${error}`);
        }
    };

    // Test 7: Check Storage
    const testCheckStorage = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            const user = await AsyncStorage.getItem('user');

            const message = `
Access Token: ${accessToken ? '✅ Present' : '❌ Missing'}
Refresh Token: ${refreshToken ? '✅ Present' : '❌ Missing'}
User Data: ${user ? '✅ Present' : '❌ Missing'}
            `;
            addTestResult('Storage Check', 'success', message);
        } catch (error) {
            addTestResult('Storage Check', 'fail', `❌ Storage check failed: ${error}`);
        }
    };

    // Run all tests
    const runAllTests = async () => {
        setTestResults([]);
        addTestResult('Full Test Suite', 'running', '🚀 Starting all tests...');

        await testLogin();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await testGetMe();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await testGetProfile();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await testCheckStorage();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await testLogout();

        addTestResult('Full Test Suite', 'success', '🎉 All tests completed!');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>🧪 Auth API Test Suite</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Login Test */}
                <View style={styles.testSection}>
                    <Text style={styles.sectionTitle}>1. Login Test</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={loginEmail}
                        onChangeText={setLoginEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={loginPassword}
                        onChangeText={setLoginPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity
                        style={styles.testBtn}
                        onPress={testLogin}
                        disabled={loginloading}
                    >
                        {loginloading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.testBtnText}>Test Login</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Register Test */}
                <View style={styles.testSection}>
                    <Text style={styles.sectionTitle}>2. Register Test</Text>
                    <TextInput style={styles.input} placeholder="Name" value={registerName} onChangeText={setRegisterName} />
                    <TextInput style={styles.input} placeholder="Email" value={registerEmail} onChangeText={setRegisterEmail} />
                    <TextInput style={styles.input} placeholder="Password" value={registerPassword} onChangeText={setRegisterPassword} secureTextEntry />
                    <TextInput style={styles.input} placeholder="Phone (optional)" value={registerPhone} onChangeText={setRegisterPhone} />
                    <TextInput style={styles.input} placeholder="Address (optional)" value={registerAddress} onChangeText={setRegisterAddress} />
                    <TouchableOpacity style={styles.testBtn} onPress={testRegister} disabled={registerLoading}>
                        {registerLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.testBtnText}>Test Register</Text>}
                    </TouchableOpacity>
                </View>

                {/* Get Me Test */}
                <View style={styles.testSection}>
                    <Text style={styles.sectionTitle}>3. Get Me Test</Text>
                    <TouchableOpacity style={styles.testBtn} onPress={testGetMe} disabled={meLoading}>
                        {meLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.testBtnText}>Test Get Me</Text>}
                    </TouchableOpacity>
                    {meData && (
                        <View style={styles.resultBox}>
                            <Text style={styles.resultText}>Name: {meData.name}</Text>
                            <Text style={styles.resultText}>Role: {meData.role}</Text>
                            <Text style={styles.resultText}>Verified: {meData.isVerified ? 'Yes' : 'No'}</Text>
                        </View>
                    )}
                </View>

                {/* Get Profile Test */}
                <View style={styles.testSection}>
                    <Text style={styles.sectionTitle}>4. Get Profile Test</Text>
                    <TouchableOpacity style={styles.testBtn} onPress={testGetProfile} disabled={profileLoading}>
                        {profileLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.testBtnText}>Test Get Profile</Text>}
                    </TouchableOpacity>
                    {profileData && profileData.length > 0 && (
                        <View style={styles.resultBox}>
                            <Text style={styles.resultText}>Name: {profileData[0].displayName}</Text>
                            <Text style={styles.resultText}>Gender: {profileData[0].gender}</Text>
                            <Text style={styles.resultText}>Height: {profileData[0].height} {profileData[0].heightUnit}</Text>
                        </View>
                    )}
                </View>

                {/* Storage Check */}
                <View style={styles.testSection}>
                    <Text style={styles.sectionTitle}>5. Storage Check</Text>
                    <TouchableOpacity style={styles.testBtn} onPress={testCheckStorage}>
                        <Text style={styles.testBtnText}>Check Storage</Text>
                    </TouchableOpacity>
                </View>

                {/* Logout Test */}
                <View style={styles.testSection}>
                    <Text style={styles.sectionTitle}>6. Logout Test</Text>
                    <TouchableOpacity style={[styles.testBtn, styles.logoutBtn]} onPress={testLogout} disabled={logoutLoading}>
                        {logoutLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.testBtnText}>Test Logout</Text>}
                    </TouchableOpacity>
                </View>

                {/* Run All Tests */}
                <TouchableOpacity style={[styles.testBtn, styles.runAllBtn]} onPress={runAllTests}>
                    <Text style={styles.testBtnText}>🚀 Run All Tests</Text>
                </TouchableOpacity>

                {/* Test Results */}
                {testResults.length > 0 && (
                    <View style={styles.resultsSection}>
                        <Text style={styles.resultsTitle}>📊 Test Results</Text>
                        {testResults.map((result, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.resultItem,
                                    result.status === 'success' && styles.resultSuccess,
                                    result.status === 'fail' && styles.resultFail,
                                    result.status === 'running' && styles.resultRunning,
                                ]}
                            >
                                <Text style={styles.resultTestName}>{result.testName}</Text>
                                <Text style={styles.resultMessage}>{result.message}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default AuthTestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: COLORS.gradientEnd,
        padding: 20,
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    backBtn: {
        padding: 8,
    },
    backText: {
        color: '#fff',
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
        padding: 15,
    },
    testSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        fontSize: 14,
    },
    testBtn: {
        backgroundColor: COLORS.gradientEnd,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutBtn: {
        backgroundColor: '#FF4444',
    },
    runAllBtn: {
        backgroundColor: '#7C3AED',
        marginTop: 10,
    },
    testBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    resultBox: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    resultText: {
        fontSize: 13,
        color: '#333',
        marginBottom: 5,
    },
    resultsSection: {
        marginTop: 20,
        marginBottom: 30,
    },
    resultsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    resultItem: {
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 4,
    },
    resultSuccess: {
        backgroundColor: '#E8F5E9',
        borderLeftColor: '#4CAF50',
    },
    resultFail: {
        backgroundColor: '#FFEBEE',
        borderLeftColor: '#F44336',
    },
    resultRunning: {
        backgroundColor: '#FFF3E0',
        borderLeftColor: '#FF9800',
    },
    resultTestName: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5,
        color: '#333',
    },
    resultMessage: {
        fontSize: 12,
        color: '#666',
    },
});
