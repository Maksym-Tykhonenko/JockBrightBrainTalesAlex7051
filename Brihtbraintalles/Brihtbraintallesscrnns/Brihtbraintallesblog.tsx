import {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  PanResponder,
  ScrollView,
  type ImageSourcePropType,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollView as ScrollViewType,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {brihtbraintallesblogData} from '../Brihtbraintallescpntts/Brihtbraintallesblogdata';

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

const Brihtbraintallesblog = () => {
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
  const brihtbraintallestrackHeight = height - 310;
  const brihtbraintallesthumbHeight = 20;
  const brihtbraintallesmaxThumbTop = Math.max(
    1,
    brihtbraintallestrackHeight - brihtbraintallesthumbHeight,
  );
  const brihtbraintallesthumbTop = brihtbraintallesshowSlider
    ? (brihtbraintallesscrollOffset / brihtbraintallesmaxScroll) *
      brihtbraintallesmaxThumbTop
    : 0;

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

  // stable refs for PanResponder (avoid re-creation issues)
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
            {height: isLandscape ? 80 : 130},
          ]}>
          <Text style={styles.brihtbraintallesheaderText}>Blog</Text>
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
          contentContainerStyle={styles.brihtbraintalleslistWrap}
          showsVerticalScrollIndicator={false}>
          {brihtbraintallesblogData.map(story => (
            <View key={story.id} style={styles.brihtbraintallescard}>
              <Image
                source={brihtbraintallesblogImagesById[story.id]}
                style={styles.brihtbraintallescardImage}
                resizeMode="cover"
              />
              <Text style={styles.brihtbraintallescardTitle}>
                {story.title}
              </Text>
              <Text style={styles.brihtbraintallescardText}>{story.intro}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.brihtbraintallesbutton}
                onPress={() =>
                  navigation.navigate('Brihtbraintallesblogfull', {
                    storyId: story.id,
                  })
                }>
                <Text style={styles.brihtbraintallesbuttonText}>Open more</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

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
  brihtbraintalleslistWrap: {
    paddingHorizontal: 16,
    gap: 14,
    paddingTop: 20,
    paddingBottom: 150,
  },
  brihtbraintallescard: {
    backgroundColor: '#5A0701',
    borderRadius: 16,
    padding: 16,
    paddingVertical: 18,
    width: '90%',
  },
  brihtbraintallescardImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
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
  brihtbraintallessliderWrap: {
    position: 'absolute',
    right: 10,
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

export default Brihtbraintallesblog;
