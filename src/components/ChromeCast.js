import React, { useEffect } from 'react';
import { CastButton, useRemoteMediaClient } from 'react-native-google-cast';

export default function ChromeCast() {
  const client = useRemoteMediaClient();
  const receiverUrl = 'http://sportyapp.co.za/test.html';

  useEffect(() => {
    const loadReceiverUrl = async () => {
      try {
        if (client) {
          await client.loadMedia({
            mediaInfo: {
              contentUrl: receiverUrl,
              contentType: 'text/html'
            },
            autoplay: true, // Optional: autoplay the loaded content
          });
        }
      } catch (error) {
        console.error('Error loading custom receiver URL:', error);
      }
    };

    loadReceiverUrl();

    return () => {
      // Clean up any resources if needed
    };
  }, [client, receiverUrl]);

  return <CastButton style={{ width: 24, height: 24, tintColor: 'blue', marginRight: 20 }} />;
}
