import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useUserData } from "../context/UserContext";
import { DOMAIN_NAME } from "@env";

const BlogPost = (props) => {
  const [subjectText, setSubjectText] = useState("");
  const [bodyText, setBodyText] = useState("");

  const { userData } = useUserData();

  const { token } = props.route.params;

  const createNewPost = async () => {
    if (subjectText === "" || bodyText === "") {
      return;
    }

    try {
      const res = await fetch(`http://${DOMAIN_NAME}:5050/blog`, {
        method: "POST",
        headers: new Headers({
          "x-auth-token": token,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          subject: subjectText,
          text: bodyText,
          userID: userData._id,
          userName: userData.userName,
        }),
      });
      await res.json();
      return props.navigation.goBack();
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <View style={{ backgroundColor: "#2C3C46", flex: 1 }}>
      <TextInput
        onChangeText={setSubjectText}
        placeholder="Subject"
        style={styles.subjectInput}
      />
      <TextInput
        onChangeText={setBodyText}
        placeholder="Body"
        style={styles.bodyInput}
        multiline
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: 20,
          paddingRight: 20,
        }}
      >
        <TouchableOpacity onPress={createNewPost} style={styles.button}>
          <Text style={{ color: "black", fontSize: 18 }}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlogPost;

const styles = StyleSheet.create({
  subjectInput: {
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  bodyInput: {
    borderWidth: 1,
    borderColor: "black",
    height: 160,
    textAlignVertical: "top",
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "blue",
    width: 60,
    height: 30,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C2E812",
  },
});
