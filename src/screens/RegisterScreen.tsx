import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const RegisterScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hide, setHide] = useState(false);
  const handleRegister = async () => {
    if (email === '' || name === '' || password === '') {
      return Alert.alert('Please fill all fields');
    }
    try {
      const user = {
        name,
        email,
        password,
      };
      const response = await fetch(
        'http://10.0.2.2:8000/api/v1/user/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        },
      );
      if (response.status === 201) {
        setEmail('');
        setName('');
        setPassword('');
        return Alert.alert('Account created successfully');
      }
      if (response.status === 404) {
        setEmail('');
        setName('');
        setPassword('');
        return Alert.alert('Email already used. Please sign in instead');
      }
    } catch (error) {
      console.log('🚀 ~ handleRegister ~ error:', error);
      return Alert.alert('Please try again later.!');
    }
  };
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
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
          <Text style={{fontSize: 16, fontWeight: '600', marginTop: 20}}>
            Register
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
              name={'person-circle-outline'}
              size={30}
              color={'gray'}
            />
            <TextInput
              placeholder="Enter your full name"
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: 17,
              }}
              value={name}
              onChangeText={setName}
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
          <View style={{marginTop: 30}} />
          <Pressable
            onPress={handleRegister}
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
              Register
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={{
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
              }}>
              Already have an account? Login
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
