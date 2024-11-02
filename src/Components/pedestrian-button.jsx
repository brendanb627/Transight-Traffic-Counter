import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  StatusBar,
  TouchableOpacity,
  PanResponder,
  Image,
} from "react-native";
import * as Haptic from "expo-haptics";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export const PedestrianButton = ({
  location,
  setTraffic,
  traffic,
  setHighestTime,
  startDate,
}) => {
  const handlePress = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    setTraffic({
      ...traffic,
      ped: (traffic.ped += 1),
      pedTime: [...traffic.pedTime, Date.now() - startDate],
    });
    setHighestTime(Date.now() - startDate);
  };

  return (
      <TouchableOpacity onPress={handlePress} style={{
      position: "absolute",
      top: location[3],
      left: location[4],
      width: 65,
      height: 65,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#2272ff",
      borderRadius: 900,
      textAlign: 'center',
    }}>
        <Image
          source={require("../assets/pedestrianIcon.png")}
          style={{
            position: "absolute",
            top: 6,
            left: 14,
            width: 40,
            height: 40,
            
          }}
          resizeMode="contain"
        />
        <Text style={{
          top: 45,
          fontSize: 17,
          color: "#c9c9ff",
          position: "absolute",
          pointerEvents: "none",
        }}>
          {traffic.ped}
        </Text>
      </TouchableOpacity>
  );
};


