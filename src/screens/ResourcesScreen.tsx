import { Text, View } from 'react-native';

const resources = [
  {
    title: '📞 Emergency response',
    description:
      'Call 911 or your local emergency number if someone is unresponsive.',
  },
  {
    title: '🧡 Naloxone access',
    description:
      'Keep naloxone (Narcan) nearby. Many pharmacies and community orgs provide it.',
  },
  {
    title: '🤝 Community support',
    description:
      'Connect with local harm-reduction groups for safety planning and supplies.',
  },
];

// 📚 Support resources tab for quick guidance.
export const ResourcesScreen = () => (
  <View className="mt-6 gap-4">
    <Text className="text-xl font-semibold text-dawn">Support resources</Text>
    {resources.map((resource) => (
      <View key={resource.title} className="rounded-2xl bg-slate-900/60 p-4">
        <Text className="text-base font-semibold text-emerald-200">
          {resource.title}
        </Text>
        <Text className="mt-2 text-sm text-slate-200">
          {resource.description}
        </Text>
      </View>
    ))}
  </View>
);
