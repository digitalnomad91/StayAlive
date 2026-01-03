import { Text, View } from 'react-native';

// 🧭 App header with brand styling.
export const Header = () => (
  <View className="gap-2">
    <Text className="text-3xl font-bold text-dawn">StayAlive</Text>
    <Text className="text-base text-slate-200">
      A harm-reduction companion that checks in when it matters.
    </Text>
  </View>
);
