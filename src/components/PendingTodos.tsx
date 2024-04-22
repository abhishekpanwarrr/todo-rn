import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
    pendingTodos: TTodo[]
    setMarkedTodo: (item: string) => void
}

export type TTodo = {
    _id: string
    title: string
    status: string
    category: string
    dueDate: string
    createdAt: string
    updatedAt: string
    __v: number
}

const PendingTodos = ({ pendingTodos, setMarkedTodo }: Props) => {
    return (
        <View>
            {pendingTodos?.length > 0 && (
                <Text>Tasks to do!!!</Text>
            )}
            {pendingTodos?.length > 0 && pendingTodos?.map((todo: TTodo) => (
                <Pressable key={todo?._id} style={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: 8, marginVertical: 5,
                    padding: 10
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5
                    }}>
                        <Ionicons name='ellipse-outline' onPress={() => setMarkedTodo(todo?._id)} size={20} color={"black"} />
                        <Text style={{ flex: 1 }}>{todo?.title}</Text>
                        <Ionicons name='flag-outline' size={20} color={"black"} />
                    </View>
                </Pressable>
            ))}
        </View>
    )
}

export default PendingTodos

const styles = StyleSheet.create({})