import React, { useEffect } from 'react';
import { CastButton, useRemoteMediaClient, useCastChannel, useCastSession} from 'react-native-google-cast';


export default function ChromeCast() {
  
  const channel = useCastChannel('urn:x-cast:com.url.cast');
  const client = useRemoteMediaClient();
  const session = useCastSession()

  
  
  useEffect(() => {
    const loadReceiverUrl = async () => {
      try {
        if (client && channel) { // Check if both client and channel are available
          if (client && channel.sendMessage) {
            const msg = {
              type: 'iframe',
              url: 'http://example.com/'
            }

              channel.sendMessage(msg)
              console.log('Sent message')

            console.log(channel)
            console.log('Message sent');
          } else {
            console.error('sendMessage method is not available on the channel object.');
          }
        }
      } catch (error) {
        console.error('Error loading custom receiver URL:', error);
      }

      if(session && client){
        session.addChannel('urn:x-cast:com.url.cast')
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
