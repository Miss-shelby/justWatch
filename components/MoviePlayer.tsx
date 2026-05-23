import React, { useRef } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MoviePlayer({ movieId }:any) {
  const webViewRef = useRef(null);

  

  return (
    <View style={{ width: '100%', height: 400 }}>
      <WebView 
      allowfullscreen
        source={{
          uri: `https://www.vidking.net/embed/movie/${movieId}?color=e50914&autoPlay=true`
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );
}