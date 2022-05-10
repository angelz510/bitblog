import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProvider from "./context/UserContext";
import AppLoading from "expo-app-loading";

import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";
import EditBlogPost from "./screens/EditBlogPost";
import ViewBlogPost from "./screens/ViewBlogPost";

import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    "NovaSquare-Regular": require("./assets/fonts/NovaSquare-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
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
              options={{
                title: "",
                headerStyle: { backgroundColor: "#91B1D6" },
              }}
            />
            <Stack.Screen
              name="ViewBlogPost"
              component={ViewBlogPost}
              options={{
                title: "",
                headerStyle: { backgroundColor: "#91B1D6" },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    );
  }
}
