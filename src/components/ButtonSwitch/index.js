import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch } from 'react-native-elements';
import { COLORS } from '../../styles';
import { success } from '../../styles/color';

const ButtonSwitch = props => {
  return (
    <View
      style={
        props.checked
          ? [styles.switchContainer, styles.switchOn]
          : [styles.switchContainer, styles.switchOff]
      }>
      <Switch
        onValueChange={props.onValueChange}
        thumbColor="#FFF"
        trackColor={{ false: COLORS.gray, true: success }}
        value={props.checked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  switchOn: {
    backgroundColor: success,
  },
  switchOff: {
    backgroundColor: COLORS.gray,
  },
});

export default ButtonSwitch;
