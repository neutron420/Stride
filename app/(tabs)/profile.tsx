import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { User, Settings, Bell, Shield, Smartphone, LogOut, ChevronRight, CreditCard as Edit3, Mail, Calendar, Target } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // Clear user session here
            router.replace('/auth');
          }
        }
      ]
    );
  };

  const ProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>S</Text>
        </View>
        <TouchableOpacity style={styles.editAvatarButton}>
          <Edit3 size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>Sarah Johnson</Text>
        <Text style={styles.profileEmail}>sarah.johnson@email.com</Text>
        
        <View style={styles.profileStats}>
          <View style={styles.profileStat}>
            <Calendar size={16} color="#718096" />
            <Text style={styles.profileStatText}>Joined 3 months ago</Text>
          </View>
          <View style={styles.profileStat}>
            <Target size={16} color="#718096" />
            <Text style={styles.profileStatText}>Goal: Stay Active</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    onPress, 
    showChevron = true,
    danger = false 
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showChevron?: boolean;
    danger?: boolean;
  }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
    >
      <View style={styles.settingItemLeft}>
        <View style={[
          styles.settingIcon,
          danger && styles.dangerIcon
        ]}>
          <Icon 
            size={20} 
            color={danger ? '#FF1744' : '#718096'} 
          />
        </View>
        <View style={styles.settingContent}>
          <Text style={[
            styles.settingTitle,
            danger && styles.dangerText
          ]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.settingSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {showChevron && !danger && (
        <ChevronRight size={20} color="#A0AEC0" />
      )}
    </TouchableOpacity>
  );

  const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.settingSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ProfileHeader />

        <SettingSection title="Account">
          <SettingItem
            icon={Edit3}
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() => {}}
          />
          <SettingItem
            icon={Mail}
            title="Change Email"
            subtitle="sarah.johnson@email.com"
            onPress={() => {}}
          />
        </SettingSection>

        <SettingSection title="Preferences">
          <SettingItem
            icon={Bell}
            title="Notifications"
            subtitle="Manage your notification preferences"
            onPress={() => {}}
          />
          <SettingItem
            icon={Shield}
            title="Privacy Settings"
            subtitle="Control your data and privacy"
            onPress={() => {}}
          />
          <SettingItem
            icon={Smartphone}
            title="Connected Devices"
            subtitle="Manage your fitness devices"
            onPress={() => {}}
          />
        </SettingSection>

        <SettingSection title="App Settings">
          <SettingItem
            icon={Settings}
            title="General Settings"
            subtitle="Units, language, and more"
            onPress={() => {}}
          />
          <SettingItem
            icon={Target}
            title="Fitness Goals"
            subtitle="Update your fitness objectives"
            onPress={() => {}}
          />
        </SettingSection>

        <SettingSection title="Account Actions">
          <SettingItem
            icon={LogOut}
            title="Logout"
            onPress={handleLogout}
            showChevron={false}
            danger={true}
          />
        </SettingSection>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#32CD32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginBottom: 16,
  },
  profileStats: {
    gap: 8,
  },
  profileStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginLeft: 6,
  },
  settingSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dangerIcon: {
    backgroundColor: '#FFF5F5',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 2,
  },
  dangerText: {
    color: '#FF1744',
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
});