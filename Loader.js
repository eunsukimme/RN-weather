import React from "react";
import { StyleSheet, View, Text } from "react-native";

function Loader() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Getting the awesome weather...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 100,
    paddingHorizontal: 30,
    backgroundColor: "#fdf6aa"
  },
  text: {
    color: "#2c2c2c",
    fontSize: 30
  }
});

export default Loader;
