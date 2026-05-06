import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  type ViewStyle,
} from 'react-native';

import Brihtbraintallesstories from './Brihtbraintalles/Brihtbraintallesscrnns/Brihtbraintallesstories';
import Brihtbraintallesblog from './Brihtbraintalles/Brihtbraintallesscrnns/Brihtbraintallesblog';
import Brihtbraintallesfacct from './Brihtbraintalles/Brihtbraintallesscrnns/Brihtbraintallesfacct';
import Brihtbraintallesrddls from './Brihtbraintalles/Brihtbraintallesscrnns/Brihtbraintallesrddls';
import Brihtbraintallesquiiz from './Brihtbraintalles/Brihtbraintallesscrnns/Brihtbraintallesquiiz';
import Brihtbraintallessavd from './Brihtbraintalles/Brihtbraintallesscrnns/Brihtbraintallessavd';

const Tab = createBottomTabNavigator();

const AnimatedTabButton = (props: Record<string, unknown>) => {
  const {children, style, onPress, onLongPress, ...rest} = props;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style as ViewStyle, styles.brightbraintabButton]}
      {...rest}>
      <Animated.View
        style={[styles.brightbraintabButtonInner, {transform: [{scale}]}]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
};

const Brihtbraintaltabs = () => {
  const {height, width} = useWindowDimensions();
  const isLandscape = height < width;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.brightbraintabBar,
          {height: isLandscape ? 80 : 130},
        ],
        tabBarActiveTintColor: '#555555',
        tabBarButton: props => (
          <AnimatedTabButton {...(props as Record<string, unknown>)} />
        ),
      }}>
      <Tab.Screen
        name="Brihtbraintallesstories"
        component={Brihtbraintallesstories}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.brightbraintabIconWrap}>
              <Image
                source={require('./assets/i/brihtbraintallestb1.png')}
                tintColor={focused ? '#FFD61C' : '#5A0701'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Brihtbraintallesblog"
        component={Brihtbraintallesblog}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.brightbraintabIconWrap}>
              <Image
                source={require('./assets/i/brihtbraintallestb2.png')}
                tintColor={focused ? '#FFD61C' : '#5A0701'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Brihtbraintallesfacct"
        component={Brihtbraintallesfacct}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.brightbraintabIconWrap}>
              <Image
                source={require('./assets/i/brihtbraintallestb3.png')}
                tintColor={focused ? '#FFD61C' : '#5A0701'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Brihtbraintallesrddls"
        component={Brihtbraintallesrddls}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.brightbraintabIconWrap}>
              <Image
                source={require('./assets/i/brihtbraintallestb4.png')}
                tintColor={focused ? '#FFD61C' : '#5A0701'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Brihtbraintallesquiiz"
        component={Brihtbraintallesquiiz}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.brightbraintabIconWrap}>
              <Image
                source={require('./assets/i/brihtbraintallestb5.png')}
                tintColor={focused ? '#FFD61C' : '#5A0701'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Brihtbraintallessavd"
        component={Brihtbraintallessavd}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.brightbraintabIconWrap}>
              <Image
                source={require('./assets/i/brihtbraintallestb6.png')}
                tintColor={focused ? '#FFD61C' : '#5A0701'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  brightbraintabButton: {
    flex: 1,
  },
  brightbraintabButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brightbraintabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  brightbraintabBar: {
    elevation: 0,
    paddingTop: 12,
    justifyContent: 'center',
    position: 'absolute',
    paddingHorizontal: 18,
    borderColor: '#BD0709',
    backgroundColor: '#BD0709',
    height: 130,
    paddingBottom: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
});

export default Brihtbraintaltabs;
