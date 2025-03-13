import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const MyButton =({title})=> {
    return(
        <TouchableOpacity style={styles.container}>
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