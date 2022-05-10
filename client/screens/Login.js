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
import LoadScreen from "../components/LoadScreen";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useUserData();
  const [showLoadScreen, setShowLoadScreen] = useState(false);

  const loginUser = async () => {
    setShowLoadScreen(true);
    try {
      const res = await fetch(`http://${DOMAIN_NAME}:5050/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setUserData({
        id: data._id,
        userName: data.userName,
        email: data.email,
      });
      AsyncStorage.setItem("token", data.token);
      setShowLoadScreen(false);
      return props.navigation.navigate("Home");
    } catch (err) {
      setShowLoadScreen(false);
      return console.log(err);
    }
  };
  return (
    <>
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
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.replace("Register")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {showLoadScreen ? <LoadScreen /> : <></>}
    </>
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
    marginBottom: -35,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    margin: 5,
    padding: 5,
    backgroundColor: "whitesmoke",
  },
  buttonText: {
    backgroundColor: "#2c3c46",
    color: "#91b1d6",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    textAlign: "center",
  },
  inputContainer: {
    width: 200,
  },
});
