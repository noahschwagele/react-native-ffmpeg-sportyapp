import React, { useEffect } from 'react';
import { CastButton, useRemoteMediaClient } from 'react-native-google-cast';

export default function ChromeCast() {
  const client = useRemoteMediaClient();
  const receiverUrl = 'https://sportyapp.co.za/scoreapi.php?view=tv&layout=99&stream_url=0a897bf3-377e-5bfd-8f4e-a70bdf23cdf7.local&target=0a897bf3-377e-5bfd-8f4e-a70bdf23cdf7.local';

  useEffect(() => {
    const loadReceiverUrl = async () => {
      try {
        if (client) {
          await client.loadMedia({
            mediaInfo: {
              contentUrl: receiverUrl,
            },
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
