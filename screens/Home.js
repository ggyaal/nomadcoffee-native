import React from "react";
import styled from "styled-components/native";
import SharedButton from "../components/shared/SharedButton";
import SharedLayout from "../components/shared/SharedLayout";

const Text = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 36px;
`;

export default function ({ navigation }) {
  return (
    <SharedLayout>
      <Text>Home</Text>
      <SharedButton
        text="someone profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <SharedButton
        text="one shop"
        onPress={() => navigation.navigate("Shop")}
      />
    </SharedLayout>
  );
}
