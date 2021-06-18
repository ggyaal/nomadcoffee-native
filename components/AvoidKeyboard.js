import React from "react";
import styled from "styled-components/native";

const AvoidView = styled.KeyboardAvoidingView`
  width: 100%;
  align-items: center;
`;

export default function ({ behavior, keyboardVerticalOffset, children }) {
  return (
    <AvoidView
      behavior={behavior}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      {children}
    </AvoidView>
  );
}
