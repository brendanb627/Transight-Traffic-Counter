import React from 'react'
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

export const PedestrianButton = () => {
  return (
    <View>
        <TouchableOpacity>
            <Text>Press me!</Text>
        </TouchableOpacity>
    </View>
  )
}
