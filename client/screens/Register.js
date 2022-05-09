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
import { useUserData } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = (props) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUserData } = useUserData();

  const registerUser = async () => {
    try {
      const res = await fetch(`http://${DOMAIN_NAME}:5050/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });
      const data = await res.json();
      setUserData({
        id: data._id,
        userName: data.userName,
        email: data.email,
      });
      await AsyncStorage.setItem("token", data.token);
      return props.navigation.navigate("Home");
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.registerContainer}>
      <Image style={styles.bitlogo} source={require("../assets/logo.png")} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          onChangeText={setUserName}
          style={styles.registerInput}
        />
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          style={styles.registerInput}
        />
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          style={styles.registerInput}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          style={styles.registerInput}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            if (
              password === confirmPassword &&
              password !== "" &&
              confirmPassword !== ""
            ) {
              registerUser();
            }
          }}
          style={styles.button}
        >
          {/* on register push to home */}
          <Text style={styles.registerButton}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.replace("Login")}
          style={styles.button}
        >
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    backgroundColor: "#91b1d6",
    alignItems: "center",
    justifyContent: "center",
  },
  bitlogo: {
    width: 220,
    height: 220,
    marginBottom: -35,
  },
  registerInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    margin: 5,
    padding: 5,
    backgroundColor: "whitesmoke",
  },
  registerButton: {
    backgroundColor: "#2c3c46",
    color: "#91b1d6",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#2c3c46",
    color: "#91b1d6",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
