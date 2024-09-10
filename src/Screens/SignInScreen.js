import React, {useRef} from 'react';
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
import * as yup from 'yup';
import useAuthStore from '../store/AuthStore';

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
      console.log('Login successful:', data);
      setUser(data.data);
      formRef?.current?.resetForm();
      navigation.navigate('HomeScreen');
      // Handle successful login here, e.g., navigation or storing tokens
    } catch (error) {
      console.error('Error during login:', error);
      // Handle errors here, e.g., show error message to user
    }
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
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Hi! Welcome back, you</Text>
        <Text style={styles.subtitle1}>have been missed</Text>

        <Formik
          initialValues={{phone: '', password: ''}}
          validationSchema={validationSchema}
          innerRef={formRef}
          onSubmit={values => {
            // Handle form submission
            handleLogin(values);
          }}>
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#808080',
                    borderRadius: Metrics.rfv(8),
                    paddingHorizontal: Metrics.rfv(5),
                  }}>
                  <Image source={require('../Assets/mail.png')} style={{}} />
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    placeholder="Enter your phone"
                    keyboardType="phone-pad"
                  />
                </View>
                {touched.phone && errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#808080',
                    borderRadius: Metrics.rfv(8),
                    paddingHorizontal: Metrics.rfv(5),
                  }}>
                  <Image source={require('../Assets/lock.png')} style={{}} />
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="Enter your password"
                    secureTextEntry
                  />
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderRadius: Metrics.rfv(30),
                  backgroundColor: '#A3CFFF',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 4},
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  elevation: 6,
                }}
                onPress={handleSubmit}>
                <Text style={styles.subText}>Sign In</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: Metrics.rfv(10),
                }}>
                <Text>----------</Text>
                <Text style={{paddingHorizontal: Metrics.rfv(3)}}>or</Text>
                <Text>----------</Text>
              </View>

              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton}>
                  <Image
                    source={require('../Assets/Goggle.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Image
                    source={require('../Assets/apple.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              <Image
                source={require('../Assets/belowSideRight.png')}
                style={[
                  styles.bottomRight,
                  {
                    width: Metrics.rfv(200),
                    height: Metrics.rfv(120),
                    bottom: -30,
                  },
                ]}
              />
              <View style={styles.footer}>
                <View style={{flexDirection: 'row', marginTop: Metrics.rfv(5)}}>
                  <Text style={styles.signInText}>
                    {' '}
                    Don’t have an account?{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SignUpScreen');
                    }}>
                    <Text style={styles.signInText1}>Sign Up </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.footerText1}>
                  By login or sign up, you agree to our terms of use and privacy
                  policy
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: Metrics.rfv(10),
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
  signInText1: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 12,
    color: 'black', // Make sign-in text blue to look like a link
  },
  title: {
    fontSize: Metrics.rfv(21),
    fontFamily: 'Poppins-Black',
    fontWeight: '700',
    color: 'black',
    paddingHorizontal: Metrics.rfv(10),
    marginTop: Metrics.rfv(10),
    textAlign: 'start',
  },
  subText: {
    fontSize: 16,
    paddingVertical: Metrics.rfv(15),
    fontWeight: 'bold',
    paddingHorizontal: Metrics.rfv(60),
  },
  subtitle: {
    fontSize: Metrics.rfv(16),
    fontFamily: 'Poppins-Black',
    fontWeight: '400',
    color: '#808080',
    paddingHorizontal: Metrics.rfv(10),
    textAlign: 'start',
    marginTop: Metrics.rfv(5),
  },
  subtitle1: {
    fontSize: Metrics.rfv(16),
    fontFamily: 'Poppins-Black',
    fontWeight: '400',
    color: '#808080',
    paddingHorizontal: Metrics.rfv(10),
    textAlign: 'start',
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
    marginTop: Metrics.rfv(10),
  },
  footerText: {
    fontSize: Metrics.rfv(12),
    color: 'black',
  },
  signUpLink: {
    color: 'black',
    // fontSize: Metrics.rfv(10),
    marginTop: Metrics.rfv(0),

    textDecorationLine: 'underline',
  },
  footerText1: {
    fontSize: Metrics.rfv(12),
    color: '#808080',
    textAlign: 'center',
  },
});

export default SignInScreen;
