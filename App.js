import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LogBox,
  SafeAreaView,
  useColorScheme,
  AppState,
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
// Adjust the path to your store
// import {Colors} from './Helpers/Colors';

// import Loader from './Components/Loader';
// import {Fonts} from './constant/data';
import AuthNavigation from './src/AuthNavigation/AuthNavigation';
import SplashScreen from './src/Screens/SplashScreen';
import {Colors} from './src/Helpers/Colors';

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [appState, setAppState] = useState(AppState.currentState);
  const [isConnected, setIsConnected] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  // useEffect(() => {
  //   const restoreState = async () => {
  //     try {
  //       // Check and set the device ID if necessary
  //       await checkDeviceId();

  //       // Delay to ensure the state is fully restored
  //       setIsLoading(false);
  //     } catch (e) {
  //       console.error('Failed to load the auth state:', e);
  //     }
  //   };

  //   restoreState();
  // }, [checkDeviceId]);
  // useEffect(() => {
  //   // Check internet connection when the app loads
  //   checkInternetConnection();

  //   // Subscribe to network state changes
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     setIsConnected(state.isConnected);
  //     if (!state.isConnected) {
  //       setModalVisible(true); // Show the modal if no internet
  //     } else {
  //       setModalVisible(false); // Hide the modal if internet is available
  //     }
  //   });

  //   // Cleanup the subscription on unmount
  //   return () => unsubscribe();
  // }, []);
  // const checkInternetConnection = () => {
  //   NetInfo.fetch().then(state => {
  //     setIsConnected(state.isConnected);
  //     if (!state.isConnected) {
  //       setModalVisible(true); // Show the modal if no internet
  //     } else {
  //       setModalVisible(false); // Hide the modal if internet is available
  //     }
  //   });
  // };
  // useEffect(() => {
  //   const handleAppStateChange = async nextAppState => {
  //     if (nextAppState === 'active') {
  //       console.log('1'), await checkDeviceId();
  //       checkTimeDifference(INACTIVITY_LIMIT);
  //       console.log('2'); // Check time difference when the app comes to foreground
  //     } else if (nextAppState === 'background') {
  //       setPreviousTime(); // Store the current time when the app goes to background
  //     }
  //     setAppState(nextAppState);
  //   };

  //   const subscription = AppState.addEventListener(
  //     'change',
  //     handleAppStateChange,
  //   );

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  // if (isLoading) {
  //   return (
  //     <SafeAreaView>
  //       <Loader />
  //     </SafeAreaView>
  //   );
  // }

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content" // or "dark-content" depending on your theme
      />
      {/* Your app's main content goes here */}

      <SafeAreaView style={backgroundStyle}>
        <NavigationContainer>
          <GestureHandlerRootView>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName="SplashScreen">
              <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
              {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
            </Stack.Navigator>
          </GestureHandlerRootView>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}

export default App;
