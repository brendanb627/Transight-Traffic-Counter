import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const CompassButton = ({position, setPosition, buttonDir, buttonPos}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: (position === buttonDir) ? 'red' : '#a89d9d',
        width: 60,
        height: 60,
        position: "absolute",
        right: buttonPos[0],
        top: buttonPos[1],
        alignItems: 'center',
        borderRadius: 90,
        justifyContent: 'center'
      }}
      onPress={() => setPosition(buttonDir)}
    >
      <Text style={{
        fontSize: 30,
        color: (position === buttonDir) ? 'white' : 'black',
        fontWeight: 500
      }}>{(position === buttonDir) ? 'N' : ''}</Text>
    </TouchableOpacity>
  );
};