import React from "react";
import { View, StyleSheet } from "react-native";

import Square from "./Square";

export interface RowProps {
  row: number;
}

const Row = ({ row }: RowProps) => {
  return (
    <View style={styles.container}>
      {new Array(8).fill(0).map((_, idx) => (
        <Square {...{ key: idx, row, col: idx }} />
      ))}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});
