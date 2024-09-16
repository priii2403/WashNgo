import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../Components/CustomButton';

import Metrics from '../Helpers/Metrics';

const {width} = Dimensions.get('window');

const OnBoardingScreen = ({navigation}) => {
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
            height: Metrics.rfv(180), // dynamically set height
          },
        ]}
      />

      {/* Centered Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../Assets/logo.png')} style={styles.logo} />
      </View>

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>
          Sparkle & Shine Transform Your Drive with Every Wash!
        </Text>
        <CustomButton
          title="Let’s Start"
          onPress={() => {
            navigation.navigate('SignInScreen');
          }}
        />
        <View style={{flexDirection: 'row', marginTop: Metrics.rfv(16)}}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignInScreen');
            }}>
            <Text style={styles.signInText1}>Sign in </Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // Adjust this value to control the spacing between logo and text
  },
  logo: {
    width: width * 0.8, // Responsive logo size (60% of screen width)
    height: width * 0.5, // Adjust height relative to width
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20, // Space between the logo and text
  },
  headingText: {
    fontSize: Metrics.rfv(21),
    fontFamily: 'Poppins-Black.ttf',
    fontWeight: '600',
    color: '#808080',
    textAlign: 'center',
    marginBottom: 10, // Spacing between heading and subtext
    paddingHorizontal: 20, // Add padding for better readability
    // paddingVertical:Metrics.rfv(10)
  },
  bottomLeft: {
    bottom: -10,
    left: 0,
  },
  cornerImage: {
    width: width * 0.3, // 20% of screen width for corner images
    height: width * 0.3,
    position: 'absolute',
    resizeMode: 'contain',
  },
  subText: {
    fontSize: 16,
    paddingVertical: Metrics.rfv(15),
    fontWeight: 'bold',
    paddingHorizontal: Metrics.rfv(60),
  },
  signInText: {
    fontSize: Metrics.rfv(14),
    color: '#808080', // Make sign-in text blue to look like a link
  },
  signInText1: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: Metrics.rfv(14),
    color: 'black', // Make sign-in text blue to look like a link
  },
  cornerImage: {
    position: 'absolute',
    resizeMode: 'contain',
  },
  topLeft: {
    top: 0,
    left: -30,
  },
  topRight: {
    top: 0,
    right: -50,
  },
});

export default OnBoardingScreen;
