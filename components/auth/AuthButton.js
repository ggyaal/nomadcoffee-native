import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";

const AuthButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.mainColor};
  width: 100%;
  padding: 15px 10px;
  border-radius: 3px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const Text = styled.Text`
  color: white;
  text-align: center;
`;

export default function ({ text, onPress, disabled, loading }) {
  return (
    <AuthButton disabled={disabled} onPress={onPress}>
      {loading ? <ActivityIndicator color="white" /> : <Text>{text}</Text>}
    </AuthButton>
  );
}
