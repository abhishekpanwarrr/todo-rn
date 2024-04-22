import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ModalPortal } from "react-native-modals"
import { useSelector } from 'react-redux';
import BottomModalContainer from '../components/BottomModal';
import PendingTodos, { TTodo } from '../components/PendingTodos';
import CompletedTodos from '../components/CompletedTodos';
import TopNavigationBar from '../components/TopNavigationBar';

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState<TTodo[]>([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const [isVisible, setIsVisible] = useState(false)
  const [todo, setTodo] = useState("")
  const [category, setCategory] = useState("All")
  const [loading, setLoading] = useState(false)

  const user = useSelector((state: any) => state.token.user);
  const { theme } = useSelector((state: any) => state.theme);
  console.log("🚀 ~ HomeScreen ~ theme:", theme)

  const handleAddTodo = async () => {
    if (!todo) {
      return Alert.alert("Fill in to add todo.")
    }
    try {
      const todoData = {
        title: todo,
        category
      }
      const response = await fetch(`http://localhost:8000/api/v1/todo/${user?.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });
      if (response.status === 201) {
        console.log("response.status", response.status);
        setTodo("")
        setIsVisible(false)
        Alert.alert("Todo created successfully")
      }
    } catch (error) {
      Alert.alert("Please try again later!")
      console.log("🚀 ~ handleAddTodo ~ error:", error)
    }
  }

  const setMarkedTodo = async (todoId: any) => {
    try {
      setMarked(true)
      const response = await fetch(`https://todo-rn-backend.vercel.app/api/v1/todo/${todoId}/complete`, {
        method: "PATCH"
      })
      if (response.status === 200) {
        setMarked(false)
      }
    } catch (error) {
      console.log("🚀 ~ setMarkedTodo ~ error:", error)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://todo-rn-backend.vercel.app/api/v1/todo/${user?._id}/todos`, {
          method: "GET"
        })

        const data = await response.json()
        setTodos(data?.todos)
        const fetchedTodo = data?.todos || []
        const pendingTodos = fetchedTodo.filter((todo: any) => todo.status !== "completed")
        const completedTodos = fetchedTodo.filter((todo: any) => todo.status === "completed")
        setPendingTodos(pendingTodos)
        setCompletedTodos(completedTodos)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log('Error:', error);
        Alert.alert("Something went wrong. Please try again later")
      }
    })()
  }, [marked, isVisible])

  return (
    <View 
    // style={{
    //   flex: 1,
    //   backgroundColor: theme === "light" ? "#ddd" : "#fff",
    // }}
    >
      <SafeAreaView >
        <TopNavigationBar setIsVisible={setIsVisible} />
        <ScrollView>
          <View
            style={{
              padding: 10,
              flex: 1,
            }}>
            {!loading ? todos?.length > 0 ? (
              <View>
                <PendingTodos pendingTodos={pendingTodos} setMarkedTodo={setMarkedTodo} />
                <CompletedTodos completedTodos={completedTodos} />
              </View>
            ) : !loading ? (
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
                  style={{ width: 200, height: 200, resizeMode: 'contain' }}
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
                <Pressable onPress={() => setIsVisible(true)} style={{ marginTop: 15 }}>
                  <Ionicons name={'add-circle-outline'} size={30} color="red" />
                </Pressable>
              </View>
            ) : <View style={{
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 20
            }}>
              <Text style={{
                fontSize: 17,
                fontWeight: "600",
                textDecorationLine: "underline",
                textDecorationColor: "gray"
              }}>No tasks found</Text></View> : <View style={{
                flex: 1,
                minHeight: 300,
                justifyContent: "center",
                alignItems: "center"
              }}>
              <ActivityIndicator size={"large"} color={"Black"} /></View>}
          </View>
        </ScrollView>
        <BottomModalContainer
          handleAddTodo={handleAddTodo}
          isVisible={isVisible}
          setCategory={setCategory}
          setIsVisible={setIsVisible}
          setTodo={setTodo}
          todo={todo}
        />
      </SafeAreaView>
      <ModalPortal />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
