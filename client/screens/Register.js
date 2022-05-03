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

  const registerUser = () => {
    return fetch(`http://${DOMAIN_NAME}:5050/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, email, password }),
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
            if (password === confirmPassword) {
              registerUser();
            }
          }}
          style={styles.button}
        >
          {/* on register push to home */}
          <Text style={styles.registerButton}>Register</Text>
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
    marginBottom: "-35px",
  },
  registerInput: {
    border: "1px solid gray",
    borderRadius: "5px",
    margin: "5px",
    padding: "5px",
    backgroundColor: "whitesmoke",
  },
  registerButton: {
    backgroundColor: "#2c3c46",
    color: "#91b1d6",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px",
  },
});
