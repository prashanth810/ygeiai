import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image,
    TextInput,
    Switch,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES } from '../../utils/Constants';
import profileimg from '../../assets/profileimg.png';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Modal, Platform, PermissionsAndroid, Alert } from 'react-native';


const { width } = Dimensions.get('window');

const UserProfile = ({ navigation }) => {
    // ALL HOOKS MUST BE AT THE TOP - NEVER CONDITIONAL
    const [menuVisible, setMenuVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [personalInfoExpanded, setPersonalInfoExpanded] = useState(false);
    const [themeExpanded, setThemeExpanded] = useState(false);
    const [notificationsExpanded, setNotificationsExpanded] = useState(false);
    const [subscriptionExpanded, setSubscriptionExpanded] = useState(false);
    const [disclaimerVisible, setDisclaimerVisible] = useState(false);
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('Please Choose');
    const [heightUnit, setHeightUnit] = useState('cm');
    const [height, setHeight] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+357');
    const [email, setEmail] = useState('youremail@gmail.com');
    const [theme, setTheme] = useState('Please Choose');
    const [units, setUnits] = useState('Please Choose');
    const [language, setLanguage] = useState('Please Choose');
    const [notification1, setNotification1] = useState(false);
    const [notification2, setNotification2] = useState(false);
    // NEW: Profile image state
    const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/women/44.jpg');
    const [imagePickerVisible, setImagePickerVisible] = useState(false);

    const handleEdit = () => {
        setMenuVisible(false);
        setEditMode(true);
    };

    const handleLogout = () => {
        setMenuVisible(false);
        console.log('Logout');
    };

    const handleSavePersonalInfo = () => {
        setEditMode(false);
        console.log('Personal Info Saved');
    };

    const handleSaveTheme = () => {
        console.log('Theme Saved');
    };

    const handleSaveNotifications = () => {
        console.log('Notifications Saved');
    };


    // Request camera permission for Android
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission to take photos',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };



    // Handle camera
    const handleTakePhoto = async () => {
        setImagePickerVisible(false);

        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Camera permission is required to take photos');
            return;
        }

        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorCode) {
                console.log('Camera Error: ', response.errorMessage);
                Alert.alert('Error', 'Failed to open camera');
            } else if (response.assets && response.assets.length > 0) {
                const imageUri = response.assets[0].uri;
                setProfileImage(imageUri);
            }
        });
    };


    // Handle gallery
    const handleSelectFromGallery = () => {
        setImagePickerVisible(false);

        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
                Alert.alert('Error', 'Failed to open gallery');
            } else if (response.assets && response.assets.length > 0) {
                const imageUri = response.assets[0].uri;
                setProfileImage(imageUri);
            }
        });
    };


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerspacing}>
                <View style={styles.account}>
                    <Text style={styles.mainhead}>Account</Text>
                    <TouchableOpacity
                        style={styles.menubtn}
                        onPress={() => setMenuVisible(!menuVisible)} >
                        <Entypo name='dots-three-vertical' size={16} color={COLORS.white} />
                    </TouchableOpacity>

                    {/* Dropdown Menu */}
                    {menuVisible && (
                        <View style={styles.dropdownMenu}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={handleEdit} >
                                <Text style={styles.menuText}>Editing</Text>
                            </TouchableOpacity>
                            <View style={styles.menuDivider} />
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={handleLogout}
                            >
                                <Text style={styles.menuTextRed}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>


                {/* Profile Section - UPDATED with default icon */}
                <View style={styles.profileSection}>
                    <View style={styles.profileImageContainer}>
                        {profileImage ? (
                            <Image
                                source={{ uri: profileImage }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <View style={styles.defaultProfileIcon}>
                                <Ionicons name="person" size={40} color="#A0A3BD" />
                            </View>
                        )}
                        <TouchableOpacity
                            style={styles.editIconContainer}
                            onPress={() => setImagePickerVisible(true)}
                        >
                            <Ionicons name="camera-outline" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>User Name</Text>
                    <Text style={styles.userEmail}>username@gmail.com</Text>
                </View>

                <Modal
                    visible={imagePickerVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setImagePickerVisible(false)} >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>

                            <Text style={styles.modalTitle}>Change Profile Photo</Text>

                            <TouchableOpacity style={styles.modalBtn} onPress={handleTakePhoto}>
                                <Ionicons name="camera-outline" size={20} color="#1A1D3D" />
                                <Text style={styles.modalText}>Take Photo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalBtn} onPress={handleSelectFromGallery}>
                                <Ionicons name="image-outline" size={20} color="#1A1D3D" />
                                <Text style={styles.modalText}>Choose from Gallery</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalBtn, { justifyContent: 'center' }]}
                                onPress={() => setImagePickerVisible(false)}
                            >
                                <Text style={[styles.modalText, { color: '#FF4444' }]}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>

            </View>

            {/* Body */}
            <View style={styles.subheader}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* Personal Information */}
                    <TouchableOpacity
                        style={styles.menuCard}
                        onPress={() => setPersonalInfoExpanded(!personalInfoExpanded)} >
                        <View style={styles.iconWrapper}>
                            <MaterialCommunityIcons name="card-account-details" size={24} color="#fff" />
                        </View>
                        <Text style={styles.menuTitle}>Personal Information</Text>
                        <Entypo
                            name={personalInfoExpanded ? "chevron-up" : "chevron-down"}
                            size={20}
                            color="#5A6B8C"
                        />
                    </TouchableOpacity>

                    {personalInfoExpanded && (
                        <View style={styles.expandedContent}>
                            <Text style={styles.label}>Full Name <Text style={styles.required}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                placeholder=""
                                value={fullName}
                                onChangeText={setFullName}
                                editable={editMode}
                            />

                            <Text style={styles.label}>Gender</Text>
                            <View style={styles.dropdown}>
                                <Text style={styles.dropdownText}>{gender}</Text>
                                <Entypo name="chevron-down" size={18} color="#A0A3BD" />
                            </View>

                            <Text style={styles.label}>Height</Text>
                            <View style={styles.heightContainer}>
                                <TextInput
                                    style={styles.heightInput}
                                    placeholder=""
                                    value={height}
                                    onChangeText={setHeight}
                                    keyboardType="numeric"
                                    editable={editMode}
                                />
                                <View style={styles.unitSelector}>
                                    <TouchableOpacity
                                        style={styles.unitOption}
                                        onPress={() => setHeightUnit('cm')}
                                    >
                                        <View style={[styles.radio, heightUnit === 'cm' && styles.radioSelected]}>
                                            {heightUnit === 'cm' && <View style={styles.radioDot} />}
                                        </View>
                                        <Text style={styles.unitText}>cm</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.unitOption}
                                        onPress={() => setHeightUnit('ft')}
                                    >
                                        <View style={[styles.radio, heightUnit === 'ft' && styles.radioSelected]}>
                                            {heightUnit === 'ft' && <View style={styles.radioDot} />}
                                        </View>
                                        <Text style={styles.unitText}>ft</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={styles.label}>Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder=""
                                value={address}
                                onChangeText={setAddress}
                                editable={editMode}
                            />

                            <Text style={styles.label}>Phone Number</Text>
                            <View style={styles.inputWithCheck}>
                                <TextInput
                                    style={styles.inputFlex}
                                    placeholder="+357"
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    keyboardType="phone-pad"
                                    editable={editMode}
                                />
                                <Feather name="check" size={20} color="#00D86A" />
                            </View>

                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputWithCheck}>
                                <TextInput
                                    style={styles.inputFlex}
                                    placeholder="youremail@gmail.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    editable={editMode}
                                />
                                <Feather name="check" size={20} color="#00D86A" />
                            </View>

                            {editMode && (
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={handleSavePersonalInfo}
                                >
                                    <Text style={styles.editButtonText}>Edit</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}

                    {/* Theme, units, language */}
                    <TouchableOpacity
                        style={styles.menuCard}
                        onPress={() => setThemeExpanded(!themeExpanded)}
                    >
                        <View style={styles.iconWrapper}>
                            <MaterialCommunityIcons name="palette" size={24} color="#fff" />
                        </View>
                        <Text style={styles.menuTitle}>Theme, units, language</Text>
                        <Entypo
                            name={themeExpanded ? "chevron-up" : "chevron-down"}
                            size={20}
                            color="#5A6B8C"
                        />
                    </TouchableOpacity>

                    {themeExpanded && (
                        <View style={styles.expandedContent}>
                            <Text style={styles.label}>Theme</Text>
                            <View style={styles.dropdown}>
                                <Text style={styles.dropdownText}>{theme}</Text>
                                <Entypo name="chevron-down" size={18} color="#A0A3BD" />
                            </View>

                            <Text style={styles.label}>Units</Text>
                            <View style={styles.dropdown}>
                                <Text style={styles.dropdownText}>{units}</Text>
                                <Entypo name="chevron-down" size={18} color="#A0A3BD" />
                            </View>

                            <Text style={styles.label}>Language</Text>
                            <View style={styles.dropdown}>
                                <Text style={styles.dropdownText}>{language}</Text>
                                <Entypo name="chevron-down" size={18} color="#A0A3BD" />
                            </View>

                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleSaveTheme}
                            >
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Notifications */}
                    <TouchableOpacity
                        style={styles.menuCard}
                        onPress={() => setNotificationsExpanded(!notificationsExpanded)}
                    >
                        <View style={styles.iconWrapper}>
                            <MaterialCommunityIcons name="bell" size={24} color="#fff" />
                        </View>
                        <Text style={styles.menuTitle}>Notifications</Text>
                        <Entypo
                            name={notificationsExpanded ? "chevron-up" : "chevron-down"}
                            size={20}
                            color="#5A6B8C"
                        />
                    </TouchableOpacity>

                    {notificationsExpanded && (
                        <View style={styles.expandedContent}>
                            <View style={styles.notificationCard}>
                                <Text style={styles.notificationTitle}>General Interpretation</Text>
                                <Text style={styles.notificationDesc}>
                                    Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Ut elit lorem, soli icitudin eu facilisis et, condimentum eu orci. Ut non sollicitudin purus, eu scelerisque enim. Suspendisse dignis sim et quam a varius.
                                </Text>
                                <View style={styles.switchRow}>
                                    <Text style={styles.switchLabel}>Enable notification</Text>
                                    <Switch
                                        value={notification1}
                                        onValueChange={setNotification1}
                                        trackColor={{ false: '#D1D5E8', true: '#A78BFA' }}
                                        thumbColor={notification1 ? '#7C3AED' : '#fff'}
                                    />
                                </View>
                            </View>

                            <View style={styles.notificationCard}>
                                <Text style={styles.notificationTitle}>General Interpretation</Text>
                                <Text style={styles.notificationDesc}>
                                    Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Ut elit lorem, soli icitudin eu facilisis et, condimentum eu orci. Ut non sollicitudin purus, eu scelerisque enim. Suspendisse dignis sim et quam a varius.
                                </Text>
                                <View style={styles.switchRow}>
                                    <Text style={styles.switchLabel}>Enable notification</Text>
                                    <Switch
                                        value={notification2}
                                        onValueChange={setNotification2}
                                        trackColor={{ false: '#D1D5E8', true: '#A78BFA' }}
                                        thumbColor={notification2 ? '#7C3AED' : '#fff'}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleSaveNotifications}
                            >
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Subscription */}
                    <TouchableOpacity
                        style={styles.menuCard}
                        onPress={() => setSubscriptionExpanded(!subscriptionExpanded)}
                    >
                        <View style={styles.iconWrapper}>
                            <MaterialCommunityIcons name="crown" size={24} color="#fff" />
                        </View>
                        <Text style={styles.menuTitle}>Subscription</Text>
                        <Entypo
                            name={subscriptionExpanded ? "chevron-up" : "chevron-down"}
                            size={20}
                            color="#5A6B8C"
                        />
                    </TouchableOpacity>

                    {subscriptionExpanded && (
                        <View style={styles.expandedContent}>
                            <View style={styles.subscriptionCard}>
                                <Text style={styles.notificationTitle}>General Interpretation</Text>
                                <Text style={styles.notificationDesc}>
                                    Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Ut elit lorem, soli icitudin eu facilisis et, condimentum eu orci. Ut non sollicitudin purus, eu scelerisque enim. Suspendisse dignis sim et quam a varius.
                                </Text>
                            </View>

                            <TouchableOpacity style={styles.premiumButton}>
                                <Text style={styles.premiumButtonText}>Get Premium for €0.0/m</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Link to website Button */}
                    <TouchableOpacity style={styles.websiteBtn} activeOpacity={0.8}>
                        <LinearGradient
                            colors={['#00D9D5', '#6C5CE7']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.websiteBtnGradient}
                        >
                            <Text style={styles.websiteBtnText}>Link to website</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Disclaimer */}
                    <TouchableOpacity style={styles.menuCard}
                        onPress={() => setDisclaimerVisible(!disclaimerVisible)}>
                        <View style={styles.iconWrapper}>
                            <MaterialCommunityIcons name="file-document" size={24} color="#fff" />
                        </View>
                        <Text style={styles.menuTitle}>Disclaimer</Text>
                        <Entypo
                            name={disclaimerVisible ? "chevron-up" : "chevron-down"}
                            size={20}
                            color="#5A6B8C"
                        />
                    </TouchableOpacity>

                    {disclaimerVisible && (
                        <View style={styles.expandedContent}>
                            <View style={styles.subscriptionCard}>
                                <Text style={styles.notificationTitle}>General Interpretation</Text>
                                <Text style={styles.notificationDesc}>
                                    Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Ut elit lorem, soli icitudin eu facilisis et, condimentum eu orci. Ut non sollicitudin purus, eu scelerisque enim. Suspendisse dignis sim et quam a varius.
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Delete Account */}
                    <TouchableOpacity style={styles.deleteBtn}>
                        <Text style={styles.deleteBtnText}>Delete Account</Text>
                    </TouchableOpacity>

                    <View style={{ height: 120 }} />
                </ScrollView>
            </View>
        </View>
    );
};

