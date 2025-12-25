import { Text, View } from 'react-native';

type StatusCardProps = {
  timerLabel: string;
  locationText: string;
  statusMessage?: string;
};

// 📣 Shared status block for timer + location context.
export const StatusCard = ({
  timerLabel,
  locationText,
  statusMessage,
}: StatusCardProps) => (
  <View className="mt-6 rounded-2xl bg-slate-900/60 p-5">
    <Text className="text-lg font-semibold text-dawn">Current status</Text>
    <Text className="mt-2 text-4xl font-semibold text-dawn">{timerLabel}</Text>
    <Text className="mt-1 text-sm text-slate-300">{locationText}</Text>
    {statusMessage ? (
      <Text className="mt-2 text-sm text-amber-200">{statusMessage}</Text>
    ) : null}
  </View>
);
