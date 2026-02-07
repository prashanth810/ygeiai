import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, SIZES } from '../utils/Constants';

const GenderModel = ({ genderModal, setGenderModal, setGender }) => {
    return (
        <Modal visible={genderModal} transparent animationType="slide">
            <TouchableOpacity style={styles.modalOverlay} onPress={() => setGenderModal(false)}>
                <View style={styles.modalContent}>
                    {['Male', 'Female', 'Other'].map(item => (
                        <TouchableOpacity
                            key={item}
                            style={styles.modalItem}
                            onPress={() => {
                                setGender(item);
                                setGenderModal(false);
                            }}
                        >
                            <Text style={styles.modalText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default GenderModel

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: COLORS.lightdark,
        justifyContent: 'flex-end',
    },

    modalContent: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 20,
    },

    modalItem: {
        paddingVertical: 15,
        alignItems: 'center',
    },

    modalText: {
        fontSize: SIZES.body,
        color: COLORS.darkText,
    },

})