import React from "react";
import { StyleSheet, View } from "react-native";

import Row from "./Row";

export const WHITE = "rgb(100,133,68)";
export const BLACK = "rgb(230, 233, 198)";

interface BackgroundProps {}

const Background = () => {
  return (
    <View style={styles.container}>
      {new Array(8).fill(0).map((_, idx) => (
        <Row {...{ key: idx, row: idx }} />
      ))}
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
