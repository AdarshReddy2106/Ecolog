import MyButton from "./MyButton";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyTextinput from "./MyTextInput";
import SocialMedia from "./SocialMedia";
import { auth, db} from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import React from "react";

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async() => {
        if (password !== confirmPassword) {
            Alert.alert('Error', "Passwords do not match!");
            return;
        }
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', userCredential.user.uid),
        {
            email: email,
            createdAt: new Date(),
            role: 'user'
        });

        navigation.navigate('LoginScreen');
    }
        catch (error) { 
            Alert.alert('Error', error.message);
        }
    };
    
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/images/blackwp.png")} style={styles.imagebackground}>
                <Text style={styles.title}>App Name</Text>
                <View style={styles.inputContainer}>
                    <MyTextinput placeholder="Enter E-mail or User Name" value={email} onChangeText={setEmail} />
                    <MyTextinput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
                    <MyTextinput placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

                    <View style={styles.signupContainer}>
                        <Text style={styles.textAlreadyHave}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                            <Text style={styles.linkButton}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <SocialMedia />
                </View>
            </ImageBackground>
        </View>
    );
};

export default SignUpScreen;

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
    textAlreadyHave: {
        color: "black",
    },
    linkButton: {
        color: "blue",
        fontWeight: "bold",
        marginLeft: 5,
    },
    orText: {
        fontSize: 20, // Fixed "fontsize" typo
        color: "gray",
        marginTop: 20,
    },
});