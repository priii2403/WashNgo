import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import Metrics from '../Helpers/Metrics';
import * as yup from 'yup'; // Add yup for form validation
import useAuthStore from '../store/AuthStore';

const {width, height} = Dimensions.get('window');

// Validation schema for Formik
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const HomeScreen = ({navigation}) => {
  const {user, clearUser} = useAuthStore(state => ({
    user: state.user,
    clearUser: state.clearUser,
  }));
  const handleLogout = () => {
    clearUser(); // Clear user data
    navigation.navigate('SignInScreen'); // Navigate to the login screen
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: Metrics.rfv(10),
      }}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.logoContainer}>
          <Image source={require('../Assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>{`Welcome ${
          user?.name ? user?.name : ''
        }`}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <View
            style={{
              borderRadius: Metrics.rfv(30),
              backgroundColor: '#A3CFFF',
              alignItems: 'center',
              marginTop: Metrics.rfv(20),
              paddingHorizontal: Metrics.rfv(20),
              marginHorizontal: Metrics.rfv(30),
              marginTop: Metrics.rfv(100),
              // // iOS shadow properties
              shadowColor: '#000', // Shadow color
              shadowOffset: {width: 0, height: 4}, // Shadow offset
              shadowOpacity: 0.3, // Shadow opacity
              shadowRadius: 6, // Shadow blur radius
            }}>
            <Text style={styles.subText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: Metrics.rfv(40),
  },
  logo: {
    width: width * 0.6,
    height: width * 0.333,
    resizeMode: 'contain',
  },
  bottomRight: {
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  title: {
    fontSize: Metrics.rfv(21),
    fontFamily: 'Poppins-Black',
    fontWeight: '700',
    color: 'black',
    paddingHorizontal: Metrics.rfv(10),
    marginTop: Metrics.rfv(50),
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    paddingVertical: Metrics.rfv(15),
    fontWeight: 'bold',
    // paddingHorizontal: Metrics.rfv(30),
  },
  subtitle: {
    fontSize: Metrics.rfv(16),
    fontFamily: 'Poppins-Black',
    fontWeight: '400',
    color: '#808080',
    paddingHorizontal: Metrics.rfv(10),
    textAlign: 'center',
    marginTop: Metrics.rfv(5),
  },
  subtitle1: {
    fontSize: Metrics.rfv(16),
    fontFamily: 'Poppins-Black',
    fontWeight: '400',
    color: '#808080',
    paddingHorizontal: Metrics.rfv(10),
    textAlign: 'center',
    // marginTop: Metrics.rfv(10),
  },
  formContainer: {
    marginTop: Metrics.rfv(20),
    paddingHorizontal: Metrics.rfv(20),
  },
  inputContainer: {
    marginBottom: Metrics.rfv(10),
  },
  label: {
    fontSize: Metrics.rfv(14),
    color: 'black',
    marginBottom: Metrics.rfv(5),
  },
  input: {
    height: Metrics.rfv(40),
    borderRadius: Metrics.rfv(5),
    paddingHorizontal: Metrics.rfv(10),
  },
  errorText: {
    color: 'red',
    fontSize: Metrics.rfv(12),
    marginTop: Metrics.rfv(5),
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: Metrics.rfv(20),
  },
  forgotPasswordText: {
    color: 'black',
    fontSize: Metrics.rfv(14),
    textDecorationLine: 'underline',
  },
  signInButton: {
    backgroundColor: '#007BFF',
    paddingVertical: Metrics.rfv(15),
    borderRadius: Metrics.rfv(5),
    alignItems: 'center',
    marginBottom: Metrics.rfv(20),
  },
  signInButtonText: {
    color: 'white',
    fontSize: Metrics.rfv(16),
    fontWeight: '600',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Metrics.rfv(20),
  },
  iconButton: {
    marginHorizontal: Metrics.rfv(10),
  },
  icon: {
    width: Metrics.rfv(30),
    height: Metrics.rfv(30),
    resizeMode: 'contain',
  },
  footer: {
    alignItems: 'center',
    marginTop: Metrics.rfv(20),
  },
  footerText: {
    marginTop: Metrics.rfv(10),
    fontSize: Metrics.rfv(15),
    color: 'black',
  },
  footerText1: {
    marginTop: Metrics.rfv(10),
    fontSize: Metrics.rfv(13),
    color: '#808080',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Poppins-Light',
    paddingBottom: Metrics.rfv(10),
  },
  signUpLink: {
    color: 'black',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  termsLink: {
    // color: 'black',
    // textDecorationLine: 'underline',
  },
});

export default HomeScreen;
