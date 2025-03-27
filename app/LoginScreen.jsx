import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import MyButton from "./MyButton";
import MyTextinput from "./MyTextInput";
import SocialMedia from "./SocialMedia";


const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async() => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('TreeDataForm');
        } catch(error) { 
            Alert.alert('Error', error?.message || "An unknown error occurred.")
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/images/blackwp.png")} style={styles.imagebackground}>
                <Text style={styles.title}>App Name</Text>
                <View style={styles.inputContainer}>
                    <MyTextinput placeholder="Enter E-mail or User Name" value={email} onChangeText={setEmail} />
                    <MyTextinput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

                    <View style={styles.signupContainer}>
                        <Text style={styles.textDontHave}>Don't have an account yet? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}> 
                            <Text style={styles.linkButton}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    <MyButton title="Login" onPress={handleLogin} />
                    
                </View>
            </ImageBackground>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imagebackground: {
        height: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 40,
        color: "white",
        marginTop: 60,
    },
    inputContainer: {
        height: 450,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        padding: 20,
    },
    signupContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        marginRight: 10,
        marginBottom: 5,
    },
    textDontHave: {
        color: "black",
    },
    linkButton: {
        color: "blue",
        fontWeight: "bold",
        marginLeft: 5,
    },
    orText: {
        fontSize: 20,
        color: "gray",
        marginTop: 20,
    },
});