import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const todos = [];

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
            marginRight: 'auto',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}>
            Personal
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: '#007fff',
            borderRadius: 50,
          }}>
          <Ionicons name={'add-circle-outline'} size={30} color="#fff" />
        </Pressable>
      </View>
      <ScrollView style={{}}>
        <View
          style={{
            padding: 10,
            flex: 1,
          }}>
          {todos?.length > 0 ? (
            <View></View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 130,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              <Image
                style={{width: 200, height: 200, resizeMode: 'contain'}}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/2387/2387679.png',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  fontWeight: '600',
                  textAlign: 'center',
                  color: '#000',
                }}>
                No Tasks for today! add a task
              </Text>
              <Pressable onPress={() => {}} style={{marginTop: 15}}>
                <Ionicons name={'add-circle-outline'} size={30} color="red" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
