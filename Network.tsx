import axios from "axios";
import { APIKey, clientID, clientSecret, authenticationURL, baseURL } from 'react-native-dotenv'

export const analyzeImage = (uri: any) => {
  return fetchBearerToken().then((token: string) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data"
      }
    };

    var formData = new FormData();

    formData.append("files", {
      uri: uri,
      type: "image/jpeg",
      name: "image.jpg"
    });

    //formData.append("file", { uri: "", name: "", type: "image/jpg" });

    return axios
      .post(
        baseURL + "/models/brands005/versions/1",
        formData,
        config
      )
      .then((res: any) => {
        //console.log(JSON.stringify(res));
        return new Promise<any>((resolve, reject) => {
          resolve(res);
        });
      })
      .catch((res: any) => {
        console.log("error:" + JSON.stringify(res));
      });
  });
};

export const fetchBearerToken = (): Promise<String> =>
  axios
    .get(
      authenticationURL,
      {
        auth: {
          username: clientID,
          password: clientSecret
        }
      }
    )
    .then((resp: any) => {
      console.log("Got access token");
      return new Promise<String>((resolve, reject) => {
        resolve(resp.data.access_token);
      });
    });
