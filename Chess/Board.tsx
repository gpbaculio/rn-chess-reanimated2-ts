import { Chess } from "chess.js";
import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Background from "./Background";
import { SIZE } from "./Notation";
import Piece, { PieceType } from "./Piece";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
});

function useConst<T>(initialValue: T | (() => T)): T {
  const ref = useRef<{ value: T }>();
  if (ref.current === undefined) {
    // Box the value in an object so we can tell if it's initialized even if the initializer
    // returns/is undefined
    ref.current = {
      value:
        typeof initialValue === "function"
          ? // eslint-disable-next-line @typescript-eslint/ban-types
            (initialValue as Function)()
          : initialValue,
    };
  }
  return ref.current.value;
}

const Board = () => {
  const chess = useConst(() => new Chess());

  const [state, setState] = useState({
    player: "",
    board: chess.board(),
  });

  return (
    <View style={styles.container}>
      <Background />
      {state.board.map((row, i) => {
        return row.map((square, j) => {
          if (square === null) return null;
          // console.log("STATE BOARD I: ", i);
          // console.log("J: ", j);
          // console.log("id: ", `${square.color}${square.type}`);
          return (
            <Piece
              {...{
                id: `${square.color}${square.type}` as PieceType,
                key: `${j}:${square.color}:${square.type}`,
                position: {
                  x: j * SIZE,
                  y: i * SIZE,
                },
              }}
            />
          );
        });
      })}
    </View>
  );
};

export default Board;
