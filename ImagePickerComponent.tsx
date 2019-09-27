import * as React from "react";
import {
  Button,
  Image,
  View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { fetchBearerToken, analyzeImage } from "./Network";
import {
  APIKey,
  clientID,
  clientSecret,
  authenticationURL,
  baseURL
} from "react-native-dotenv";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  countText: {
    color: "#FF00FF"
  }
});
export default class ImagePickerComponent extends React.Component {
  state = {
    image: null,
    material: null,
    isFetching: false,
    confidence: null
  };

  render() {
    let { image, material, isFetching, confidence } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ margin: 10 }}>
          <TouchableHighlight style={styles.button} onPress={this._pickImage}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("./assets/trashscan.png")}
            />
          </TouchableHighlight>
        </View>
        {image && (
          <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
        )}

        {isFetching && <ActivityIndicator size="large" color="#0000ff" />}
        {material && (
          <View style={{ margin: 10 }}>
            <Text>
              is {material} ({confidence})
            </Text>
          </View>
        )}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ isFetching: true, material: null, confidence: null });
      let imgPath = result.uri;
      this.setState({ image: imgPath });

      analyzeImage(imgPath)
        .then((res: any) => {
          console.log(res.data.predictions[0].results[0]);
          this.setState({ material: res.data.predictions[0].results[0].label });
          const conf = res.data.predictions[0].results[0].score.toFixed(3);
          console.log(conf);
          this.setState({
            confidence: conf
          });
          this.setState({ isFetching: false });
        })
        .catch((e: any) => {
          this.setState({ isFetching: false });
        });
    }
  };
}
