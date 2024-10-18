import React, { useState } from 'react'
import { View, StyleSheet, Text, Button, StatusBar, TouchableOpacity } from "react-native";
import * as Haptic from "expo-haptics";

export const TrafficButton = ({ ButtonType, traffic, setTraffic, location }) => {

    const handlePress = () => {
        Haptic.notificationAsync(
            Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium)
          )
          if (ButtonType == 'through') {
            setTraffic({
                ...traffic,
                through: traffic.through + 1
            })
            console.log(traffic.through)
          } 
          
          else if (ButtonType == 'left') {
            setTraffic({
                ...traffic,
                left: traffic.left + 1
            })
            console.log(traffic.left)
          }
          
          else if (ButtonType == 'right') {
            setTraffic({
                ...traffic,
                right: traffic.right + 1
            })
            console.log(traffic.right)
          }
          else {
            console.log("error with input on traffic button, check spelling")
          }
          
    }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.buttonText}>Left</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        },
})