import { BoxProps } from "@chakra-ui/react";

export const blobTopView: BoxProps = {
  position: "absolute",
  top: "0",
  left: "0",
  w: "30%",
  h: "30%",
  bgGradient: "linear(to-br, blue.400, cyan.400)",
  borderBottomRightRadius: "100%",
  zIndex: 0,
};

export const blobBottomView: BoxProps = {
  position: "absolute",
  bottom: "0",
  right: "0",
  w: "30%",
  h: "30%",
  bgGradient: "linear(to-br, blue.500, purple.400)",
  borderTopLeftRadius: "100%",
  zIndex: 0,
};