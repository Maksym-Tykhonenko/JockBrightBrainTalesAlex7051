import {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Share,
  Alert,
  useWindowDimensions,
  ScrollView,
} from 'react-native';

type BrihtbraintallesQuizQuestion = {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
};

const brihtbraintallesquizData: BrihtbraintallesQuizQuestion[] = [
  {
    id: 1,
    question: 'Which fruit is most often associated with a healthy snack?',
    options: ['A) Chips', 'B) Apple', 'C) Candy', 'D) Cookies'],
    correctIndex: 1,
  },
  {
    id: 2,
    question: 'Which fruit is usually yellow and has a curved shape?',
    options: ['A) Pear', 'B) Banana', 'C) Lemon', 'D) Mango'],
    correctIndex: 1,
  },
  {
    id: 3,
    question: 'What helps you remember information better?',
    options: ['A) Stay awake', 'B) Take breaks', 'C) Hurry', 'D) Ignore'],
    correctIndex: 1,
  },
  {
    id: 4,
    question: 'Which fruit is often drunk as a juice for immunity?',
    options: ['A) Grapes', 'B) Orange', 'C) Plum', 'D) Peach'],
    correctIndex: 1,
  },
  {
    id: 5,
    question: 'What is the best thing to do when something is difficult?',
    options: [
      'A) Give up',
      'B) Break it into pieces',
      'C) Ignore',
      'D) Get angry',
    ],
    correctIndex: 1,
  },
  {
    id: 6,
    question: 'Which fruit grows in clusters?',
    options: ['A) Apple', 'B) Banana', 'C) Grapes', 'D) Kiwi'],
    correctIndex: 2,
  },
  {
    id: 7,
    question: 'What helps your brain work better?',
    options: ['A) Sleep', 'B) Noise', 'C) Stress', 'D) Rush'],
    correctIndex: 0,
  },
  {
    id: 8,
    question: 'Which fruit has many small seeds on top?',
    options: ['A) Strawberry', 'B) Apple', 'C) Pear', 'D) Banana'],
    correctIndex: 0,
  },
  {
    id: 9,
    question: 'What is the best thing to do when you are tired?',
    options: [
      'A) Ignore fatigue',
      'B) Take a break',
      'C) Work faster',
      'D) Get nervous',
    ],
    correctIndex: 1,
  },
  {
    id: 10,
    question: 'Which fruit is sour and yellow?',
    options: ['A) Orange', 'B) Banana', 'C) Lemon', 'D) Peach'],
    correctIndex: 2,
  },
  {
    id: 11,
    question: 'What helps develop thinking?',
    options: [
      'A) Doing nothing',
      'B) Riddles',
      'C) Lying down',
      'D) Being bored',
    ],
    correctIndex: 1,
  },
  {
    id: 12,
    question: 'What is healthier for a snack?',
    options: ['A) Candy', 'B) Soda water', 'C) Fruit', 'D) Chips'],
    correctIndex: 2,
  },
  {
    id: 13,
    question: 'What is better for concentration?',
    options: [
      'A) Lots of noise',
      'B) Calm atmosphere',
      'C) Constant distractions',
      'D) Rushing',
    ],
    correctIndex: 1,
  },
  {
    id: 14,
    question: 'What fruit is red inside and green outside?',
    options: ['A) Apple', 'B) Watermelon', 'C) Peach', 'D) Grapes'],
    correctIndex: 1,
  },
  {
    id: 15,
    question: 'What helps you understand new things better?',
    options: [
      'A) Ignore',
      'B) Repeat and think',
      'C) Rushing',
      'D) Forgetting',
    ],
    correctIndex: 1,
  },
  {
    id: 16,
    question: 'Which is better: do everything at once or gradually?',
    options: ['A) Immediately', 'B) Gradually', 'C) Never', 'D) Randomly'],
    correctIndex: 1,
  },
  {
    id: 17,
    question: 'Which fruit is usually associated with energy?',
    options: ['A) Banana', 'B) Plum', 'C) Cherry', 'D) Kiwi'],
    correctIndex: 0,
  },
  {
    id: 18,
    question: 'What helps you be more attentive?',
    options: [
      'A) Distraction',
      'B) Focus on one thing',
      'C) Speed',
      'D) Chaos',
    ],
    correctIndex: 1,
  },
  {
    id: 19,
    question: 'What is better to do with mistakes?',
    options: ['A) Fear', 'B) Learn from them', 'C) Ignore', 'D) Hide'],
    correctIndex: 1,
  },
  {
    id: 20,
    question: 'What is the most important thing in learning?',
    options: ['A) Speed', 'B) Understanding', 'C) Quantity', 'D) Randomness'],
    correctIndex: 1,
  },
];

