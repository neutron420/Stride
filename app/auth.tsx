import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, Mail, Lock, User, Calendar } from 'lucide-react-native';

export default function AuthScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
  });

  const validateSignup = () => {
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword || !signupForm.age) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    
    if (parseInt(signupForm.age) < 13) {
      Alert.alert('Age Requirement', 'You must be at least 13 years old to use this app');
      return false;
    }
    
    if (signupForm.password !== signupForm.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Simulate login
    router.push('/(tabs)');
  };

  const handleSignup = () => {
    if (validateSignup()) {
      router.push('/profile-setup');
    }
  };

  const TabButton = ({ title, isActive, onPress }: { title: string; isActive: boolean; onPress: () => void }) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
    >
      <Text style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const InputField = ({ 
    placeholder, 
    value, 
    onChangeText, 
    secureTextEntry, 
    keyboardType, 
    icon 
  }: {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: any;
    icon: React.ReactNode;
  }) => (
    <View style={styles.inputContainer}>
      <View style={styles.inputIcon}>
        {icon}
      </View>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#A0AEC0"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType || 'default'}
      />
    </View>
  );

  return (
    <LinearGradient colors={['#87CEEB', '#32CD32']} style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.welcomeText}>Welcome to Stride</Text>
            
            <View style={styles.tabContainer}>
              <TabButton
                title="Login"
                isActive={activeTab === 'login'}
                onPress={() => setActiveTab('login')}
              />
              <TabButton
                title="Sign Up"
                isActive={activeTab === 'signup'}
                onPress={() => setActiveTab('signup')}
              />
            </View>

            <View style={styles.formContainer}>
              {activeTab === 'login' ? (
                <>
                  <InputField
                    placeholder="Email"
                    value={loginForm.email}
                    onChangeText={(text) => setLoginForm({...loginForm, email: text})}
                    keyboardType="email-address"
                    icon={<Mail size={20} color="#A0AEC0" />}
                  />
                  
                  <View style={styles.inputContainer}>
                    <View style={styles.inputIcon}>
                      <Lock size={20} color="#A0AEC0" />
                    </View>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Password"
                      placeholderTextColor="#A0AEC0"
                      value={loginForm.password}
                      onChangeText={(text) => setLoginForm({...loginForm, password: text})}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} color="#A0AEC0" /> : <Eye size={20} color="#A0AEC0" />}
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                    <Text style={styles.primaryButtonText}>Login</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <InputField
                    placeholder="Full Name"
                    value={signupForm.name}
                    onChangeText={(text) => setSignupForm({...signupForm, name: text})}
                    icon={<User size={20} color="#A0AEC0" />}
                  />
                  
                  <InputField
                    placeholder="Email"
                    value={signupForm.email}
                    onChangeText={(text) => setSignupForm({...signupForm, email: text})}
                    keyboardType="email-address"
                    icon={<Mail size={20} color="#A0AEC0" />}
                  />
                  
                  <InputField
                    placeholder="Age"
                    value={signupForm.age}
                    onChangeText={(text) => setSignupForm({...signupForm, age: text})}
                    keyboardType="numeric"
                    icon={<Calendar size={20} color="#A0AEC0" />}
                  />
                  
                  <View style={styles.inputContainer}>
                    <View style={styles.inputIcon}>
                      <Lock size={20} color="#A0AEC0" />
                    </View>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Password"
                      placeholderTextColor="#A0AEC0"
                      value={signupForm.password}
                      onChangeText={(text) => setSignupForm({...signupForm, password: text})}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} color="#A0AEC0" /> : <Eye size={20} color="#A0AEC0" />}
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <View style={styles.inputIcon}>
                      <Lock size={20} color="#A0AEC0" />
                    </View>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Confirm Password"
                      placeholderTextColor="#A0AEC0"
                      value={signupForm.confirmPassword}
                      onChangeText={(text) => setSignupForm({...signupForm, confirmPassword: text})}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={20} color="#A0AEC0" /> : <Eye size={20} color="#A0AEC0" />}
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={styles.primaryButton} onPress={handleSignup}>
                    <Text style={styles.primaryButtonText}>Sign Up</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 4,
    marginBottom: 30,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
  },
  tabButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  activeTabButtonText: {
    color: '#2D3748',
  },
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#2D3748',
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#32CD32',
  },
});