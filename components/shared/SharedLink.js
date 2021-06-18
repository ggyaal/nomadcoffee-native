import React from "react";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity``;

const Text = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

export default function ({ text, onPress }) {
  return (
    <Container onPress={onPress}>
      <Text>{text}</Text>
    </Container>
  );
}
