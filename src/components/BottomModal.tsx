import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { BottomModal, ModalContent, ModalPortal, ModalTitle, SlideAnimation } from "react-native-modals"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { suggestions } from '../helpers/data';
interface Props {
    isVisible: boolean
    setIsVisible: (item: boolean) => void
    handleAddTodo: () => Promise<void>
    todo: string
    setTodo: (item: string) => void
    setCategory: (item: string) => void
}
const BottomModalContainer = ({ isVisible, setIsVisible, handleAddTodo, todo, setTodo, setCategory }: Props) => {
    return (
        <BottomModal
            // @ts-ignore
            onHardwareBackPress={() => setIsVisible(false)}
            swipeDirection={["up", "down"]}
            swipeThreshold={200}
            modalTitle={<ModalTitle title='Add a todo' />}
            modalAnimation={
                new SlideAnimation({
                    slideFrom: "bottom"
                })
            }
            visible={isVisible}
            onTouchOutside={() => setIsVisible(false)}
        >
            <ModalContent style={{
                width: "100%",
                height: 280
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10
                }}>
                    <TextInput style={{
                        padding: 10,
                        borderColor: "#e0e0e0",
                        borderWidth: 1, borderRadius: 5,
                        flex: 1
                    }} placeholder='Add todo' value={todo} onChangeText={setTodo} />
                    <Pressable onPress={handleAddTodo}>
                        <Ionicons name='send-outline' size={20} color={"#007fff"} />
                    </Pressable>
                </View>
                {/* Choose category */}
                <Text>Choose category</Text>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 10
                }}>
                    <Pressable
                        onPress={() => setCategory("Work")}
                        style={{
                            borderColor: "#e0e0e0",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderWidth: 1,
                            borderRadius: 10
                        }}>
                        <Text>Work</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setCategory("Personal")}
                        style={{
                            borderColor: "#e0e0e0",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderWidth: 1,
                            borderRadius: 10
                        }}>
                        <Text>Personal</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setCategory("Wishlist")}
                        style={{
                            borderColor: "#e0e0e0",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderWidth: 1,
                            borderRadius: 10
                        }}>
                        <Text>Wishlist</Text>
                    </Pressable>
                </View>
                {/* Suggestions */}
                <Text style={{
                    marginBottom: 10
                }}>Some suggestions</Text>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flexWrap: "wrap"
                }}>
                    {suggestions.map((suggestion, index) => (
                        <Pressable
                            onPress={() => setTodo(suggestion.todo)}
                            key={index} style={{
                                backgroundColor: "#f0f8ff",
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 10
                            }}>
                            <Text style={{

                            }}>{suggestion.todo}</Text>
                        </Pressable>
                    ))}
                </View>
            </ModalContent>
        </BottomModal>
    )
}

export default BottomModalContainer

const styles = StyleSheet.create({})