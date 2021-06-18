import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
  padding: 0 20px;
`;

export default function ({ children }) {
  return <Container>{children}</Container>;
}
