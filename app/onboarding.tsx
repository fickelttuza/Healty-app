import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from "@/constants/colors";

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    goal: '',
    fitnessLevel: '',
    dietaryPreferences: [],
    equipment: [],
    weight: '',
    height: '',
    age: '',
    gender: ''
  });

  const steps = [
    {
      title: 'What\'s your main goal?',
      type: 'single-choice',
      options: ['Fat Loss', 'Muscle Gain', 'Maintain Weight', 'General Fitness']
    },
    {
      title: 'What\'s your fitness level?',
      type: 'single-choice',
      options: ['Beginner', 'Intermediate', 'Advanced']
    },
    {
      title: 'Any dietary preferences?',
      type: 'multi-choice',
      options: ['None', 'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Mediterranean']
    },
    {
      title: 'What equipment do you have?',
      type: 'multi-choice',
      options: ['None (Bodyweight)', 'Dumbbells', 'Resistance Bands', 'Pull-up Bar', 'Full Gym']
    },
    {
      title: 'Tell us about yourself',
      type: 'form',
      fields: ['weight', 'height', 'age', 'gender']
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSingleChoice = (option: string) => {
    const stepType = steps[currentStep].title.toLowerCase();
    if (stepType.includes('goal')) {
      setFormData({ ...formData, goal: option });
    } else if (stepType.includes('fitness')) {
      setFormData({ ...formData, fitnessLevel: option });
    }
  };

  const handleMultiChoice = (option: string) => {
    const stepType = steps[currentStep].title.toLowerCase();
    if (stepType.includes('dietary')) {
      const current = formData.dietaryPreferences;
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      setFormData({ ...formData, dietaryPreferences: updated });
    } else if (stepType.includes('equipment')) {
      const current = formData.equipment;
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      setFormData({ ...formData, equipment: updated });
    }
  };

  const renderStep = () => {
    const step = steps[currentStep];
    
    if (step.type === 'single-choice') {
      return (
        <View style={styles.optionsContainer}>
          {step.options?.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                (formData.goal === option || formData.fitnessLevel === option) && styles.optionButtonSelected
              ]}
              onPress={() => handleSingleChoice(option)}>
              <Text style={[
                styles.optionText,
                (formData.goal === option || formData.fitnessLevel === option) && styles.optionTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    if (step.type === 'multi-choice') {
      return (
        <View style={styles.optionsContainer}>
          {step.options?.map((option) => {
            const isSelected = formData.dietaryPreferences.includes(option) || formData.equipment.includes(option);
            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionButtonSelected
                ]}
                onPress={() => handleMultiChoice(option)}>
                <Text style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }

    if (step.type === 'form') {
      return (
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              value={formData.weight}
              onChangeText={(text) => setFormData({ ...formData, weight: text })}
              placeholder="Enter your weight"
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={formData.height}
              onChangeText={(text) => setFormData({ ...formData, height: text })}
              placeholder="Enter your height"
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
              style={styles.input}
              value={formData.age}
              onChangeText={(text) => setFormData({ ...formData, age: text })}
              placeholder="Enter your age"
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Gender</Text>
            <View style={styles.genderContainer}>
              {['Male', 'Female', 'Other'].map((gender) => (
                <TouchableOpacity
                  key={gender}
                  style={[
                    styles.genderButton,
                    formData.gender === gender && styles.genderButtonSelected
                  ]}
                  onPress={() => setFormData({ ...formData, gender })}>
                  <Text style={[
                    styles.genderText,
                    formData.gender === gender && styles.genderTextSelected
                  ]}>
                    {gender}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
          disabled={currentStep === 0}>
          <ChevronLeft size={24} color={currentStep === 0 ? '#D1D5DB' : '#6B7280'} />
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <Text style={styles.stepCounter}>{currentStep + 1} of {steps.length}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${((currentStep + 1) / steps.length) * 100}%` }]} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>
        {renderStep()}
      </ScrollView>

      <View style={styles.footer}>
        <LinearGradient
          colors={['#3B82F6', '#1E40AF']}
          style={styles.nextButton}>
          <TouchableOpacity style={styles.nextButtonInner} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
            <ChevronRight size={20} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  optionButton: {
    backgroundColor: Colors.cardBackground,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  progressContainer: {
    flex: 1,
  },
  stepCounter: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
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
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
  },
  stepCounter: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 32,
    lineHeight: 36,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionButtonSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EBF4FF',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  formContainer: {
    gap: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  genderButtonSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EBF4FF',
  },
  genderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  genderTextSelected: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  footer: {
    padding: 20,
  },
  nextButton: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});