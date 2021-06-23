import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

export default function ScreenLayout({ loading, children }) {
  return (
    <Container>
      {loading ? <ActivityIndicator color="white" /> : children}
    </Container>
  );
}
