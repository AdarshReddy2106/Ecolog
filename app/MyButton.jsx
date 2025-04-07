import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const MyButton = ({ title, onPress }) => {
    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default MyButton

const styles = StyleSheet.create({
    container:{
        height:50,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"gray",
        borderRadius: 30 
    },
    title:{
        color:"white",
        fontSize: 20,
        
    }
}) 