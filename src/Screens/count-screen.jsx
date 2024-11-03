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
  TouchableOpacity,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as ScreenOrientation from "expo-screen-orientation";
import { TrafficButton } from "../Components/traffic-button";
import * as FileSystem from "expo-file-system";
import { Link } from "expo-router";
import { FormatModal } from "../Components/format-modal";
import { PedestrianButton } from "../Components/pedestrian-button";
import { Touchable } from "react-native";

const CountScreen = () => {
  const [northBound, setNorthBound] = useState({
    through: 0,
    left: 0,
    right: 0,
    rightTime: [0],
    leftTime: [0],
    throughTime: [0],
    heavyRightTime: [0],
    heavyLeftTime: [0],
    heavyThroughTime: [0],
    bikeLeftTime: [0],
    bikeRightTime: [0],
    bikeThroughTime: [0],
    bikeThrough: 0,
    bikeLeft: 0,
    bikeRight: 0,
    heavyThrough: 0,
    heavyLeft: 0,
    heavyRight: 0,
    ped: 0,
    pedTime: [0],
  });
  const [southBound, setSouthBound] = useState({
    through: 0,
    left: 0,
    right: 0,
    rightTime: [0],
    leftTime: [0],
    throughTime: [0],
    heavyRightTime: [0],
    heavyLeftTime: [0],
    heavyThroughTime: [0],
    bikeLeftTime: [0],
    bikeRightTime: [0],
    bikeThroughTime: [0],
    bikeThrough: 0,
    bikeLeft: 0,
    bikeRight: 0,
    heavyThrough: 0,
    heavyLeft: 0,
    heavyRight: 0,
    ped: 0,
    pedTime: [0],
  });
  const [eastBound, setEastBound] = useState({
    through: 0,
    left: 0,
    right: 0,
    rightTime: [0],
    leftTime: [0],
    throughTime: [0],
    heavyRightTime: [0],
    heavyLeftTime: [0],
    heavyThroughTime: [0],
    bikeLeftTime: [0],
    bikeRightTime: [0],
    bikeThroughTime: [0],
    bikeThrough: 0,
    bikeLeft: 0,
    bikeRight: 0,
    heavyThrough: 0,
    heavyLeft: 0,
    heavyRight: 0,
    ped: 0,
    pedTime: [0],
  });
  const [westBound, setWestBound] = useState({
    through: 0,
    left: 0,
    right: 0,
    rightTime: [0],
    leftTime: [0],
    throughTime: [0],
    heavyRightTime: [0],
    heavyLeftTime: [0],
    heavyThroughTime: [0],
    bikeLeftTime: [0],
    bikeRightTime: [0],
    bikeThroughTime: [0],
    bikeThrough: 0,
    bikeLeft: 0,
    bikeRight: 0,
    heavyThrough: 0,
    heavyLeft: 0,
    heavyRight: 0,
    ped: 0,
    pedTime: [0],
  });

  const [countStarted, setCountStarted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [highestTime, setHighestTime] = useState(0);
  const [startDate, setStartDate] = useState(0);

  const resetCounts = () => {
    Alert.alert(
      "Confirm New Count",
      "Are you sure you want to start a new count? Your previous count will be erased. The count starts when you confirim",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "START",
          style: "destructive",
          onPress: () => {
            setNorthBound({
              through: 0,
              left: 0,
              right: 0,
              rightTime: [0],
              leftTime: [0],
              throughTime: [0],
              heavyRightTime: [0],
              heavyLeftTime: [0],
              heavyThroughTime: [0],
              bikeLeftTime: [0],
              bikeRightTime: [0],
              bikeThroughTime: [0],
              bikeThrough: 0,
              bikeLeft: 0,
              bikeRight: 0,
              heavyThrough: 0,
              heavyLeft: 0,
              heavyRight: 0,
              ped: 0,
              pedTime: [0],
            });
            setSouthBound({
              through: 0,
              left: 0,
              right: 0,
              rightTime: [0],
              leftTime: [0],
              throughTime: [0],
              heavyRightTime: [0],
              heavyLeftTime: [0],
              heavyThroughTime: [0],
              bikeLeftTime: [0],
              bikeRightTime: [0],
              bikeThroughTime: [0],
              bikeThrough: 0,
              bikeLeft: 0,
              bikeRight: 0,
              heavyThrough: 0,
              heavyLeft: 0,
              heavyRight: 0,
              ped: 0,
              pedTime: [0],
            });
            setEastBound({
              through: 0,
              left: 0,
              right: 0,
              rightTime: [0],
              leftTime: [0],
              throughTime: [0],
              heavyRightTime: [0],
              heavyLeftTime: [0],
              heavyThroughTime: [0],
              bikeLeftTime: [0],
              bikeRightTime: [0],
              bikeThroughTime: [0],
              bikeThrough: 0,
              bikeLeft: 0,
              bikeRight: 0,
              heavyThrough: 0,
              heavyLeft: 0,
              heavyRight: 0,
              ped: 0,
              pedTime: [0],
            });
            setWestBound({
              through: 0,
              left: 0,
              right: 0,
              rightTime: [0],
              leftTime: [0],
              throughTime: [0],
              heavyRightTime: [0],
              heavyLeftTime: [0],
              heavyThroughTime: [0],
              bikeLeftTime: [0],
              bikeRightTime: [0],
              bikeThroughTime: [0],
              bikeThrough: 0,
              bikeLeft: 0,
              bikeRight: 0,
              heavyThrough: 0,
              heavyLeft: 0,
              heavyRight: 0,
              ped: 0,
              pedTime: [0],
            });
            setCountStarted(false);
            setHighestTime(0);
            setStartDate(Date.now());
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
  }, [0]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <TrafficButton
        startDate={startDate}
        countStarted={countStarted}
        setHighestTime={setHighestTime}
        setCountStarted={setCountStarted}
        ButtonType={"through"}
        setTraffic={setSouthBound}
        traffic={southBound}
        location={[5, 8, 90, -196, -50]}
      />
      <TrafficButton
        startDate={startDate}
        countStarted={countStarted}
        setHighestTime={setHighestTime}
        setCountStarted={setCountStarted}
        ButtonType={"left"}
        setTraffic={setSouthBound}
        traffic={southBound}
        location={[5, 8, 0, -196, 100]}
      />
      <TrafficButton
        startDate={startDate}
        countStarted={countStarted}
        setHighestTime={setHighestTime}
        setCountStarted={setCountStarted}
        ButtonType={"right"}
        setTraffic={setSouthBound}
        traffic={southBound}
        location={[5, 8, 180, -196, -200]}
      />

      <TrafficButton
        startDate={startDate}
        countStarted={countStarted}
        setHighestTime={setHighestTime}
        setCountStarted={setCountStarted}
        ButtonType={"through"}
        setTraffic={setNorthBound}
        traffic={northBound}
        location={[5, 8, -90, 80, -50]}
      />
      <TrafficButton
        startDate={startDate}
        countStarted={countStarted}
        setHighestTime={setHighestTime}
        setCountStarted={setCountStarted}
        ButtonType={"right"}
        setTraffic={setNorthBound}
        traffic={northBound}
        location={[5, 8, 0, 80, 100]}
      />
      <TrafficButton
        startDate={startDate}
        countStarted={countStarted}
        setHighestTime={setHighestTime}
        setCountStarted={setCountStarted}
        ButtonType={"left"}
        setTraffic={setNorthBound}
        traffic={northBound}
        location={[5, 8, 180, 80, -200]}
      />

      <TrafficButton
        startDate={startDate}
        countStarted={countStarted}
        setHighestTime={setHighestTime}
        setCountStarted={setCountStarted}
        ButtonType={"through"}
        setTraffic={setWestBound}
        traffic={westBound}
        location={[5, 8, 0, -50, -375]}
      />
      <TrafficButton
        startDate={startDate}
        countStarted={countStarted}
        setHighestTime={setHighestTime}
        setCountStarted={setCountStarted}
        ButtonType={"right"}
        setTraffic={setWestBound}
        traffic={westBound}
        location={[5, 8, 90, 70, -375]}
      />
      <TrafficButton
        startDate={startDate}
        countStarted={countStarted}
        setHighestTime={setHighestTime}
        setCountStarted={setCountStarted}
        ButtonType={"left"}
        setTraffic={setWestBound}
        traffic={westBound}
        location={[5, 8, -90, -170, -375]}
      />

      <TrafficButton
        startDate={startDate}
        countStarted={countStarted}
        setHighestTime={setHighestTime}
        setCountStarted={setCountStarted}
        ButtonType={"through"}
        setTraffic={setEastBound}
        traffic={eastBound}
        location={[5, 8, -180, -50, 280]}
      />
      <TrafficButton
        startDate={startDate}
        countStarted={countStarted}
        setHighestTime={setHighestTime}
        setCountStarted={setCountStarted}
        ButtonType={"right"}
        setTraffic={setEastBound}
        traffic={eastBound}
        location={[5, 8, 90, 70, 280]}
      />
      <TrafficButton
        startDate={startDate}
        countStarted={countStarted}
        setHighestTime={setHighestTime}
        setCountStarted={setCountStarted}
        ButtonType={"left"}
        setTraffic={setEastBound}
        traffic={eastBound}
        location={[5, 8, -90, -170, 280]}
      />
      <PedestrianButton
        startDate={startDate}
        setHighestTime={setHighestTime}
        setTraffic={setNorthBound}
        traffic={northBound}
        location={[-25, -25, 0, 150, 170]}
      />
      <PedestrianButton
        startDate={startDate}
        setHighestTime={setHighestTime}
        setTraffic={setEastBound}
        traffic={eastBound}
        location={[-25, -25, 0, 150, 595]}
      />
      <PedestrianButton
        startDate={startDate}
        setHighestTime={setHighestTime}
        setTraffic={setSouthBound}
        traffic={southBound}
        location={[-23, -20, 0, 190, 380]}
      />
      <PedestrianButton
        startDate={startDate}
        setHighestTime={setHighestTime}
        setTraffic={setWestBound}
        traffic={westBound}
        location={[-25, -25, 0, 100, 380]}
      />
      <FormatModal
        open={modalVisible}
        setOpen={setModalVisible}
        northBoundInit={northBound}
        southBoundInit={southBound}
        eastBoundInit={eastBound}
        westBoundInit={westBound}
        highestTime={highestTime}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{
        width: 0,
      }}>
        <Text
          style={{
            width: 50,
            color: "#2282ff",
            fontSize: 20,
            fontWeight: 400,
            left: -140,
            top: -15,
          }}
        >
          Menu
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resetCounts} color="#55ff55">
        <Text
          style={{
            position: "absolute",
            color: "#55ff55",
            fontSize: 20,
            fontWeight: 400,
            left: 40,
            top: -40,
          }}
        >
          New Count
        </Text>
      </TouchableOpacity>
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
