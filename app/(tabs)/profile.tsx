import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Settings, 
  Award, 
  TrendingUp, 
  Crown, 
  ChevronRight,
  Target,
  Calendar,
  Zap
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "@/constants/colors";

export default function ProfileScreen() {
  const [showProgress, setShowProgress] = useState(true);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const styles = getStyles(theme);

  const userStats = {
    currentWeight: 72.5,
    startWeight: 78.0,
    goalWeight: 70.0,
    workoutsCompleted: 45,
    streakDays: 12,
    totalCaloriesBurned: 18420
  };

  const achievements = [
    { id: 1, title: '7-Day Streak', icon: 'calendar', earned: true },
    { id: 2, title: 'First Workout', icon: 'zap', earned: true },
    { id: 3, title: 'Protein Goal', icon: 'target', earned: true },
    { id: 4, title: '30-Day Streak', icon: 'award', earned: false }
  ];

  const menuItems = [
    { title: 'Personal Information', icon: User, hasChevron: true },
    { title: 'Goals & Preferences', icon: Target, hasChevron: true },
    { title: 'Progress Analytics', icon: TrendingUp, hasChevron: true },
    { title: 'Achievements', icon: Award, hasChevron: true },
    { title: 'Settings', icon: Settings, hasChevron: true }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Track your fitness journey</Text>
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <User size={32} color="#3B82F6" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Alex Johnson</Text>
            <Text style={styles.userGoal}>Fat Loss Journey</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Settings size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Premium Banner */}
        <LinearGradient
          colors={['#F59E0B', '#D97706']}
          style={styles.premiumBanner}>
          <Crown size={24} color="white" />
          <View style={styles.premiumContent}>
            <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
            <Text style={styles.premiumDescription}>
              Unlock AI coaching, advanced analytics & personalized meal plans
            </Text>
          </View>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userStats.currentWeight}kg</Text>
              <Text style={styles.statLabel}>Current Weight</Text>
              <Text style={styles.statChange}>-{(userStats.startWeight - userStats.currentWeight).toFixed(1)}kg</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userStats.workoutsCompleted}</Text>
              <Text style={styles.statLabel}>Workouts Done</Text>
              <Text style={styles.statChange}>This month</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userStats.streakDays}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
              <Text style={styles.statChange}>Keep it up!</Text>
            </View>
          </View>
        </View>

        {/* Achievements Preview */}
        <View style={styles.achievementsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.achievementsList}>
            {achievements.slice(0, 3).map((achievement) => (
              <View key={achievement.id} style={styles.achievementItem}>
                <View style={[
                  styles.achievementIcon,
                  achievement.earned && styles.achievementIconEarned
                ]}>
                  {achievement.icon === 'calendar' && <Calendar size={16} color={achievement.earned ? 'white' : '#6B7280'} />}
                  {achievement.icon === 'zap' && <Zap size={16} color={achievement.earned ? 'white' : '#6B7280'} />}
                  {achievement.icon === 'target' && <Target size={16} color={achievement.earned ? 'white' : '#6B7280'} />}
                  {achievement.icon === 'award' && <Award size={16} color={achievement.earned ? 'white' : '#6B7280'} />}
                </View>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.earned && styles.achievementTitleDisabled
                ]}>
                  {achievement.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <View style={styles.menuIcon}>
                  <item.icon size={20} color="#3B82F6" />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              {item.hasChevron && <ChevronRight size={20} color="#9CA3AF" />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme: { background: any; text: any; subtext: any; card: any; shadow: any; iconMuted: any; primary: any; muted: any; }) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: theme.subtext,
  },
  userCard: {
    backgroundColor: theme.card,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.iconMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 4,
  },
  userGoal: {
    fontSize: 14,
    color: theme.subtext,
  },
  editButton: {
    padding: 8,
  },
  premiumBanner: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  premiumContent: {
    flex: 1,
    marginLeft: 16,
  },
  premiumTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  premiumDescription: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
    lineHeight: 16,
  },
  upgradeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 12,
  },
  upgradeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.subtext,
    textAlign: 'center',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '500',
  },
  achievementsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: '600',
  },
  achievementsList: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementItem: {
    flex: 1,
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.iconMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementIconEarned: {
    backgroundColor: theme.primary,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.text,
    textAlign: 'center',
    lineHeight: 16,
  },
  achievementTitleDisabled: {
    color: theme.muted,
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: theme.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.iconMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.text,
  },
});