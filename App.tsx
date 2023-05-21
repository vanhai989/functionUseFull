// import { useCallback, useState } from 'react';
// import { View, Text, Button, SafeAreaView } from 'react-native';
// import Toast from './src/components/toast';

// function App() {
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Toast />
//     </SafeAreaView>
//   );
// }

// export default App

//@ts-nocheck
import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';
import Example from './src/components/progess';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
let widthScreen = Dimensions.get('window').width;

let widthBounceFirst = 10
let widthBounceSecond = 40
let widthBounceThird = 60
let widthBounceFour = widthScreen - 32
const halfScreenWidth = widthScreen / 2

const FadeInView = props => {
  const fallAnimation = useRef(new Animated.Value(0)).current;
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressAnimationSecond = useRef(new Animated.Value(0)).current;
  const messageAnimation = useRef(new Animated.Value(0)).current;
  const borderLeftAnimation = useRef(new Animated.Value(0)).current;
  // const [isPhaseOneDone, setIsPhaseOneDone] = useState(false);
  const [isProgressFirstDone, setIsProgressFirstDone] = useState(false);

  const onStartFall = () => {
    return Animated.timing(fallAnimation, {
      toValue: 3,
      duration: 2000,
      useNativeDriver: false,
    })
  }

  const onStartProgress = () => {
    return Animated.timing(progressAnimation, {
      toValue: 1,
      delay: 50,
      duration: 500,
      useNativeDriver: false,
    })
  }

  const onStartProgressSecond = () => {
    return Animated.timing(progressAnimationSecond, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    })
  }

  const onStartMessage = () => {
    return Animated.timing(messageAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    })
  }

  const onStartBorderLeft = () => {
    return Animated.timing(borderLeftAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    })
  }

  const sequenceAnimation = () => {
    onStartFall().start(() => {
      onStartMessage().start()
    })
    onStartProgress().start(() => {
      setIsProgressFirstDone(true)
      onStartProgressSecond().start(() => {
        onStartBorderLeft().start()
      })
    })
  };

  // phase 1

  const topFall = fallAnimation.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [10, 40, 60, 60],
  });

  const widthBounce = fallAnimation.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [widthBounceFirst, widthBounceSecond, widthBounceThird, widthBounceFour],
  });

  const heightBounce = fallAnimation.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [widthBounceFirst, widthBounceSecond, widthBounceThird, widthBounceThird],
  });

  const opacityProgress = fallAnimation.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [0, 0, 1, 1],
  });

  const borderRadius = fallAnimation.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [widthBounceFirst / 2, widthBounceSecond / 2, widthBounceThird / 2, 10],
  });

  const leftBounce = fallAnimation.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [halfScreenWidth - (widthBounceFirst / 2), halfScreenWidth - (widthBounceSecond / 2), halfScreenWidth - (widthBounceThird / 2), 16],
  });

  const fillProgFirst = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  // phase 2

  const messageOpacity = messageAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const fillProgSecond = progressAnimationSecond.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });
  
  const heightBorderLeft = borderLeftAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, widthBounceThird],
  });

  // opacity border left

  const renderProgress = () => {
    console.log('isProgressFirstDone', isProgressFirstDone);

    // const fill = parseInt(fillProgFirst)
    // const fill = parseInt(fillProgFirst)
    return (
      <View>
        <Animated.View style={{ display: isProgressFirstDone ? 'none' : 'flex' }}>
          <AnimatedCircularProgress
            size={50}
            rotation={0}
            width={5}
            backgroundWidth={4}
            fill={fillProgFirst}
            tintColor={'green'}
            onAnimationComplete={(finished) => {
              // console.log('fillProgFirst', fillProgFirst);
            }}
            backgroundColor={'white'}
          />
          <Animated.Text
            style={{
              position: 'absolute',
              top: 15,
              left: 20,
              textAlign: 'center',
              alignSelf: 'center',
              opacity: opacityProgress,
            }}>
            a
          </Animated.Text>
        </Animated.View>

        <Animated.View style={{position: isProgressFirstDone ? 'relative' : 'absolute', flexDirection: 'row', alignItems: 'center'}}>
          <Animated.View style={{backgroundColor: 'green', width: 4, height: heightBorderLeft, borderRadius: 20}} />
          <AnimatedCircularProgress
            size={50}
            rotation={290}
            width={5}
            backgroundWidth={4}
            fill={fillProgSecond}
            tintColor={'white'}
            onAnimationComplete={(finished) => {
              // console.log('fillProgFirst', fillProgFirst);
            }}
            backgroundColor={'green'}
          />
          <Animated.Text
            style={{
              position: 'absolute',
              top: 15,
              left: 20,
              textAlign: 'center',
              alignSelf: 'center',
              opacity: opacityProgress,
            }}>
            b
          </Animated.Text>
        </Animated.View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.viewShadow, {
          ...StyleSheet.absoluteFillObject,
          opacity: 1,
          left: leftBounce,
          borderRadius: borderRadius,
          top: topFall,
          width: widthBounce,
          height: heightBounce,
        }]}>
        {renderProgress()}


        <Animated.Text style={{ marginLeft: 10, opacity: messageOpacity, fontSize: 12 }}>Product has been successfully added to your cart!</Animated.Text>
      </Animated.View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: 100,
        }}>
        <Button title="start" onPress={sequenceAnimation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    ...StyleSheet.absoluteFillObject,
    paddingBottom: 10,
    backgroundColor: 'white'
  },
  viewShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});

export default () => {
  // const onStart = () => {

  // }
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      {/* <Button title='press me' onPress={onStart} /> */}
      <FadeInView />
    </SafeAreaView>
  );
};
