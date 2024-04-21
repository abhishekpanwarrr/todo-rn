import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomModal, ModalContent, ModalPortal, ModalTitle, SlideAnimation } from "react-native-modals"
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const [isVisible, setIsVisible] = useState(false)
  const [todo, setTodo] = useState("")
  const [category, setCategory] = useState("All")
  const suggestions = [
    {
      id: "0",
      todo: "Drink Water, keep healthy",
    },
    {
      id: "1",
      todo: "Go Excercising",
    },
    {
      id: "2",
      todo: "Go to bed early",
    },
    {
      id: "3",
      todo: "Take pill reminder",
    },
    {
      id: "4",
      todo: "Go Shopping",
    },
    {
      id: "5",
      todo: "finish assignments",
    },
  ];
  const user = useSelector((state: any) => state.token.user);
  const dispatch = useDispatch()
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
  useEffect(() => {
    (async () => {
      console.log("ran");

      try {
        const response = await fetch(`http://localhost:8000/api/v1/todo/${user?.userId}/todos`, {
          method: "GET"
        })

        const data = await response.json()
        setTodos(data?.todos)
        const fetchedTodo = data?.todos || []
        const pendingTodos = fetchedTodo.filter((todo: any) => todo.status !== "completed")
        const completedTodos = fetchedTodo.filter((todo: any) => todo.status === "completed")
        setPendingTodos(pendingTodos)
        setCompletedTodos(completedTodos)
      } catch (error) {
        console.log('Error:', error);
        Alert.alert("Something went wrong. Please try again later")
      }
    })()
  }, [marked, isVisible])

  const setMarkedTodo = async (todoId: any) => {
    try {
      setMarked(true)
      const response = await fetch(`http://localhost:8000/api/v1/todo/${todoId}/complete`, {
        method: "PATCH"
      })
      const data = await response.json();
      setMarked(false)
    } catch (error) {
      console.log("🚀 ~ setMarkedTodo ~ error:", error)
    }
  }

  return (
    <>
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
            onPress={() => setIsVisible(true)}
            style={{
              backgroundColor: '#007fff',
              borderRadius: 50,
            }}>
            <Ionicons name={'add-circle-outline'} size={30} color="#fff" />
          </Pressable>
        </View>
        <ScrollView>
          <View
            style={{
              padding: 10,
              flex: 1,
            }}>
            {todos?.length > 0 ? (
              <View>
                {pendingTodos.length > 0 && (
                  <Text>Tasks to do!!!</Text>
                )}
                {pendingTodos.length > 0 && pendingTodos.map((todo) => (
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

                {completedTodos?.length > 0 && (
                  <View>
                    {/* <View style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 10
                    }}>
                      <Image
                        style={{
                          width: 100,
                          height: 100
                        }}
                        source={{
                          uri: "https://cdn-icons.png.flaticon.com/128/6784/6784655.png"
                        }}
                      />
                    </View> */}
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
                    {completedTodos.length > 0 && completedTodos.map((todo) => (
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
                  </View>
                )}
              </View>
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
            )}
          </View>
        </ScrollView>
        <BottomModal
          // onBackDropPress={() => setIsVisible(!isVisible)}
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
      </SafeAreaView>
      <ModalPortal />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
