import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Metrics from '../Helpers/Metrics'; // Adjust the path according to your project
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const CustomButton = ({title, onPress, style, textStyle}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: Metrics.rfv(30),
    backgroundColor: '#A3CFFF',
    alignItems: 'center',
    marginTop: Metrics.rfv(20),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(40),
  },
  buttonText: {
    fontSize: Metrics.rfv(16),
    color: Colors.black,
    fontWeight: 'bold',
  },
});

export default CustomButton;
