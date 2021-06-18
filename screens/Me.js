import { useReactiveVar } from "@apollo/client";
import React from "react";
import styled from "styled-components/native";
import { isLoggedInVar, LogUserOut } from "../apollo";
import SharedButton from "../components/shared/SharedButton";
import SharedLayout from "../components/shared/SharedLayout";
import SharedLink from "../components/shared/SharedLink";
import LoggedOutNav from "../navigators/LoggedOutNav";

const Text = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 36px;
`;

export default function ({ navigation }) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <>
      {!isLoggedIn ? (
        <LoggedOutNav />
      ) : (
        <SharedLayout>
          <Text>it,s Me !</Text>
          <SharedButton
            text="someone profile"
            onPress={() => navigation.navigate("Profile")}
          />
          <SharedButton
            text="one shop"
            onPress={() => navigation.navigate("Shop")}
          />
          <SharedLink text="Log out" onPress={() => LogUserOut()} />
        </SharedLayout>
      )}
    </>
  );
}
