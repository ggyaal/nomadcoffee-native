import React from "react";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.mainColor};
  padding: 15px 10px;
  border-radius: 5px;
  opacity: ${(props) => (props.disabed ? 0.5 : 1)};
  width: 100%;
  margin-bottom: ${(props) => (props.lastBtn ? 15 : 5)}px;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.textColor};
  text-align: center;
`;

export default function ({ text, onPress, disabed, lastBtn }) {
  return (
    <Container onPress={onPress} disabed={disabed} lastBtn={lastBtn}>
      <Text>{text}</Text>
    </Container>
  );
}
