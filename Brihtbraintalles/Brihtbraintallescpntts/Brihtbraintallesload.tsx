import React, {useEffect, useRef} from 'react';
import {View, ScrollView, ImageBackground} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

import {Animated} from 'react-native';

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

export const brightbrainhtmlLoader = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      overflow: hidden;
    }

    body {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .liquid-loader {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      padding: 20px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      box-sizing: border-box;
    }

    .loader-track {
      position: relative;
      width: 180px;
      height: 32px;
      background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
      border-radius: 16px;
      overflow: hidden;
      box-shadow:
        inset 0 2px 4px rgba(0, 0, 0, 0.6),
        0 1px 3px rgba(255, 255, 255, 0.1);
    }

    .liquid-fill {
      position: absolute;
      top: 2px;
      left: 2px;
      height: calc(100% - 4px);
      width: 4px;
      background: linear-gradient(90deg, #4f46e5, #7c3aed, #ec4899, #f59e0b);
      border-radius: 14px;
      animation:
        fillProgress 4s ease-out infinite,
        colorShift 3s linear infinite;
      box-shadow:
        0 0 12px rgba(124, 58, 237, 0.4),
        inset 0 1px 2px rgba(255, 255, 255, 0.2);
    }

    .loading-text {
      color: #ffffff;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1px;
      animation: textGlow 1s ease-in-out infinite;
      white-space: nowrap;
    }

    .dot {
      display: inline-block;
      margin-left: 3px;
      animation: blink 1.5s infinite;
    }

    .dot:nth-of-type(1) {
      animation-delay: 0s;
    }

    .dot:nth-of-type(2) {
      animation-delay: 0.3s;
    }

    .dot:nth-of-type(3) {
      animation-delay: 0.6s;
    }

    @keyframes fillProgress {
      0% {
        width: 4px;
      }
      25% {
        width: 25%;
      }
      50% {
        width: 50%;
      }
      75% {
        width: 75%;
      }
      100% {
        width: calc(100% - 4px);
      }
    }

    @keyframes colorShift {
      0% {
        filter: hue-rotate(0deg) brightness(1);
      }
      33% {
        filter: hue-rotate(120deg) brightness(1.1);
      }
      66% {
        filter: hue-rotate(240deg) brightness(0.9);
      }
      100% {
        filter: hue-rotate(360deg) brightness(1);
      }
    }

    @keyframes textGlow {
      0%, 100% {
        opacity: 0.7;
        text-shadow: 0 0 8px rgba(139, 92, 246, 0.3);
      }
      50% {
        opacity: 1;
        text-shadow: 0 0 16px rgba(139, 92, 246, 0.6);
      }
    }

    @keyframes blink {
      0%, 50% {
        opacity: 1;
      }
      51%, 100% {
        opacity: 0;
      }
    }
  </style>
</head>
<body>
  <div class="liquid-loader">
    <div class="loading-text">
      Loading<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
    </div>
    <div class="loader-track">
      <div class="liquid-fill"></div>
    </div>
  </div>
</body>
</html>`;

const Brihtbraintallesload = () => {
  const navigation = useNavigation();
  const timerRef = useRef(null);
{/** 
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      navigation.replace('Brihtbraintallesonbr');
    }, 6000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        console.log('timer cleared');
      }
    };
  }, [navigation]);*/}

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../assets/i/brihtbraintallbgl.png')}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <WebView
            originWhitelist={['*']}
            source={{html: brightbrainhtmlLoader}}
            style={{width: 260, height: 80, backgroundColor: 'transparent'}}
            scrollEnabled={false}
            transparent={true}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Brihtbraintallesload;
