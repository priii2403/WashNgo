import React, {useState} from 'react';
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
import {CheckBox} from 'react-native-elements';
import {Formik} from 'formik';
import Metrics from '../Helpers/Metrics';
import * as yup from 'yup'; // Add yup for form validation

const {width, height} = Dimensions.get('window');

// Validation schema for Formik
const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phone: yup
    .string()
    .matches(/^\d+$/, 'Phone number must be numeric')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignUpScreen = ({navigation}) => {
  const [checked, setChecked] = useState(false);

  const handleSubmit = async values => {
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
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>
          Fill in the below form and add life to your car!
        </Text>

        <Formik
          initialValues={{phone: '', password: '', name: ''}}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleSubmit(values);
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
                  <Image source={require('../Assets/mail.png')} style={{}} />
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    placeholder="Enter your name"
                  />
                </View>
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
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
                    placeholder="Enter your phone number"
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
                <CheckBox
                  containerStyle={{
                    margin: 0,
                    width: 5,
                    padding: 0,
                    marginLeft: 0,
                  }}
                  checked={checked}
                  onPress={() => setChecked(!checked)}
                />
                <Text style={styles.forgotPasswordText}>Agree with</Text>
                <Text style={styles.forgotPasswordText1}>
                  Terms & conditions
                </Text>
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

              <Image
                source={require('../Assets/belowSideLeft.png')}
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
                <View
                  style={{flexDirection: 'row', marginTop: Metrics.rfv(16)}}>
                  <Text style={styles.signInText}>
                    Already have an account?{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SignInScreen');
                    }}>
                    <Text style={styles.signInText1}>Sign Up </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.footerText1}>
                  By logging in or signing up, you agree to our terms of use and
                  privacy policy
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
  signInText1: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 12,
    color: 'black', // Make sign-in text blue to look like a link
  },
  logo: {
    width: width * 0.6,
    height: width * 0.333,
    resizeMode: 'contain',
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    position: 'absolute',
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
    textDecorationLine: 'underline',
  },
  subtitle: {
    fontSize: Metrics.rfv(14),
    fontFamily: 'Poppins-Black',
    fontWeight: '400',
    color: '#808080',
    paddingHorizontal: Metrics.rfv(10),
    textAlign: 'start',
    marginTop: Metrics.rfv(5),
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
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: Metrics.rfv(10),
  },
  forgotPasswordText: {
    fontSize: Metrics.rfv(14),
    marginLeft: Metrics.rfv(13),
    color: 'black',
  },
  forgotPasswordText1: {
    fontSize: Metrics.rfv(14),
    color: '#A3CFFF',
  },
  footer: {
    alignItems: 'center',
    marginTop: Metrics.rfv(20),
  },
  footerText: {
    fontSize: Metrics.rfv(14),
    color: 'black',
  },
  signUpLink: {
    fontSize: Metrics.rfv(14),
    color: '#808080',
    fontWeight: 'bold',
  },
  footerText1: {
    fontSize: Metrics.rfv(12),
    color: '#808080',
    textAlign: 'center',
    marginTop: Metrics.rfv(10),
  },
});

export default SignUpScreen;
