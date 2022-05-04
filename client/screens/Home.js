import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserData } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DOMAIN_NAME } from "@env";


const Home = (props) => {
  const { userData, setUserData } = useUserData();

  const getUser = (token) => {
    return fetch(`http://${DOMAIN_NAME}:5050/user`, {
      method: "GET",
      headers: new Headers({ "x-auth-token": token, "Content-Type": "application/json", }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData({
          id: data._id,
          userName: data.userName,
          email: data.email,
        });
        console.log(data)
      })
      .catch((err) => console.log(err));
  };

  const getToken = async() => {
    const token = await AsyncStorage.getItem('token')
  if(token !== null){
    getUser(token)
  } else {
    props.navigation.replace("Login");
  }
  }

  const signOut = () => {
    AsyncStorage.removeItem('token')
    setUserData({})
    props.navigation.replace("Login")
  }


  useEffect(() => {
    if(!userData.id){
      getToken()
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <Text>Welcome to bitblog</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#91b1d6",
    alignItems: "center",
    justifyContent: "center",
  },
  signOutButton: {
    backgroundColor: "#2c3c46",
    color: "#91b1d6",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px",
  },
});
