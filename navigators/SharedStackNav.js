import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Me from "../screens/Me";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Shop from "../screens/Shop";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

const Stack = createStackNavigator();

const HeaderTitle = styled.View`
  flex-direction: row;
`;
const TitleText = styled.Text`
  color: white;
  align-self: flex-end;
  margin-bottom: 5px;
`;

export default function ({ tabName }) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerTitle: () => (
          <HeaderTitle>
            <TitleText>Nomad</TitleText>
            <Ionicons name="cafe" size={36} color="white" />
            <TitleText>Coffee</TitleText>
          </HeaderTitle>
        ),
        headerStyle: {
          backgroundColor: "black",
          shadowColor: "white",
        },
      }}
    >
      {tabName === "Home" && <Stack.Screen name={tabName} component={Home} />}
      {tabName === "Search" && (
        <Stack.Screen name={tabName} component={Search} />
      )}
      {tabName === "Me" && <Stack.Screen name={tabName} component={Me} />}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Shop" component={Shop} />
    </Stack.Navigator>
  );
}
