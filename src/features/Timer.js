import React, { useState } from "react";
import { View, Text, Vibration } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";

import { Countdown } from "../components/Countdown";
import { RoundedButton } from "../components/RoundedButton";
import { spacing, fontSizes } from "../utils/sizes";
import { colors } from "../utils/colors";

import { Timing } from "./Timing";

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  0.05 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.05 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.05 * ONE_SECOND_IN_MS,
  0.1 * ONE_SECOND_IN_MS,
  0.05 * ONE_SECOND_IN_MS,
];

export const Timer = ({focusSubject, clearSubject, onTimerEnd}) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  function setTimer (minutes) {
    setIsStarted(false);
    setMinutes(minutes)
  }
  
  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN)
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject)
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown 
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd} />
        <View style={{ marginTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{paddingTop: spacing.sm}}>
        <ProgressBar
          color={colors.primary}
          style={{height: spacing.sm}}
          progress={progress}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={setTimer} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="-" onPress={clearSubject} />
      </View>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: fontSizes.md,
    color: colors.white,
    textAlign: "center",
  },  
  task: {
    fontSize: fontSizes.lg,
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  clearSubjectWrapper: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}