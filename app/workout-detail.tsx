import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Play, Clock, Target, Plus, Minus } from 'lucide-react-native';
import { router } from 'expo-router';

export default function WorkoutDetailScreen() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [sets, setSets] = useState([
    { reps: 12, weight: 60, completed: false },
    { reps: 10, weight: 65, completed: false },
    { reps: 8, weight: 70, completed: false }
  ]);

  const workout = {
    title: "Upper Body Strength",
    duration: "45 min",
    difficulty: "Intermediate",
    exercises: [
      {
        name: "Bench Press",
        sets: 3,
        reps: "8-12",
        restTime: "2-3 min",
        targetMuscles: ["Chest", "Shoulders", "Triceps"],
        instructions: "Lie on bench, grip bar slightly wider than shoulders, lower to chest, press up explosively."
      },
      {
        name: "Bent-Over Row",
        sets: 3,
        reps: "10-12",
        restTime: "2 min",
        targetMuscles: ["Back", "Biceps"],
        instructions: "Bend at hips, pull bar to lower chest, squeeze shoulder blades together."
      },
      {
        name: "Overhead Press",
        sets: 3,
        reps: "8-10",
        restTime: "2-3 min",
        targetMuscles: ["Shoulders", "Triceps"],
        instructions: "Press bar from shoulders to overhead, keep core tight throughout movement."
      }
    ]
  };

  const updateSet = (index: number, field: 'reps' | 'weight', increment: boolean) => {
    const newSets = [...sets];
    const currentValue = newSets[index][field];
    const change = field === 'weight' ? 2.5 : 1;
    newSets[index][field] = increment ? currentValue + change : Math.max(0, currentValue - change);
    setSets(newSets);
  };

  const toggleSetCompletion = (index: number) => {
    const newSets = [...sets];
    newSets[index].completed = !newSets[index].completed;
    setSets(newSets);
  };

  if (!isWorkoutActive) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft size={24} color="#1F2937" />
            </TouchableOpacity>
            <Text style={styles.title}>{workout.title}</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Workout Info */}
          <LinearGradient
            colors={['#3B82F6', '#1E40AF']}
            style={styles.workoutInfo}>
            <Text style={styles.workoutTitle}>{workout.title}</Text>
            <View style={styles.workoutMeta}>
              <View style={styles.metaItem}>
                <Clock size={16} color="white" />
                <Text style={styles.metaText}>{workout.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Target size={16} color="white" />
                <Text style={styles.metaText}>{workout.difficulty}</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Exercise List */}
          <View style={styles.exerciseList}>
            <Text style={styles.sectionTitle}>Exercises ({workout.exercises.length})</Text>
            {workout.exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseSets}>{exercise.sets} sets</Text>
                </View>
                <Text style={styles.exerciseReps}>{exercise.reps} reps • {exercise.restTime} rest</Text>
                <Text style={styles.exerciseMuscles}>
                  Targets: {exercise.targetMuscles.join(', ')}
                </Text>
              </View>
            ))}
          </View>

          {/* Start Button */}
          <View style={styles.footer}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.startButton}>
              <TouchableOpacity 
                style={styles.startButtonInner}
                onPress={() => setIsWorkoutActive(true)}>
                <Play size={20} color="white" fill="white" />
                <Text style={styles.startButtonText}>Start Workout</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Active Workout View
  const currentExerciseData = workout.exercises[currentExercise];
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.activeHeader}>
        <TouchableOpacity onPress={() => setIsWorkoutActive(false)} style={styles.backButton}>
          <ChevronLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.activeTitle}>Exercise {currentExercise + 1} of {workout.exercises.length}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.activeContent} showsVerticalScrollIndicator={false}>
        {/* Current Exercise */}
        <View style={styles.currentExercise}>
          <Text style={styles.exerciseTitle}>{currentExerciseData.name}</Text>
          <Text style={styles.exerciseInstructions}>{currentExerciseData.instructions}</Text>
        </View>

        {/* Sets Tracker */}
        <View style={styles.setsContainer}>
          <Text style={styles.setsTitle}>Sets & Reps</Text>
          {sets.map((set, index) => (
            <View key={index} style={styles.setRow}>
              <Text style={styles.setNumber}>Set {index + 1}</Text>
              
              <View style={styles.setInputs}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Weight</Text>
                  <View style={styles.inputGroup}>
                    <TouchableOpacity 
                      style={styles.adjustButton}
                      onPress={() => updateSet(index, 'weight', false)}>
                      <Minus size={16} color="#6B7280" />
                    </TouchableOpacity>
                    <Text style={styles.inputValue}>{set.weight}kg</Text>
                    <TouchableOpacity 
                      style={styles.adjustButton}
                      onPress={() => updateSet(index, 'weight', true)}>
                      <Plus size={16} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Reps</Text>
                  <View style={styles.inputGroup}>
                    <TouchableOpacity 
                      style={styles.adjustButton}
                      onPress={() => updateSet(index, 'reps', false)}>
                      <Minus size={16} color="#6B7280" />
                    </TouchableOpacity>
                    <Text style={styles.inputValue}>{set.reps}</Text>
                    <TouchableOpacity 
                      style={styles.adjustButton}
                      onPress={() => updateSet(index, 'reps', true)}>
                      <Plus size={16} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity 
                style={[styles.completeButton, set.completed && styles.completeButtonActive]}
                onPress={() => toggleSetCompletion(index)}>
                <Text style={[styles.completeButtonText, set.completed && styles.completeButtonTextActive]}>
                  ✓
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navButton, currentExercise === 0 && styles.navButtonDisabled]}
          onPress={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
          disabled={currentExercise === 0}>
          <Text style={[styles.navButtonText, currentExercise === 0 && styles.navButtonTextDisabled]}>
            Previous
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => {
            if (currentExercise < workout.exercises.length - 1) {
              setCurrentExercise(currentExercise + 1);
            } else {
              router.back();
            }
          }}>
          <Text style={styles.navButtonText}>
            {currentExercise === workout.exercises.length - 1 ? 'Finish' : 'Next Exercise'}
          </Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  workoutInfo: {
    margin: 20,
    marginTop: 0,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  workoutTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  workoutMeta: {
    flexDirection: 'row',
    gap: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  exerciseList: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  exerciseCard: {
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
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  exerciseSets: {
    fontSize: 14,
    color: '#6B7280',
  },
  exerciseReps: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  exerciseMuscles: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
  },
  startButton: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  // Active workout styles
  activeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  activeTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  activeContent: {
    flex: 1,
    padding: 20,
  },
  currentExercise: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  exerciseInstructions: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  setsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  setsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  setNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    width: 50,
  },
  setInputs: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 4,
  },
  adjustButton: {
    padding: 8,
  },
  inputValue: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  completeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  completeButtonActive: {
    backgroundColor: '#10B981',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  completeButtonTextActive: {
    color: 'white',
  },
  bottomNav: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  navButtonTextDisabled: {
    color: '#9CA3AF',
  },
});