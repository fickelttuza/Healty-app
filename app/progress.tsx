import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, TrendingUp, TrendingDown, Calendar, Target, Award, ChartBar as BarChart3 } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('Month');
  const [selectedMetric, setSelectedMetric] = useState('Weight');

  const periods = ['Week', 'Month', 'Year'];
  const metrics = ['Weight', 'Body Fat', 'Muscle Mass'];

  const progressData = {
    weight: {
      current: 72.5,
      change: -5.5,
      unit: 'kg',
      trend: 'down'
    },
    bodyFat: {
      current: 18.2,
      change: -3.8,
      unit: '%',
      trend: 'down'
    },
    muscleMass: {
      current: 65.8,
      change: +2.3,
      unit: 'kg',
      trend: 'up'
    }
  };

  const weeklyData = [
    { week: 'Week 1', weight: 78.0, workouts: 3 },
    { week: 'Week 2', weight: 77.2, workouts: 4 },
    { week: 'Week 3', weight: 76.1, workouts: 4 },
    { week: 'Week 4', weight: 75.3, workouts: 5 },
    { week: 'Week 5', weight: 74.8, workouts: 4 },
    { week: 'Week 6', weight: 73.9, workouts: 5 },
    { week: 'Week 7', weight: 73.1, workouts: 4 },
    { week: 'Week 8', weight: 72.5, workouts: 5 }
  ];

  const personalRecords = [
    { exercise: 'Bench Press', weight: 85, unit: 'kg', date: '2025-01-15' },
    { exercise: 'Deadlift', weight: 120, unit: 'kg', date: '2025-01-12' },
    { exercise: 'Squat', weight: 100, unit: 'kg', date: '2025-01-10' },
    { exercise: 'Overhead Press', weight: 55, unit: 'kg', date: '2025-01-08' }
  ];

  const achievements = [
    { title: 'First 5kg Lost', date: '2025-01-10', type: 'weight' },
    { title: '30-Day Streak', date: '2025-01-15', type: 'consistency' },
    { title: 'Protein Goal Master', date: '2025-01-12', type: 'nutrition' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.title}>Progress Analytics</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period)}>
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.periodButtonTextActive
              ]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsContainer}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            {Object.entries(progressData).map(([key, data]) => (
              <TouchableOpacity key={key} style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <Text style={styles.metricLabel}>
                    {key === 'bodyFat' ? 'Body Fat' : key === 'muscleMass' ? 'Muscle Mass' : 'Weight'}
                  </Text>
                  {data.trend === 'up' ? (
                    <TrendingUp size={16} color="#10B981" />
                  ) : (
                    <TrendingDown size={16} color="#10B981" />
                  )}
                </View>
                <Text style={styles.metricValue}>{data.current}{data.unit}</Text>
                <Text style={[
                  styles.metricChange,
                  data.trend === 'up' ? styles.metricChangePositive : styles.metricChangeNegative
                ]}>
                  {data.change > 0 ? '+' : ''}{data.change}{data.unit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Weight Progress Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Weight Progress</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Last 8 Weeks</Text>
              <BarChart3 size={20} color="#6B7280" />
            </View>
            
            {/* Simple Chart Visualization */}
            <View style={styles.chart}>
              {weeklyData.map((week, index) => {
                const maxWeight = Math.max(...weeklyData.map(w => w.weight));
                const minWeight = Math.min(...weeklyData.map(w => w.weight));
                const height = ((week.weight - minWeight) / (maxWeight - minWeight)) * 100 + 20;
                
                return (
                  <View key={index} style={styles.chartBar}>
                    <View style={styles.chartBarContainer}>
                      <View style={[styles.chartBarFill, { height: `${height}%` }]} />
                    </View>
                    <Text style={styles.chartLabel}>{week.weight}kg</Text>
                    <Text style={styles.chartWeek}>W{index + 1}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Personal Records */}
        <View style={styles.recordsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Records</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {personalRecords.slice(0, 3).map((record, index) => (
            <View key={index} style={styles.recordCard}>
              <View style={styles.recordInfo}>
                <Text style={styles.recordExercise}>{record.exercise}</Text>
                <Text style={styles.recordDate}>{record.date}</Text>
              </View>
              <View style={styles.recordValue}>
                <Text style={styles.recordWeight}>{record.weight}{record.unit}</Text>
                <Award size={16} color="#F59E0B" />
              </View>
            </View>
          ))}
        </View>

        {/* Recent Achievements */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          {achievements.map((achievement, index) => (
            <LinearGradient
              key={index}
              colors={['#10B981', '#059669']}
              style={styles.achievementCard}>
              <Award size={20} color="white" />
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDate}>Earned on {achievement.date}</Text>
              </View>
            </LinearGradient>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  periodButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  periodButtonTextActive: {
    color: 'white',
  },
  metricsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  metricsGrid: {
    gap: 12,
  },
  metricCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricChangePositive: {
    color: '#10B981',
  },
  metricChangeNegative: {
    color: '#10B981',
  },
  chartContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  chartCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    gap: 8,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
  },
  chartBarContainer: {
    flex: 1,
    width: '80%',
    justifyContent: 'flex-end',
  },
  chartBarFill: {
    backgroundColor: '#3B82F6',
    borderRadius: 4,
    minHeight: 20,
  },
  chartLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
  chartWeek: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
  recordsContainer: {
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
    color: '#3B82F6',
    fontWeight: '600',
  },
  recordCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recordInfo: {
    flex: 1,
  },
  recordExercise: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  recordDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  recordValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recordWeight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  achievementsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementInfo: {
    flex: 1,
    marginLeft: 12,
  },
  achievementTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDate: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
  },
});