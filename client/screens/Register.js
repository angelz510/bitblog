import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";

const Register = () => {
  return (
    <KeyboardAvoidingView style={styles.registerContainer}>
      <Image style={styles.bitlogo} source={require("../assets/logo.png")} />
      <View style={styles.inputContainer}>
        <TextInput placeholder="Username" style={styles.registerInput} />
        <TextInput placeholder="Email" style={styles.registerInput} />
        <TextInput
          placeholder="Password"
          style={styles.registerInput}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.registerInput}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
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
