import { Tabs } from 'expo-router';
import { Dumbbell, Chrome as Home, TrendingUp, User } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { theme } from '@/theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = theme[colorScheme];

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.secondaryText,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopWidth: 1,
            borderTopColor: colors.cardBackground,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            color: colors.text,
          },
        }}>
        {/* Tab screens */}
      </Tabs>
    </SafeAreaView>
  );
}