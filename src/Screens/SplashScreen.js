import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Metrics from '../Helpers/Metrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const checkFirstTimeUser = async () => {
      try {
        const isFirstTime = await AsyncStorage.getItem('isFirstTimeUser');
        if (isFirstTime === null) {
          await AsyncStorage.setItem('isFirstTimeUser', 'false');
          navigation.replace('SignInScreen');
        } else {
          //   navigation.replace('HomeScreen');
          navigation.replace('OnBoardingScreen');
        }
      } catch (error) {
        console.error('Error checking AsyncStorage:', error);
        navigation.replace('TabRoutes');
      } finally {
        SplashScreen.hide();
      }
    };

    const timerId = setTimeout(checkFirstTimeUser, 2000);

    return () => clearTimeout(timerId);
  }, [navigation]);
  return (
    <View style={styles.container}>
      {/* Corner Images */}
      <Image
        source={require('../Assets/uppersideRight.png')}
        style={[
          styles.cornerImage,
          styles.topLeft,
          {
            width: Metrics.rfv(300), // dynamically set width
            height: Metrics.rfv(300), // dynamically set height
          },
        ]}
      />
      <Image
        source={require('../Assets/upperSideLeft.png')}
        style={[
          styles.cornerImage,
          styles.topRight,
          {
            width: Metrics.rfv(200), // dynamically set width
            height: Metrics.rfv(200), // dynamically set height
          },
        ]}
      />
      <Image
        source={require('../Assets/belowSideLeft.png')}
        style={[
          styles.cornerImage,
          styles.bottomRight,
          {
            width: Metrics.rfv(300), // dynamically set width
            height: Metrics.rfv(300), // dynamically set height
          },
        ]}
      />

      {/* Centered Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../Assets/logo.png')} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // To ensure the logo stays on top of corner images
  },
  logo: {
    width: width * 0.8, // Responsive logo size (40% of screen width)
    height: width * 0.5,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  cornerImage: {
    width: width * 0.3, // 20% of screen width for corner images
    height: width * 0.3,
    position: 'absolute',
    resizeMode: 'contain',
  },
  topLeft: {
    top: 0,
    left: -30,
  },
  topRight: {
    top: 0,
    right: -30,
  },
  bottomLeft: {
    bottom: -10,
    left: 0,
  },
  bottomRight: {
    bottom: -10,
    right: 0,
  },
});

export default SplashScreen;
