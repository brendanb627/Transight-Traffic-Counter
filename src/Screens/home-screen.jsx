import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>asdjsjdghjashdgjadgsh</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: "lightblue",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  }
});