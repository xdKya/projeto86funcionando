import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

import firebase from "firebase";

import { RFValue } from "react-native-responsive-fontsize";

import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "react-native-paper";
SplashScreen.preventAutoHideAsync();

const appIcon = require("../assets/logo.png");

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userSignedIn: false,
    };
  }

  signIn = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.replace("Drawer");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    SplashScreen.hideAsync();
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />

        <Text style={styles.appTitleText}>Spectagram</Text>
        <Image source={appIcon} style={styles.appIcon} />

        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({ email: text })}
          placeholder={"Digite o e-mail"}
          placeholderTextColor={"#FFFFFF"}
          autoFocus
        />
        <TextInput
          style={[styles.textinput, { marginTop: 20 }]}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder={"Digite a senha"}
          placeholderTextColor={"#FFFFFF"}
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => this.signIn(email, password)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.buttonTextNewUser}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
    alignItems: "center",
    justifyContent: "center",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appIcon: {
    width: RFValue(200),
    height: RFValue(200),
    resizeMode: "contain",
    marginBottom: RFValue(20),
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(22),
    fontFamily: "Bubblegum-Sans",
    marginBottom: RFValue(20),
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(50),
    padding: RFValue(10),
    borderColor: "#FFFFFF",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(20),
    color: "#FFFFFF",
    backgroundColor: "#15193c",
    fontFamily: "Bubblegum-Sans",
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white",
    marginBottom: RFValue(20),
  },
  buttonText: {
    fontSize: RFValue(24),
    color: "#15193c",
    fontFamily: "Bubblegum-Sans",
  },
  buttonTextNewUser: {
    fontSize: RFValue(16),
    color: "#FFFFFF",
    fontFamily: "Bubblegum-Sans",
    textDecorationLine: "underline",
  },
});
