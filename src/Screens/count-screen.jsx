import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, StatusBar } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { TrafficButton } from "../Components/traffic-button";

export const CountScreen = () => {
  const [northBound, setNorthBound] = useState({
    through: 0,
    left: 0,
    right: 0,
    bikeThrough: 0,
    bikeLeft: 0,
    bikeRight: 0,
    heavyThrough: 0,
    heavyLeft: 0,
    heavyRight: 0,
  })
  const [southBound, setSouthBound] = useState({
    through: 0,
    left: 0,
    right: 0,
    bikeThrough: 0,
    bikeLeft: 0,
    bikeRight: 0,
    heavyThrough: 0,
    heavyLeft: 0,
    heavyRight: 0,
  })
  const [eastBound, setEastBound] = useState({
    through: 0,
    left: 0,
    right: 0,
    bikeThrough: 0,
    bikeLeft: 0,
    bikeRight: 0,
    heavyThrough: 0,
    heavyLeft: 0,
    heavyRight: 0,
  })
  const [westBound, setWestBound] = useState({
    through: 0,
    left: 0,
    right: 0,
    bikeThrough: 0,
    bikeLeft: 0,
    bikeRight: 0,
    heavyThrough: 0,
    heavyLeft: 0,
    heavyRight: 0,
  })
  const csvDownload = () => {
    //use traffic useState data to make a csv file
  }






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
    setTraffic={setSouthBound}
    traffic={southBound}
    location={[5, 8, 90, -196, -50]}
    />
    <TrafficButton
    ButtonType={"left"}
    setTraffic={setSouthBound}
    traffic={southBound}
    location={[5, 8, 0, -196, 100]}
    />
    <TrafficButton
    ButtonType={"right"}
    setTraffic={setSouthBound}
    traffic={southBound}
    location={[5, 8, 180, -196, -200]}
    />

    <TrafficButton
    ButtonType={"through"}
    setTraffic={setNorthBound}
    traffic={northBound}
    location={[5, 8, -90, 80, -50]}
    />
    <TrafficButton
    ButtonType={"right"}
    setTraffic={setNorthBound}
    traffic={northBound}
    location={[5, 8, 0, 80, 100]}
    />
    <TrafficButton
    ButtonType={"left"}
    setTraffic={setNorthBound}
    traffic={northBound}
    location={[5, 8, 180, 80, -200]}
    />

<TrafficButton
    ButtonType={"through"}
    setTraffic={setWestBound}
    traffic={westBound}
    location={[5, 8, 0, -50, -375]}
    />
    <TrafficButton
    ButtonType={"right"}
    setTraffic={setWestBound}
    traffic={westBound}
    location={[5, 8, 90, 70, -375]}
    />
    <TrafficButton
    ButtonType={"left"}
    setTraffic={setWestBound}
    traffic={westBound}
    location={[5, 8, -90, -170, -375]}
    />

<TrafficButton
    ButtonType={"through"}
    setTraffic={setEastBound}
    traffic={eastBound}
    location={[5, 8, -180, -50, 280]}
    />
    <TrafficButton
    ButtonType={"right"}
    setTraffic={setEastBound}
    traffic={eastBound}
    location={[5, 8, 90, 70, 280]}
    />
    <TrafficButton
    ButtonType={"left"}
    setTraffic={setEastBound}
    traffic={eastBound}
    location={[5, 8, -90, -170, 280]}
    />
  <Button title="download csv" onPress={csvDownload()}>

  </Button>
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
