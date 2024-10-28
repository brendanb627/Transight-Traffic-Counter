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
import { BlurView } from "expo-blur";
import { CompassButton } from "../Sub-Components/compass-button";

export const FormatModal = ({
  open,
  setOpen,
  northBoundInit,
  southBoundInit,
  eastBoundInit,
  westBoundInit,
}) => {
  const [northSouth, setNorthSouth] = useState("unnamed_northSouth");
  const [eastWest, setEastWest] = useState("unnamed_eastWest");
  const [weather, setWeather] = useState('');
  const [startHour, setStartHour] = useState(0);
  const [interval, setInterval] = useState(0);

  const [position, setPosition] = useState(1);
  const [northBound, setNorthBound] = useState({});
  const [southBound, setSouthBound] = useState({});
  const [eastBound, setEastBound] = useState({});
  const [westBound, setWestBound] = useState({});

  const [trafficStudyName, settrafficStudyName] = useState("unnamed-study");

  const handleInputChange = (setEvent) => (text) => {
    setEvent(text);
  };

  const csvDownload = async () => {
    if (position == 1) {
        setNorthBound(northBoundInit)
        setEastBound(eastBoundInit)
        setSouthBound(southBoundInit)
        setWestBound(westBoundInit)
    } else if (position == 2) {
        setNorthBound(westBoundInit)
        setEastBound(northBoundInit)
        setSouthBound(eastBoundInit)
        setWestBound(southBoundInit)
    } else if (position == 3) {
        setNorthBound(southBoundInit)
        setEastBound(westBoundInit)
        setSouthBound(northBoundInit)
        setWestBound(eastBoundInit)
    } else if (position == 4) {
        setNorthBound(eastBoundInit)
        setEastBound(southBoundInit)
        setSouthBound(westBoundInit)
        setWestBound(northBoundInit)
    }

    const data = [];

    const header = `Period,${northSouth}_North_Bound,null,null,null,null,null,null,null,null,${northSouth}_South_Bound,null,null,null,null,null,null,null,null,${eastWest}_East_Bound,null,null,null,null,null,null,null,null,${eastWest}_West_Bound,null,null,null,null,null,null,null,null\n
      Period,NBT,NBL,NBR,NBT_Bike,NBL_Bike,NBR_Bike,NBT_Heavy,NBL_Heavy,NBR_Heavy,SBT,SBL,SBR,SBT_Bike,SBL_Bike,SBR_Bike,SBT_Heavy,SBL_Heavy,SBR_Heavy,EBT,EBL,EBR,EBT_Bike,EBL_Bike,EBR_Bike,EBT_Heavy,EBL_Heavy,EBR_Heavy, WBT,WBL,WBR,WBT_Bike,WBL_Bike,WBR_Bike,WBT_Heavy,WBL_Heavy,WBR_Heavy\n`;
    const csvRows = data.map((row) => {
      return `${row.period},${row.northThrough},${row.northLeft},${row.northRight},${row.northBikeThrough},${row.northBikeLeft},${row.northBikeRight},${row.northHeavyThrough},${row.northHeavyLeft},${row.northHeavyRight},${row.southThrough},${row.southLleft},${row.southRight},${row.southBikeThrough},${row.southBikeLeft},${row.southBikeRight},${row.southHeavyThrough},${row.southHeavyLeft},${row.southHeavyRight},${row.eastThrough},${row.eastLleft},${row.eastRight},${row.eastBikeThrough},${row.eastBikeLeft},${row.eastBikeRight},${row.eastHeavyThrough},${row.eastHeavyLeft},${row.eastHeavyRight},${row.westThrough},${row.westLleft},${row.westRight},${row.westBikeThrough},${row.westBikeLeft},${row.westBikeRight},${row.westHeavyThrough},${row.westHeavyLeft},${row.westHeavyRight}`;
    });

    const csvString = header + csvRows.join("\n");

    const fileUri = FileSystem.documentDirectory + `${trafficStudyName}`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, csvString, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      console.log("CSV file created at: ", fileUri);

      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("Error writing file:", error);
      Alert.alert("Error", "Could not create the CSV file. Please try again.");
    }
  };

  return (
    <>
      {open && (
        <BlurView
          intensity={100}
          style={{
            flex: 1,
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10,
            borderRadius: 10,
            width: "100%",
            height: "100%",
            fontSize: 50,
          }}
        >
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setOpen(false)}
              onLongPress={() => setOpen(false)}
              onPressOut={() => setOpen(false)}
            >
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={csvDownload}
              style={{ width: 100, height: 100 }}
            >
              <Text style={styles.submit}>Download File</Text>
            </TouchableOpacity>
            <TextInput placeholder="North-South Street" style={styles.input} onChangeText={handleInputChange(setNorthSouth)}/>
            <TextInput placeholder="East-West Street" style={styles.input} onChangeText={handleInputChange(setEastWest)}/>
            <TextInput placeholder="Weather" style={styles.input} onChangeText={handleInputChange(setWeather)}/>
            <TextInput
              placeholder="Start Hour"
              inputMode="numeric"
              style={{
                position: "absolute",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                width: 90,
                height: 30,
                top: 230,
                left: 240,
                borderRadius: 10,
                borderColor: "#2076e6",
                padding: 3,
                margin: 20,
                borderWidth: 2,
                fontSize: 20,
              }}
              onChangeText={handleInputChange(setStartHour)}
            />
            <TextInput
              placeholder="Interval"
              inputMode="numeric"
              style={{
                position: "absolute",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                width: 90,
                height: 30,
                top: 300,
                left: 240,
                borderRadius: 10,
                borderColor: "#2076e6",
                padding: 3,
                margin: 20,
                borderWidth: 2,
                fontSize: 20,
              }}
              onChangeText={handleInputChange(setInterval)}
            />
            <CompassButton
              position={position}
              setPosition={setPosition}
              buttonDir={4}
              buttonPos={[380, 140]}
            />
            <CompassButton
              position={position}
              setPosition={setPosition}
              buttonDir={3}
              buttonPos={[255, 140]}
            />
            <CompassButton
              position={position}
              setPosition={setPosition}
              buttonDir={2}
              buttonPos={[317.5, 206]}
            />
            <CompassButton
              position={position}
              setPosition={setPosition}
              buttonDir={1}
              buttonPos={[317.5, 76]}
            />
          </View>
        </BlurView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cancel: {
    position: "absolute",
    top: 30,
    right: 50,
    fontSize: 20,
    color: "red",
  },
  submit: {
    position: "absolute",
    top: 320,
    right: -780,
    fontSize: 20,
    color: "#2076e6",
    width: 200,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 250,
    height: 30,
    top: -80,
    left: 80,
    borderRadius: 10,
    borderColor: "#2076e6",
    padding: 3,
    margin: 20,
    borderWidth: 2,
    fontSize: 20,
    overflow: "scroll",
  },
  container: {
    fontSize: 50,
  },
});
