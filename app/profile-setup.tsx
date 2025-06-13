import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { User, Target, Activity, ChevronDown } from 'lucide-react-native';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);

  const genders = [
    { id: 'male', label: 'Male', icon: '👨' },
    { id: 'female', label: 'Female', icon: '👩' },
    { id: 'other', label: 'Other', icon: '🧑' },
  ];

  const goals = [
    { id: 'lose-weight', label: 'Lose Weight', icon: '⚖️', description: 'Burn calories and shed pounds' },
    { id: 'build-muscle', label: 'Build Muscle', icon: '💪', description: 'Gain strength and muscle mass' },
    { id: 'stay-active', label: 'Stay Active', icon: '🏃', description: 'Maintain a healthy lifestyle' },
  ];

  const activityLevels = [
    { id: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
    { id: 'light', label: 'Light', description: '1-3 days per week' },
    { id: 'moderate', label: 'Moderate', description: '3-5 days per week' },
    { id: 'active', label: 'Active', description: '6-7 days per week' },
  ];

  const isFormComplete = selectedGender && selectedGoal && selectedActivity;

  const handleContinue = () => {
    if (isFormComplete) {
      router.push('/(tabs)');
    }
  };

  const GenderCard = ({ gender }: { gender: any }) => (
    <TouchableOpacity
      style={[
        styles.genderCard,
        selectedGender === gender.id && styles.selectedCard
      ]}
      onPress={() => setSelectedGender(gender.id)}
    >
      <Text style={styles.genderIcon}>{gender.icon}</Text>
      <Text style={[
        styles.genderText,
        selectedGender === gender.id && styles.selectedText
      ]}>
        {gender.label}
      </Text>
    </TouchableOpacity>
  );

  const GoalCard = ({ goal }: { goal: any }) => (
    <TouchableOpacity
      style={[
        styles.goalCard,
        selectedGoal === goal.id && styles.selectedCard
      ]}
      onPress={() => setSelectedGoal(goal.id)}
    >
      <Text style={styles.goalIcon}>{goal.icon}</Text>
      <Text style={[
        styles.goalTitle,
        selectedGoal === goal.id && styles.selectedText
      ]}>
        {goal.label}
      </Text>
      <Text style={styles.goalDescription}>{goal.description}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#87CEEB', '#32CD32']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Set Up Your Profile</Text>
          <Text style={styles.subtitle}>Help us personalize your fitness journey</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <User size={24} color="#FFFFFF" />
            <Text style={styles.sectionTitle}>Gender</Text>
          </View>
          <View style={styles.genderContainer}>
            {genders.map((gender) => (
              <GenderCard key={gender.id} gender={gender} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color="#FFFFFF" />
            <Text style={styles.sectionTitle}>Fitness Goal</Text>
          </View>
          <View style={styles.goalContainer}>
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color="#FFFFFF" />
            <Text style={styles.sectionTitle}>Activity Level</Text>
          </View>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowActivityDropdown(!showActivityDropdown)}
          >
            <Text style={styles.dropdownText}>
              {selectedActivity 
                ? activityLevels.find(level => level.id === selectedActivity)?.label 
                : 'Select activity level'
              }
            </Text>
            <ChevronDown size={20} color="#2D3748" />
          </TouchableOpacity>
          
          {showActivityDropdown && (
            <View style={styles.dropdownList}>
              {activityLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.dropdownItem,
                    selectedActivity === level.id && styles.selectedDropdownItem
                  ]}
                  onPress={() => {
                    setSelectedActivity(level.id);
                    setShowActivityDropdown(false);
                  }}
                >
                  <Text style={[
                    styles.dropdownItemTitle,
                    selectedActivity === level.id && styles.selectedDropdownText
                  ]}>
                    {level.label}
                  </Text>
                  <Text style={styles.dropdownItemDescription}>{level.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.continueButton, !isFormComplete && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!isFormComplete}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  genderCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#32CD32',
    shadowColor: '#32CD32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  genderIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  genderText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
  },
  selectedText: {
    color: '#32CD32',
  },
  goalContainer: {
    gap: 12,
  },
  goalCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  goalIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
  },
  dropdownList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  selectedDropdownItem: {
    backgroundColor: '#F0FFF4',
  },
  dropdownItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 2,
  },
  selectedDropdownText: {
    color: '#32CD32',
  },
  dropdownItemDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#32CD32',
  },
});