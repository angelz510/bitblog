import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useUserData } from "../context/UserContext";

const Home = (props) => {
  const { userData } = useUserData();

  useEffect(() => {
    if (!userData.id) {
      props.navigation.navigate("Register");
    }
  }, [userData]);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
