import styled from "styled-components/native";

export const AuthInput = styled.TextInput`
  background-color: white;
  width: 100%;
  padding: 15px 10px;
  border-radius: 5px;
  margin-bottom: ${(props) => (props.lastInput ? 15 : 5)}px;
`;
