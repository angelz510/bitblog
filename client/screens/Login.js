import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import React from "react";

const Login = () => {
  // create state for email
  // create state for password
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image style={styles.bitlogo} source={require("../assets/logo.png")} />
      <View style={styles.inputContainer}>
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
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
