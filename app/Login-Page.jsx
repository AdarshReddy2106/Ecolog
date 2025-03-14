import MyButton from "@/app/MyButton";
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import MyTextinput from "./MyTextInput";
import SocialMedia from "./SocialMedia";
import { useRouter } from 'expo-router';

const LoginScreen = () => {
    const router = useRouter(); // Replace useNavigation with useRouter

    return(
        <View style={StyleSheet.container}>
            <ImageBackground source={require("../assets/images/blackwp.png")}
            style={styles.imagebackground}>
                <Text style={styles.title}>App name</Text>

                <View style={styles.inputcontainer}>
                    <MyTextinput placeholder='Enter E-mail or User Name' />
                    <MyTextinput placeholder='Password' secureTextEntry/>
                    <TouchableOpacity onPress={() => router.push("/Sign-Up")}> {/* Updated navigation */}
                        <Text style={styles.textdonthave}>Don't have an account yet? <Text style={{color: 'blue'}}>Sign Up</Text></Text>
                    </TouchableOpacity>
                    <MyButton title={"Login"}/>
                </View>
                <Text style={styles.orText}>OR</Text>
                <SocialMedia />
            </ImageBackground>

        </View>
    )
}

export default LoginScreen

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    imagebackground:{
        height:"150%",
        paddingHorizontal: 20,
        alignItems: 'center'    
    },
    title:{
        fontSize: 40,
        color: 'white',
        marginTop:60,
    },
    inputcontainer:{
        height:450,
        width: "100%",
        backgroundColor:"white",
        borderRadius: 20,
        justifyContent:"center",
        alignItems:"center",
        marginTop:30,
        padding: 20,
    },
    textdonthave:{
        alignSelf:'flex-end',
        marginRight:10,
        color:"black",
        marginBottom:15
    },
    orText:{
        fontsize:20,
        color:"gray",
        marginTop:20
    }
})