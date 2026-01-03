import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { StatusCard } from '../components/StatusCard';
import { useCountdown } from '../hooks/useCountdown';
import { requestCurrentLocation } from '../services/locationService';
import { buildChallenge, Challenge } from '../utils/challenge';
import { formatSeconds } from '../utils/time';

export type SafetyTimerState = 'idle' | 'armed' | 'challenge' | 'escalated';

const INITIAL_DURATION_SECONDS = 120;

// 🧩 Main app experience focused on the safety workflow.
export const HomeScreen = () => {
  const [flow, setFlow] = useState<SafetyTimerState>('idle');
  const [challenge, setChallenge] = useState<Challenge>(() => buildChallenge());
  const [challengeInput, setChallengeInput] = useState('');
  const [location, setLocation] = useState<
    { latitude: number; longitude: number } | null
  >(null);
  const [statusMessage, setStatusMessage] = useState('');

  const { secondsLeft, setSecondsLeft, resetCountdown } = useCountdown(
    INITIAL_DURATION_SECONDS,
    flow === 'armed'
  );

  const locationText = useMemo(() => {
    if (!location) {
      return 'Location not available yet.';
    }
    return `Lat ${location.latitude.toFixed(5)}, Lon ${location.longitude.toFixed(
      5
    )}`;
  }, [location]);

  const startFlow = useCallback(async () => {
    setStatusMessage('');
    setChallengeInput('');
    setChallenge(buildChallenge());
    setSecondsLeft(INITIAL_DURATION_SECONDS);
    setFlow('armed');

    const coords = await requestCurrentLocation();
    if (!coords) {
      setStatusMessage('Location permission denied. Add your location manually.');
      return;
    }
    setLocation(coords);
  }, [setSecondsLeft]);

  const resetFlow = useCallback(() => {
    setFlow('idle');
    resetCountdown();
    setChallenge(buildChallenge());
    setChallengeInput('');
    setStatusMessage('');
  }, [resetCountdown]);

  const confirmResponsive = useCallback(() => {
    // Pause/reset the countdown while the user is solving the challenge.
    resetCountdown();
    setFlow('challenge');
    setChallengeInput('');
    setChallenge(buildChallenge());
  }, [resetCountdown]);

  const submitChallenge = useCallback(() => {
    if (challengeInput.trim() === challenge.answer) {
      setFlow('armed');
      resetCountdown();
      setStatusMessage('Check-in confirmed. Timer restarted.');
      setChallengeInput('');
      return;
    }
    Alert.alert('Try again', 'The answer did not match.');
  }, [challenge, challengeInput, resetCountdown]);

  useEffect(() => {
    if (flow !== 'armed') {
      return;
    }
    if (secondsLeft > 0) {
      return;
    }
    setFlow('escalated');
    setStatusMessage('No response. Preparing to alert emergency services.');
  }, [flow, secondsLeft]);

  const sendEmergencyAlert = useCallback(() => {
    Alert.alert(
      'Emergency alert placeholder',
      `This is where you would integrate 911/dispatch services.\n${locationText}`
    );
  }, [locationText]);

  return (
    <View>
      <StatusCard
        timerLabel={formatSeconds(secondsLeft)}
        locationText={locationText}
        statusMessage={statusMessage}
      />

      {flow === 'idle' ? (
        <PrimaryButton
          onPress={startFlow}
          label="Start safety timer"
          className="mt-8 items-center rounded-full bg-emerald-500 px-6 py-4"
          textClassName="text-base font-semibold text-slate-900"
        />
      ) : null}

      {flow === 'armed' ? (
        <View className="mt-6 gap-4">
          <PrimaryButton
            onPress={confirmResponsive}
            label="I am responsive"
            className="items-center rounded-full bg-sky-400 px-6 py-4"
            textClassName="text-base font-semibold text-slate-900"
          />
          <PrimaryButton
            onPress={resetFlow}
            label="Cancel timer"
            className="items-center rounded-full border border-slate-400 px-6 py-4"
            textClassName="text-base font-semibold text-slate-200"
          />
        </View>
      ) : null}

      {flow === 'challenge' ? (
        <View className="mt-6 gap-4">
          <Text className="text-base font-semibold text-dawn">
            Quick check-in: solve
          </Text>
          <Text className="text-2xl font-bold text-emerald-300">
            {challenge.prompt}
          </Text>
          <TextInput
            value={challengeInput}
            onChangeText={setChallengeInput}
            keyboardType="number-pad"
            placeholder="Answer"
            placeholderTextColor="#94a3b8"
            accessibilityLabel="Answer to math challenge"
            className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-base text-dawn"
          />
          <PrimaryButton
            onPress={submitChallenge}
            label="Submit check-in"
            className="items-center rounded-full bg-emerald-500 px-6 py-4"
            textClassName="text-base font-semibold text-slate-900"
          />
        </View>
      ) : null}

      {flow === 'escalated' ? (
        <View className="mt-6 gap-4">
          <Text className="text-base font-semibold text-rose-200">
            No response detected. Send help now.
          </Text>
          <PrimaryButton
            onPress={sendEmergencyAlert}
            label="Trigger emergency alert"
            className="items-center rounded-full bg-rose-500 px-6 py-4"
            textClassName="text-base font-semibold text-slate-900"
          />
          <PrimaryButton
            onPress={resetFlow}
            label="Reset"
            className="items-center rounded-full border border-slate-400 px-6 py-4"
            textClassName="text-base font-semibold text-slate-200"
          />
        </View>
      ) : null}
    </View>
  );
};
