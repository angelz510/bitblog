import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useUserData } from "../context/UserContext";
import { MaterialIcons } from "@expo/vector-icons";
import { DOMAIN_NAME } from "@env";
import LoadScreen from "../components/LoadScreen";

const ViewBlogPost = (props) => {
  const { userData } = useUserData();

  const { blogItem, token, onGoBack } = props.route.params;

  const [showLoadScreen, setShowLoadScreen] = useState(false);

  const deleteBlog = async () => {
    setShowLoadScreen(true);
    try {
      const res = await fetch(`http://${DOMAIN_NAME}:5050/blog/delete`, {
        method: "DELETE",
        headers: new Headers({
          "x-auth-token": token,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          blogID: blogItem._id,
        }),
      });
      await res.json();
      onGoBack();
      setShowLoadScreen(false);
      return props.navigation.goBack();
    } catch (err) {
      setShowLoadScreen(false);
      return console.log(err);
    }
  };

  const showAlert = () =>
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: deleteBlog },
      ],
      {
        cancelable: true,
      }
    );

  return (
    <>
      <View style={{ backgroundColor: "#2C3C46", flex: 1, padding: 15 }}>
        <Text style={styles.subject}>{blogItem.subject}</Text>

        {userData.id === blogItem.authorID ? (
          <></>
        ) : (
          <Text style={styles.text}>by {blogItem.userName}</Text>
        )}

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.text}>{blogItem.createdAt}</Text>
          {userData.id === blogItem.authorID ? (
            <View
              style={{
                flexDirection: "row",
                width: 100,
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  props.navigation.replace("EditBlogPost", {
                    token: token,
                    subject: blogItem.subject,
                    text: blogItem.text,
                    blogID: blogItem._id,
                    onGoBack: onGoBack,
                  })
                }
              >
                <MaterialIcons name="edit" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={showAlert}>
                <MaterialIcons name="delete" size={30} color="#FF934F" />
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </View>

        <Text style={styles.text}>{blogItem.text}</Text>
      </View>
      {showLoadScreen ? <LoadScreen /> : <></>}
    </>
  );
};

export default ViewBlogPost;

const styles = StyleSheet.create({
  subject: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
});
