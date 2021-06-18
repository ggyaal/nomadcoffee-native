import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

const Logo = styled.View`
  margin: 20px 0;
`;

export default function ({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <Container>
        <Logo>
          <Ionicons name="cafe" size={86} color="white" />
        </Logo>
        {children}
      </Container>
    </TouchableWithoutFeedback>
  );
}
