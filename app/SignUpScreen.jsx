import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import MyButton from "./MyButton";
import MyTextinput from "./MyTextInput";

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignUp = async () => {
        setMessage("");

        if (!email || !password || !confirmPassword) {
            setMessage("All fields are required!");
            return;
        }

        if (password.length < 6) {
            setMessage("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setMessage("You got registered successfully, directing to login page...");
            setTimeout(() => {navigation.navigate("LoginScreen")}, 1500);

            await setDoc(doc(db, "users", userCredential.user.uid), {
                email: email,
                createdAt: new Date(),
                role: "user",
            });

            // Show success message and navigate to login after 2 seconds
            
            
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setMessage("Email is already in use, please login to continue.");
                setTimeout(() => {navigation.navigate("LoginScreen")}, 3000);
                
            } else {
                setMessage(error.message);
            }
            
        }

    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/images/blackwp.png")} style={styles.imagebackground}>
                <Text style={styles.title}>App Name</Text>
                <View style={styles.inputContainer}>
                    <MyTextinput placeholder="Enter E-mail" value={email} onChangeText={setEmail} />
                    <MyTextinput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
                    <MyTextinput placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />


                    {/* Display success or error message */}
                    {message ? <Text style={styles.messageText}>{message}</Text> : null}

                    <MyButton title="Sign Up" onPress={handleSignUp} />
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
    orText: {
        fontSize: 20,
        color: "gray",
        marginTop: 20,
    },
    messageText: {
        color: "green",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },
});