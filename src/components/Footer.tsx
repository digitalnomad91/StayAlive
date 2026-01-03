import { Text, View } from 'react-native';

// 🛟 Soft disclaimer for safety + emergency guidance.
export const Footer = () => (
  <View className="mt-10 rounded-2xl bg-slate-800/50 p-4">
    <Text className="text-sm text-slate-200">
      Safety note: This is a prototype. Always call emergency services if
      someone is unresponsive.
    </Text>
  </View>
);
