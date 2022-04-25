import React, {useRef, useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import ViewShot from 'react-native-view-shot';
import PhotoEditor from '@baronha/react-native-photo-editor';
import RNFS from 'react-native-fs';

// convert react native file system to base 64

const App = () => {
  const player = useRef<any>();
  const viewShot = useRef<any>();
  const [image, setImage] = useState<string>('');
  const [photo, setPhoto] = useState<any>();
  const onEdit = async () => {
    try {
      const path = await PhotoEditor.open({
        path: image,
        // path: photo.path,
        stickers: [],
      });
      setPhoto({
        ...photo,
        path,
      });
      // const result = await getBase64(path);
      // setImage(result);
      RNFS.readFile(path.toString(), 'base64').then(res => {
        console.log('data:image/jpeg;base64,' + res);
      });
    } catch (e) {
      console.log('e', e);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ViewShot
          ref={viewShot}
          options={{format: 'jpg', quality: 0.9, result: 'data-uri'}}>
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
            viewShot.current?.capture().then((uri: string) => {
              setImage(uri.replace(/(\r\n|\n|\r)/gm, ''));
            })
          }
          title="Capture"
        />
        <TouchableOpacity onPress={onEdit}>
          {photo?.path && (
            <Image
              style={{
                width: '100%',
                height: 300,
              }}
              source={{
                uri: photo.path,
              }}
            />
          )}
          {image ? (
            <Image
              style={{
                width: '100%',
                height: 300,
              }}
              source={{
                uri: image,
              }}
            />
          ) : null}
        </TouchableOpacity>
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
