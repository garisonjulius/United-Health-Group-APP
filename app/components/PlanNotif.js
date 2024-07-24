import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Basic code structure from: https://reactnative.dev/docs/modal
const PlanNotif = ({ stopRender, displayPopUp, recPlanTitle, navigation }) => {
    // const [popUpVisible, setPopUpVisible] = useState(displayPopUp);

    return (
        <View style={[popUpStyles.centeredView, popUpStyles.allPopUpText]}>
            <Modal
                animationType='slide'
                transparent={false}
                visible={true}
                onRequestClose={() => {
                    console.log('Modal has been closed');
                    setModalVisible(!modalVisible);
                }}>
                <View style={[popUpStyles.centeredView, popUpStyles.opacityBackground]}>
                    <View style={popUpStyles.popUpView}>
                        <View style={popUpStyles.popUpText}>
                            <Text style={[popUpStyles.popUpText, popUpStyles.boldText]}>60 days until open enrollment begins (Nov. 15th){'\n'}</Text>
                            <Text style={popUpStyles.popUpText}>Based on your healthcare data from the past year, we recommend the <Text style={popUpStyles.boldText}>{recPlanTitle}</Text> plan{'\n'}</Text>
                            <Pressable onPress={() => navigation.navigate('Menu')}>
                                <Text style={popUpStyles.popUpText}>
                                    More information on the <Text style={popUpStyles.boldText}>{recPlanTitle}</Text> plan
                                    <AntDesign name="arrowright" size={32} color="#02226d" style={popUpStyles.arrowRight}/>
                                </Text>
                            </Pressable>
                        </View>

                        {/* Buttons */}
                        <View style={popUpStyles.buttonsView}>
                            {/* Do not show again button */}
                            <Pressable
                            style={popUpStyles.button}
                            onPress={() => {
                                // Make POST request
                                // Stop rendering the notification. This sets renderPopUp to false in Home.
                                stopRender();
                            }}
                            >
                                <Text style={[popUpStyles.boldText, popUpStyles.buttonText]}>Do not show again</Text>
                            </Pressable>

                            {/* Remind me later button */}
                            <Pressable
                            style={[popUpStyles.button, popUpStyles.buttonOpen]}
                            onPress={() => {
                                // Stop rendering the notification. This sets renderPopUp to false in Home.
                                stopRender();
                                // Toggle whether or not popup info is displayed (NOT rendered)
                                // setPopUpVisible(!popUpVisible);
                            }}
                            >
                                <Text style={[popUpStyles.boldText, popUpStyles.buttonText]}>Remind me later</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                
            </Modal>
        </View>
    );
}

const popUpStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    opacityBackground: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
    },
    allPopUpText: {
        color: '#02226d',
    },
    arrowRight: {
        paddingLeft: 10,
    },
    popUpView: {
        width: '100%',
        backgroundColor: '#edf8fc',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonsView: {
        display: 'flex',
        flexDirection: 'row',
        gap: 50,
        marginTop: 15,
    },
    button: {
        borderRadius: 10,
        padding: 10,
    },
    popUpText: {
        fontSize: 18,
        textAlign: 'center',
    },
    boldText: {
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 18,
        textDecorationLine: 'underline',
    },
});

export default PlanNotif;