import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you are using react-native-vector-icons
import {Colors} from '../Helpers/Colors';
import Metrics from '../Helpers/Metrics';
// import Colors from '../Helpers/Colors'; // Adjust path according to your project
// import Metrics from '../Helpers/Metrics';

const PasswordInput = ({
  value,
  onChangeText,
  error,
  touched,
  placeholder,
  style,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={[styles.passwordContainer, style]}>
      <Image source={require('../Assets/lock.png')} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || '*****'}
        placeholderTextColor={Colors.grey}
        secureTextEntry={!passwordVisible}
        style={styles.inputStyle}
      />
      <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
        <Icon
          name={passwordVisible ? 'visibility' : 'visibility-off'}
          size={24}
          color={Colors.grey}
          style={styles.iconRight}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(5),
    height: Metrics.rfv(40),
  },
  icon: {
    marginHorizontal: Metrics.rfv(10),
  },
  inputStyle: {
    flex: 1,
    paddingHorizontal: Metrics.rfv(10),
    color: Colors.black,
  },
  iconRight: {
    marginRight: Metrics.rfv(10),
  },
});

export default PasswordInput;
