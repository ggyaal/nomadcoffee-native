import React from "react";
import styled, { css } from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.TouchableOpacity``;

const Text = styled.Text`
  color: ${(props) => props.theme.textColor};
  ${(props) =>
    props.size
      ? css`
          font-size: ${props.size}px;
        `
      : null};
  ${(props) =>
    props.bold
      ? css`
          font-weight: ${props.bold};
        `
      : null};
`;

export default function SharedLink({ text, onPress, size, bold }) {
  return (
    <Container onPress={onPress}>
      <Text size={size} bold={bold}>
        {text}
      </Text>
    </Container>
  );
}

SharedLink.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  size: PropTypes.number,
  bold: PropTypes.number,
};
