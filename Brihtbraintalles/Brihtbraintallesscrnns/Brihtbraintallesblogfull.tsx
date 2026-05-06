import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PanResponder,
  ScrollView,
  Alert,
  Share,
  type ImageSourcePropType,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {brihtbraintallesblogData} from '../Brihtbraintallescpntts/Brihtbraintallesblogdata';

const SAVED_BLOG_KEY = 'brihtbraintalles_saved_blog';

const brihtbraintallesblogImagesById: Record<number, ImageSourcePropType> = {
  1: require('../../assets/i/brihtbraintblog1.png'),
  2: require('../../assets/i/brihtbraintblog2.png'),
  3: require('../../assets/i/brihtbraintblog3.png'),
  4: require('../../assets/i/brihtbraintblog4.png'),
  5: require('../../assets/i/brihtbraintblog5.png'),
  6: require('../../assets/i/brihtbraintblog1.png'),
  7: require('../../assets/i/brihtbraintblog2.png'),
  8: require('../../assets/i/brihtbraintblog3.png'),
  9: require('../../assets/i/brihtbraintblog4.png'),
};

const Brihtbraintallesblogfull = () => {
  const brihtbraintallesnavigation = useNavigation<any>();
  const brihtbraintallesroute = useRoute();
  const [brihtbraintallessavedIds, setBrihtbraintallessavedIds] = useState<
    number[]
  >([]);

  const brihtbraintallesscrollRef = useRef<ScrollView | null>(null);
  const brihtbraintallesdragStartTop = useRef(0);
  const [brihtbraintallesviewportHeight, setBrihtbraintallesviewportHeight] =
    useState(0);
  const [brihtbraintallescontentHeight, setBrihtbraintallescontentHeight] =
    useState(0);
  const [brihtbraintallesscrollOffset, setBrihtbraintallesscrollOffset] =
    useState(0);

  const brihtbraintallesstoryId = Number(
    (brihtbraintallesroute.params as {storyId?: number})?.storyId ?? 1,
  );

  const brihtbraintallesstory = useMemo(
    () =>
      brihtbraintallesblogData.find(
        item => item.id === brihtbraintallesstoryId,
      ) ?? brihtbraintallesblogData[0],
    [brihtbraintallesstoryId],
  );

  const brihtbraintallesisSaved = brihtbraintallessavedIds.includes(
    brihtbraintallesstory.id,
  );

  const brihtbraintallesmaxScroll = Math.max(
    0,
    brihtbraintallescontentHeight - brihtbraintallesviewportHeight,
  );
  const brihtbraintallesshowSlider = brihtbraintallesmaxScroll > 0;
  const brihtbraintallestrackHeight = 327;
  const brihtbraintallesthumbHeight = 20;
  const brihtbraintallesmaxThumbTop = Math.max(
    1,
    brihtbraintallestrackHeight - brihtbraintallesthumbHeight,
  );
  const brihtbraintallesthumbTop = brihtbraintallesshowSlider
    ? (brihtbraintallesscrollOffset / brihtbraintallesmaxScroll) *
      brihtbraintallesmaxThumbTop
    : 0;

  // stable refs for PanResponder
  const brihtbraintallesshowSliderRef = useRef(false);
  const brihtbraintallesmaxThumbTopRef = useRef(0);
  const brihtbraintallesthumbTopRef = useRef(0);
  const brihtbraintallesthumbHeightRef = useRef(0);
  const brihtbraintallesscrollToProgressRef = useRef<
    (progress: number) => void
  >(() => {});

  brihtbraintallesshowSliderRef.current = brihtbraintallesshowSlider;
  brihtbraintallesmaxThumbTopRef.current = brihtbraintallesmaxThumbTop;
  brihtbraintallesthumbTopRef.current = brihtbraintallesthumbTop;
  brihtbraintallesthumbHeightRef.current = brihtbraintallesthumbHeight;

  const brihtbraintallesscrollToProgress = useCallback(
    (progress: number) => {
      if (!brihtbraintallesshowSlider) {
        return;
      }
      const brihtbraintallesnextOffset = progress * brihtbraintallesmaxScroll;
      setBrihtbraintallesscrollOffset(brihtbraintallesnextOffset);
      brihtbraintallesscrollRef.current?.scrollTo({
        y: brihtbraintallesnextOffset,
        animated: false,
      });
    },
    [brihtbraintallesshowSlider, brihtbraintallesmaxScroll],
  );

  brihtbraintallesscrollToProgressRef.current =
    brihtbraintallesscrollToProgress;

  const brihtbraintallespanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: event => {
        if (!brihtbraintallesshowSliderRef.current) {
          return;
        }

        const brihtbraintalleslocationY = event.nativeEvent.locationY;
        const brihtbraintallesmaxThumbTopNow =
          brihtbraintallesmaxThumbTopRef.current;
        const brihtbraintallesthumbTopNow = brihtbraintallesthumbTopRef.current;
        const brihtbraintallesthumbHeightNow =
          brihtbraintallesthumbHeightRef.current;

        const brihtbraintallesthumbStart = brihtbraintallesthumbTopNow;
        const brihtbraintallesthumbEnd =
          brihtbraintallesthumbTopNow + brihtbraintallesthumbHeightNow;

        const brihtbraintallesthumbHitSlop = 14;
        const brihtbraintallespressedOnThumb =
          brihtbraintalleslocationY >=
            brihtbraintallesthumbStart - brihtbraintallesthumbHitSlop &&
          brihtbraintalleslocationY <=
            brihtbraintallesthumbEnd + brihtbraintallesthumbHitSlop;

        if (brihtbraintallespressedOnThumb) {
          brihtbraintallesdragStartTop.current = brihtbraintallesthumbTopNow;
          return;
        }

        const brihtbraintallesnextTop = Math.max(
          0,
          Math.min(
            brihtbraintallesmaxThumbTopNow,
            brihtbraintalleslocationY - brihtbraintallesthumbHeightNow / 2,
          ),
        );

        brihtbraintallesdragStartTop.current = brihtbraintallesnextTop;
        brihtbraintallesscrollToProgressRef.current(
          brihtbraintallesnextTop / brihtbraintallesmaxThumbTopNow,
        );
      },
      onPanResponderMove: (_event, gestureState) => {
        if (!brihtbraintallesshowSliderRef.current) {
          return;
        }
        const brihtbraintallesmaxThumbTopNow =
          brihtbraintallesmaxThumbTopRef.current;
        const brihtbraintallesnextTop = Math.max(
          0,
          Math.min(
            brihtbraintallesmaxThumbTopNow,
            brihtbraintallesdragStartTop.current + gestureState.dy,
          ),
        );
        brihtbraintallesscrollToProgressRef.current(
          brihtbraintallesnextTop / brihtbraintallesmaxThumbTopNow,
        );
      },
    }),
  ).current;

  useEffect(() => {
    const brihtbraintallesloadSavedBlog = async () => {
      try {
        const brihtbraintallesraw = await AsyncStorage.getItem(SAVED_BLOG_KEY);
        if (!brihtbraintallesraw) {
          setBrihtbraintallessavedIds([]);
          return;
        }
        const brihtbraintallesparsed = JSON.parse(brihtbraintallesraw);
        if (Array.isArray(brihtbraintallesparsed)) {
          setBrihtbraintallessavedIds(
            brihtbraintallesparsed.map(Number).filter(Boolean),
          );
        }
      } catch {
        setBrihtbraintallessavedIds([]);
      }
    };
    brihtbraintallesloadSavedBlog();
  }, []);

  const brihtbraintalleshandleShare = async () => {
    const brihtbraintallesmessage = `${brihtbraintallesstory.title}\n\n${
      brihtbraintallesstory.intro
    }\n\n${brihtbraintallesstory.body.join('\n\n')}\n\n${
      brihtbraintallesstory.thought
    }`;
    try {
      await Share.share({message: brihtbraintallesmessage});
    } catch {
      Alert.alert('Error', 'Could not share this story now.');
    }
  };

  const brihtbraintalleshandleSave = async () => {
    try {
      const brihtbraintallesnextSavedIds = brihtbraintallesisSaved
        ? brihtbraintallessavedIds.filter(id => id !== brihtbraintallesstory.id)
        : [...brihtbraintallessavedIds, brihtbraintallesstory.id];
      setBrihtbraintallessavedIds(brihtbraintallesnextSavedIds);
      await AsyncStorage.setItem(
        SAVED_BLOG_KEY,
        JSON.stringify(brihtbraintallesnextSavedIds),
      );
    } catch {
      Alert.alert('Error', 'Could not update saved stories.');
    }
  };

  const brihtbraintalleshandleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    setBrihtbraintallesscrollOffset(event.nativeEvent.contentOffset.y);
  };

  return (
    <View style={styles.brihtbraintallesbackground}>
      <ScrollView
        ref={brihtbraintallesscrollRef}
        onScroll={brihtbraintalleshandleScroll}
        onLayout={event =>
          setBrihtbraintallesviewportHeight(event.nativeEvent.layout.height)
        }
        onContentSizeChange={(_w, h) => setBrihtbraintallescontentHeight(h)}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.brihtbraintallesscrollContent}>
        <View style={styles.brihtbraintallescontainer}>
          <View style={styles.brihtbraintallesmodalCard}>
            <View style={styles.brihtbraintallesmodalScroll}>
              <Image
                source={
                  brihtbraintallesblogImagesById[brihtbraintallesstory.id]
                }
                style={styles.brihtbraintallesmodalImage}
                resizeMode="cover"
              />

              <Text style={styles.brihtbraintallesmodalTitle}>
                {brihtbraintallesstory.title}
              </Text>

              <Text style={styles.brihtbraintallesmodalText}>
                {brihtbraintallesstory.intro}
              </Text>

              {brihtbraintallesstory.body.map(paragraph => (
                <Text key={paragraph} style={styles.brihtbraintallesmodalText}>
                  {paragraph}
                </Text>
              ))}

              <Text style={styles.brihtbraintallesmodalText}>
                — {brihtbraintallesstory.thought}
              </Text>
            </View>

            <View style={styles.brihtbraintallesactionsRow}>
              <TouchableOpacity
                onPress={brihtbraintalleshandleShare}
                style={styles.brihtbraintallesactionButton}
                activeOpacity={0.8}>
                <Text style={styles.brihtbraintallesactionButtonText}>
                  Share
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={brihtbraintalleshandleSave}
                style={[
                  styles.brihtbraintallesiconButton,
                  brihtbraintallesisSaved &&
                    styles.brihtbraintallesiconButtonSaved,
                ]}
                activeOpacity={0.8}>
                <Image
                  source={
                    brihtbraintallesisSaved
                      ? require('../../assets/i/brihtbraintalsaver.png')
                      : require('../../assets/i/brihtbraintalsavew.png')
                  }
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => brihtbraintallesnavigation.goBack()}
            activeOpacity={0.85}
            style={styles.brihtbraintallescloseWrap}>
            <Text style={styles.brihtbraintallescloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  brihtbraintallesbackground: {
    flex: 1,
    backgroundColor: '#5A0701',
  },
  brihtbraintallesscrollContent: {
    flexGrow: 1,
    paddingTop: 50,
    paddingBottom: 20,
  },
  brihtbraintallescontainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  brihtbraintallesmodalCard: {
    backgroundColor: '#FFD61C',
    borderRadius: 12,
    padding: 16,
  },
  brihtbraintallesmodalScroll: {},
  brihtbraintallesmodalScrollContent: {
    paddingBottom: 12,
  },
  brihtbraintallesmodalImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  brihtbraintallesmodalTitle: {
    fontFamily: 'Raleway-SemiBold',
    color: '#5A0701',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  brihtbraintallesmodalText: {
    fontFamily: 'Raleway-Regular',
    color: '#000000',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 8,
  },
  brihtbraintallesactionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  brihtbraintallesactionButton: {
    backgroundColor: '#BD0709',
    borderRadius: 10,
    minHeight: 43,
    width: 147,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  brihtbraintallesactionButtonText: {
    color: '#fff',
    fontFamily: 'Raleway-Black',
    fontSize: 16,
  },
  brihtbraintallesiconButton: {
    width: 104,
    backgroundColor: '#BD0709',
    borderRadius: 10,
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brihtbraintallesiconButtonSaved: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#BD0709',
  },
  brihtbraintallescloseWrap: {
    marginTop: 28,
    alignSelf: 'center',
    paddingVertical: 8,
  },
  brihtbraintallescloseText: {
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  brihtbraintallessliderWrap: {
    position: 'absolute',
    right: 24,
    top: 158,
    height: 327,
    width: 44,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brihtbraintallessliderTrack: {
    width: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.58)',
    justifyContent: 'flex-start',
  },
  brihtbraintallessliderThumb: {
    width: 20,
    marginLeft: -8,
    borderRadius: 10,
    backgroundColor: '#FFD61C',
  },
});

export default Brihtbraintallesblogfull;
