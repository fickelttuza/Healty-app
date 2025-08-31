import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Calendar, Target, Droplet } from 'lucide-react-native';
import { router } from 'expo-router';
import { theme } from '@/theme';
import { useColorScheme } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = theme[colorScheme];
  const styles = getStyles(colors);

  const todayWorkout = {
    title: "Upper Body Strength",
    duration: "45 min",
    difficulty: "Intermediate"
  };

  const dailyMetrics = {
    caloriesRemaining: 1247,
    caloriesGoal: 2000,
    waterIntake: 6,
    waterGoal: 8,
    steps: 8532,
    stepsGoal: 10000
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Morning!</Text>
          <Text style={styles.username}>Ready to crush your goals?</Text>
        </View>

        {/* Today's Workout Card */}
        <LinearGradient
          colors={[colors.accent, colors.accent + 'CC']}
          style={styles.workoutCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Today's Workout</Text>
            <Play size={24} color="white" />
          </View>
          <Text style={styles.workoutTitle}>{todayWorkout.title}</Text>
          <View style={styles.workoutDetails}>
            <Text style={styles.workoutMeta}>{todayWorkout.duration} • {todayWorkout.difficulty}</Text>
          </View>
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => router.push('/workouts')}>
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Target size={20} color={colors.accent} />
            <Text style={styles.statValue}>{dailyMetrics.caloriesRemaining}</Text>
            <Text style={styles.statLabel}>Calories Left</Text>
          </View>
          <View style={styles.statCard}>
            <Droplet size={20} color={colors.accent} />
            <Text style={styles.statValue}>{dailyMetrics.waterIntake}/{dailyMetrics.waterGoal}</Text>
            <Text style={styles.statLabel}>Glasses Water</Text>
          </View>
        </View>

        {/* Daily Meal Plan */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Meals</Text>
            <TouchableOpacity onPress={() => router.push('/nutrition')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.mealCard}>
            <View style={styles.mealTime}>
              <Calendar size={16} color={colors.secondaryText} />
              <Text style={styles.mealTimeText}>Breakfast • 8:00 AM</Text>
            </View>
            <Text style={styles.mealTitle}>Protein Oatmeal Bowl</Text>
            <Text style={styles.mealCalories}>420 calories</Text>
          </View>

          <View style={styles.mealCard}>
            <View style={styles.mealTime}>
              <Calendar size={16} color={colors.secondaryText} />
              <Text style={styles.mealTimeText}>Lunch • 12:30 PM</Text>
            </View>
            <Text style={styles.mealTitle}>Grilled Chicken Salad</Text>
            <Text style={styles.mealCalories}>580 calories</Text>
          </View>
        </View>

        {/* Motivational Quote */}
        <LinearGradient
          colors={[colors.accent + '33', colors.accent + '11']}
          style={styles.motivationCard}>
          <Text style={styles.motivationQuote}>
            "The only bad workout is the one that didn't happen."
          </Text>
          <Text style={styles.motivationAuthor}>- Unknown</Text>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing * 2,
    backgroundColor: colors.background
  },
  header: {
    marginBottom: 24,
    marginTop: theme.spacing
  },
  greeting: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 4,
    color: colors.text,
  },
  username: {
    fontSize: 16,
    color: colors.secondaryText,
  },
  workoutCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  workoutTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  workoutDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  workoutMeta: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  startButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: colors.accent,
    fontWeight: '600',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  seeAllText: {
    color: colors.accent,
    fontWeight: '500',
  },
  mealCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mealTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealTimeText: {
    fontSize: 14,
    color: colors.secondaryText,
    marginLeft: 8,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  mealCalories: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  motivationCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  motivationQuote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  motivationAuthor: {
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: 'right',
  },
});