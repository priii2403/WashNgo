import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import OnBoardingScreen from '../Screens/OnBoardingScreen';
import SignInScreen from '../Screens/SignInScreen';
import SignUpScreen from '../Screens/SignUpScreem';
import SignUpScreem from '../Screens/SignUpScreem';
import SplashScreen from '../Screens/SplashScreen';

const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen" // Set the initial route here
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
    </Stack.Navigator>
  );
}
