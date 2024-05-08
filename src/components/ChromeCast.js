import React, { useState, useEffect } from 'react';
import { CastButton, useRemoteMediaClient } from 'react-native-google-cast';

export default function ChromeCast() {
  const client = useRemoteMediaClient();
  const loadingImage = 'https://sportyapp.co.za/assets/images/SportyAppLoading.png';
  const serverBaseUrl = 'http://192.168.8.105:3000/getBase64Image'; // Replace with your server URL

  useEffect(() => {
    // const fetchBase64Image = async () => {
    //   try {
    //     const response = await fetch(serverBaseUrl);
    //     console.log(response)
    //     if (response.ok) {
    //       const base64Image = await response.text();
    //       const mediaInfo = {
    //         contentUrl: `data:image/png;base64,${base64Image}`,
    //         contentType: 'image/png',
    //       };
    //       if (client) {
    //         client.loadMedia({ mediaInfo });
    //       }
    //     } else {
    //       console.error('Failed to fetch base64 image from the server');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching base64 image:', error);
    //   }
    // };

    // Load an initial image
    const initialMediaInfo = {
      contentUrl: loadingImage,
      contentType: 'image/*',
    };
    if (client) {
      client.loadMedia({ mediaInfo: initialMediaInfo });
    }

    // Fetch base64 image every 1 second
    // const intervalId = setInterval(fetchBase64Image, 1000);

    // return () => clearInterval(intervalId);
  }, [client, loadingImage]);

  return <CastButton style={{ width: 24, height: 24, tintColor: 'blue', marginRight: 20 }} />;
}