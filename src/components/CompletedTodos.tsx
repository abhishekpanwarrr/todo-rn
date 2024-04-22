import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TTodo } from './PendingTodos';
interface Props {
    completedTodos: TTodo[]
}
const CompletedTodos = ({ completedTodos }: Props) => {
    return (
        <>
            {completedTodos?.length > 0 && (
                <View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: 'center',
                        gap: 10,
                        marginTop: 30
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "600"
                        }}>Completed tasks</Text>
                        <Ionicons name='caret-down-circle-outline' size={18} color={"black"} />
                    </View>
                    {completedTodos.length > 0 && completedTodos.map((todo: TTodo) => (
                        <Pressable key={todo?._id} style={{
                            backgroundColor: "#e0e0e0",
                            borderRadius: 8, marginVertical: 10,
                            padding: 10
                        }}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5
                            }}>
                                <Ionicons name='checkmark-circle-outline' size={20} color={"gray"} />
                                <Text style={{ flex: 1, textDecorationLine: "line-through", color: "gray" }}>{todo?.title}</Text>
                                <Ionicons name='flag-outline' size={20} color={"black"} />
                            </View>
                        </Pressable>
                    ))}
                </View>
            )}
        </>
    )
}

export default CompletedTodos