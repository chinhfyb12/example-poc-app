import React, {useRef, useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Video from 'react-native-video';
import ViewShot from 'react-native-view-shot';

const App = () => {
  const player = useRef<any>();
  const viewShot = useRef<any>();
  const [image, setImage] = useState<string>();

  // const onCapture = (uri: string) => {
  //   console.log('uri', uri);
  // };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ViewShot ref={viewShot} options={{format: 'jpg', quality: 0.9}}>
          <View style={styles.boxVideo}>
            <Video
              source={{
                uri: 'https://res.cloudinary.com/dvmmmv32y/video/upload/v1650509889/278476887_689467832388758_8648774826237868246_n_mvqwbm.mp4',
              }}
              style={styles.video}
              controls={true}
              ref={ref => (player.current = ref)}
            />
          </View>
        </ViewShot>
        <Button onPress={() => player.current?.seek(0, 0)} title="Play" />
        <Button
          onPress={() =>
            viewShot.current?.capture().then((uri: string) => setImage(uri))
          }
          title="Capture"
        />
        <Image source={{uri: image}} style={{width: '100%', height: 200}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boxVideo: {
    flex: 1,
    backgroundColor: '#ddd',
    width: '100%',
    height: 200,
  },
  video: {
    width: '100%',
    height: 200,
  },
});

export default App;
