import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Activity, 
  Flame, 
  Heart, 
  Moon, 
  Utensils, 
  Target,
  TrendingUp,
  Clock
} from 'lucide-react-native';

export default function HomeScreen() {
  const progressData = [
    { label: 'Steps', value: 8547, goal: 10000, icon: Activity, color: '#32CD32' },
    { label: 'Calories', value: 1240, goal: 2000, icon: Flame, color: '#FF6B35' },
    { label: 'Workouts', value: 3, goal: 5, icon: Heart, color: '#FF1744' },
  ];

  const quickActions = [
    { label: 'Log Workout', icon: Activity, color: '#32CD32' },
    { label: 'Track Sleep', icon: Moon, color: '#4A90E2' },
    { label: 'Add Meal', icon: Utensils, color: '#FF6B35' },
    { label: 'Set Goal', icon: Target, color: '#9C27B0' },
  ];

  const motivationalQuotes = [
    "Your only limit is your mind",
    "Great things never come from comfort zones",
    "Success starts with self-discipline",
    "Progress, not perfection",
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const ProgressCard = ({ item }: { item: any }) => {
    const percentage = Math.min((item.value / item.goal) * 100, 100);
    const IconComponent = item.icon;
    
    return (
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <IconComponent size={24} color={item.color} />
          <Text style={styles.progressLabel}>{item.label}</Text>
        </View>
        <Text style={styles.progressValue}>{item.value.toLocaleString()}</Text>
        <Text style={styles.progressGoal}>of {item.goal.toLocaleString()}</Text>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${percentage}%`, backgroundColor: item.color }
              ]} 
            />
          </View>
          <Text style={styles.progressPercentage}>{Math.round(percentage)}%</Text>
        </View>
      </View>
    );
  };

  const QuickActionButton = ({ action }: { action: any }) => {
    const IconComponent = action.icon;
    
    return (
      <TouchableOpacity style={styles.quickActionButton}>
        <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
          <IconComponent size={24} color={action.color} />
        </View>
        <Text style={styles.quickActionText}>{action.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#87CEEB', '#32CD32']} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.userName}>Sarah</Text>
          </View>
          <View style={styles.streakContainer}>
            <TrendingUp size={20} color="#FFFFFF" />
            <Text style={styles.streakText}>7 day streak</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.motivationCard}>
          <Text style={styles.motivationQuote}>"{randomQuote}"</Text>
          <View style={styles.motivationFooter}>
            <Clock size={16} color="#718096" />
            <Text style={styles.motivationTime}>Daily Motivation</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.progressContainer}
          >
            {progressData.map((item, index) => (
              <ProgressCard key={index} item={item} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <QuickActionButton key={index} action={action} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>12.5</Text>
              <Text style={styles.summaryLabel}>Avg Workouts</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>8.2h</Text>
              <Text style={styles.summaryLabel}>Avg Sleep</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>95%</Text>
              <Text style={styles.summaryLabel}>Goal Rate</Text>
            </View>
          </View>
        </View>
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
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  userName: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  motivationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: -20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  motivationQuote: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  motivationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  motivationTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginLeft: 4,
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
  progressContainer: {
    paddingRight: 24,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#718096',
    marginLeft: 8,
  },
  progressValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 2,
  },
  progressGoal: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#A0AEC0',
    marginBottom: 12,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginRight: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressPercentage: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#718096',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#32CD32',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 16,
  },
});