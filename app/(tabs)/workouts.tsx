import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Play, Clock, Zap, Target } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "@/constants/colors";

export default function WorkoutsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const styles = getStyles(theme);

  const workoutCategories = ['All', 'Upper Body', 'Lower Body', 'Core', 'Cardio', 'Full Body'];
  
  const workouts = [
    {
      id: 1,
      title: "Upper Body Strength",
      duration: "45 min",
      difficulty: "Intermediate",
      exercises: 8,
      category: "Upper Body",
      description: "Build strength in chest, shoulders, and arms"
    },
    {
      id: 2,
      title: "HIIT Cardio Blast",
      duration: "25 min",
      difficulty: "Advanced",
      exercises: 6,
      category: "Cardio",
      description: "High-intensity interval training for fat loss"
    },
    {
      id: 3,
      title: "Core Stability",
      duration: "20 min",
      difficulty: "Beginner",
      exercises: 5,
      category: "Core",
      description: "Strengthen your core and improve posture"
    },
    {
      id: 4,
      title: "Lower Body Power",
      duration: "50 min",
      difficulty: "Intermediate",
      exercises: 7,
      category: "Lower Body",
      description: "Build leg strength and explosive power"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10B981';
      case 'Intermediate': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || workout.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Workouts</Text>
          <Text style={styles.subtitle}>Find your perfect workout</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search workouts..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Filter Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}>
          {workoutCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                selectedFilter === category && styles.filterChipActive
              ]}
              onPress={() => setSelectedFilter(category)}>
              <Text style={[
                styles.filterChipText,
                selectedFilter === category && styles.filterChipTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Workout List */}
        <View style={styles.workoutList}>
          {filteredWorkouts.map((workout) => (
            <TouchableOpacity key={workout.id} style={styles.workoutCard}>
              <View style={styles.workoutHeader}>
                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutTitle}>{workout.title}</Text>
                  <Text style={styles.workoutDescription}>{workout.description}</Text>
                </View>
                <TouchableOpacity style={styles.playButton}>
                  <Play size={20} color="white" fill="white" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.workoutMeta}>
                <View style={styles.metaItem}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.metaText}>{workout.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Target size={14} color="#6B7280" />
                  <Text style={styles.metaText}>{workout.exercises} exercises</Text>
                </View>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(workout.difficulty) + '20' }]}>
                  <Text style={[styles.difficultyText, { color: getDifficultyColor(workout.difficulty) }]}>
                    {workout.difficulty}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* AI Workout Generator */}
        <LinearGradient
          colors={['#10B981', '#059669']}
          style={styles.aiCard}>
          <Zap size={24} color="white" />
          <Text style={styles.aiTitle}>AI Workout Generator</Text>
          <Text style={styles.aiDescription}>
            Get a personalized workout based on your goals and available time
          </Text>
          <TouchableOpacity style={styles.aiButton}>
            <Text style={styles.aiButtonText}>Generate Workout</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
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
    color: '#6B7280',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  filterButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterChipTextActive: {
    color: 'white',
  },
  workoutList: {
    paddingHorizontal: 20,
  },
  workoutCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  workoutInfo: {
    flex: 1,
    marginRight: 12,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  workoutDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  playButton: {
    backgroundColor: '#3B82F6',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  aiCard: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  aiTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  aiDescription: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 20,
    lineHeight: 20,
  },
  aiButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  aiButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});