import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Crown, Check, Zap, Brain, ChartBar as BarChart3, Users, Star } from 'lucide-react-native';
import { router } from 'expo-router';

export default function PremiumScreen() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = [
    {
      id: 'monthly',
      title: 'Monthly',
      price: '$9.99',
      period: '/month',
      savings: null
    },
    {
      id: 'yearly',
      title: 'Yearly',
      price: '$79.99',
      period: '/year',
      savings: 'Save 33%'
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI Personal Trainer',
      description: 'Get personalized workout plans that adapt to your progress'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Detailed insights into your performance and trends'
    },
    {
      icon: Zap,
      title: 'Smart Meal Plans',
      description: 'AI-generated meal plans based on your goals and preferences'
    },
    {
      icon: Users,
      title: 'Coach Access',
      description: 'Connect with certified trainers for personalized guidance'
    },
    {
      icon: Star,
      title: 'Premium Content',
      description: 'Access exclusive workouts and nutrition content'
    }
  ];

  const freeFeatures = [
    'Basic workout tracking',
    'Simple meal logging',
    'Progress photos',
    'Basic analytics'
  ];

  const premiumFeatures = [
    'AI-generated workout plans',
    'Smart meal planning',
    'Advanced progress analytics',
    'Wearable device integration',
    'Personal trainer access',
    'Custom exercise library',
    'Macro tracking & optimization',
    'Premium content library'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Bfit Premium</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={['#F59E0B', '#D97706']}
          style={styles.heroSection}>
          <Crown size={48} color="white" />
          <Text style={styles.heroTitle}>Unlock Your Full Potential</Text>
          <Text style={styles.heroSubtitle}>
            Get AI-powered coaching, advanced analytics, and personalized plans
          </Text>
        </LinearGradient>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Premium Features</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <feature.icon size={24} color="#3B82F6" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Comparison */}
        <View style={styles.comparisonContainer}>
          <Text style={styles.sectionTitle}>Free vs Premium</Text>
          
          <View style={styles.comparisonCard}>
            <View style={styles.comparisonSection}>
              <Text style={styles.comparisonTitle}>Free Plan</Text>
              {freeFeatures.map((feature, index) => (
                <View key={index} style={styles.comparisonItem}>
                  <Check size={16} color="#6B7280" />
                  <Text style={styles.comparisonText}>{feature}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.comparisonDivider} />
            
            <View style={styles.comparisonSection}>
              <View style={styles.premiumHeader}>
                <Text style={styles.comparisonTitle}>Premium Plan</Text>
                <Crown size={16} color="#F59E0B" />
              </View>
              {premiumFeatures.map((feature, index) => (
                <View key={index} style={styles.comparisonItem}>
                  <Check size={16} color="#10B981" />
                  <Text style={styles.comparisonText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Pricing */}
        <View style={styles.pricingContainer}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          <View style={styles.plansContainer}>
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  selectedPlan === plan.id && styles.planCardSelected
                ]}
                onPress={() => setSelectedPlan(plan.id)}>
                <View style={styles.planHeader}>
                  <Text style={styles.planTitle}>{plan.title}</Text>
                  {plan.savings && (
                    <View style={styles.savingsTag}>
                      <Text style={styles.savingsText}>{plan.savings}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.planPricing}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Subscribe Button */}
      <View style={styles.footer}>
        <LinearGradient
          colors={['#3B82F6', '#1E40AF']}
          style={styles.subscribeButton}>
          <TouchableOpacity style={styles.subscribeButtonInner}>
            <Text style={styles.subscribeButtonText}>
              Start Free Trial
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <Text style={styles.trialText}>
          7-day free trial, then {selectedPlan === 'monthly' ? '$9.99/month' : '$79.99/year'}
        </Text>
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
    paddingBottom: 0,
    backgroundColor: '#F59E0B',
  },
  backButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  heroSection: {
    padding: 40,
    alignItems: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  heroSubtitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  comparisonContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  comparisonCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  comparisonSection: {
    padding: 20,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  comparisonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  comparisonText: {
    fontSize: 14,
    color: '#4B5563',
  },
  comparisonDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  pricingContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  plansContainer: {
    gap: 12,
  },
  planCard: {
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
  planCardSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EBF4FF',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  savingsTag: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savingsText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  planPeriod: {
    fontSize: 14,
    color: '#6B7280',
  },
  footer: {
    padding: 20,
  },
  subscribeButton: {
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  subscribeButtonInner: {
    padding: 16,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  trialText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});