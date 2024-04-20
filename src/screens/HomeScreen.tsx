import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}>
        <Pressable
          style={{
            backgroundColor: '#7cb9e8',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}>
            All
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: '#7cb9e8',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}>
            Work
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: '#7cb9e8',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}>
            Personal
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
