import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CalenderScreen from '../screens/CalenderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { useSelector } from 'react-redux';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Dashboard() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Calendar') {
                        iconName = 'calendar-number-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person-circle-outline';
                    } else {
                        iconName = 'ios-alert';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Calendar" component={CalenderScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
const Navigation = () => {
    const { token } = useSelector((state: any) => state.token)
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                {!token ? <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
                    : <Stack.Screen name="Dashboard" component={Dashboard} />}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation