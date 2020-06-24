import { Image, StyleSheet, Text, View } from "react-native";

import React from "react";
import TFLLOGO from "../assets/tfl-logo.png";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    padding: 50
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  text: {
    fontSize: 20
  },
  destinationWrapper: {
    display: "flex",
    alignItems: "center",
    marginTop: 10
  },
  destinationText: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export const Header = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={TFLLOGO} />
      <Text style={styles.text}>Overground</Text>

      <View style={styles.destinationWrapper}>
        <Text>From</Text>
        <Text style={styles.destinationText}>Caledonian Road & Barnsbury</Text>
        <Text>To</Text>
        <Text style={styles.destinationText}>Stratford</Text>
      </View>
    </View>
  );
};
