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

export const TrafficButton = ({
  ButtonType,
  traffic,
  setTraffic,
  location,
}) => {
  const [buttonDistance, setButtonDistance] = useState(0);
  const [buttonPressing, setButtonPressing] = useState(false);
  const [trafficType, setTrafficType] = useState("normal");
  const [buttonPressed, setButtonPressed] = useState(false);

  const buttonRelease = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    handlePress();
    setButtonPressing(false);
    setButtonPressed(false);
  };

  const drag = Gesture.Pan().onChange((event) => {
    if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
      handleSlide(Math.abs(event.translationX));
    } else {
      handleSlide(Math.abs(event.translationY));
    }
  });

  const release = Gesture.Pan().onEnd((event) => buttonRelease());

  const pressRelease = Gesture.Tap().onEnd((event) => buttonRelease());

  const gestures = Gesture.Simultaneous(drag, release, pressRelease);

  useEffect(() => {
    //Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    if (buttonDistance >= 100) {
      setTrafficType("heavy");
    }
  }, [buttonDistance >= 100]);

  useEffect(() => {
    console.log(traffic);
  }, [traffic]);

  useEffect(() => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    if (buttonDistance > 50 && buttonDistance < 100) {
      setTrafficType("bike");
    }
  }, [buttonDistance > 50 && buttonDistance < 100]);

  const handleSlide = (locationX) => {
    setButtonPressing(true);
    setButtonDistance(locationX);
  };

  const handlePress = () => {
    if (!buttonPressed) {
      setButtonPressed(true);
      if (trafficType == "normal") {
        if (ButtonType == "through") {
          setTraffic({
            ...traffic,
            through: traffic.through + 1,
          });
          console.log(traffic.through);
        } else if (ButtonType == "left") {
          setTraffic({
            ...traffic,
            left: traffic.left + 1,
          });
          console.log(traffic.left);
        } else if (ButtonType == "right") {
          setTraffic({
            ...traffic,
            right: traffic.right + 1,
          });
          console.log(traffic.right);
        } else {
          console.log("error with input on traffic button, check spelling");
        }
      } else if (trafficType == "heavy") {
        console.log("heavy");
        if (ButtonType == "through") {
          setTraffic({
            ...traffic,
            heavyThrough: traffic.heavyThrough + 1,
          });
          console.log(traffic.heavyThrough);
        } else if (ButtonType == "left") {
          setTraffic({
            ...traffic,
            heavyLeft: traffic.heavyLeft + 1,
          });
          console.log(traffic.heavyLeft);
        } else if (ButtonType == "right") {
          setTraffic({
            ...traffic,
            heavyRight: traffic.heavyRight + 1,
          });
          console.log(traffic.heavyRight);
        } else {
          console.log("error with input on traffic button, check spelling");
        }
      } else if (trafficType == "bike") {
        if (ButtonType == "through") {
          setTraffic({
            ...traffic,
            bikeThrough: traffic.bikeThrough + 1,
          });
          console.log(traffic.bikeThrough);
        } else if (ButtonType == "left") {
          setTraffic({
            ...traffic,
            bikeLeft: traffic.bikeLeft + 1,
          });
          console.log(traffic.bikeLeft);
        } else if (ButtonType == "right") {
          setTraffic({
            ...traffic,
            bikeRight: traffic.bikeRight + 1,
          });
          console.log(traffic.bikeRight);
        } else {
          console.log("error with input on traffic button, check spelling");
        }
      } else {
        console.log("issue with traffic type. check spelling");
      }
      setTrafficType("normal");
    }
  };

  return (
    <GestureHandlerRootView  style={{position: 'absolute'}}>
      <View
      style={{
        position: 'absolute'
      }}
      >
        <GestureDetector gesture={gestures}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: location[3],
              left: location[4],
              width: 75,
              height: 75,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#32a852",
              borderRadius: 15,
            }}
            onPress={handlePress}
          >
            <Text style={styles.buttonText}>
              {ButtonType === "through"
                ? traffic.through
                : ButtonType === "left"
                ? traffic.left
                : ButtonType === "right"
                ? traffic.right
                : "Unknown"}
            </Text>
          </TouchableOpacity>
        </GestureDetector>
        {buttonPressing && buttonDistance > 100 && (
          <View style={styles.bar}>
            <Image
              source={require("../assets/newTruckOutline.png")}
              style={{
                width: 60,
                height: 60,
                top: location[3] + location[0],
                left: location[4] + location[1],
                position: "absolute",
              }}
              resizeMode="contain"
            />
          </View>
        )}
        {!buttonPressing && (
          <View style={styles.bar}>
            <Image
              source={require("../assets/arrowIcon.png")}
              style={{
                width: 60,
                height: 60,
                top: location[3] + location[0],
                left: location[4] + location[1],
                position: "absolute",
                pointerEvents: "none",
                transform: [{ rotate: `${location[2]}deg` }],
              }}
              resizeMode="contain"
            />
          </View>
        )}
        {buttonPressing && buttonDistance > 50 && buttonDistance <= 100 && (
          <Image
            source={require("../assets/newBikeOutline.png")}
            style={{
              width: 60,
              height: 60,
              top: location[3] + location[0],
              left: location[4] + location[1],
              position: "absolute",
            }}
            resizeMode="contain"
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {},
  bar: {
    position: "absolute",
    width: 400,
    height: 80,
    pointerEvents: "none",
  },
  truckIcon: {
    position: "absolute",
    width: 100,
  },
  bar2: {
    position: "absolute",
    width: 400,
    height: 20,
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    top: 28,
  },
});
