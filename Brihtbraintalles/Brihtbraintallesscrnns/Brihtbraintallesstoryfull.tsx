import {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Brihtbraintalleslayot from '../Brihtbraintallescpntts/Brihtbraintalleslayot';
import {brihtbraintallesstoriesData} from '../Brihtbraintallescpntts/Brihtbraintallesstoriesdata';

const SAVED_STORIES_KEY = 'brihtbraintalles_saved_stories';

const Brihtbraintallesstoryfull = () => {
  const brihtbraintallesnavigation = useNavigation<any>();
  const brihtbraintallesroute = useRoute();
  const [brihtbraintallessavedIds, setBrihtbraintallessavedIds] = useState<
    number[]
  >([]);

  const brihtbraintallesstoryId = Number(
    (brihtbraintallesroute.params as {storyId?: number})?.storyId ?? 1,
  );

  const brihtbraintallesstory = useMemo(
    () =>
      brihtbraintallesstoriesData.find(
        item => item.id === brihtbraintallesstoryId,
      ) ?? brihtbraintallesstoriesData[0],
    [brihtbraintallesstoryId],
  );

  const brihtbraintallesisSaved = brihtbraintallessavedIds.includes(
    brihtbraintallesstory.id,
  );

  useEffect(() => {
    const brihtbraintallesloadSavedStories = async () => {
      try {
        const brihtbraintallesraw = await AsyncStorage.getItem(
          SAVED_STORIES_KEY,
        );
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
      } catch (error) {
        setBrihtbraintallessavedIds([]);
      }
    };
    brihtbraintallesloadSavedStories();
  }, []);

  const brihtbraintalleshandleShareStory = async () => {
    const brihtbraintallesmessage = `${brihtbraintallesstory.title}\n\n${
      brihtbraintallesstory.intro
    }\n\n${brihtbraintallesstory.body.join('\n\n')}\n\n${
      brihtbraintallesstory.thought
    }`;
    try {
      await Share.share({message: brihtbraintallesmessage});
    } catch (error) {
      Alert.alert('Error', 'Could not share this story now.');
    }
  };

  const brihtbraintalleshandleSaveStory = async () => {
    try {
      const brihtbraintallesnextSavedIds = brihtbraintallesisSaved
        ? brihtbraintallessavedIds.filter(id => id !== brihtbraintallesstory.id)
        : [...brihtbraintallessavedIds, brihtbraintallesstory.id];
      setBrihtbraintallessavedIds(brihtbraintallesnextSavedIds);
      await AsyncStorage.setItem(
        SAVED_STORIES_KEY,
        JSON.stringify(brihtbraintallesnextSavedIds),
      );
    } catch (error) {
      Alert.alert('Error', 'Could not update saved stories.');
    }
  };

  return (
    <Brihtbraintalleslayot>
      <View style={styles.brihtbraintallescontainer}>
        <View style={styles.brihtbraintallesheader}>
          <TouchableOpacity
            onPress={() => brihtbraintallesnavigation.goBack()}
            style={styles.brihtbraintallesbackButton}
            activeOpacity={0.8}>
            <Image source={require('../../assets/i/brihtbraintalback.png')} />
          </TouchableOpacity>
          <Text style={styles.brihtbraintallesheaderTitle}>
            Stories from Jock
          </Text>
          <View style={styles.brihtbraintallesbackButtonPlaceholder} />
        </View>

        <View style={styles.brihtbraintallescard}>
          <Text style={styles.brihtbraintallescardTitle}>
            {brihtbraintallesstory.title}
          </Text>
          <Text style={styles.brihtbraintallescardText}>
            {brihtbraintallesstory.intro}
          </Text>

          {brihtbraintallesstory.body.map(paragraph => (
            <Text key={paragraph} style={styles.brihtbraintallescardText}>
              {paragraph}
            </Text>
          ))}

          <Text style={styles.brihtbraintallesthoughtText}>
            👉 {brihtbraintallesstory.thought}
          </Text>

          <View style={styles.brihtbraintallesactionsRow}>
            <TouchableOpacity
              onPress={brihtbraintalleshandleShareStory}
              style={styles.brihtbraintallesactionButton}
              activeOpacity={0.8}>
              <Text style={styles.brihtbraintallesactionButtonText}>
                Share story
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={brihtbraintalleshandleSaveStory}
              style={[
                styles.brihtbraintallesiconButton,
                brihtbraintallesisSaved &&
                  styles.brihtbraintallesiconButtonSaved,
              ]}
              activeOpacity={0.8}>
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
      </View>
    </Brihtbraintalleslayot>
  );
};

const styles = StyleSheet.create({
  brihtbraintallescontainer: {
    flex: 1,
    paddingBottom: 28,
  },
  brihtbraintallesheader: {
    backgroundColor: '#BD0709',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: 44,
    paddingHorizontal: 16,
    minHeight: 130,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brihtbraintallesbackButton: {
    width: 32,
    height: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  brihtbraintallesbackButtonPlaceholder: {
    width: 32,
    height: 32,
  },
  brihtbraintallesheaderTitle: {
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 24,
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
  brihtbraintallescardTitle: {
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    marginBottom: 8,
  },
  brihtbraintallescardText: {
    color: '#FFA6A6',
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    marginBottom: 8,
  },
  brihtbraintallesthoughtText: {
    color: '#FFA6A6',
    fontFamily: 'Raleway-Regular',
    fontSize: 12,

    marginTop: 4,
    marginBottom: 16,
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
});

export default Brihtbraintallesstoryfull;
