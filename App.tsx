import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImagePickerComponent from "./ImagePickerComponent";
import { fetchBearerToken } from "./Network";
import { Button } from "react-native";

export default class App extends Component {
  render() {
    // <ImagePickerComponent></ImagePickerComponent>
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch"
        }}
      >
        <ImagePickerComponent></ImagePickerComponent>
      </View>
    );
  }
}
