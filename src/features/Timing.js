import React from 'react';
import { View } from 'react-native';
import { RoundedButton } from '../components/RoundedButton';

export function Timing({ onChangeTime }) {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton size={75} onPress={() => onChangeTime(5)} title="5" />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton size={75} onPress={() => onChangeTime(15)} title="15" />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton size={75} onPress={() => onChangeTime(20)} title="20" />
      </View>
    </>
  );
}

const styles = {
  timingButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
};
