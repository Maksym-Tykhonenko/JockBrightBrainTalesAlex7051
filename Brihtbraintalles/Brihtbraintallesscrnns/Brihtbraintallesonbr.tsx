import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Brihtbraintalleslayot from '../Brihtbraintallescpntts/Brihtbraintalleslayot';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const brightbrainData = [
  {
    id: 1,
    headerTitle: `Hello, I'm Jock`,
    title: `I like jokes, stories and interesting riddles. Let's have fun together.`,
    image: require('../../assets/i/brihtbraintallon1.png'),
    buttonText: 'Hello, JOCK',
  },
  {
    id: 2,
    headerTitle: `Funny stories`,
    title: `Read funny stories from Jock and find little interesting thoughts in them.`,
    image: require('../../assets/i/brihtbraintallon2.png'),
    buttonText: 'Okay',
  },
  {
    id: 3,
    headerTitle: `Interesting about simple`,
    title: `Short stories about fruits and habits that are easy to understand and remember.`,
    image: require('../../assets/i/brihtbraintallon3.png'),
    buttonText: 'Continue',
  },
  {
    id: 4,
    headerTitle: `Guess the word`,
    title: `Read a short riddle and choose the correct word.`,
    image: require('../../assets/i/brihtbraintallon4.png'),
    buttonText: 'Next',
  },
  {
    id: 5,
    headerTitle: `Test yourself`,
    title: `Answer questions and learn new things in an easy format.`,
    image: require('../../assets/i/brihtbraintallon5.png'),
    buttonText: 'Start',
  },
];

const Brihtbraintallesonbr = () => {
  const navigation = useNavigation();
  const [brightbrainIndex, setBrightbrainIndex] = useState(0);
  const {height, width} = useWindowDimensions();

  const isLandscape = height < width;

  const brightbrainNext = () => {
    brightbrainIndex === 4
      ? navigation.replace('Brihtbraintaltabs')
      : setBrightbrainIndex(brightbrainIndex + 1);
  };
  return (
    <Brihtbraintalleslayot>
      <View style={styles.brihtbrainecontainer}>
        <View
          style={[
            styles.brihtbraintallesheader,
            {height: isLandscape ? 90 : 130},
          ]}>
          <Text style={styles.brihtbraintallestext}>
            {brightbrainData[brightbrainIndex].headerTitle}
          </Text>
        </View>

        <View
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <Image
            source={brightbrainData[brightbrainIndex].image}
            style={brightbrainIndex === 3 && {marginBottom: 50}}
          />
          <View
            style={[
              styles.brihtbrainbottomsheet,
              {height: isLandscape ? 230 : 250},
            ]}>
            <Text style={styles.brihtbraintallestitle}>
              {brightbrainData[brightbrainIndex].title}
            </Text>

            <TouchableOpacity
              style={styles.brihtbraintbbutton}
              activeOpacity={0.8}
              onPress={brightbrainNext}>
              <Text style={styles.brihtbraintbbuttontext}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Brihtbraintalleslayot>
  );
};

const styles = StyleSheet.create({
  brihtbrainecontainer: {
    flex: 1,
  },
  brihtbraintallesheader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: '#BD0709',
    width: '100%',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    height: 150,
    paddingBottom: 5,
  },
  brihtbraintallestitle: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  brihtbraintallestext: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
  },
  brihtbrainbottomsheet: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
    backgroundColor: '#BD0709',
    width: '100%',
    height: 250,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  brihtbraintbbutton: {
    backgroundColor: '#FFD61C',
    width: 186,
    borderRadius: 10,
    height: 67,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brihtbraintbbuttontext: {
    fontSize: 16,
    color: '#5A0701',
    fontFamily: 'Raleway-Black',
  },
});

export default Brihtbraintallesonbr;
