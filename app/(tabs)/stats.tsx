import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VictoryChart, VictoryLine, VictoryArea, VictoryAxis, VictoryBar } from 'victory-native';
import { TrendingUp, Calendar, Activity, Flame, Moon, Weight } from 'lucide-react-native';

export default function StatsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('steps');

  const periods = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
  ];

  const metrics = [
    { id: 'steps', label: 'Steps', icon: Activity, color: '#32CD32' },
    { id: 'calories', label: 'Calories', icon: Flame, color: '#FF6B35' },
    { id: 'sleep', label: 'Sleep', icon: Moon, color: '#4A90E2' },
    { id: 'weight', label: 'Weight', icon: Weight, color: '#9C27B0' },
  ];

  // Sample data for different metrics and periods
  const chartData = {
    steps: {
      week: [
        { x: 'Mon', y: 8500 },
        { x: 'Tue', y: 10200 },
        { x: 'Wed', y: 9800 },
        { x: 'Thu', y: 11500 },
        { x: 'Fri', y: 9200 },
        { x: 'Sat', y: 12000 },
        { x: 'Sun', y: 8800 },
      ],
      month: [
        { x: 'Week 1', y: 68000 },
        { x: 'Week 2', y: 72000 },
        { x: 'Week 3', y: 69500 },
        { x: 'Week 4', y: 75000 },
      ],
      year: [
        { x: 'Q1', y: 820000 },
        { x: 'Q2', y: 890000 },
        { x: 'Q3', y: 950000 },
        { x: 'Q4', y: 920000 },
      ],
    },
    calories: {
      week: [
        { x: 'Mon', y: 1850 },
        { x: 'Tue', y: 2100 },
        { x: 'Wed', y: 1950 },
        { x: 'Thu', y: 2250 },
        { x: 'Fri', y: 1800 },
        { x: 'Sat', y: 2400 },
        { x: 'Sun', y: 1900 },
      ],
      month: [
        { x: 'Week 1', y: 14200 },
        { x: 'Week 2', y: 15800 },
        { x: 'Week 3', y: 14500 },
        { x: 'Week 4', y: 16200 },
      ],
      year: [
        { x: 'Q1', y: 180000 },
        { x: 'Q2', y: 195000 },
        { x: 'Q3', y: 210000 },
        { x: 'Q4', y: 185000 },
      ],
    },
    sleep: {
      week: [
        { x: 'Mon', y: 7.5 },
        { x: 'Tue', y: 8.2 },
        { x: 'Wed', y: 7.8 },
        { x: 'Thu', y: 8.5 },
        { x: 'Fri', y: 7.2 },
        { x: 'Sat', y: 9.1 },
        { x: 'Sun', y: 8.8 },
      ],
      month: [
        { x: 'Week 1', y: 8.1 },
        { x: 'Week 2', y: 7.9 },
        { x: 'Week 3', y: 8.3 },
        { x: 'Week 4', y: 8.0 },
      ],
      year: [
        { x: 'Q1', y: 7.8 },
        { x: 'Q2', y: 8.2 },
        { x: 'Q3', y: 8.0 },
        { x: 'Q4', y: 7.9 },
      ],
    },
    weight: {
      week: [
        { x: 'Mon', y: 72.5 },
        { x: 'Tue', y: 72.3 },
        { x: 'Wed', y: 72.1 },
        { x: 'Thu', y: 71.9 },
        { x: 'Fri', y: 71.8 },
        { x: 'Sat', y: 72.0 },
        { x: 'Sun', y: 71.7 },
      ],
      month: [
        { x: 'Week 1', y: 72.8 },
        { x: 'Week 2', y: 72.2 },
        { x: 'Week 3', y: 71.8 },
        { x: 'Week 4', y: 71.5 },
      ],
      year: [
        { x: 'Q1', y: 74.2 },
        { x: 'Q2', y: 73.1 },
        { x: 'Q3', y: 72.3 },
        { x: 'Q4', y: 71.8 },
      ],
    },
  };

  const currentData = chartData[selectedMetric as keyof typeof chartData][selectedPeriod as keyof typeof chartData.steps];
  const selectedMetricInfo = metrics.find(m => m.id === selectedMetric);

  const PeriodButton = ({ period }: { period: any }) => (
    <TouchableOpacity
      style={[
        styles.periodButton,
        selectedPeriod === period.id && styles.activePeriodButton
      ]}
      onPress={() => setSelectedPeriod(period.id)}
    >
      <Text style={[
        styles.periodButtonText,
        selectedPeriod === period.id && styles.activePeriodButtonText
      ]}>
        {period.label}
      </Text>
    </TouchableOpacity>
  );

  const MetricCard = ({ metric }: { metric: any }) => {
    const IconComponent = metric.icon;
    const isActive = selectedMetric === metric.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.metricCard,
          isActive && styles.activeMetricCard
        ]}
        onPress={() => setSelectedMetric(metric.id)}
      >
        <IconComponent 
          size={24} 
          color={isActive ? '#FFFFFF' : metric.color} 
        />
        <Text style={[
          styles.metricCardText,
          isActive && styles.activeMetricCardText
        ]}>
          {metric.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const getChartComponent = () => {
    if (selectedMetric === 'weight') {
      return (
        <VictoryChart
          height={200}
          padding={{ left: 60, top: 20, right: 20, bottom: 40 }}
        >
          <VictoryLine
            data={currentData}
            style={{
              data: { stroke: selectedMetricInfo?.color, strokeWidth: 3 },
            }}
            animate={{
              duration: 1000,
              onLoad: { duration: 500 }
            }}
          />
          <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 12, fill: '#718096' } }} />
          <VictoryAxis style={{ tickLabels: { fontSize: 12, fill: '#718096' } }} />
        </VictoryChart>
      );
    }

    return (
      <VictoryChart
        height={200}
        padding={{ left: 60, top: 20, right: 20, bottom: 40 }}
      >
        <VictoryArea
          data={currentData}
          style={{
            data: { fill: `${selectedMetricInfo?.color}30`, stroke: selectedMetricInfo?.color, strokeWidth: 2 },
          }}
          animate={{
            duration: 1000,
            onLoad: { duration: 500 }
          }}
        />
        <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 12, fill: '#718096' } }} />
        <VictoryAxis style={{ tickLabels: { fontSize: 12, fill: '#718096' } }} />
      </VictoryChart>
    );
  };

  const getCurrentValue = () => {
    const latest = currentData[currentData.length - 1]?.y || 0;
    const previous = currentData[currentData.length - 2]?.y || 0;
    const change = latest - previous;
    const percentChange = previous > 0 ? (change / previous) * 100 : 0;
    
    return {
      current: latest,
      change: change,
      percentage: percentChange
    };
  };

  const stats = getCurrentValue();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
        <View style={styles.periodContainer}>
          {periods.map((period) => (
            <PeriodButton key={period.id} period={period} />
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsContainer}>
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>{selectedMetricInfo?.label}</Text>
            <View style={styles.statsContainer}>
              <Text style={styles.currentValue}>
                {selectedMetric === 'weight' ? `${stats.current.toFixed(1)}kg` : 
                 selectedMetric === 'sleep' ? `${stats.current.toFixed(1)}h` :
                 stats.current.toLocaleString()}
              </Text>
              <View style={[
                styles.changeContainer,
                stats.change >= 0 ? styles.positiveChange : styles.negativeChange
              ]}>
                <TrendingUp 
                  size={12} 
                  color={stats.change >= 0 ? '#32CD32' : '#FF1744'} 
                  style={[
                    styles.trendIcon,
                    stats.change < 0 && { transform: [{ rotate: '180deg' }] }
                  ]}
                />
                <Text style={[
                  styles.changeText,
                  stats.change >= 0 ? styles.positiveChangeText : styles.negativeChangeText
                ]}>
                  {Math.abs(stats.percentage).toFixed(1)}%
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.chart}>
            {getChartComponent()}
          </View>
        </View>

        <View style={styles.insightsContainer}>
          <Text style={styles.insightsTitle}>Insights</Text>
          <View style={styles.insightCard}>
            <Text style={styles.insightText}>
              {selectedMetric === 'steps' && 'You walked an average of 9,900 steps this week. Great consistency!'}
              {selectedMetric === 'calories' && 'Your calorie burn has increased by 12% compared to last week.'}
              {selectedMetric === 'sleep' && 'Your sleep quality improved with an average of 8.1 hours per night.'}
              {selectedMetric === 'weight' && 'You\'re on track with your weight goals. Keep up the great work!'}
            </Text>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  periodContainer: {
    flexDirection: 'row',
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 2,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activePeriodButton: {
    backgroundColor: '#32CD32',
  },
  periodButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#718096',
  },
  activePeriodButtonText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 2,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeMetricCard: {
    backgroundColor: '#32CD32',
    borderColor: '#32CD32',
  },
  metricCardText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginTop: 4,
  },
  activeMetricCardText: {
    color: '#FFFFFF',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentValue: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  positiveChange: {
    backgroundColor: '#F0FFF4',
  },
  negativeChange: {
    backgroundColor: '#FFF5F5',
  },
  trendIcon: {
    marginRight: 4,
  },
  changeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  positiveChangeText: {
    color: '#32CD32',
  },
  negativeChangeText: {
    color: '#FF1744',
  },
  chart: {
    backgroundColor: '#FFFFFF',
  },
  insightsContainer: {
    marginBottom: 32,
  },
  insightsTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D3748',
    lineHeight: 24,
  },
});