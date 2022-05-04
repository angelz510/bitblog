import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { DOMAIN_NAME } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserData } from "../context/UserContext";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useUserData();

  const loginUser = () => {
    return fetch(`http://${DOMAIN_NAME}:5050/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData({
          id: data._id,
          userName: data.userName,
          email: data.email,
        });
        AsyncStorage.setItem("token", data.token);
      })
      .then(() => props.navigation.navigate("Home"))
      .catch((err) => console.log(err));
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image style={styles.bitlogo} source={require("../assets/logo.png")} />
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          onChangeText={setPassword}
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={loginUser} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Register")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#91b1d6",
    alignItems: "center",
    justifyContent: "center",
  },
  bitlogo: {
    width: 220,
    height: 220,
    marginBottom: "-35px",
  },
  input: {
    border: "1px solid gray",
    borderRadius: "5px",
    margin: "5px",
    padding: "5px",
    backgroundColor: "whitesmoke",
  },
  buttonText: {
    backgroundColor: "#2c3c46",
    color: "#91b1d6",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px",
  },
});
