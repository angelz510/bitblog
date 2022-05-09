import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProvider from "./context/UserContext";

import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";
import EditBlogPost from "./screens/EditBlogPost";
import ViewBlogPost from "./screens/ViewBlogPost";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditBlogPost"
            component={EditBlogPost}
            options={{ title: "", headerStyle: { backgroundColor: "#91B1D6" } }}
          />
          <Stack.Screen
            name="ViewBlogPost"
            component={ViewBlogPost}
            options={{ title: "", headerStyle: { backgroundColor: "#91B1D6" } }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
