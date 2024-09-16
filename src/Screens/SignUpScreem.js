import React, {useRef, useState} from 'react';
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
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import Metrics from '../Helpers/Metrics';
import * as yup from 'yup';
import useAuthStore from '../store/AuthStore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../Helpers/Colors';
import PasswordInput from '../Components/PasswordInput';
import {appHitSlop, privacy_Policy} from '../constant/data';
import CustomButton from '../Components/CustomButton';
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

const SignUpScreen = ({navigation}) => {
  const formRef = useRef();
  const setUser = useAuthStore(state => state.setUser);
  const [Check, setCheck] = useState(false);
  const [passwordCVisible, setPasswordCVisible] = useState(false);
  const handleSubmit = async values => {
    console.log('Submitting values:', values);
    try {
      const response = await fetch(
        'https://tor.appdevelopers.mobi/api/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: values.phone, // Update to use phone field
            password: values.password,
            name: values.name,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (response?.data?.status) {
        // If login is successful, show alert
        Alert.alert('SignUp Success', 'You have SignUp in successfully!', [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ]);

        // After successful submission, reset the form
        resetForm();
      } else {
        // Handle login failure
        Alert.alert('Login Failed', 'Invalid phone or password.');
      }
      console.log('Success:', data);
      navigation.navigate('SignInScreen');
      // Navigate to another screen or handle success state
      // navigation.navigate('SomeScreen'); // Uncomment and replace 'SomeScreen' with the target screen
    } catch (error) {
      console.error('Error:', error);
      // Handle error state, show error message to user
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../Assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>
          Fill in the below form and add life to your car!
        </Text>

        <Formik
          initialValues={{phone: '', password: '', name: ''}}
          validationSchema={validationSchema}
          innerRef={formRef}
          onSubmit={values => handleSubmit(values)}>
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
                <Text style={styles.label}>Name</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#808080',
                    borderRadius: Metrics.rfv(8),
                    paddingHorizontal: Metrics.rfv(5),
                  }}>
                  <Image
                    source={require('../Assets/mail.png')}
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    placeholderTextColor={Colors.grey}
                    placeholder="Enter your name"
                  />
                </View>
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>
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
              <Text style={styles.label}>Password</Text>
              <PasswordInput
                value={values.password}
                onChangeText={handleChange('password')}
                error={touched.password && errors.password}
                placeholder={'passward'}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setCheck(!Check);
                  }}>
                  <MaterialCommunityIcons
                    name={
                      Check
                        ? 'checkbox-marked-outline'
                        : 'checkbox-blank-outline'
                    }
                    size={30}
                    color={Colors.black}
                    style={{marginRight: Metrics.rfv(10)}}
                  />
                </TouchableOpacity>

                <Text style={styles.forgotPasswordText}>Agree with</Text>

                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(privacy_Policy);
                  }}>
                  <Text style={styles.forgotPasswordText1}>
                    Terms & conditions
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
              <CustomButton title="Sign Up" onPress={handleSubmit} />

              <View style={styles.footer}>
                <View style={styles.signUpContainer}>
                  <Text style={styles.signInText}>
                    Already have an account?{' '}
                  </Text>
                  <TouchableOpacity
                    hitSlop={appHitSlop(10, 10, 10, 10)}
                    onPress={() => {
                      // console.log('insidee');
                      navigation.navigate('SignInScreen');
                    }}>
                    <Text style={styles.signInText1}>Sign In </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.footerText1}>
                  By login or sign up, you agree to our terms of use and privacy
                  policy
                </Text>
              </View>
              <Image
                source={require('../Assets/belowSideLeft.png')}
                style={[
                  styles.cornerImage,
                  styles.bottomRight,
                  {
                    width: Metrics.rfv(200), // dynamically set width
                    height: Metrics.rfv(200), // dynamically set height
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Metrics.rfv(10),
    borderWidth: 1,
    marginBottom: Metrics.rfv(10),
    // borderColor: Colors.grey,
  },
  cornerImage: {
    width: width * 0.3, // 20% of screen width for corner images
    height: width * 0.3,
    position: 'absolute',
    resizeMode: 'contain',
  },
  bottomRight: {
    bottom: -200,
    right: 0,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(12),
    color: Colors.black,
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
  subtitle: {
    fontSize: Metrics.rfv(16),
    fontWeight: '400',
    color: '#808080',
    paddingHorizontal: Metrics.rfv(10),
    marginTop: Metrics.rfv(5),
    marginLeft: Metrics.rfv(10),
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
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: Metrics.rfv(10),
  },

  forgotPasswordText: {
    fontSize: Metrics.rfv(14),
    color: 'black',
    textDecorationLine: 'underline',
    marginRight: Metrics.rfv(10),
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
    // backgroundColor: 'pink',
    // position: 'absolute',
    // padding: Metrics.rfv(10),
  },
  footerText1: {
    fontSize: Metrics.rfv(12),
    textAlign: 'center',
    color: '#808080',
  },
  forgotPasswordText1: {
    fontSize: Metrics.rfv(14),
    color: '#A3CFFF',
  },
  icon: {
    marginLeft: Metrics.rfv(10),
  },
});

export default SignInScreen;
