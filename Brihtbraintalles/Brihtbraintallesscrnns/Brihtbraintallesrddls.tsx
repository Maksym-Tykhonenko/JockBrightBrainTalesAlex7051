import {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Share,
  useWindowDimensions,
  ScrollView,
} from 'react-native';

type BrihtbraintallesRiddle = {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
};

const brihtbraintallesriddlesData: BrihtbraintallesRiddle[] = [
  {
    id: 1,
    question:
      'It looks like it is always smiling. It is easy to recognize by its bright yellow color and curved shape. It is often taken with you as a quick snack.',
    options: ['A) Lemon', 'B) Banana', 'C) Orange', 'D) Pear'],
    correctIndex: 1,
  },
  {
    id: 2,
    question:
      'It has a thick green skin on the outside, and inside is juicy red flesh with black seeds. It is very popular to eat it in the summer, especially when it is hot.',
    options: ['A) Apple', 'B) Watermelon', 'C) Peach', 'D) Grapes'],
    correctIndex: 1,
  },
  {
    id: 3,
    question:
      'This fruit grows on a tree, comes in different colors, and often crunches when you bite into it. It is easy to take with you and is very popular in everyday nutrition.',
    options: ['A) Apple', 'B) Kiwi', 'C) Banana', 'D) Mango'],
    correctIndex: 0,
  },
  {
    id: 4,
    question:
      'Its bright color immediately attracts attention, but you only have to taste it - and your face involuntarily tightens from the acid. It is often added to tea or drinks.',
    options: ['A) Orange', 'B) Lemon', 'C) Grapefruit', 'D) Mandarin'],
    correctIndex: 1,
  },
  {
    id: 5,
    question:
      'They are small, round, and grow together in large clusters. They can be easily picked one by one and eaten as a sweet snack.',
    options: ['A) Strawberry', 'B) Grapes', 'C) Cherry', 'D) Plum'],
    correctIndex: 1,
  },
  {
    id: 6,
    question:
      'This berry has a bright red color and small seeds right on the surface. It is associated with summer and is often used in desserts.',
    options: ['A) Strawberry', 'B) Raspberry', 'C) Cranberry', 'D) Cherry'],
    correctIndex: 0,
  },
  {
    id: 7,
    question:
      'It cannot be seen, but it can be heard. If you say something loudly in the mountains or in an empty room, it will definitely answer.',
    options: ['A) Wind', 'B) Echo', 'C) Noise', 'D) Voice'],
    correctIndex: 1,
  },
  {
    id: 8,
    question:
      'This phenomenon has neither arms nor legs, but it can create patterns on glass in cold weather. It looks beautiful, as if someone painted them on purpose.',
    options: ['A) Rain', 'B) Frost', 'C) Snow', 'D) Ice'],
    correctIndex: 1,
  },
  {
    id: 9,
    question:
      'The more you “take” it, the bigger it becomes. It’s strange, but it makes perfect sense if you think about it.',
    options: ['A) Water', 'B) Pit', 'C) Sand', 'D) Snow'],
    correctIndex: 1,
  },
  {
    id: 10,
    question:
      'Everyone has it, but you can never see it directly. It always follows your movements and disappears into the darkness.',
    options: ['A) Thought', 'B) Shadow', 'C) Reflection', 'D) Light'],
    correctIndex: 1,
  },
  {
    id: 11,
    question:
      'This object stands or hangs, and its main task is to show how time changes during the day. Without it, it is difficult to plan things.',
    options: ['A) Calendar', 'B) Clock', 'C) Phone', 'D) Timer'],
    correctIndex: 1,
  },
  {
    id: 12,
    question:
      'It’s impossible to hold it in your hands, but you can “catch” it for a moment. It comes and goes very quickly.',
    options: ['A) Air', 'B) Breath', 'C) Wind', 'D) Light'],
    correctIndex: 1,
  },
  {
    id: 13,
    question:
      'It moves across the sky, changes shape, and can bring rain. Sometimes it looks like something familiar if you look closely.',
    options: ['A) Smoke', 'B) Cloud', 'C) Fog', 'D) Steam'],
    correctIndex: 1,
  },
  {
    id: 14,
    question:
      'This is the part of a plant that is usually hidden underground. It grows in the opposite direction to everything else.',
    options: ['A) Stem', 'B) Roots', 'C) Leaves', 'D) Flower'],
    correctIndex: 1,
  },
  {
    id: 15,
    question:
      'It is always ahead, but you cannot see it or touch it. It has not come yet, but it will definitely come.',
    options: ['A) Time', 'B) Day', 'C) Future', 'D) World'],
    correctIndex: 2,
  },
  {
    id: 16,
    question:
      'When it is there, you see everything around. When it is not there, darkness sets in.',
    options: ['A) Sun', 'B) Light', 'C) Lamp', 'D) Day'],
    correctIndex: 1,
  },
  {
    id: 17,
    question:
      'It can be destroyed without using force or even touching it. But it can be very difficult to restore it.',
    options: ['A) Glass', 'B) Promise', 'C) Toy', 'D) House'],
    correctIndex: 1,
  },
  {
    id: 18,
    question:
      'It has no teeth, but it can “bite”, especially in winter. It makes you want to hide in the warmth.',
    options: ['A) Wind', 'B) Cold', 'C) Snow', 'D) Ice'],
    correctIndex: 1,
  },
  {
    id: 19,
    question:
      'It has “keys”, but they don’t open doors. Instead, they help create texts.',
    options: ['A) Lock', 'B) Piano', 'C) Keyboard', 'D) Safe'],
    correctIndex: 2,
  },
  {
    id: 20,
    question:
      'It is something you can see even with your eyes closed. It appears when you rest.',
    options: ['A) Imagination', 'B) Sleep', 'C) Dream', 'D) Thought'],
    correctIndex: 1,
  },
  {
    id: 21,
    question:
      'It falls from the sky, but it doesn’t break. In winter, it covers the earth with a white blanket.',
    options: ['A) Rain', 'B) Snow', 'C) Ice', 'D) Hail'],
    correctIndex: 1,
  },
  {
    id: 22,
    question:
      'It is always with you, but you do not hold it in your hands. People use it to address you.',
    options: ['A) Voice', 'B) Name', 'C) Image', 'D) Character'],
    correctIndex: 1,
  },
  {
    id: 23,
    question:
      'It can come suddenly and disappear just as quickly. It is not visible, but it affects your actions.',
    options: ['A) Emotion', 'B) Thought', 'C) Idea', 'D) Dream'],
    correctIndex: 1,
  },
  {
    id: 24,
    question:
      'It is not visible, but you feel it when it moves. It can be strong or light.',
    options: ['A) Air', 'B) Wind', 'C) Rain', 'D) Cloud'],
    correctIndex: 1,
  },
  {
    id: 25,
    question:
      'It is something you can hear even when it is quiet around you. It occurs when sound is reflected.',
    options: ['A) Noise', 'B) Echo', 'C) Voice', 'D) Silence'],
    correctIndex: 1,
  },
  {
    id: 26,
    question: 'It can be full or empty. It stores knowledge and stories.',
    options: ['A) Chest', 'B) Book', 'C) Shelf', 'D) Bag'],
    correctIndex: 1,
  },
  {
    id: 27,
    question:
      "You can't see it, but you can't live without it. It's all around us.",
    options: ['A) Water', 'B) Air', 'C) Light', 'D) Heat'],
    correctIndex: 1,
  },
  {
    id: 28,
    question:
      'It helps you create drawings and notes. You can hold it in your hand.',
    options: ['A) Chalk', 'B) Pen', 'C) Paintbrush', 'D) Marker'],
    correctIndex: 1,
  },
  {
    id: 29,
    question:
      'It shines during the day and warms the earth. Without it, life would be impossible.',
    options: ['A) Moon', 'B) Sun', 'C) Fire', 'D) Light'],
    correctIndex: 1,
  },
  {
    id: 30,
    question:
      'It changes every day and shows what day it is. It is often hung on the wall.',
    options: ['A) Clock', 'B) Calendar', 'C) Plan', 'D) Notebook'],
    correctIndex: 1,
  },
];

