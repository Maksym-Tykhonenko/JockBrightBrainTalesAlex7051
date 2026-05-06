import {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Share,
  ActivityIndicator,
  useWindowDimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Brihtbraintalleslayot from '../Brihtbraintallescpntts/Brihtbraintalleslayot';
import WebView from 'react-native-webview';
import {brightbrainhtmlLoader} from '../Brihtbraintallescpntts/Brihtbraintallesload';

const BRIHTBRAIN_FACTS_KEY = 'brihtbraintalles_saved_facts';

const brihtbraintallesfactsData = [
  'Apples help the brain work faster because they contain natural sugars that give energy without overload.',
  'Bananas can lift your mood, because they contain substances that help produce the "hormone of joy".',
  'Oranges strengthen the immune system, so they are often advised to eat them in the cold season.',
  'Grapes contain antioxidants that help the body fight stress.',
  'Strawberries are good for memory because they contain vitamins that support brain function.',
  'If you drink enough water, the brain works better and concentrates easier.',
  'Sleep is important for learning - during sleep, the brain "stores" new information.',
  'Laughter helps reduce stress and even improves mood faster than sweets.',
  'Regular puzzles train logic in the same way that sports train the body.',
  'When you learn something new, your brain creates new connections, and you become smarter.',
  'Drawing helps develop imagination and creative thinking.',
  'Reading stories improves your vocabulary and helps you express your thoughts better.',
  'Playing word games trains your memory and speed of thinking.',
  'Fruits are natural "superheroes" because they give you energy without harm.',
  'If you take breaks while studying, you remember more.',
  'Even a short walk helps your brain "reboot".',
  'Solving puzzles develops patience and the ability to think step by step.',
  'When you explain something to someone else, you understand it even better yourself.',
  'Funny stories help you remember information faster than dry facts.',
  'You can learn something new every day - and this is a small victory for your brain.',
];

const Brihtbraintallesfacct = () => {
  const [brihtbraintallesfactIndex, setBrihtbraintallesfactIndex] = useState(0);
  const [brihtbraintallesisLoading, setBrihtbraintallesisLoading] =
    useState(false);
  const {height, width} = useWindowDimensions();
  const isLandscape = height < width;
  const [
    brihtbraintallessavedFactIndexes,
    setBrihtbraintallessavedFactIndexes,
  ] = useState<number[]>([]);
  const brihtbraintallestimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const brihtbraintallescurrentFact =
    brihtbraintallesfactsData[brihtbraintallesfactIndex];
  const brihtbraintallesisSaved = brihtbraintallessavedFactIndexes.includes(
    brihtbraintallesfactIndex,
  );

  useEffect(() => {
    const brihtbraintallesloadSavedFacts = async () => {
      try {
        const brihtbraintallesraw = await AsyncStorage.getItem(
          BRIHTBRAIN_FACTS_KEY,
        );
        if (!brihtbraintallesraw) {
          setBrihtbraintallessavedFactIndexes([]);
          return;
        }
        const brihtbraintallesparsed = JSON.parse(brihtbraintallesraw);
        if (Array.isArray(brihtbraintallesparsed)) {
          setBrihtbraintallessavedFactIndexes(
            brihtbraintallesparsed.map(Number).filter(Number.isFinite),
          );
        }
      } catch (error) {
        setBrihtbraintallessavedFactIndexes([]);
      }
    };
    brihtbraintallesloadSavedFacts();

    return () => {
      if (brihtbraintallestimerRef.current) {
        clearTimeout(brihtbraintallestimerRef.current);
      }
    };
  }, []);

  const brihtbraintalleshandleShareFact = async () => {
    try {
      await Share.share({message: brihtbraintallescurrentFact});
    } catch (error) {
      Alert.alert('Error', 'Could not share this fact now.');
    }
  };

  const brihtbraintalleshandleSaveFact = async () => {
    try {
      const brihtbraintallesnextSavedFactIndexes = brihtbraintallesisSaved
        ? brihtbraintallessavedFactIndexes.filter(
            index => index !== brihtbraintallesfactIndex,
          )
        : [...brihtbraintallessavedFactIndexes, brihtbraintallesfactIndex];

      setBrihtbraintallessavedFactIndexes(brihtbraintallesnextSavedFactIndexes);
      await AsyncStorage.setItem(
        BRIHTBRAIN_FACTS_KEY,
        JSON.stringify(brihtbraintallesnextSavedFactIndexes),
      );
    } catch (error) {
      Alert.alert('Error', 'Could not update saved facts.');
    }
  };

  const brihtbraintallesnextFactIndex = useMemo(() => {
    if (brihtbraintallesfactsData.length <= 1) {
      return 0;
    }

    const brihtbraintallesavailableIndexes = brihtbraintallesfactsData
      .map((_fact, index) => index)
      .filter(index => index !== brihtbraintallesfactIndex);

    const brihtbraintallesrandomIndex = Math.floor(
      Math.random() * brihtbraintallesavailableIndexes.length,
    );

    return brihtbraintallesavailableIndexes[brihtbraintallesrandomIndex];
  }, [brihtbraintallesfactIndex]);

  const brihtbraintalleshandleNewFact = () => {
    if (brihtbraintallesisLoading) {
      return;
    }

    setBrihtbraintallesisLoading(true);
    brihtbraintallestimerRef.current = setTimeout(() => {
      setBrihtbraintallesfactIndex(brihtbraintallesnextFactIndex);
      setBrihtbraintallesisLoading(false);
    }, 3000);
  };

  return (
    <ImageBackground
      source={require('../../assets/i/brihtbraintallbgl.png')}
      style={{flex: 1}}>
      <View style={styles.brihtbraintallescontainer}>
        <View
          style={[
            styles.brihtbraintallesheader,
            {height: isLandscape ? 90 : 130},
          ]}>
          <Text style={styles.brihtbraintallesheaderText}>
            Recomended facts
          </Text>
        </View>

        <ScrollView
          bounces={false}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          {brihtbraintallesisLoading ? (
            <View style={styles.brihtbraintallesloaderContent}>
              <View
                style={{
                  alignSelf: 'center',
                  bottom: 50,
                }}>
                <WebView
                  originWhitelist={['*']}
                  source={{html: brightbrainhtmlLoader}}
                  style={{
                    width: 260,
                    height: 80,
                    backgroundColor: 'transparent',
                  }}
                  scrollEnabled={false}
                  transparent={true}
                />
              </View>
            </View>
          ) : (
            <>
              <View style={styles.brihtbraintallescard}>
                <Text style={styles.brihtbraintallescardText}>
                  {brihtbraintallescurrentFact}
                </Text>

                <View style={styles.brihtbraintallesactionsRow}>
                  <TouchableOpacity
                    style={styles.brihtbraintallesactionButton}
                    activeOpacity={0.8}
                    onPress={brihtbraintalleshandleShareFact}>
                    <Text style={styles.brihtbraintallesactionButtonText}>
                      Share
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.brihtbraintallesiconButton,
                      brihtbraintallesisSaved &&
                        styles.brihtbraintallesiconButtonSaved,
                    ]}
                    activeOpacity={0.8}
                    onPress={brihtbraintalleshandleSaveFact}>
                    <Image
                      source={
                        brihtbraintallesisSaved
                          ? require('../../assets/i/brihtbraintalsaved.png')
                          : require('../../assets/i/brihtbraintalsave.png')
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.brihtbraintallesnewFactButton}
                activeOpacity={0.8}
                onPress={brihtbraintalleshandleNewFact}>
                <Text style={styles.brihtbraintallesnewFactButtonText}>
                  New recomended fact
                </Text>
              </TouchableOpacity>

              <View
                style={[
                  styles.brihtbraintallesBottomBlock,
                  {bottom: isLandscape ? 28 : 128},
                ]}>
                <Text style={styles.brihtbraintallesBottomText}>
                  Press the button and get a new fact!
                </Text>
                <Image
                  source={require('../../assets/i/brihtbraintalbottj.png')}
                  style={styles.brihtbraintallesBottomImage}
                  resizeMode="contain"
                />
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  brihtbraintallescontainer: {
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
  },
  brihtbraintallesheaderText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
    textAlign: 'center',
  },
  brihtbraintallescard: {
    marginTop: 18,
    marginHorizontal: 16,
    backgroundColor: '#5A0701',
    borderRadius: 16,
    padding: 16,
    paddingVertical: 22,
  },
  brihtbraintallescardText: {
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 16,
  },
  brihtbraintallesactionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  brihtbraintallesactionButton: {
    width: 147,
    backgroundColor: '#FFD61C',
    borderRadius: 10,
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  brihtbraintallesactionButtonText: {
    color: '#5A0701',
    fontFamily: 'Raleway-Black',
    fontSize: 16,
  },
  brihtbraintallesiconButton: {
    width: 104,
    backgroundColor: '#FFD61C',
    borderRadius: 10,
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brihtbraintallesiconButtonSaved: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFD61C',
  },
  brihtbraintallesnewFactButton: {
    marginTop: 22,
    marginHorizontal: 16,
    height: 67,
    borderRadius: 12,
    backgroundColor: '#FFD61C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 258,
  },
  brihtbraintallesnewFactButtonText: {
    color: '#5A0701',
    fontFamily: 'Raleway-Black',
    fontSize: 16,
  },
  brihtbraintallesBottomBlock: {
    marginTop: 26,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 108,
    left: 0,
    right: 0,
  },
  brihtbraintallesBottomText: {
    fontFamily: 'Raleway-ExtraBold',
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
    maxWidth: '45%',
    marginBottom: 24,
  },
  brihtbraintallesBottomImage: {
    width: 180,
    height: 220,
    marginLeft: 10,
  },
  brihtbraintallesloaderContent: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Brihtbraintallesfacct;
