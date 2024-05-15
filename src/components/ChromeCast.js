import React, { useEffect, useCallback } from 'react';
import { CastButton, useRemoteMediaClient, useCastChannel, useCastSession} from 'react-native-google-cast';


export default function ChromeCast() {
  
  const channel = useCastChannel('urn:x-cast:com.url.cast', message => console.log('Received message', message));
  const client = useRemoteMediaClient();
  const session = useCastSession()

  
  
  useEffect(() => {
    console.log('client', client);
    const loadReceiverUrl = async () => {
      try {
        if (client && channel) { // Check if both client and channel are available
          if (client && channel.sendMessage) {
            const msg = {
              type: 'iframe',
              url: 'https://sandbox.bisdesign.co.za/sportyappcoza/assets/images/SportyAppLoading.png'
            }

              await channel.sendMessage('{"type":"iframe","url":"https:\/\/sportyapp.co.za\/scoreapi.php?view=tv&target=0a897bf3-377e-5bfd-8f4e-a70bdf23cdf7.local"}')
              console.log('Sent message')

            console.log('channel', channel)
            console.log('Message sent');
          } else {
            console.error('sendMessage method is not available on the channel object.');
          }
        }
      } catch (error) {
        console.error('Error loading custom receiver URL:', error);
      }

      if(session && client){
        console.log('Session',session)
      }

    };

    loadReceiverUrl();
    
    return () => {
      // Clean up any resources if needed
    };
  }, [client, channel]);

  return <CastButton style={{ width: 24, height: 24, tintColor: 'blue', marginRight: 20 }} />;
}
