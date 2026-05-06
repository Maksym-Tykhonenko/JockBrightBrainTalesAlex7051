// stories
import {brihtbraintallesstoriesData} from '../Brihtbraintallescpntts/Brihtbraintallesstoriesdata';

import Orientation from 'react-native-orientation-locker';

import {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  ImageBackground,
  PanResponder,
  ScrollView,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollView as ScrollViewType,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const Brihtbraintallesstories = () => {
  const navigation = useNavigation<any>();
  const brihtbraintallesscrollRef = useRef<ScrollViewType | null>(null);
  const brihtbraintallesdragStartTop = useRef(0);
  const [brihtbraintallesviewportHeight, setBrihtbraintallesviewportHeight] =
    useState(0);
  const [brihtbraintallescontentHeight, setBrihtbraintallescontentHeight] =
    useState(0);
  const [brihtbraintallesscrollOffset, setBrihtbraintallesscrollOffset] =
    useState(0);
  const {height, width} = useWindowDimensions();
  const isLandscape = height < width;

  const brihtbraintallesmaxScroll = Math.max(
    0,
    brihtbraintallescontentHeight - brihtbraintallesviewportHeight,
  );
  const brihtbraintallesshowSlider = brihtbraintallesmaxScroll > 0;
  const brihtbraintallestrackHeight = 300;
  const brihtbraintallesthumbHeight = 20;
  const brihtbraintallesmaxThumbTop = Math.max(
    1,
    brihtbraintallestrackHeight - brihtbraintallesthumbHeight,
  );
  const brihtbraintallesthumbTop = brihtbraintallesshowSlider
    ? (brihtbraintallesscrollOffset / brihtbraintallesmaxScroll) *
      brihtbraintallesmaxThumbTop
    : 0;

  // Keep latest values for PanResponder without re-creating it.
  const brihtbraintallesshowSliderRef = useRef(false);
  const brihtbraintallesmaxScrollRef = useRef(0);
  const brihtbraintallesmaxThumbTopRef = useRef(0);
  const brihtbraintallesthumbTopRef = useRef(0);
  const brihtbraintallesthumbHeightRef = useRef(0);
  const brihtbraintallesscrollToProgressRef = useRef<
    (progress: number) => void
  >(() => {});

  brihtbraintallesshowSliderRef.current = brihtbraintallesshowSlider;
  brihtbraintallesmaxScrollRef.current = brihtbraintallesmaxScroll;
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

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
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

  const brihtbraintalleshandleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    setBrihtbraintallesscrollOffset(event.nativeEvent.contentOffset.y);
  };

  return (
    <ImageBackground
      source={require('../../assets/i/brihtbraintallbgl.png')}
      style={styles.brihtbraintallesbackground}>
      <View style={styles.brihtbraintallescontainer}>
        <View
          style={[
            styles.brihtbraintallesheader,
            {height: isLandscape ? 90 : 130},
          ]}>
          <Text style={styles.brihtbraintallesheaderText}>
            Stories from Jock
          </Text>
        </View>

        <ScrollView
          bounces={false}
          ref={brihtbraintallesscrollRef}
          onScroll={brihtbraintalleshandleScroll}
          onLayout={event =>
            setBrihtbraintallesviewportHeight(event.nativeEvent.layout.height)
          }
          onContentSizeChange={(_w, h) => setBrihtbraintallescontentHeight(h)}
          scrollEventThrottle={16}
          style={styles.brihtbraintalleslistScroll}
          contentContainerStyle={styles.brihtbraintalleslistWrap}
          showsVerticalScrollIndicator={false}>
          {brihtbraintallesstoriesData.map(story => (
            <View key={story.id} style={styles.brihtbraintallescard}>
              <Text style={styles.brihtbraintallescardTitle}>
                {story.title}
              </Text>
              <Text style={styles.brihtbraintallescardText}>{story.intro}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.brihtbraintallesbutton}
                onPress={() =>
                  navigation.navigate('Brihtbraintallesstoryfull', {
                    storyId: story.id,
                  })
                }>
                <Text style={styles.brihtbraintallesbuttonText}>Open more</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View
          style={[
            styles.brihtbraintallesBottomBlock,
            {bottom: isLandscape ? 28 : 100},
          ]}>
          <Text style={styles.brihtbraintallesBottomText}>
            These are my best stories, I remember them all the time!
          </Text>
          <Image
            source={require('../../assets/i/brihtbraintalbottj.png')}
            style={styles.brihtbraintallesBottomImage}
            resizeMode="contain"
          />
        </View>

        {brihtbraintallesshowSlider && (
          <View style={styles.brihtbraintallessliderWrap} pointerEvents="auto">
            <View
              style={[
                styles.brihtbraintallessliderTrack,
                {height: brihtbraintallestrackHeight},
              ]}
              {...brihtbraintallespanResponder.panHandlers}>
              <View
                style={[
                  styles.brihtbraintallessliderThumb,
                  {
                    height: brihtbraintallesthumbHeight,
                    transform: [{translateY: brihtbraintallesthumbTop}],
                  },
                ]}
              />
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  brihtbraintallesbackground: {
    flex: 1,
  },
  brihtbraintallescontainer: {
    flex: 1,
  },
  brihtbraintallesheader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
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
  brihtbraintalleslistWrap: {
    paddingHorizontal: 16,
    gap: 14,
    paddingTop: 20,
  },
  brihtbraintalleslistScroll: {
    maxHeight: 350,
    marginBottom: 150,
  },
  brihtbraintallescard: {
    backgroundColor: '#5A0701',
    borderRadius: 16,
    padding: 16,
    paddingVertical: 22,
    width: '90%',
  },
  brihtbraintallescardTitle: {
    fontFamily: 'Raleway-SemiBold',
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  brihtbraintallescardText: {
    fontFamily: 'Raleway-Regular',
    color: '#FFA6A6',
    fontSize: 10,
    lineHeight: 15,
    marginBottom: 6,
  },
  brihtbraintallesbutton: {
    marginTop: 10,
    width: 147,
    backgroundColor: '#FFD61C',
    borderRadius: 10,
    height: 43,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brihtbraintallesbuttonText: {
    fontFamily: 'Raleway-Black',
    color: '#5A0701',
    fontSize: 16,
  },
  brihtbraintallesBottomBlock: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
  brihtbraintallesBottomText: {
    fontFamily: 'Raleway-ExtraBold',
    color: '#fff',
    fontSize: 16,
    maxWidth: '50%',
  },
  brihtbraintallesBottomImage: {
    width: 180,
    height: 220,
    marginLeft: 10,
  },
  brihtbraintallessliderWrap: {
    position: 'absolute',
    right: 4,
    top: 158,
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

export default Brihtbraintallesstories;
