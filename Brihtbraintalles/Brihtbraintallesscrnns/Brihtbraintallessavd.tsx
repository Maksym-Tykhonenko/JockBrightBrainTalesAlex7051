import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {brihtbraintallesstoriesData} from '../Brihtbraintallescpntts/Brihtbraintallesstoriesdata';
import {brihtbraintallesblogData} from '../Brihtbraintallescpntts/Brihtbraintallesblogdata';
import {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  PanResponder,
  Alert,
  Share,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollView as ScrollViewType,
  useWindowDimensions,
} from 'react-native';

const SAVED_STORIES_KEY = 'brihtbraintalles_saved_stories';
const SAVED_BLOG_KEY = 'brihtbraintalles_saved_blog';
const BRIHTBRAIN_FACTS_KEY = 'brihtbraintalles_saved_facts';

const brihtbraintallesblogImagesById: Record<number, number> = {
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

const brihtbraintallessavedFactsData = [
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

const Brihtbraintallessavd = () => {
  const navigation = useNavigation<any>();

  const [brihtbraintallessavedStoryIds, setBrihtbraintallessavedStoryIds] =
    useState<number[]>([]);
  const [brihtbraintallessavedBlogIds, setBrihtbraintallessavedBlogIds] =
    useState<number[]>([]);
  const [
    brihtbraintallessavedFactIndexes,
    setBrihtbraintallessavedFactIndexes,
  ] = useState<number[]>([]);
  const {height, width} = useWindowDimensions();
  const isLandscape = height < width;

  const brihtbraintallesscrollRef = useRef<ScrollViewType | null>(null);
  const brihtbraintallesdragStartTop = useRef(0);
  const [brihtbraintallesviewportHeight, setBrihtbraintallesviewportHeight] =
    useState(0);
  const [brihtbraintallescontentHeight, setBrihtbraintallescontentHeight] =
    useState(0);
  const [brihtbraintallesscrollOffset, setBrihtbraintallesscrollOffset] =
    useState(0);

  useFocusEffect(
    useCallback(() => {
      const brihtbraintallesloadSaved = async () => {
        try {
          const [
            brihtbraintallesrawStories,
            brihtbraintallesrawBlog,
            brihtbraintallesrawFacts,
          ] = await Promise.all([
            AsyncStorage.getItem(SAVED_STORIES_KEY),
            AsyncStorage.getItem(SAVED_BLOG_KEY),
            AsyncStorage.getItem(BRIHTBRAIN_FACTS_KEY),
          ]);

          const brihtbraintallesparsedStories = brihtbraintallesrawStories
            ? JSON.parse(brihtbraintallesrawStories)
            : [];
          const brihtbraintallesparsedBlog = brihtbraintallesrawBlog
            ? JSON.parse(brihtbraintallesrawBlog)
            : [];
          const brihtbraintallesparsedFacts = brihtbraintallesrawFacts
            ? JSON.parse(brihtbraintallesrawFacts)
            : [];

          setBrihtbraintallessavedStoryIds(
            Array.isArray(brihtbraintallesparsedStories)
              ? brihtbraintallesparsedStories.map(Number).filter(Boolean)
              : [],
          );
          setBrihtbraintallessavedBlogIds(
            Array.isArray(brihtbraintallesparsedBlog)
              ? brihtbraintallesparsedBlog.map(Number).filter(Boolean)
              : [],
          );
          setBrihtbraintallessavedFactIndexes(
            Array.isArray(brihtbraintallesparsedFacts)
              ? brihtbraintallesparsedFacts.map(Number).filter(Number.isFinite)
              : [],
          );
        } catch (error) {
          setBrihtbraintallessavedStoryIds([]);
          setBrihtbraintallessavedBlogIds([]);
          setBrihtbraintallessavedFactIndexes([]);
        }
      };
      brihtbraintallesloadSaved();
    }, []),
  );

  const brihtbraintallessavedStories = brihtbraintallesstoriesData.filter(
    story => brihtbraintallessavedStoryIds.includes(story.id),
  );
  const brihtbraintallessavedBlogStories = brihtbraintallesblogData.filter(
    story => brihtbraintallessavedBlogIds.includes(story.id),
  );

  const brihtbraintallessavedFacts = brihtbraintallessavedFactIndexes
    .filter(
      index => index >= 0 && index < brihtbraintallessavedFactsData.length,
    )
    .map(index => ({index, text: brihtbraintallessavedFactsData[index]}));

  const brihtbraintalleshasAnySaved =
    brihtbraintallessavedStories.length > 0 ||
    brihtbraintallessavedBlogStories.length > 0 ||
    brihtbraintallessavedFacts.length > 0;

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

  const brihtbraintalleshandleToggleStorySaved = async (storyId: number) => {
    try {
      const brihtbraintallesnext = brihtbraintallessavedStoryIds.includes(
        storyId,
      )
        ? brihtbraintallessavedStoryIds.filter(id => id !== storyId)
        : [...brihtbraintallessavedStoryIds, storyId];
      setBrihtbraintallessavedStoryIds(brihtbraintallesnext);
      await AsyncStorage.setItem(
        SAVED_STORIES_KEY,
        JSON.stringify(brihtbraintallesnext),
      );
    } catch {
      Alert.alert('Error', 'Could not update saved stories.');
    }
  };

  const brihtbraintalleshandleToggleBlogSaved = async (storyId: number) => {
    try {
      const brihtbraintallesnext = brihtbraintallessavedBlogIds.includes(
        storyId,
      )
        ? brihtbraintallessavedBlogIds.filter(id => id !== storyId)
        : [...brihtbraintallessavedBlogIds, storyId];
      setBrihtbraintallessavedBlogIds(brihtbraintallesnext);
      await AsyncStorage.setItem(
        SAVED_BLOG_KEY,
        JSON.stringify(brihtbraintallesnext),
      );
    } catch {
      Alert.alert('Error', 'Could not update saved blog.');
    }
  };

  const brihtbraintalleshandleToggleFactSaved = async (factIndex: number) => {
    try {
      const brihtbraintallesnext = brihtbraintallessavedFactIndexes.includes(
        factIndex,
      )
        ? brihtbraintallessavedFactIndexes.filter(i => i !== factIndex)
        : [...brihtbraintallessavedFactIndexes, factIndex];
      setBrihtbraintallessavedFactIndexes(brihtbraintallesnext);
      await AsyncStorage.setItem(
        BRIHTBRAIN_FACTS_KEY,
        JSON.stringify(brihtbraintallesnext),
      );
    } catch {
      Alert.alert('Error', 'Could not update saved facts.');
    }
  };

  const brihtbraintalleshandleShareFact = async (factText: string) => {
    try {
      await Share.share({message: factText});
    } catch {
      Alert.alert('Error', 'Could not share this fact now.');
    }
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
          <Text style={styles.brihtbraintallesheaderText}>Saved</Text>
        </View>
        <ScrollView
          bounces={false}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          {!brihtbraintalleshasAnySaved ? (
            <View style={styles.brihtbraintallesEmptyWrap}>
              <View style={styles.brihtbraintallesEmptyRow}>
                <Text style={styles.brihtbraintallesEmptyText}>
                  Your preferences will be stored here while it&apos;s empty,
                  but you can add something.
                </Text>
                <Image
                  source={require('../../assets/i/brihtbraintaempts.png')}
                  resizeMode="contain"
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.brihtbraintallesEmptyButtonFirst}
                onPress={() => navigation.navigate('Brihtbraintallesstories')}>
                <Text style={styles.brihtbraintallesEmptyButtonText}>
                  Open stories
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.brihtbraintallesEmptyButton}
                onPress={() => navigation.navigate('Brihtbraintallesblog')}>
                <Text style={styles.brihtbraintallesEmptyButtonText}>
                  Open blog
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.brihtbraintallesEmptyButton}
                onPress={() => navigation.navigate('Brihtbraintallesfacct')}>
                <Text style={styles.brihtbraintallesEmptyButtonText}>
                  Open facts
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <ScrollView
                bounces={false}
                ref={brihtbraintallesscrollRef}
                onScroll={brihtbraintalleshandleScroll}
                onLayout={event =>
                  setBrihtbraintallesviewportHeight(
                    event.nativeEvent.layout.height,
                  )
                }
                onContentSizeChange={(_w, h) =>
                  setBrihtbraintallescontentHeight(h)
                }
                scrollEventThrottle={16}
                contentContainerStyle={styles.brihtbraintalleslistWrap}
                showsVerticalScrollIndicator={false}>
                {brihtbraintallessavedFacts.map(fact => (
                  <View
                    key={`fact-${fact.index}`}
                    style={styles.brihtbraintallescard}>
                    <Text style={styles.brihtbraintallescardText}>
                      {fact.text}
                    </Text>
                    <View style={styles.brihtbraintallesactionsRow}>
                      <TouchableOpacity
                        style={styles.brihtbraintallesactionButton}
                        activeOpacity={0.85}
                        onPress={() =>
                          brihtbraintalleshandleShareFact(fact.text)
                        }>
                        <Text style={styles.brihtbraintallesactionButtonText}>
                          Share
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.brihtbraintallesiconButton,
                          styles.brihtbraintallesiconButtonSaved,
                        ]}
                        activeOpacity={0.85}
                        onPress={() =>
                          brihtbraintalleshandleToggleFactSaved(fact.index)
                        }>
                        <Image
                          source={require('../../assets/i/brihtbraintalsaved.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                {brihtbraintallessavedBlogStories.map(story => (
                  <View
                    key={`blog-${story.id}`}
                    style={styles.brihtbraintallescardBlog}>
                    <Image
                      source={brihtbraintallesblogImagesById[story.id]}
                      style={styles.brihtbraintallescardBlogImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.brihtbraintallescardTitle}>
                      {story.title}
                    </Text>
                    <Text style={styles.brihtbraintallescardTextMuted}>
                      {story.intro}
                    </Text>
                    <View style={styles.brihtbraintallesactionsRow}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Brihtbraintallesblogfull', {
                            storyId: story.id,
                          })
                        }
                        activeOpacity={0.85}
                        style={styles.brihtbraintallesopenButton}>
                        <Text style={styles.brihtbraintallesopenButtonText}>
                          Open more
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.brihtbraintallesiconButton,
                          styles.brihtbraintallesiconButtonSaved,
                        ]}
                        activeOpacity={0.85}
                        onPress={() =>
                          brihtbraintalleshandleToggleBlogSaved(story.id)
                        }>
                        <Image
                          source={require('../../assets/i/brihtbraintalsaved.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                {brihtbraintallessavedStories.map(story => (
                  <View
                    key={`story-${story.id}`}
                    style={styles.brihtbraintallescard}>
                    <Text style={styles.brihtbraintallescardTitle}>
                      {story.title}
                    </Text>
                    <Text style={styles.brihtbraintallescardTextMuted}>
                      {story.intro}
                    </Text>
                    <View style={styles.brihtbraintallesactionsRow}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Brihtbraintallesstoryfull', {
                            storyId: story.id,
                          })
                        }
                        activeOpacity={0.85}
                        style={styles.brihtbraintallesopenButton}>
                        <Text style={styles.brihtbraintallesopenButtonText}>
                          Open more
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.brihtbraintallesiconButton,
                          styles.brihtbraintallesiconButtonSaved,
                        ]}
                        activeOpacity={0.85}
                        onPress={() =>
                          brihtbraintalleshandleToggleStorySaved(story.id)
                        }>
                        <Image
                          source={require('../../assets/i/brihtbraintalsaved.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
              {/* 
              {!brihtbraintallesshowSlider && (
                <View
                  style={styles.brihtbraintallessliderWrap}
                  pointerEvents="auto">
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
              )} */}
            </>
          )}
        </ScrollView>
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
    paddingTop: 20,
    gap: 14,
    paddingBottom: 150,
  },
  brihtbraintallesEmptyWrap: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 26,
    paddingBottom: 150,
    marginTop: 10,
  },
  brihtbraintallesEmptyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
    gap: 16,
  },
  brihtbraintallesEmptyText: {
    flex: 1,
    color: '#fff',
    fontFamily: 'Raleway-Black',
    fontSize: 16,
    maxWidth: '62%',
  },
  brihtbraintallesEmptyImage: {
    width: 120,
    height: 120,
  },
  brihtbraintallesEmptyButton: {
    height: 67,
    borderRadius: 12,
    backgroundColor: '#FFD61C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  brihtbraintallesEmptyButtonFirst: {
    height: 67,
    borderRadius: 12,
    backgroundColor: '#FFD61C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  brihtbraintallesEmptyButtonText: {
    fontFamily: 'Raleway-Black',
    color: '#5A0701',
    fontSize: 16,
  },
  brihtbraintallescard: {
    backgroundColor: '#5A0701',
    borderRadius: 16,
    padding: 16,
    paddingVertical: 18,
    width: '100%',
  },
  brihtbraintallescardBlog: {
    backgroundColor: '#5A0701',
    borderRadius: 16,
    padding: 16,
    paddingVertical: 18,
    width: '100%',
  },
  brihtbraintallescardBlogImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  brihtbraintallescardTitle: {
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    marginBottom: 8,
  },
  brihtbraintallescardText: {
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 16,
  },
  brihtbraintallescardTextMuted: {
    fontFamily: 'Raleway-Regular',
    color: '#FFA6A6',
    fontSize: 10,
    lineHeight: 15,
    marginBottom: 6,
  },
  brihtbraintallesactionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
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
  brihtbraintallesopenButton: {
    width: 147,
    backgroundColor: '#FFD61C',
    borderRadius: 10,
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  brihtbraintallesopenButtonText: {
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

export default Brihtbraintallessavd;
