import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const BlogCard = ({ item, token, navigation, onGoBack }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("ViewBlogPost", {
          blogItem: item,
          token: token,
          onGoBack: onGoBack,
        })
      }
    >
      <Text style={styles.subject}>{item.subject}</Text>
      <Text style={styles.text}>{item.userName}</Text>
      <Text style={styles.text}>{item.createdAt}</Text>
      <Text numberOfLines={2} style={styles.text}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );
};

export default BlogCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    width: 350,
    height: 150,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  subject: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: "black",
    fontSize: 15,
    marginTop: 2,
    marginBottom: 2,
  },
});