export default UserProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3E4157',
    },
    headerspacing: {
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 20,
    },
    account: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    mainhead: {
        fontSize: SIZES.miniminbig,
        color: '#fff',
        fontWeight: '700',
    },
    menubtn: {
        backgroundColor: '#00D9D5',
        padding: 10,
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownMenu: {
        position: 'absolute',
        top: 45,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        minWidth: 120,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        zIndex: 1000,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
    menuText: {
        fontSize: 14,
        color: '#1A1D3D',
        fontWeight: '500',
    },
    menuTextRed: {
        fontSize: 14,
        color: '#FF4444',
        fontWeight: '500',
    },
    menuDivider: {
        height: 1,
        backgroundColor: '#E5E9F2',
        marginVertical: 4,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 6,
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 8,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: SIZES.maxbig,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        backgroundColor: '#00D9D5',
        width: SIZES.buttonRadius,
        height: SIZES.buttonRadius,
        borderRadius: SIZES.big,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 13,
        color: '#A0A3BD',
    },
    subheader: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    menuCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F7FF',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#00D9D5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuTitle: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1D3D',
    },
    expandedContent: {
        backgroundColor: '#F5F7FF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        marginTop: -10,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3E4157',
        marginBottom: 8,
        marginTop: 12,
    },
    required: {
        color: '#FF4444',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#1A1D3D',
        borderWidth: 1,
        borderColor: '#E5E9F2',
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E9F2',
    },
    dropdownText: {
        fontSize: 14,
        color: '#A0A3BD',
    },
    heightContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    heightInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#1A1D3D',
        borderWidth: 1,
        borderColor: '#E5E9F2',
    },
    unitSelector: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    unitOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#D1D5E8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioSelected: {
        borderColor: '#00D9D5',
    },
    radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#00D9D5',
    },
    unitText: {
        fontSize: 14,
        color: '#3E4157',
    },
    inputWithCheck: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E9F2',
    },
    inputFlex: {
        flex: 1,
        fontSize: 14,
        color: '#1A1D3D',
    },
    editButton: {
        backgroundColor: '#7C3AED',
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    saveButton: {
        backgroundColor: '#7C3AED',
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    notificationCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    notificationTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1A1D3D',
        marginBottom: 8,
    },
    notificationDesc: {
        fontSize: 13,
        color: '#7C8DB5',
        lineHeight: 20,
        marginBottom: 12,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    switchLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1D3D',
    },
    subscriptionCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    premiumButton: {
        backgroundColor: '#7C3AED',
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: 'center',
    },
    premiumButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    websiteBtn: {
        marginVertical: 16,
        borderRadius: 28,
        elevation: 4,
        shadowColor: '#6C5CE7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    websiteBtnGradient: {
        paddingVertical: 16,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    websiteBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    deleteBtn: {
        marginTop: 12,
        paddingVertical: 16,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: '#FF4444',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    deleteBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF4444',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F0F2F5',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    navItem: {
        padding: 10,
    },
    navItemActive: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30,
        elevation: 8,
        shadowColor: '#6C5CE7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    navItemActiveGradient: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },

    defaultProfileIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F5F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#00D9D5',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },

    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },

    modalTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 15,
        textAlign: 'center',
        color: '#1A1D3D',
    },

    modalBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: '#F0F2F5',
    },

    modalText: {
        fontSize: 14,
        color: '#1A1D3D',
    },


});