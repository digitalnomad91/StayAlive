import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, View } from 'react-native';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { TabBar } from '../components/TabBar';
import { HomeScreen } from './HomeScreen';
import { ResourcesScreen } from './ResourcesScreen';

const tabs = [
  { id: 'home', label: 'Safety timer' },
  { id: 'resources', label: 'Support' },
];

// 🗺️ Main layout container with tabs + shared framing.
export const AppTabs = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View className="flex-1 bg-midnight" style={{ minHeight: '100vh', width: '100%' }}>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 bg-midnight" style={{ width: '100%' }}>
        <View className="flex-1 px-6 py-8">
          <Header />
          <TabBar tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          <View className="flex-1">
            {activeTab === 'home' ? <HomeScreen /> : <ResourcesScreen />}
          </View>

          <Footer />
        </View>
      </SafeAreaView>
    </View>
  );
};
