import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
    setIsVisible: (i: boolean) => void
}

const TopNavigationBar = ({ setIsVisible }: Props) => {
    return (
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
                onPress={() => setIsVisible(true)}
                style={{
                    backgroundColor: '#007fff',
                    borderRadius: 50,
                }}>
                <Ionicons name={'add-circle-outline'} size={30} color="#fff" />
            </Pressable>
        </View>
    )
}

export default TopNavigationBar