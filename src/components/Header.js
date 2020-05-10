import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import TFLLOGO from "../images/tfl-logo.png";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    padding: 20
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
      <Text style={styles.text}>Overground Arrivals</Text>

      <View style={styles.destinationWrapper}>
        <Text style={styles.destinationText}>Caledonian Road & Barnsbury</Text>
      </View>
    </View>
  );
};
