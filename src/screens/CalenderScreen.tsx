import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from "moment"
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
const CalenderScreen = () => {
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://todo-rn-backend.vercel.app/api/v1/todo/todos/completed/${selectedDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json()
      const completedTodos = data.completedTodos || [];
      setTodos(completedTodos)
    })()
  }, [selectedDate])
  return (
    <SafeAreaView style={{
      backgroundColor: "white",
      flex: 1
    }}>
      <Calendar
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#7cb9e8" },
        }}
        onDayPress={day => setSelectedDate(day.dateString)}
      />

      <View style={{
        flex: 1,
        paddingHorizontal: 10
      }}>
        {todos?.length > 0 && (
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
            <ScrollView style={{
              marginBottom: 30,
              paddingBottom: 30
            }}>
              {todos.length > 0 && todos.map((todo) => (
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
                    {/* checkmark-circle-outline */}
                    {/* <Ionicons name='checkmark-outline' size={30} color={"black"} /> */}
                    <Ionicons name='checkmark-circle-outline' size={20} color={"gray"} />
                    <Text style={{ flex: 1, textDecorationLine: "line-through", color: "gray" }}>{todo?.title}</Text>
                    <Ionicons name='flag-outline' size={20} color={"black"} />
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default CalenderScreen

const styles = StyleSheet.create({})