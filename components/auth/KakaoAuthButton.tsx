import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, refreshAsync } from 'expo-auth-session';
import { Button, Platform } from 'react-native';
import axios from 'axios';


const REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY ?? "";
const REDIRECT_URI = process.env.EXPO_PUBLIC_REDIRECT_URI ?? "";

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://kauth.kakao.com/oauth/authorize',
  tokenEndpoint: 'https://kauth.kakao.com/oauth/token'
};

export default function App() { 
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: REST_API_KEY,
      scopes: [],
      // scopes: ['profile_nickname'],
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  console.log(request, response)

  React.useEffect(() => {
    console.log(response)
    if (response?.type === 'success') {
        const { code } = response.params;
        requestToken(code);
    }
  }, [response]);

  const requestToken = async (code: string) => {
    let accessToken = "none";
    axios ({
        method: "post",
        url: "https://kauth.kakao.com/oauth/token",
        params: {
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code 
        },
    }).then((response) => {
        console.log(response)
        accessToken = response.data.access_token;
        // AsyncStorage.setItem("accessToken", accessToken);
    }).catch((error) => {
        console.log(error);
    })
}

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}