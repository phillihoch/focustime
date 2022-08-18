import React from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { colors } from '../utils/colors';
import { spacing, fontSizes } from '../utils/sizes';

export const FocusHistory = ({ history, selectSubject }) => {
  if (!history || !history.length)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Focused on nothing yet</Text>
      </View>
    );

  const Item = ({ item }) => (
    <TouchableOpacity onPress={() => selectSubject(item)}>
      <Text style={[styles.text, styles.historyElement]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Things you were focused on:</Text>
      <FlatList data={history} renderItem={Item} />
    </View>
  );
};

const styles = {
  container: {
    paddingHorizontal: spacing.lg,
  },
  headline: {
    color: colors.white,
    fontSize: fontSizes.md,
    marginBottom: spacing.sm,
  },
  text: {
    color: colors.white,
  },
  historyElement: {
    paddingVertical: spacing.sm,
    marginVertical: 2,
    fontSize: fontSizes.md,
    textAlign: 'center',
    borderRadius: spacing.sm,
    borderColor: colors.white,
    borderWidth: 2,
  },
};
