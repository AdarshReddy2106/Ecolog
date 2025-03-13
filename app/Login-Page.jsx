import MyButton from "@/app/MyButton";
import { ImageBackground, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import MyTextinput from "./MyTextInput";
import SocialMedia from "./SocialMedia";

const LoginScreen = () => {
    return(
        <View style={StyleSheet.container}>
            <ImageBackground source={require("../assets/images/blackwp.png")}
            style={styles.imagebackground}>
                <Text style={styles.title}>App name</Text>

                <View style={styles.inputcontainer}>
                    <MyTextinput placeholder='Enter E-mail or User Name' />
                    <MyTextinput placeholder='Password' secureTextEntry/>
                    <Text style={styles.textdonthave} >Don't have an account yet? <a href="../signup.jsx"> Sign Up</a></Text>
                    <MyButton title={"Login"}/>

                    <Text style={styles.orText}>OR</Text>

                    <SocialMedia />
                </View>
                
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