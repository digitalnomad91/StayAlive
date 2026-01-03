import { Pressable, Text, View } from 'react-native';

type TabOption = {
  id: string;
  label: string;
};

type TabBarProps = {
  tabs: TabOption[];
  activeTab: string;
  onChange: (next: string) => void;
};

// 🧩 Lightweight tab bar for switching between core experiences.
export const TabBar = ({ tabs, activeTab, onChange }: TabBarProps) => (
  <View className="mt-6 flex-row rounded-full bg-slate-900/60 p-1">
    {tabs.map((tab) => {
      const isActive = tab.id === activeTab;
      return (
        <Pressable
          key={tab.id}
          onPress={() => onChange(tab.id)}
          accessibilityRole="tab"
          accessibilityState={{ selected: isActive }}
          accessibilityLabel={tab.label}
          className={`flex-1 items-center rounded-full px-4 py-2 ${
            isActive ? 'bg-emerald-400' : ''
          }`}
        >
          <Text
            className={`text-sm font-semibold ${
              isActive ? 'text-slate-900' : 'text-slate-200'
            }`}
          >
            {tab.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);