type BrihtbraintallesRiddleStage = 'choose' | 'checked';

const Brihtbraintallesrddls = () => {
  const [brihtbraintallesriddleIndex, setBrihtbraintallesriddleIndex] =
    useState(0);
  const [brihtbraintallesselectedIndex, setBrihtbraintallesselectedIndex] =
    useState<number | null>(null);
  const [brihtbraintallesstage, setBrihtbraintallesstage] =
    useState<BrihtbraintallesRiddleStage>('choose');
  const [brihtbraintallesisCorrect, setBrihtbraintallesisCorrect] =
    useState(false);
  const {height, width} = useWindowDimensions();
  const isLandscape = height < width;

  const brihtbraintallesriddle = useMemo(() => {
    const brihtbraintallesidx =
      ((brihtbraintallesriddleIndex % brihtbraintallesriddlesData.length) +
        brihtbraintallesriddlesData.length) %
      brihtbraintallesriddlesData.length;
    return brihtbraintallesriddlesData[brihtbraintallesidx];
  }, [brihtbraintallesriddleIndex]);

  const brihtbraintallesresetRiddle = () => {
    setBrihtbraintallesselectedIndex(null);
    setBrihtbraintallesstage('choose');
    setBrihtbraintallesisCorrect(false);
  };

  const brihtbraintalleshandleSkip = () => {
    setBrihtbraintallesriddleIndex(prev => prev + 1);
    brihtbraintallesresetRiddle();
  };

  const brihtbraintalleshandleCheck = () => {
    if (brihtbraintallesselectedIndex === null) {
      return;
    }
    const brihtbraintallescorrect =
      brihtbraintallesselectedIndex === brihtbraintallesriddle.correctIndex;
    setBrihtbraintallesisCorrect(brihtbraintallescorrect);
    setBrihtbraintallesstage('checked');
  };

  const brihtbraintalleshandleTryAgain = () => {
    setBrihtbraintallesselectedIndex(null);
    setBrihtbraintallesstage('choose');
    setBrihtbraintallesisCorrect(false);
  };

  const brihtbraintalleshandleContinue = () => {
    setBrihtbraintallesriddleIndex(prev => prev + 1);
    brihtbraintallesresetRiddle();
  };

  const brihtbraintalleshandleShare = async () => {
    const brihtbraintallesanswer =
      brihtbraintallesriddle.options[brihtbraintallesriddle.correctIndex];
    try {
      await Share.share({
        message: `${
          brihtbraintallesriddle.question
        }\n\n${brihtbraintallesriddle.options.join(
          '\n',
        )}\n\n✅ ${brihtbraintallesanswer}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share this riddle now.');
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
          <Text style={styles.brihtbraintallesheaderText}>Riddles for you</Text>
        </View>
        <ScrollView
          bounces={false}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.brihtbraintallescontent}>
            <View style={styles.brihtbraintallescard}>
              <Text style={styles.brihtbraintallescardText}>
                {brihtbraintallesriddle.question}
              </Text>
            </View>

            {brihtbraintallesstage === 'choose' ? (
              <>
                <View style={styles.brihtbraintallesoptionsGrid}>
                  {brihtbraintallesriddle.options.map((option, idx) => {
                    const brihtbraintallesisSelected =
                      brihtbraintallesselectedIndex === idx;
                    const brihtbraintalleshasSelection =
                      brihtbraintallesselectedIndex !== null;
                    const brihtbraintallesisInactive =
                      brihtbraintalleshasSelection &&
                      !brihtbraintallesisSelected;
                    return (
                      <TouchableOpacity
                        key={option}
                        activeOpacity={0.85}
                        onPress={() => setBrihtbraintallesselectedIndex(idx)}
                        style={[
                          styles.brihtbraintallesoptionButton,
                          brihtbraintallesisInactive &&
                            styles.brihtbraintallesoptionButtonInactive,
                        ]}>
                        <Text
                          style={[
                            styles.brihtbraintallesoptionText,
                            brihtbraintallesisInactive &&
                              styles.brihtbraintallesoptionTextInactive,
                          ]}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {brihtbraintallesselectedIndex !== null && (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={brihtbraintalleshandleCheck}
                    style={styles.brihtbraintallescheckButton}>
                    <Text style={styles.brihtbraintallescheckButtonText}>
                      Check answer
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={brihtbraintalleshandleSkip}
                  activeOpacity={0.85}
                  style={styles.brihtbraintallesSkipWrap}>
                  <Text style={styles.brihtbraintallesSkipText}>
                    Skip riddle
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.brihtbraintallesresultTitle}>
                  {brihtbraintallesisCorrect ? 'True answer!' : 'False answer:'}
                </Text>
                <View
                  style={[
                    styles.brihtbraintallesresultPill,
                    brihtbraintallesisCorrect
                      ? styles.brihtbraintallesresultPillTrue
                      : styles.brihtbraintallesresultPillFalse,
                  ]}>
                  <Text
                    style={[
                      styles.brihtbraintallesresultPillText,
                      brihtbraintallesisCorrect && {color: '#212121'},
                    ]}>
                    {
                      brihtbraintallesriddle.options[
                        brihtbraintallesriddle.correctIndex
                      ]
                    }
                  </Text>
                </View>

                {brihtbraintallesisCorrect ? (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={brihtbraintalleshandleContinue}
                      style={[
                        styles.brihtbraintallesprimaryButton,
                        {marginTop: 35},
                      ]}>
                      <Text style={styles.brihtbraintallesprimaryButtonText}>
                        Continue
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={brihtbraintalleshandleShare}
                      style={styles.brihtbraintallesprimaryButton}>
                      <Text style={styles.brihtbraintallesprimaryButtonText}>
                        Share
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={brihtbraintalleshandleTryAgain}
                    style={styles.brihtbraintallesprimaryButton}>
                    <Text style={styles.brihtbraintallesprimaryButtonText}>
                      Try again
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={brihtbraintalleshandleSkip}
                  activeOpacity={0.85}
                  style={styles.brihtbraintallesSkipWrap}>
                  <Text style={styles.brihtbraintallesSkipText}>
                    Skip riddle
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
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
  brihtbraintallescontent: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 150,
    alignItems: 'center',
  },
  brihtbraintallescard: {
    width: '100%',
    backgroundColor: '#5A0701',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 27,
    marginBottom: 35,
    marginTop: 10,
    minHeight: 130,
    justifyContent: 'center',
  },
  brihtbraintallescardText: {
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    lineHeight: 18,
  },
  brihtbraintallesoptionsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  brihtbraintallesoptionButton: {
    width: '48%',
    height: 54,
    backgroundColor: '#FFD61C',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brihtbraintallesoptionButtonInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFD61C',
  },
  brihtbraintallesoptionText: {
    fontFamily: 'Raleway-Black',
    fontSize: 17,
    color: '#5A0701',
    textAlign: 'center',
  },
  brihtbraintallesoptionTextInactive: {
    color: '#FFD61C',
  },
  brihtbraintallescheckButton: {
    width: '100%',
    height: 62,
    borderRadius: 12,
    backgroundColor: '#FFD61C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  brihtbraintallescheckButtonText: {
    fontFamily: 'Raleway-Black',
    fontSize: 16,
    color: '#5A0701',
  },
  brihtbraintallesSkipWrap: {
    marginTop: 52,
    paddingVertical: 6,
  },
  brihtbraintallesSkipText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  brihtbraintallesresultTitle: {
    marginTop: 18,
    fontFamily: 'Raleway-ExtraBold',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  brihtbraintallesresultPill: {
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: 180,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  brihtbraintallesresultPillTrue: {
    backgroundColor: '#2EDB55',
  },
  brihtbraintallesresultPillFalse: {
    backgroundColor: '#000',
  },
  brihtbraintallesresultPillText: {
    fontFamily: 'Raleway-Black',
    fontSize: 18,
    color: '#fff',
  },
  brihtbraintallesprimaryButton: {
    width: '100%',
    height: 62,
    borderRadius: 12,
    backgroundColor: '#FFD61C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  brihtbraintallesprimaryButtonText: {
    fontFamily: 'Raleway-Black',
    fontSize: 16,
    color: '#5A0701',
  },
});

export default Brihtbraintallesrddls;
