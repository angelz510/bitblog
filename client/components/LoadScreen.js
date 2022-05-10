import { View, ActivityIndicator } from "react-native";
import React from "react";

const LoadScreen = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.75)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={30} color="white" />
    </View>
  );
};

export default LoadScreen;
