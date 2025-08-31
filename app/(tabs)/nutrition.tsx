import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Utensils, Droplet, Target, ChartBar as BarChart3, Camera } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "@/constants/colors";

export default function NutritionScreen() {
  const [selectedDay, setSelectedDay] = useState('Today');
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const styles = getStyles(theme);
  
  const days = ['Yesterday', 'Today', 'Tomorrow'];
  
  const dailyGoals = {
    calories: { consumed: 1580, goal: 2000 },
    protein: { consumed: 85, goal: 120 },
    carbs: { consumed: 180, goal: 250 },
    fat: { consumed: 45, goal: 70 },
    water: { consumed: 6, goal: 8 }
  };

  const meals = [
    {
      id: 1,
      type: 'Breakfast',
      time: '8:00 AM',
      food: 'Protein Oatmeal Bowl',
      calories: 420,
      protein: 25,
      completed: true
    },
    {
      id: 2,
      type: 'Lunch',
      time: '12:30 PM',
      food: 'Grilled Chicken Salad',
      calories: 580,
      protein: 35,
      completed: true
    },
    {
      id: 3,
      type: 'Snack',
      time: '3:00 PM',
      food: 'Greek Yogurt & Berries',
      calories: 180,
      protein: 15,
      completed: false
    },
    {
      id: 4,
      type: 'Dinner',
      time: '7:00 PM',
      food: 'Salmon & Vegetables',
      calories: 650,
      protein: 40,
      completed: false
    }
  ];

  const getProgressPercentage = (consumed: number, goal: number) => {
    return Math.min((consumed / goal) * 100, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nutrition</Text>
          <Text style={styles.subtitle}>Track your daily intake</Text>
        </View>

        {/* Day Selector */}
        <View style={styles.daySelector}>
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDay === day && styles.dayButtonActive
              ]}
              onPress={() => setSelectedDay(day)}>
              <Text style={[
                styles.dayButtonText,
                selectedDay === day && styles.dayButtonTextActive
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Calorie Progress */}
        <LinearGradient
          colors={['#10B981', '#059669']}
          style={styles.calorieCard}>
          <View style={styles.calorieHeader}>
            <Text style={styles.calorieTitle}>Daily Calories</Text>
            <Text style={styles.calorieRemaining}>
              {dailyGoals.calories.goal - dailyGoals.calories.consumed} remaining
            </Text>
          </View>
          <View style={styles.calorieProgress}>
            <Text style={styles.calorieValue}>
              {dailyGoals.calories.consumed} / {dailyGoals.calories.goal}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${getProgressPercentage(dailyGoals.calories.consumed, dailyGoals.calories.goal)}%` }
                ]}
              />
            </View>
          </View>
        </LinearGradient>

        {/* Macro Breakdown */}
        <View style={styles.macroContainer}>
          <Text style={styles.sectionTitle}>Macronutrients</Text>
          <View style={styles.macroGrid}>
            <View style={styles.macroCard}>
              <Text style={styles.macroLabel}>Protein</Text>
              <Text style={styles.macroValue}>{dailyGoals.protein.consumed}g</Text>
              <Text style={styles.macroGoal}>/{dailyGoals.protein.goal}g</Text>
            </View>
            <View style={styles.macroCard}>
              <Text style={styles.macroLabel}>Carbs</Text>
              <Text style={styles.macroValue}>{dailyGoals.carbs.consumed}g</Text>
              <Text style={styles.macroGoal}>/{dailyGoals.carbs.goal}g</Text>
            </View>
            <View style={styles.macroCard}>
              <Text style={styles.macroLabel}>Fat</Text>
              <Text style={styles.macroValue}>{dailyGoals.fat.consumed}g</Text>
              <Text style={styles.macroGoal}>/{dailyGoals.fat.goal}g</Text>
            </View>
          </View>
        </View>

        {/* Water Intake */}
        <View style={styles.waterContainer}>
          <View style={styles.waterHeader}>
            <Droplet size={20} color="#3B82F6" />
            <Text style={styles.waterTitle}>Water Intake</Text>
            <Text style={styles.waterProgress}>{dailyGoals.water.consumed}/{dailyGoals.water.goal} glasses</Text>
          </View>
          <View style={styles.waterDots}>
            {Array.from({ length: dailyGoals.water.goal }, (_, i) => (
              <View
                key={i}
                style={[
                  styles.waterDot,
                  i < dailyGoals.water.consumed && styles.waterDotFilled
                ]}
              />
            ))}
          </View>
        </View>

        {/* Meals */}
        <View style={styles.mealsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Meals</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
          
          {meals.map((meal) => (
            <View key={meal.id} style={styles.mealCard}>
              <View style={styles.mealHeader}>
                <View style={styles.mealTime}>
                  <Utensils size={16} color="#6B7280" />
                  <Text style={styles.mealType}>{meal.type}</Text>
                  <Text style={styles.mealTimeText}>{meal.time}</Text>
                </View>
                <View style={[
                  styles.mealStatus,
                  meal.completed && styles.mealStatusCompleted
                ]}>
                  <Text style={[
                    styles.mealStatusText,
                    meal.completed && styles.mealStatusTextCompleted
                  ]}>
                    {meal.completed ? 'Logged' : 'Pending'}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.mealFood}>{meal.food}</Text>
              <View style={styles.mealNutrition}>
                <Text style={styles.mealCalories}>{meal.calories} cal</Text>
                <Text style={styles.mealProtein}>{meal.protein}g protein</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Camera size={20} color="#3B82F6" />
            <Text style={styles.actionText}>Scan Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <BarChart3 size={20} color="#3B82F6" />
            <Text style={styles.actionText}>View Analytics</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing,
    backgroundColor: theme.background,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: theme.secondaryText,
  },
  daySelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  dayButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dayButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  dayButtonTextActive: {
    color: 'white',
  },
  calorieCard: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  calorieHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calorieTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calorieRemaining: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  calorieProgress: {
    alignItems: 'center',
  },
  calorieValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  macroContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  macroGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  macroCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  macroLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  macroGoal: {
    fontSize: 12,
    color: '#6B7280',
  },
  waterContainer: {
    backgroundColor: theme.cardBackground,
    marginHorizontal: theme.spacing,
    padding: theme.spacing,
    borderRadius: theme.borderRadius,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 24,
    elevation: 3,
  },
  waterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  waterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  waterProgress: {
    fontSize: 14,
    color: '#6B7280',
  },
  waterDots: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  waterDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  waterDotFilled: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  mealsContainer: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderRadius: 8,
  },
  mealCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealTime: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mealType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 6,
  },
  mealTimeText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
  },
  mealStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
  },
  mealStatusCompleted: {
    backgroundColor: '#D1FAE5',
  },
  mealStatusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#D97706',
  },
  mealStatusTextCompleted: {
    color: '#059669',
  },
  mealFood: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  mealNutrition: {
    flexDirection: 'row',
    gap: 16,
  },
  mealCalories: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  mealProtein: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
});