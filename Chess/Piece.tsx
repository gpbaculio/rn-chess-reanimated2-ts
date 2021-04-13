import { Chess } from "chess.js";
import React, { useCallback } from "react";
import { StyleSheet, Image } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";

import { SIZE } from "./Notation";

export type Player = "b" | "w";

type Type = "q" | "r" | "n" | "b" | "k" | "p";

export type PieceType = `${Player}${Type}`;

type Pieces = Record<PieceType, ReturnType<typeof require>>;

export const PIECES: Pieces = {
  br: require("./assets/br.png"),
  bp: require("./assets/bp.png"),
  bn: require("./assets/bn.png"),
  bb: require("./assets/bb.png"),
  bq: require("./assets/bq.png"),
  bk: require("./assets/bk.png"),
  wr: require("./assets/wr.png"),
  wn: require("./assets/wn.png"),
  wb: require("./assets/wb.png"),
  wq: require("./assets/wq.png"),
  wk: require("./assets/wk.png"),
  wp: require("./assets/wp.png"),
};

interface PieceProps {
  id: PieceType;
  position: Vector;
}

const Piece = ({ id, position }: PieceProps) => {
  const offsetX = useSharedValue(0);

  const offsetY = useSharedValue(0);

  const translateX = useSharedValue(position.x);

  const translateY = useSharedValue(position.y);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    },
    onActive: ({ translationX, translationY }) => {
      translateX.value = translationX + offsetX.value;
      translateY.value = translationY + offsetY.value;
    },
  });
  const pieceStyle = useAnimatedStyle(() => ({
    position: "absolute",
    width: SIZE,
    height: SIZE,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View {...{ style: pieceStyle }}>
        <Image source={PIECES[id]} style={styles.piece} />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  piece: {
    width: SIZE,
    height: SIZE,
  },
});

export default Piece;
