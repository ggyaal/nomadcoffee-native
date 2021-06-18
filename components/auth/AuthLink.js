import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;

const Link = styled.TouchableOpacity``;

const Description = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-right: 5px;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.subColor};
`;

export default function ({ text, onPress, description }) {
  return (
    <Container>
      <Description>{description}</Description>
      <Link onPress={onPress}>
        <Text>{text}</Text>
      </Link>
    </Container>
  );
}
