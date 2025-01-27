import React from "react";
import {View,  StyleSheet} from "react-native";
import InputBar from "./InputBar";

const ChatbotMain = ({route}) => {
    const {name, uid} = route.params;
    console.log(name);
    console.log(uid);
    return(
        <View style = {styles.container} >
            <InputBar name={name} uid={uid}/>                                 
        </View>
    );
};

export default ChatbotMain;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#CDCDCD",
    },
});
