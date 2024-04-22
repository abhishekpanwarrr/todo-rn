import { Dimensions, SafeAreaView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart } from "react-native-chart-kit";
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  const [completedTask, setCompletedTask] = useState(0);
  const [pendingTask, setPendingTask] = useState(0);
  
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`https://todo-rn-backend.vercel.app/api/v1/todo/todos/count`, {
          method: "GET"
        })
        console.log("response,response.status");
        const data = await response.json();
        setCompletedTask(data?.completedTotal)
        setPendingTask(data?.pendingTotal)
        console.log("🚀 ~ data:", data)
      } catch (error) {
        console.log("🚀 ~ error:", error)
      }
    })()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: 20, padding: 10, flex: 1, backgroundColor: "white" }}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
          borderWidth: 2,
          borderColor: "#eee",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 10
        }}>
          {/* speedometer-outline */}
          <Ionicons name='newspaper-outline' size={50} color={"#555"} />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
              Keep plans for 15 days
            </Text>
            <Text style={{ fontSize: 15, color: "gray", marginTop: 4 }}>
              Select Categories
            </Text>
          </View>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text>Tasks Overview</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginVertical: 8,
            }}
          >
            <View
              style={{
                backgroundColor: "#89CFF0",
                padding: 10,
                borderRadius: 8,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", color: "#000" }}
              >
                {completedTask}
              </Text>
              <Text style={{ marginTop: 4 }}>completed tasks</Text>
            </View>

            <View
              style={{
                backgroundColor: "#89CFF0",
                padding: 10,
                borderRadius: 8,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
              >
                {pendingTask}
              </Text>
              <Text style={{ marginTop: 4 }}>pending tasks</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#89CFF0",
            padding: 10,
            borderRadius: 6,
            marginTop: 15,
            marginBottom: 10
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>
            Tasks for the next seven days
          </Text>
        </View>
        <LineChart
          data={{
            labels: ["Pending Tasks", "Completed Tasks"],
            datasets: [
              {
                data: [pendingTask, completedTask],
              },
            ],
          }}
          width={Dimensions.get("window").width - 20}
          height={220}
          yAxisInterval={2}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            borderRadius: 16,
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen