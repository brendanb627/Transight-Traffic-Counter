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
    <View
    style={{
      position: "absolute",
      top: location[3],
      left: location[4],
      width: 65,
      height: 65,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#2272ff",
      borderRadius: 900,
    }}
    >
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={require("../assets/pedestrianIcon.png")}
          style={{
            position: "absolute",
            top: location[0],
            left: location[1],
            width: 50,
            height: 50,
            
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};
