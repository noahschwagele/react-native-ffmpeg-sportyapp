import { Image, Text } from "react-native";
import ViewShot from "react-native-view-shot";
// waiting an image

function ExampleWaitingCapture() {
  const ref = useRef();

  const onImageLoad = useCallback(() => {
    ref.current.capture().then(uri => {
      console.log("do something with ", uri);
    })
  }, []);

  return (
    <ViewShot ref={ref}>
      <Text>...Something to rasterize...</Text>
      <Image onLoad={onImageLoad} />
    </ViewShot>
  );
}
