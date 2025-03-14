import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const SocialMedia = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/SocialMediaIcons/google.png")}
      style={styles.image}></Image>
    </View>
  )
}

export default SocialMedia

const styles = StyleSheet.create({
    image:{
        height:40,
        width:40,
        
    },
    twittericon:{
        height:60,
        width:60,
        marginTop:15
    },
    container:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        width:"100%",
        alignItems:"center"
    }
})