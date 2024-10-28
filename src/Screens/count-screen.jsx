import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  StatusBar,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as ScreenOrientation from "expo-screen-orientation";
import { TrafficButton } from "../Components/traffic-button";
import * as FileSystem from "expo-file-system";
import { Link } from "expo-router";
import { FormatModal } from "../Components/format-modal";

const CountScreen = () => {
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
  });
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
  });
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
  });
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
  });

  const [countStarted, setCountStarted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const resetCounts = () => {
    Alert.alert(
      "Confirm Reset",
      "Are you sure you want to reset all counts to 0?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setNorthBound({
              through: 0,
              left: 0,
              right: 0,
              bikeThrough: 0,
              bikeLeft: 0,
              bikeRight: 0,
              heavyThrough: 0,
              heavyLeft: 0,
              heavyRight: 0,
            });
            setSouthBound({
              through: 0,
              left: 0,
              right: 0,
              bikeThrough: 0,
              bikeLeft: 0,
              bikeRight: 0,
              heavyThrough: 0,
              heavyLeft: 0,
              heavyRight: 0,
            });
            setEastBound({
              through: 0,
              left: 0,
              right: 0,
              bikeThrough: 0,
              bikeLeft: 0,
              bikeRight: 0,
              heavyThrough: 0,
              heavyLeft: 0,
              heavyRight: 0,
            });
            setWestBound({
              through: 0,
              left: 0,
              right: 0,
              bikeThrough: 0,
              bikeLeft: 0,
              bikeRight: 0,
              heavyThrough: 0,
              heavyLeft: 0,
              heavyRight: 0,
            });
            setCountStarted(false)
          },
        },
      ],
      { cancelable: false }
    );
  };
  const [position, setPosition] = useState(0);
  const [trafficStudyName, settrafficStudyName] = useState("unnamed-study");

  const csvDownload = async () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };
    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <TrafficButton
        countStarted={countStarted}
        setCountStarted={setCountStarted}
        ButtonType={"through"}
        setTraffic={setSouthBound}
        traffic={southBound}
        location={[5, 8, 90, -196, -50]}
      />
      <TrafficButton
        countStarted={countStarted}
        setCountStarted={setCountStarted}
        ButtonType={"left"}
        setTraffic={setSouthBound}
        traffic={southBound}
        location={[5, 8, 0, -196, 100]}
      />
      <TrafficButton
        countStarted={countStarted}
        setCountStarted={setCountStarted}
        ButtonType={"right"}
        setTraffic={setSouthBound}
        traffic={southBound}
        location={[5, 8, 180, -196, -200]}
      />

      <TrafficButton
        countStarted={countStarted}
        setCountStarted={setCountStarted}
        ButtonType={"through"}
        setTraffic={setNorthBound}
        traffic={northBound}
        location={[5, 8, -90, 80, -50]}
      />
      <TrafficButton
        countStarted={countStarted}
        setCountStarted={setCountStarted}
        ButtonType={"right"}
        setTraffic={setNorthBound}
        traffic={northBound}
        location={[5, 8, 0, 80, 100]}
      />
      <TrafficButton
        countStarted={countStarted}
        setCountStarted={setCountStarted}
        ButtonType={"left"}
        setTraffic={setNorthBound}
        traffic={northBound}
        location={[5, 8, 180, 80, -200]}
      />

      <TrafficButton
        countStarted={countStarted}
        setCountStarted={setCountStarted}
        ButtonType={"through"}
        setTraffic={setWestBound}
        traffic={westBound}
        location={[5, 8, 0, -50, -375]}
      />
      <TrafficButton
        countStarted={countStarted}
        setCountStarted={setCountStarted}
        ButtonType={"right"}
        setTraffic={setWestBound}
        traffic={westBound}
        location={[5, 8, 90, 70, -375]}
      />
      <TrafficButton
        countStarted={countStarted}
        setCountStarted={setCountStarted}
        ButtonType={"left"}
        setTraffic={setWestBound}
        traffic={westBound}
        location={[5, 8, -90, -170, -375]}
      />

      <TrafficButton
        countStarted={countStarted}
        setCountStarted={setCountStarted}
        ButtonType={"through"}
        setTraffic={setEastBound}
        traffic={eastBound}
        location={[5, 8, -180, -50, 280]}
      />
      <TrafficButton
        countStarted={countStarted}
        setCountStarted={setCountStarted}
        ButtonType={"right"}
        setTraffic={setEastBound}
        traffic={eastBound}
        location={[5, 8, 90, 70, 280]}
      />
      <TrafficButton
        countStarted={countStarted}
        setCountStarted={setCountStarted}
        ButtonType={"left"}
        setTraffic={setEastBound}
        traffic={eastBound}
        location={[5, 8, -90, -170, 280]}
      />
      <FormatModal
        open={modalVisible}
        setOpen={setModalVisible}
        northBoundInit={northBound}
        southBoundInit={southBound}
        eastBoundInit={eastBound}
        westBoundInit={westBound}
      />
      <Button title="Modal" onPress={() => setModalVisible(true)}></Button>
      <Button title="Reset Counts" onPress={resetCounts} color="red" />
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
  link: {
    color: "white",
  },
});

export default CountScreen;
