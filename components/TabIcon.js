import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function ({ iconName, color, focused }) {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={26}
    />
  );
}
