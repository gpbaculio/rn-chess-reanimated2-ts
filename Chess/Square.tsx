import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { RowProps } from "./Row";
import { WHITE, BLACK } from "./Background";

interface SquareProps extends RowProps {
  col: number;
}

const Square = ({ row, col }: SquareProps) => {
  const offset = row % 2 === 0 ? 1 : 0;

  const backgroundColor = (col + offset) % 2 === 0 ? WHITE : BLACK;

  const color = (col + offset) % 2 === 0 ? BLACK : WHITE;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text
        {...{ style: [styles.item, { color, opacity: col === 0 ? 1 : 0 }] }}>
        {8 - row}
      </Text>
      <Text
        {...{
          style: [
            styles.item,
            { color, alignSelf: "flex-end", opacity: row === 7 ? 1 : 0 },
          ],
        }}>
        {String.fromCharCode("a".charCodeAt(0) + col)}
      </Text>
    </View>
  );
};

export default Square;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    justifyContent: "space-between",
  },
  item: {
    fontWeight: "500",
  },
});
