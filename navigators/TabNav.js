import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SharedStackNav from "./SharedStackNav";
import TabIcon from "../components/TabIcon";

const Tabs = createBottomTabNavigator();

export default function () {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        style: {
          backgroundColor: "black",
          borderTopColor: "white",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName="home" color="white" focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav tabName="Home" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName="search-circle" color="white" focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav tabName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Me"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName="person" color="white" focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav tabName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
