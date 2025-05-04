import React, { useState, useEffect } from "react";
import { Modal, View, StyleSheet, Button, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Callout } from "react-native-maps";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const TrafficMapModal = ({ open, setOpen }) => {
  const MAX_API_CALLS = 100
  let apiCallCount = 0
  const MAPS_API_KEY = process.env.MAPS_API_KEY
  const [visible, setVisible] = useState(false)

  // AsyncStorage.setItem(
  //   "northSouth,eastWest,city,state",
  //   "Transight,Rae Road,Nisika Court,Bend,OR, 10.10.2025"
  // );
  // AsyncStorage.setItem(
  //   "northSouth1,eastWest1,city1,state1",
  //   "Transight,Honeysuckle Ln,Brookhollow Dr,Bend,OR,9.17.2022"
  // );
  // AsyncStorage.setItem(
  //   "northSouth2,eastWest2,city2,state2",
  //   "Transight,SE Murphy Rd,Brosterhous Rd,Bend,OR,9.17.2022"
  // );
  // AsyncStorage.setItem(
  //   "northSouth3,eastWest3,city3,state3",
  //   "Transight,Reed Market Rd,15th St,Bend,OR,9.17.2021"
  // );
  // AsyncStorage.setItem(
  //   "northSouth4,eastWest4,city4,state4",
  //   "Transight,Bond St,Columbia St,Bend,OR,9.17.2024"
  // );
  // AsyncStorage.setItem(
  //   "northSouth5,eastWest5,city5,state5",
  //   "Transight,SE 15th Street,SE Murphy Road,Bend,OR,9.17.2025"
  // );
  useEffect(() => {
    fetchCountData();
  }, [open])
  
  const [trafficData, setTrafficData] = useState([]);
  const fetchCountData = async () => {
    try {
      // Get the dataIndex from AsyncStorage
      const dataIndex = await AsyncStorage.getItem("dataIndex");
      if (!dataIndex) {
        console.error("No dataIndex found in AsyncStorage");
        return;
      }

      const dataNames = dataIndex.split("\n");
      console.log(`dataNames: ${dataNames}`);

      for (const dataName of dataNames) {
        console.log(`dataName: ${dataName}`);

        const data = await AsyncStorage.getItem(dataName);
        if (!data) {
          console.error(`No data found for dataName: ${dataName}`);
          continue;
        }

        console.log(`data: ${data}`);

        const seperatedData = data.split("\n");
        if (seperatedData.length < 4) {
          console.error(`Invalid data format for dataName: ${dataName}`);
          continue;
        }

        await fetchTrafficData(
          seperatedData[1],
          seperatedData[2],
          seperatedData[3],
          seperatedData[4],
          seperatedData[5],
          data
        );
      }
    } catch (error) {
      console.error("Error fetching count data:", error);
    }
  };

  const fetchTrafficData = async (
    northSouth,
    eastWest,
    city,
    state,
    date,
    countData
  ) => {
    try {
      if (apiCallCount >= MAX_API_CALLS) {
        console.warn("API call limit reached. No further calls will be made.");
        return;
      }
      
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          `${northSouth} and ${eastWest}, ${city}, ${state}`
        )}&key=${MAPS_API_KEY}`
      );
      console.log(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          `${northSouth} and ${eastWest}, ${city}, ${state}`
        )}&key=${MAPS_API_KEY}`
      );
      apiCallCount++
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;

        const dateNow = new Date();
        const year = date.match(/\d+$/)[0];
        const currentYear = dateNow.getFullYear();
        const pinColor =
          currentYear - year > 3
            ? "red"
            : currentYear - year > 1
            ? "yellow"
            : "green";
        setTrafficData((prevData) => [
          ...prevData,
          {
            coordinates: { latitude: lat, longitude: lng },
            title: `${northSouth} & ${eastWest}`,
            description: `${city}, ${state} on ${date}`,
            date: date,
            pinColor: pinColor,
            countData: countData,
          },
        ]);
      } else {
        console.error("No valid results found for the given address.");
      }
    } catch (error) {
      console.error("Error fetching traffic data:", error);
    }
  };

  useEffect(() => {
    fetchCountData();
  }, []);
  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <>
      {open && (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.7749, 
              longitude: -122.4194, 
              latitudeDelta: 0.0922, // Zoom level
              longitudeDelta: 0.0421, // Zoom level
            }}
          >
            {trafficData.map((location, index) => (
              <Marker
                key={index}
                coordinate={location.coordinates}
                title={location.title}
                description={location.description}
                pinColor={location.pinColor}
                onCalloutPress={async () => {
                  try {
                    const fileUri = `${FileSystem.documentDirectory}${location.title}.csv`;
                    await FileSystem.writeAsStringAsync(
                      fileUri,
                      location.countData,
                      {
                        encoding: FileSystem.EncodingType.UTF8,
                      }
                    );

                    await Sharing.shareAsync(fileUri);
                  } catch (error) {
                    console.error("Error sharing file:", error);
                  }
                }}
              >
                <Callout>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>
                      <Text style={styles.title}>
                        {location.title}
                        {"\n"}
                      </Text>
                      {location.description}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setOpen(false)}
            onLongPress={() => setOpen(false)}
            onPressOut={() => setOpen(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  map: {
    position: "relative",
    top: 0,
    flex: 1,
    width: "100%",
    left: "0%",
    zIndex: 1,
  },
  callout: {
    padding: 5,
  },
  calloutContainer: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  calloutButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    position: "absolute", 
    top: 20, 
    right: 20, 
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    borderRadius: 5,
    zIndex: "2"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    zIndex: "3"
  },
});

export default TrafficMapModal;
