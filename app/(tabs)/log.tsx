import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Activity, 
  Clock, 
  Flame, 
  Plus,
  Dumbbell,
  Timer,
  MapPin
} from 'lucide-react-native';

export default function LogScreen() {
  const [selectedCategory, setSelectedCategory] = useState('workouts');

  const categories = [
    { id: 'workouts', label: 'Workouts', icon: Activity },
    { id: 'meals', label: 'Meals', icon: Flame },
    { id: 'sleep', label: 'Sleep', icon: Clock },
  ];

  const recentWorkouts = [
    {
      id: 1,
      name: 'Morning Run',
      duration: '35 min',
      calories: 320,
      type: 'Cardio',
      time: '7:30 AM',
      location: 'Central Park',
    },
    {
      id: 2,
      name: 'Strength Training',
      duration: '45 min',
      calories: 280,
      type: 'Strength',
      time: '6:00 PM',
      location: 'Home Gym',
    },
    {
      id: 3,
      name: 'Yoga Session',
      duration: '30 min',
      calories: 150,
      type: 'Flexibility',
      time: '8:00 AM',
      location: 'Living Room',
    },
  ];

  const CategoryButton = ({ category }: { category: any }) => {
    const IconComponent = category.icon;
    const isActive = selectedCategory === category.id;
    
    return (
      <TouchableOpacity
        style={[styles.categoryButton, isActive && styles.activeCategoryButton]}
        onPress={() => setSelectedCategory(category.id)}
      >
        <IconComponent 
          size={20} 
          color={isActive ? '#FFFFFF' : '#718096'} 
        />
        <Text style={[
          styles.categoryButtonText,
          isActive && styles.activeCategoryButtonText
        ]}>
          {category.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const WorkoutCard = ({ workout }: { workout: any }) => (
    <View style={styles.workoutCard}>
      <View style={styles.workoutHeader}>
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutName}>{workout.name}</Text>
          <Text style={styles.workoutType}>{workout.type}</Text>
        </View>
        <View style={styles.workoutBadge}>
          <Text style={styles.workoutBadgeText}>{workout.time}</Text>
        </View>
      </View>
      
      <View style={styles.workoutStats}>
        <View style={styles.workoutStat}>
          <Timer size={16} color="#718096" />
          <Text style={styles.workoutStatText}>{workout.duration}</Text>
        </View>
        <View style={styles.workoutStat}>
          <Flame size={16} color="#FF6B35" />
          <Text style={styles.workoutStatText}>{workout.calories} cal</Text>
        </View>
        <View style={styles.workoutStat}>
          <MapPin size={16} color="#718096" />
          <Text style={styles.workoutStatText}>{workout.location}</Text>
        </View>
      </View>
    </View>
  );

  const QuickLogButton = ({ icon: Icon, label, color }: { icon: any, label: string, color: string }) => (
    <TouchableOpacity style={styles.quickLogButton}>
      <View style={[styles.quickLogIcon, { backgroundColor: `${color}15` }]}>
        <Icon size={24} color={color} />
      </View>
      <Text style={styles.quickLogText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity Log</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <CategoryButton key={category.id} category={category} />
          ))}
        </View>

        {selectedCategory === 'workouts' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Log</Text>
              <View style={styles.quickLogGrid}>
                <QuickLogButton 
                  icon={Activity} 
                  label="Cardio" 
                  color="#32CD32" 
                />
                <QuickLogButton 
                  icon={Dumbbell} 
                  label="Strength" 
                  color="#FF6B35" 
                />
                <QuickLogButton 
                  icon={Activity} 
                  label="Yoga" 
                  color="#9C27B0" 
                />
                <QuickLogButton 
                  icon={Activity} 
                  label="Sports" 
                  color="#4A90E2" 
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Workouts</Text>
              {recentWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </View>
          </>
        )}

        {selectedCategory === 'meals' && (
          <View style={styles.emptyState}>
            <Flame size={48} color="#E2E8F0" />
            <Text style={styles.emptyStateTitle}>No meals logged yet</Text>
            <Text style={styles.emptyStateDescription}>
              Start tracking your nutrition by logging your first meal
            </Text>
            <TouchableOpacity style={styles.emptyStateButton}>
              <Text style={styles.emptyStateButtonText}>Log Meal</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedCategory === 'sleep' && (
          <View style={styles.emptyState}>
            <Clock size={48} color="#E2E8F0" />
            <Text style={styles.emptyStateTitle}>No sleep data yet</Text>
            <Text style={styles.emptyStateDescription}>
              Track your sleep patterns for better health insights
            </Text>
            <TouchableOpacity style={styles.emptyStateButton}>
              <Text style={styles.emptyStateButtonText}>Log Sleep</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
  },
  addButton: {
    backgroundColor: '#32CD32',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeCategoryButton: {
    backgroundColor: '#32CD32',
  },
  categoryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#718096',
    marginLeft: 6,
  },
  activeCategoryButtonText: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  quickLogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickLogButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickLogIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickLogText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
  },
  workoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  },
  workoutName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  workoutType: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  workoutBadge: {
    backgroundColor: '#32CD32',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  workoutBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workoutStat: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  workoutStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  emptyStateButton: {
    backgroundColor: '#32CD32',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyStateButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});