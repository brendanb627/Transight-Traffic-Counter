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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as ScreenOrientation from "expo-screen-orientation";
import { TrafficButton } from "../Components/traffic-button";
import * as FileSystem from "expo-file-system";
import { Link } from "expo-router";
import { BlurView } from "expo-blur";
import { CompassButton } from "../Sub-Components/compass-button";
import  AsyncStorage from "@react-native-async-storage/async-storage";

export const FormatModal = ({
  open,
  setOpen,
  northBoundInit,
  southBoundInit,
  eastBoundInit,
  westBoundInit,
  highestTime,
}) => {
  const [northSouth, setNorthSouth] = useState("unnamed_northSouth");
  const [eastWest, setEastWest] = useState("unnamed_eastWest");
  const [weather, setWeather] = useState("");
  const [startHour, setStartHour] = useState(16);
  const [interval, setInterval] = useState(5);

  const [position, setPosition] = useState(1);
  const [northBound, setNorthBound] = useState({});
  const [southBound, setSouthBound] = useState({});
  const [eastBound, setEastBound] = useState({});
  const [westBound, setWestBound] = useState({});
  const [city, setCity] = useState('Bend');
  const [state, setState] = useState('OR')


  useEffect(() => {
    assignPosition();
  }, [position, northBoundInit, southBoundInit, eastBoundInit, westBoundInit]);

  const handleInputChange = (setEvent) => (text) => {
    setEvent(text);
  };

  useEffect(() => {
    console.log(city)
  }, [city])
  

  const assignPosition = async () => {
    if (position == 1) {
      setNorthBound(northBoundInit);
      setEastBound(eastBoundInit);
      setSouthBound(southBoundInit);
      setWestBound(westBoundInit);
      console.log('1')
    } else if (position == 4) {
      setNorthBound(westBoundInit);
      setEastBound(northBoundInit);
      setSouthBound(eastBoundInit);
      setWestBound(southBoundInit);
      console.log('2')
    } else if (position == 2) {
      setNorthBound(southBoundInit);
      setEastBound(westBoundInit);
      setSouthBound(northBoundInit);
      setWestBound(eastBoundInit);
      console.log('3')
    } else if (position == 3) {
      setNorthBound(eastBoundInit);
      setEastBound(southBoundInit);
      setSouthBound(westBoundInit);
      setWestBound(northBoundInit);
      console.log('4')
    }
  };

  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}.${day}.${year}`;
  };

  const currentDate = formatDate(new Date());

  const csvDownload = async () => {
    console.log('aad')
    const fixedInt = interval * 60000; // Calculate fixedInt once
    const binsNum = Math.ceil(highestTime / fixedInt);
    const bins = binsNum + 1;

    if (bins > 12000) {
      alert(
        "You are trying to generate a count with over 12,000 rows. This is probably a stale count and can not be processed"
      );
      return;
    }

    const data = []; // Initialize the data array to store results

    for (let i = 1; i < bins; i++) {
      const rowCount = {
        northRight: 0,
        northLeft: 0,
        northThrough: 0,
        northHeavyThrough: 0,
        northHeavyRight: 0,
        northHeavyLeft: 0,
        northBikeThrough: 0,
        northBikeRight: 0,
        northBikeLeft: 0,
        northPed: 0,

        eastRight: 0,
        eastLeft: 0,
        eastThrough: 0,
        eastHeavyThrough: 0,
        eastHeavyRight: 0,
        eastHeavyLeft: 0,
        eastBikeThrough: 0,
        eastBikeRight: 0,
        eastBikeLeft: 0,
        eastPed: 0,

        southRight: 0,
        southLeft: 0,
        southThrough: 0,
        southHeavyThrough: 0,
        southHeavyRight: 0,
        southHeavyLeft: 0,
        southBikeThrough: 0,
        southBikeRight: 0,
        southBikeLeft: 0,
        southPed: 0,

        westRight: 0,
        westLeft: 0,
        westThrough: 0,
        westHeavyThrough: 0,
        westHeavyRight: 0,
        westHeavyLeft: 0,
        westBikeThrough: 0,
        westBikeRight: 0,
        westBikeLeft: 0,
        westPed: 0,
      };

      const lowerBound = (i - 1) * fixedInt;
      const upperBound = i * fixedInt;

      //North
      northBound.rightTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.northRight += 1;
        }
      });

      northBound.leftTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.northLeft += 1;
        }
      });

      northBound.throughTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.northThrough += 1;
        }
      });

      northBound.heavyThroughTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.northHeavyThrough += 1;
        }
      });
      northBound.heavyLeftTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.northHeavyLeft += 1;
        }
      });
      northBound.heavyRightTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.northHeavyRight += 1;
        }
      });

      northBound.bikeThroughTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.northBikeThrough += 1;
        }
      });
      northBound.bikeLeftTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.northBikeLeft += 1;
        }
      });
      northBound.bikeRightTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.northBikeRight += 1;
        }
      });
      northBound.pedTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.northPed += 1;
        }
      });
      //East
      eastBound.rightTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.eastRight += 1;
        }
      });

      eastBound.leftTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.eastLeft += 1;
        }
      });

      eastBound.throughTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.eastThrough += 1;
        }
      });

      eastBound.heavyThroughTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.eastHeavyThrough += 1;
        }
      });
      eastBound.heavyLeftTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.eastHeavyLeft += 1;
        }
      });
      eastBound.heavyRightTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.eastHeavyRight += 1;
        }
      });

      eastBound.bikeThroughTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.eastBikeThrough += 1;
        }
      });
      eastBound.bikeLeftTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.eastBikeLeft += 1;
        }
      });
      eastBound.bikeRightTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.eastBikeRight += 1;
        }
      });
      eastBound.pedTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.eastPed += 1;
        }
      });

      //South
      southBound.rightTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.southRight += 1;
        }
      });

      southBound.leftTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.southLeft += 1;
        }
      });

      southBound.throughTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.southThrough += 1;
        }
      });

      southBound.heavyThroughTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.southHeavyThrough += 1;
        }
      });
      southBound.heavyLeftTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.southHeavyLeft += 1;
        }
      });
      southBound.heavyRightTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.southHeavyRight += 1;
        }
      });

      southBound.bikeThroughTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.southBikeThrough += 1;
        }
      });
      southBound.bikeLeftTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.southBikeLeft += 1;
        }
      });
      southBound.bikeRightTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.southBikeRight += 1;
        }
      });
      southBound.pedTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.southPed += 1;
        }
      });

      //West
      westBound.rightTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.westRight += 1;
        }
      });

      westBound.leftTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.westLeft += 1;
        }
      });

      westBound.throughTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.westThrough += 1;
        }
      });

      westBound.heavyThroughTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.westHeavyThrough += 1;
        }
      });
      westBound.heavyLeftTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.westHeavyLeft += 1;
        }
      });
      westBound.heavyRightTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.westHeavyRight += 1;
        }
      });

      westBound.bikeThroughTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.westBikeThrough += 1;
        }
      });
      westBound.bikeLeftTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.westBikeLeft += 1;
        }
      });
      westBound.bikeRightTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.westBikeRight += 1;
        }
      });
      westBound.pedTime.forEach((num) => {
        if (num > lowerBound && num <= upperBound) {
          rowCount.westPed += 1;
        }
      });

      data.push({
        period: `${(parseInt(startHour) + Math.floor((interval * (i - 1)) / 60))
          .toString()
          .padStart(1, 0)}${((interval * (i - 1)) % 60)
          .toString()
          .padStart(2, 0)}`,

        northThrough: rowCount.northThrough,
        northLeft: rowCount.northLeft,
        northRight: rowCount.northRight,
        northBikeThrough: rowCount.northBikeThrough,
        northBikeLeft: rowCount.northBikeLeft,
        northBikeRight: rowCount.northBikeRight,
        northHeavyThrough: rowCount.northHeavyThrough,
        northHeavyLeft: rowCount.northHeavyLeft,
        northHeavyRight: rowCount.northHeavyRight,
        northPed: rowCount.northPed,

        eastThrough: rowCount.eastThrough,
        eastLeft: rowCount.eastLeft,
        eastRight: rowCount.eastRight,
        eastBikeThrough: rowCount.eastBikeThrough,
        eastBikeLeft: rowCount.eastBikeLeft,
        eastBikeRight: rowCount.eastBikeRight,
        eastHeavyThrough: rowCount.eastHeavyThrough,
        eastHeavyLeft: rowCount.eastHeavyLeft,
        eastHeavyRight: rowCount.eastHeavyRight,
        eastPed: rowCount.eastPed,

        southThrough: rowCount.southThrough,
        southLeft: rowCount.southLeft,
        southRight: rowCount.southRight,
        southBikeThrough: rowCount.southBikeThrough,
        southBikeLeft: rowCount.southBikeLeft,
        southBikeRight: rowCount.southBikeRight,
        southHeavyThrough: rowCount.southHeavyThrough,
        southHeavyLeft: rowCount.southHeavyLeft,
        southHeavyRight: rowCount.southHeavyRight,
        southPed: rowCount.southPed,

        westThrough: rowCount.westThrough,
        westLeft: rowCount.westLeft,
        westRight: rowCount.westRight,
        westBikeThrough: rowCount.westBikeThrough,
        westBikeLeft: rowCount.westBikeLeft,
        westBikeRight: rowCount.westBikeRight,
        westHeavyThrough: rowCount.westHeavyThrough,
        westHeavyLeft: rowCount.westHeavyLeft,
        westHeavyRight: rowCount.westHeavyRight,
        westPed: rowCount.westPed,
      });
    }
    const date = new Date();
    const weekday = date.getDay();
    const setupHeader1 = `Transight Consulting\n`;
    const setupHeader2 = `${northSouth || null}\n`;
    const setupHeader3 = `${eastWest || null}\n`;
    const setupHeader4 = `${city || 'city'}\n`;
    const setupHeader5 = `${state || 'state'}\n`;
    const setupHeader6 = `${currentDate || 'currentDate issue'}\n`;
    const setupHeader7 = `${weather || null}\n`;
    const header1 = `Period,${northSouth} Northbound, , , , , , , , , ,${northSouth} Southbound, , , , , , , , , ,${eastWest} Eastbound, , , , , , , , , ,${eastWest} Westbound\n`;
    const header2 = `Period,NBL,NBT,NBR,NBL_Bike,NBT_Bike,NBR_Bike,NBL_Heavy,NBT_Heavy,NBR_Heavy,N_Ped,SBL,SBT,SBR,SBL_Bike,SBT_Bike,SBR_Bike,SBL_Heavy,SBT_Heavy,SBR_Heavy,S_Ped,EBL,EBT,EBR,EBL_Bike,EBT_Bike,EBR_Bike,EBL_Heavy,EBT_Heavy,EBR_Heavy,E_Ped,WBL,WBT,WBR,WBL_Bike,WBT_Bike,WBR_Bike,WBL_Heavy,WBT_Heavy,WBR_Heavy,W_Ped\n`
    const csvRows = data.map((row) => {
      return `${row.period || 0},` + // Period
         `${row.northLeft || 0},` + // NBL (North Bound Left)
         `${row.northThrough || 0},` + // NBT (North Bound Through)
         `${row.northRight || 0},` + // NBR (North Bound Right)
         `${row.northBikeLeft || 0},` + // NBL_Bike
         `${row.northBikeThrough || 0},` + // NBT_Bike
         `${row.northBikeRight || 0},` + // NBR_Bike
         `${row.northHeavyLeft || 0},` + // NBL_Heavy
         `${row.northHeavyThrough || 0},` + // NBT_Heavy
         `${row.northHeavyRight || 0},` + // NBR_Heavy
         `${row.northPed || 0},` + // N_Ped
         `${row.southLeft || 0},` + // SBL
         `${row.southThrough || 0},` + // SBT
         `${row.southRight || 0},` + // SBR
         `${row.southBikeLeft || 0},` + // SBL_Bike
         `${row.southBikeThrough || 0},` + // SBT_Bike
         `${row.southBikeRight || 0},` + // SBR_Bike
         `${row.southHeavyLeft || 0},` + // SBL_Heavy
         `${row.southHeavyThrough || 0},` + // SBT_Heavy
         `${row.southHeavyRight || 0},` + // SBR_Heavy
         `${row.southPed || 0},` + // S_Ped
         `${row.eastLeft || 0},` + // EBL
         `${row.eastThrough || 0},` + // EBT
         `${row.eastRight || 0},` + // EBR
         `${row.eastBikeLeft || 0},` + // EBL_Bike
         `${row.eastBikeThrough || 0},` + // EBT_Bike
         `${row.eastBikeRight || 0},` + // EBR_Bike
         `${row.eastHeavyLeft || 0},` + // EBL_Heavy
         `${row.eastHeavyThrough || 0},` + // EBT_Heavy
         `${row.eastHeavyRight || 0},` + // EBR_Heavy
         `${row.eastPed || 0},` + // E_Ped
         `${row.westLeft || 0},` + // WBL
         `${row.westThrough || 0},` + // WBT
         `${row.westRight || 0},` + // WBR
         `${row.westBikeLeft || 0},` + // WBL_Bike
         `${row.westBikeThrough || 0},` + // WBT_Bike
         `${row.westBikeRight || 0},` + // WBR_Bike
         `${row.westHeavyLeft || 0},` + // WBL_Heavy
         `${row.westHeavyThrough || 0},` + // WBT_Heavy
         `${row.westHeavyRight || 0},` + // WBR_Heavy
         `${row.westPed || 0}\n`; // W_Ped
    });
    console.log('finished')

    

    const csvString =
      setupHeader1 +
      setupHeader2 +
      setupHeader3 +
      setupHeader4 +
      setupHeader5 +
      setupHeader6 + 
      setupHeader7 + 
      header1 +
      header2 +
      csvRows.join("\n");

    

    const fileUri =
      FileSystem.documentDirectory +
      `${northSouth}-${eastWest}-${currentDate}-${
        weather || ``
      }-${startHour}.csv`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, csvString, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      await AsyncStorage.getItem("dataIndex", (prevDataIndex) => {
        if (prevDataIndex === null || prevDataIndex === undefined) {
          AsyncStorage.setItem("dataIndex", `${northSouth}-${eastWest}-${currentDate}\n`);
        } else {
          AsyncStorage.setItem("dataIndex", prevDataIndex + `${northSouth},${eastWest},${city},${state},${currentDate}\n`);
        }
      });
      await AsyncStorage.setItem(`${northSouth}-${eastWest}-${currentDate}`, csvString);

      await Sharing.shareAsync(fileUri);
      const datas = await AsyncStorage.getItem(`dataIndex`);
      console.log("data: " + datas);

    } catch (error) {
      console.log(error)
      Alert.alert(
        "Error",
        "Could not create the CSV file. Do not include '/' in your names. Please try again."
      );
    }
  };

  return (
    <>
      {open && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                <Text style={styles.submit}>Save & Share</Text>
              </TouchableOpacity>
              <TextInput
                placeholder="North-South Street"
                style={styles.input}
                onChangeText={handleInputChange(setNorthSouth)}
              />
              <TextInput
                placeholder="East-West Street"
                style={styles.input}
                onChangeText={handleInputChange(setEastWest)}
              />
              <TextInput
                placeholder="Weather"
                style={styles.input}
                onChangeText={handleInputChange(setWeather)}
              />
              <TextInput
                placeholder="Start Hour"
                defaultValue={startHour}
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
                placeholder="City"
                defaultValue={city}
                style={{
                  position: "absolute",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  width: 90,
                  height: 30,
                  top: 300,
                  left: 390,
                  borderRadius: 10,
                  borderColor: "#2076e6",
                  padding: 3,
                  margin: 20,
                  borderWidth: 2,
                  fontSize: 20,
                }}
                onChangeText={handleInputChange(setCity)}
              />

              <TextInput
                placeholder="State"
                defaultValue={state}
                inputMode="numeric"
                style={{
                  position: "absolute",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  width: 90,
                  height: 30,
                  top: 300,
                  left: 490,
                  borderRadius: 10,
                  borderColor: "#2076e6",
                  padding: 3,
                  margin: 20,
                  borderWidth: 2,
                  fontSize: 20,
                }}
                onChangeText={handleInputChange(setState)}
              />
              <Text
                style={{
                  position: "absolute",
                  fontSize: 20,
                  top: 320,
                  left: 100,
                }}
              >
                Interval (min):
              </Text>
              <Text
                style={{
                  position: "absolute",
                  fontSize: 20,
                  top: 250,
                  left: 100,
                }}
              >
                Start Hour (24H):
              </Text>
              <TextInput
                placeholder="Interval"
                inputMode="numeric"
                defaultValue="5"
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
        </TouchableWithoutFeedback>
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
