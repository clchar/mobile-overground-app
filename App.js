import React from "react";
import { StyleSheet, View } from "react-native";
import { Arrivals } from "./src/components/Arrivals";
import { Header } from "./src/components/Header";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Arrivals />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
