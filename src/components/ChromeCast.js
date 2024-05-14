import React, { useEffect } from 'react';
import { CastButton, useRemoteMediaClient, useCastChannel } from 'react-native-google-cast';

export default function ChromeCast() {
  const channel = useCastChannel('urn:x-cast:com.url.cast', message => console.log('Received message', message));
  const client = useRemoteMediaClient();

  useEffect(() => {
    const loadReceiverUrl = async () => {
      try {
        if (client && channel) { // Check if both client and channel are available
          //Initial Image before Scoring Page
          // await client.loadMedia({
          //   mediaInfo: {
          //     contentUrl: 'https://sportyapp.co.za/assets/images/SportyAppLoading.png',
          //   },
          // });
          //Send message to the channel
          channel.sendMessage({hello: 'world'})
          console.log('Channel', channel)
          // channel.sendMessage({ type: 'iframe', url: ' https://sportyapp.co.za/scoreapi.php?view=tv&target=0a897bf3-377e-5bfd-8f4e-a70bdf23cdf7.local' });
        }
      } catch (error) {
        console.error('Error loading custom receiver URL:', error);
      }
    };

    loadReceiverUrl();
    
    return () => {
      
      // Clean up any resources if needed
    };
  }, [client, channel]);

  return <CastButton style={{ width: 24, height: 24, tintColor: 'blue', marginRight: 20 }} />;
}