const Brihtbraintallesquiiz = () => {
  const brihtbraintallesTotal = brihtbraintallesquizData.length;
  const [brihtbraintallesIndex, setBrihtbraintallesIndex] = useState(0);
  const [brihtbraintallesCorrectCount, setBrihtbraintallesCorrectCount] =
    useState(0);
  const [brihtbraintallesIsDone, setBrihtbraintallesIsDone] = useState(false);
  const {height, width} = useWindowDimensions();
  const isLandscape = height < width;
  const brihtbraintallesQuestion = useMemo(
    () => brihtbraintallesquizData[brihtbraintallesIndex],
    [brihtbraintallesIndex],
  );

  const brihtbraintallesProgressText = `${Math.min(
    brihtbraintallesIndex + 1,
    brihtbraintallesTotal,
  )}/${brihtbraintallesTotal}`;

  const brihtbraintallesHandleAnswer = (selectedIndex: number) => {
    const brihtbraintallesIsCorrect =
      selectedIndex === brihtbraintallesQuestion.correctIndex;
    if (brihtbraintallesIsCorrect) {
      setBrihtbraintallesCorrectCount(prev => prev + 1);
    }

    if (brihtbraintallesIndex >= brihtbraintallesTotal - 1) {
      setBrihtbraintallesIsDone(true);
      return;
    }
    setBrihtbraintallesIndex(prev => prev + 1);
  };

  const brihtbraintallesHandleRestart = () => {
    setBrihtbraintallesIndex(0);
    setBrihtbraintallesCorrectCount(0);
    setBrihtbraintallesIsDone(false);
  };

  const brihtbraintallesHandleShare = async () => {
    try {
      await Share.share({
        message: `I finished the quiz! Score: ${brihtbraintallesCorrectCount}/${brihtbraintallesTotal}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share your result now.');
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
          <Text style={styles.brihtbraintallesheaderText}>Quiz</Text>
        </View>
        <ScrollView
          bounces={false}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          {brihtbraintallesIsDone ? (
            <View style={styles.brihtbraintallesDoneWrap}>
              <Text style={styles.brihtbraintallesDoneTitle}>Done!</Text>
              <Text style={styles.brihtbraintallesDoneText}>
                You made it to the end of this quiz, and that’s awesome. Each
                question is another step towards new ideas, thoughts, and
                discoveries. Sometimes it’s not how many correct answers you
                get, but that you stopped, thought, and tried.
              </Text>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={brihtbraintallesHandleRestart}
                style={styles.brihtbraintallesPrimaryButton}>
                <Text style={styles.brihtbraintallesPrimaryButtonText}>
                  Restart quiz
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={brihtbraintallesHandleShare}
                style={styles.brihtbraintallesPrimaryButton}>
                <Text style={styles.brihtbraintallesPrimaryButtonText}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.brihtbraintallesContent}>
              <View style={styles.brihtbraintallesProgressCard}>
                <Text style={styles.brihtbraintallesProgressText}>
                  {brihtbraintallesProgressText}
                </Text>
                <View style={styles.brihtbraintallesProgressBars}>
                  {brihtbraintallesquizData.map((_q, idx) => {
                    const brihtbraintallesActive = idx <= brihtbraintallesIndex;
                    return (
                      <View
                        key={idx}
                        style={[
                          styles.brihtbraintallesProgressBar,
                          brihtbraintallesActive &&
                            styles.brihtbraintallesProgressBarActive,
                        ]}
                      />
                    );
                  })}
                </View>
              </View>

              <View style={styles.brihtbraintallesQuestionCard}>
                <View style={styles.brihtbraintallesQuestionRow}>
                  <Text style={styles.brihtbraintallesQuestionText}>
                    {brihtbraintallesQuestion.question}
                  </Text>
                  <Image
                    source={require('../../assets/i/brihtbraintalbottj.png')}
                    style={styles.brihtbraintallesQuestionImage}
                    resizeMode="contain"
                  />
                </View>
              </View>

              <View style={styles.brihtbraintallesOptionsWrap}>
                {brihtbraintallesQuestion.options.map((option, idx) => (
                  <TouchableOpacity
                    key={option}
                    activeOpacity={0.85}
                    onPress={() => brihtbraintallesHandleAnswer(idx)}
                    style={styles.brihtbraintallesOptionButton}>
                    <Text style={styles.brihtbraintallesOptionText}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
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
  brihtbraintallesContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 150,
  },
  brihtbraintallesProgressCard: {
    width: '100%',
    backgroundColor: '#5A0701',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  brihtbraintallesProgressText: {
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 14,
    marginBottom: 10,
  },
  brihtbraintallesProgressBars: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 4,
  },
  brihtbraintallesProgressBar: {
    flex: 1,
    height: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 214, 28, 0.35)',
  },
  brihtbraintallesProgressBarActive: {
    backgroundColor: '#FFD61C',
  },
  brihtbraintallesQuestionCard: {
    marginTop: 14,
    width: '100%',
    backgroundColor: '#5A0701',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 16,
    paddingBottom: 0,
  },
  brihtbraintallesQuestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  brihtbraintallesQuestionText: {
    flex: 1,
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    lineHeight: 18,
  },
  brihtbraintallesQuestionImage: {
    width: 96,
    height: 122,
  },
  brihtbraintallesOptionsWrap: {
    marginTop: 18,
    gap: 14,
  },
  brihtbraintallesOptionButton: {
    width: '100%',
    height: 62,
    borderRadius: 12,
    backgroundColor: '#FFD61C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brihtbraintallesOptionText: {
    fontFamily: 'Raleway-Black',
    fontSize: 15,
    color: '#5A0701',
    textAlign: 'center',
  },
  brihtbraintallesDoneWrap: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 150,
    alignItems: 'center',
  },
  brihtbraintallesDoneTitle: {
    fontFamily: 'Raleway-ExtraBold',
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
  },
  brihtbraintallesDoneText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 22,
    maxWidth: 320,
  },
  brihtbraintallesPrimaryButton: {
    width: '100%',
    height: 62,
    borderRadius: 12,
    backgroundColor: '#FFD61C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  brihtbraintallesPrimaryButtonText: {
    fontFamily: 'Raleway-Black',
    fontSize: 16,
    color: '#5A0701',
  },
});

export default Brihtbraintallesquiiz;
