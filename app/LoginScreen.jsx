import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import MyButton from "./MyButton";
import MyTextinput from "./MyTextInput";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabaseConfig';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address first');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Success', 'Password reset email sent! Please check your inbox.');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleLogin = async() => {
        if (!email || !password) {
            Alert.alert('Error', 'All fields are required!');
            return;
        }

  
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            
            // Check if the user is admin
            if (user.email === 'miyawaki.iitpkd@gmail.com') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Admin' }],
                });
                return;
            }

            // For non-admin users, check if they have submitted details before
            const storedDetails = await AsyncStorage.getItem(`studentDetails_${user.email}`);
            
            if (storedDetails) {
                // If they have submitted details before, go to TreeDataForm
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'TreeDataForm' }],
                });
            } else {
                // If this is their first time, go to StudentDetails
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'StudentDetails' }],
                });
            }
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                Alert.alert('Error', 'Enter valid credentials');
                return;
            }
            if (error.code === "auth/invalid-email") {
                Alert.alert('Error', 'Enter valid email');
                return;
            }
            else {
                Alert.alert('Error', error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/images/blackwp.webp")} style={styles.imagebackground}>
                <Text style={styles.title}>ECOLOG</Text>
                <View style={styles.inputContainer}>
                    <MyTextinput placeholder="Enter Registered Email" value={email} onChangeText={setEmail} />
                    <MyTextinput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

                    <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <MyButton title="Login" onPress={handleLogin} />

                    <View style={styles.signupContainer}>
                        <Text style={styles.textDontHave}>Don't have an account yet? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}> 
                            <Text style={styles.linkButton}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    
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
        justifyContent: "center",
        marginTop: 20,
    },
    textDontHave: {
        color: "black",
    },
    linkButton: {
        color: "blue",
        fontWeight: "bold",
        marginLeft: 5,
    },
    forgotPasswordContainer: {
        alignSelf: "flex-end",
        marginRight: 10,
        marginBottom: 15,
    },
    forgotPasswordText: {
        color: "blue",
        fontWeight: "bold",
    },
});