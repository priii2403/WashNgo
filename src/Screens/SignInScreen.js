import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import Metrics from '../Helpers/Metrics';
import * as yup from 'yup';
import useAuthStore from '../store/AuthStore';
import PasswordInput from '../Components/PasswordInput';

import CustomButton from '../Components/CustomButton';
import {Colors} from '../Helpers/Colors';
import {appHitSlop} from '../constant/data';

const {width, height} = Dimensions.get('window');

// Validation schema for Formik
const validationSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits') // Adjust regex as needed
    .required('Phone number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignInScreen = ({navigation}) => {
  const formRef = useRef();
  const setUser = useAuthStore(state => state.setUser);

  const handleLogin = async values => {
    try {
      const response = await fetch('https://tor.appdevelopers.mobi/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: values.phone,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.data);
      if (data?.data) {
        // If login is successful, show alert
        Alert.alert('Login Success', 'You have Login successfully!');
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Login Failed', 'Invalid phone or password.');
      }
      setUser(data.data.status);
      formRef?.current?.resetForm();
    } catch (error) {
      console.error('Error during login:', error);
      // Handle errors here, e.g., show error message to user
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../Assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Hi! Welcome back, you</Text>
        <Text style={styles.subtitle1}>have been missed</Text>

        <Formik
          initialValues={{phone: '', password: ''}}
          validationSchema={validationSchema}
          innerRef={formRef}
          onSubmit={values => handleLogin(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone</Text>
                <View style={styles.inputWrapper}>
                  <Image
                    source={require('../Assets/mail.png')}
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    placeholder="Enter your phone"
                    keyboardType="phone-pad"
                    placeholderTextColor={Colors.grey}
                  />
                </View>
                {touched.phone && errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <PasswordInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  error={touched.password && errors.password}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <CustomButton title="Sign In" onPress={handleSubmit} />

              <View style={styles.dividerContainer}>
                <Text style={{color: 'black'}}>-------------------</Text>
                <Text style={styles.dividerText}>or</Text>
                <Text style={{color: 'black'}}>-------------------</Text>
              </View>

              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton}>
                  <Image
                    source={require('../Assets/Goggle.png')}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Image
                    source={require('../Assets/apple.png')}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <View style={styles.signUpContainer}>
                  <Text style={styles.signInText}>Don’t have an account? </Text>
                  <TouchableOpacity
                    hitSlop={appHitSlop(10, 10, 10, 10)}
                    onPress={() => navigation.navigate('SignUpScreen')}>
                    <Text style={styles.signInText1}>Sign Up </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.footerText1}>
                  By login or sign up, you agree to our terms of use and privacy
                  policy
                </Text>
              </View>
              <Image
                source={require('../Assets/belowSideRight.png')}
                style={[
                  styles.cornerImage,
                  styles.bottomRight,
                  {
                    width: Metrics.rfv(200), // dynamically set width
                    height: Metrics.rfv(300), // dynamically set height
                  },
                ]}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Metrics.rfv(20), // Adjusted margin for responsiveness
  },
  bottomRight: {
    bottom: -160,
    left: 0,
  },
  logo: {
    width: '120%', // Responsive width
    height: undefined,
    aspectRatio: 3 / 1, // Maintain aspect ratio for logo
    resizeMode: 'contain',
  },
  title: {
    fontSize: Metrics.rfv(21), // Responsive title font size
    fontWeight: '700',
    color: 'black',
    paddingHorizontal: Metrics.rfv(10),
    marginTop: Metrics.rfv(10),
    textAlign: 'left',
    marginLeft: Metrics.rfv(10),
  },
  icon: {
    marginHorizontal: Metrics.rfv(10),
  },
  subtitle: {
    fontSize: Metrics.rfv(16),
    fontWeight: '400',
    color: '#808080',
    paddingHorizontal: Metrics.rfv(10),
    marginTop: Metrics.rfv(5),
    marginLeft: Metrics.rfv(10),
  },
  cornerImage: {
    width: width * 0.3, // 20% of screen width for corner images
    height: width * 0.3,
    position: 'absolute',
    resizeMode: 'contain',
  },
  bottomLeft: {
    bottom: -10,
    left: 0,
  },
  subtitle1: {
    fontSize: Metrics.rfv(16),
    fontWeight: '400',
    color: '#808080',
    paddingHorizontal: Metrics.rfv(10),
    marginLeft: Metrics.rfv(10),
  },
  formContainer: {
    marginTop: Metrics.rfv(20),
    paddingHorizontal: Metrics.rfv(20),
  },
  inputContainer: {
    marginBottom: Metrics.rfv(15),
  },
  label: {
    fontSize: Metrics.rfv(14),
    color: 'black',
    marginBottom: Metrics.rfv(5),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(5),
  },
  input: {
    flex: 1,
    height: Metrics.rfv(40),
    borderRadius: Metrics.rfv(5),
    paddingHorizontal: Metrics.rfv(10),
    color: Colors.black,
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
    fontSize: Metrics.rfv(14),
    color: 'black',
    textDecorationLine: 'underline',
  },
  signInButton: {
    borderRadius: Metrics.rfv(30),
    backgroundColor: '#A3CFFF',
    alignItems: 'center',
    paddingVertical: Metrics.rfv(15),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  subText: {
    fontSize: Metrics.rfv(16),
    fontWeight: 'bold',
    color: Colors.black,
  },
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: Metrics.rfv(20),
  },
  dividerText: {
    fontSize: Metrics.rfv(14),
    color: 'black',
    marginHorizontal: Metrics.rfv(10),
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: Metrics.rfv(20),
  },
  iconButton: {
    marginHorizontal: Metrics.rfv(10),
  },
  socialIcon: {
    width: Metrics.rfv(30),
    height: Metrics.rfv(30),
    resizeMode: 'contain',
  },
  footer: {
    alignItems: 'center',
    marginTop: Metrics.rfv(20),
  },
  signUpContainer: {
    flexDirection: 'row',
    marginBottom: Metrics.rfv(20),
  },
  signInText: {
    fontSize: Metrics.rfv(14),
    color: 'black',
  },
  signInText1: {
    fontSize: Metrics.rfv(14),
    color: '#A3CFFF',
    position: 'absolute',
  },
  footerText1: {
    fontSize: Metrics.rfv(12),
    textAlign: 'center',
    color: '#808080',
  },
});

export default SignInScreen;
