import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useUserData } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DOMAIN_NAME } from "@env";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { StatusBarHeight } from "../utils/StatusBarHeight";
import LoadScreen from "../components/LoadScreen";

import BlogCard from "../components/BlogCard";

const Home = (props) => {
  const { userData, setUserData } = useUserData();

  const [latestActive, setLatestActive] = useState(true);
  const [userActive, setUserActive] = useState(false);

  const [isLoading, setLoading] = useState(true);

  const [showLoadScreen, setShowLoadScreen] = useState(false);

  const blogData = useRef([]);
  const token = useRef(null);

  const getBlogs = async (choice, token) => {
    setLoading(true);
    const url = choice === "latest" ? "" : "user-blogs";
    try {
      const res = await fetch(`http://${DOMAIN_NAME}:5050/blog/${url}`, {
        method: "GET",
        headers: new Headers({
          "x-auth-token": token,
          "Content-Type": "application/json",
        }),
      });
      const data = await res.json();
      blogData.current = data;
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getUser = async (token) => {
    try {
      const res = await fetch(`http://${DOMAIN_NAME}:5050/user`, {
        method: "GET",
        headers: new Headers({
          "x-auth-token": token,
          "Content-Type": "application/json",
        }),
      });
      const data = await res.json();
      setUserData({
        id: data._id,
        userName: data.userName,
        email: data.email,
      });
    } catch (err) {
      return console.log(err);
    }
  };

  const signOut = () => {
    setShowLoadScreen(true);
    AsyncStorage.removeItem("token");
    setUserData({});
    props.navigation.replace("Login");
  };

  const handleRoute = async () => {
    token.current = await AsyncStorage.getItem("token");
    if (!userData.id) {
      if (token.current !== null) {
        await getUser(token.current);
        await getBlogs("latest", token.current);
      } else {
        props.navigation.replace("Login");
      }
    } else {
      if (token.current !== null) {
        getBlogs("latest", token.current);
      }
    }
  };

  const refresh = () => {
    getBlogs(userActive ? "user" : "latest", token.current);
  };

  useEffect(() => {
    handleRoute();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={{ height: StatusBarHeight }} />
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("EditBlogPost", {
                token: token.current,
                onGoBack: refresh,
              })
            }
          >
            <AntDesign name="pluscircle" size={30} color="#C2E812" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "darkblue" }}>
            {userData.userName}
          </Text>
          <TouchableOpacity onPress={signOut}>
            <FontAwesome5 name="sign-out-alt" size={30} color="#FF934F" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => {
              setLatestActive(true);
              setUserActive(false);
              getBlogs("latest", token.current);
            }}
          >
            <Text
              style={[
                styles.tabText,
                { color: latestActive ? "#C2E812" : "white" },
              ]}
            >
              Latest Blogs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setLatestActive(false);
              setUserActive(true);
              getBlogs("user", token.current);
            }}
          >
            <Text
              style={[
                styles.tabText,
                { color: userActive ? "#C2E812" : "white" },
              ]}
            >
              Your Blogs
            </Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <></>
        ) : blogData.current.length <= 0 ? (
          <Text style={{ fontSize: 18, color: "white" }}>
            No results. Post something!
          </Text>
        ) : (
          <></>
        )}

        {isLoading ? (
          <ActivityIndicator size="large" color="#FFF" />
        ) : (
          <FlatList
            data={blogData.current}
            renderItem={({ item }) => (
              <BlogCard
                {...props}
                item={item}
                token={token.current}
                onGoBack={refresh}
                userActive={userActive}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
      {showLoadScreen ? <LoadScreen /> : <></>}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3c46",
    alignItems: "center",
  },
  topBar: {
    backgroundColor: "#91B1D6",
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
    width: 350,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabContainer: {
    flexDirection: "row",
    width: 350,
    justifyContent: "space-around",
    padding: 20,
    marginTop: 15,
  },
  tabText: {
    color: "white",
    fontSize: 22,
    fontFamily: "NovaSquare-Regular",
  },
});
