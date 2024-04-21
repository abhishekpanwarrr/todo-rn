import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkTheme } from '../slices/theme.slice';
import { setToken, setUser } from '../slices/token.slice';

const LoginScreen = ({ navigation }: any) => {
  const token = useSelector((state: any) => state.token)
  console.log("🚀 ~ LoginScreen ~ token:", token)
  const dispatch = useDispatch()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hide, setHide] = useState(false);
  const handleLogin = async () => {
    if (email === '' || password === '') {
      return Alert.alert('Please fill all fields');
    }
    try {
      const user = {
        email,
        password,
      };
      const response = await fetch('http://localhost:8000/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log("🚀 ~ handleLogin ~ data:", data)
      if (response.status === 200) {
        setEmail('');
        setPassword('');
        dispatch(setToken(data?.token))
        dispatch(setUser(data?.user))
        return Alert.alert('Logged successfully');
      }
      if (response.status === 404) {
        setEmail('');
        setPassword('');
        return Alert.alert('User not found. Please register first!');
      }
      if (response.status === 401) {
        setEmail('');
        setPassword('');
        return Alert.alert('Wrong credentials');
      }
    } catch (error) {
      console.log('🚀 ~ handleLogin ~ error:', error);
      return Alert.alert('Please try again later.!');
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <View
        style={{
          marginTop: 80,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#0066b2',
          }}>
          TODO-LIST Tracker
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 20 }}>
            Login
          </Text>
        </View>

        <View
          style={{
            marginTop: 20,
            gap: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#e0e0e0',
              paddingVertical: 5,
              borderRadius: 5,
              gap: 3,
            }}>
            <Ionicons
              style={{
                marginLeft: 10,
              }}
              name={'mail-outline'}
              size={30}
              color={'gray'}
            />
            <TextInput
              placeholder="Enter your email"
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: 17,
              }}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#e0e0e0',
              paddingVertical: 5,
              borderRadius: 5,
              gap: 3,
            }}>
            <Ionicons
              style={{
                marginLeft: 10,
              }}
              name={hide ? 'lock-closed-outline' : 'lock-open-outline'}
              size={30}
              color={'gray'}
            />
            <TextInput
              placeholder="Enter your password"
              secureTextEntry={hide ? true : false}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: 17,
              }}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              onPress={() => setHide(hide => !hide)}
              style={{
                position: 'absolute',
                right: 10,
              }}>
              <Ionicons
                size={30}
                name={hide ? 'eye-outline' : 'eye-off-outline'}
                color={'gray'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>Keep me logged in</Text>
            <Text
              style={{
                fontWeight: '500',
                color: '#007fff',
              }}>
              Forgot password ?
            </Text>
          </View>
          <View style={{ marginTop: 30 }} />
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: '#6699cc',
              width: 300,
              padding: 15,
              borderRadius: 6,
              alignSelf: 'center',
              marginHorizontal: 'auto',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: 'white',
              }}>
              Log in
            </Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => navigation.navigate('Register')}
            style={{
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
              }}>
              Dont have an account? Register
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
