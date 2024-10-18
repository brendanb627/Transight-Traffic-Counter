import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, StatusBar } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { TrafficButton } from "../Components/traffic-button";

export const CountScreen = () => {
  const [northBound, setNorthBound] = useState({
    through: 0,
    left: 0,
    right: 0,
  })
  const [southBound, setSouthBound] = useState({
    through: 0,
    left: 0,
    right: 0,
  })
  const [EastBound, setEastBound] = useState({
    through: 0,
    left: 0,
    right: 0,
  })
  const [WestBound, setWestBound] = useState({
    through: 0,
    left: 0,
    right: 0,
  })

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
  <View style={styles.container}>
    <StatusBar hidden={true}/>
    <TrafficButton
    ButtonType={"through"}
    setTraffic={setNorthBound}
    traffic={northBound}
    location={[1, 1]}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
