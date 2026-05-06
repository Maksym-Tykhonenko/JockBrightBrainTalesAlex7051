import {type ReactNode, type RefObject} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollViewProps,
} from 'react-native';

type BrihtbraintalleslayotProps = {
  children: ReactNode;
  scrollViewRef?: RefObject<ScrollView | null>;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onContentSizeChange?: ScrollViewProps['onContentSizeChange'];
  onLayout?: (event: LayoutChangeEvent) => void;
  scrollEventThrottle?: number;
};

const Brihtbraintalleslayot = ({
  children,
  scrollViewRef,
  onScroll,
  onContentSizeChange,
  onLayout,
  scrollEventThrottle = 16,
}: BrihtbraintalleslayotProps) => {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/i/brihtbraintallbgl.png')}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        scrollEventThrottle={scrollEventThrottle}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});

export default Brihtbraintalleslayot;
