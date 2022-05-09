import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BlogCard = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text>{item.subject}</Text>
      <Text>{item.userName}</Text>
      <Text>{item.createdAt}</Text>
      <Text>{item.text}</Text>
    </View>
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
});
