import { Tabs } from "expo-router";
import "@/global.css"
import { Ionicons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import { Image, StyleSheet } from "react-native"
import image from "@/constants/image";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#6b6b6b',
        animation: 'fade',
       
        // Frosted glass tab bar like Netflix
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          position: 'absolute', // allows content to scroll behind it
        },
        // Header transparent by default
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
          height: 100,
        },
        headerTitleAlign: 'left',
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize:22
        },
        // Profile icon on the right
        headerRight: () => (
            <Ionicons
            name="person-circle-outline"
            size={32}
            color="#ffffff"
            />
        ),
        headerLeftContainerStyle: {
            paddingLeft: 20, 
        },
        headerRightContainerStyle: {
            paddingRight: 20, 
        },
         
        // contentStyle: {
        //   backgroundColor: '#0e0e0e',
        // },
      }}
    >
      <Tabs.Screen name="index" options={{
        title: "Home",
        
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
        ),
       headerLeft: () => (
        <Image className="h-10 w-10 object-contain"
            source={image.logo}  
           
            />
        ),
      }} />
      <Tabs.Screen name="search" options={{
        title: "Search",
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? "search" : "search-outline"} color={color} size={size} />
        )
      }} />
      <Tabs.Screen name="favourite" options={{
        title: "Favourites",
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? "heart" : "heart-outline"} color={color} size={size} />
        )
      }} />
      <Tabs.Screen name="chat" options={{
        title: "Chat",
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} color={color} size={size} />
        )
      }} />
      <Tabs.Screen name="profile" options={{
        title: "Profile",
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? "person" : "person-outline"} color={color} size={size} />
        )
      }} />
    </Tabs>
  )
}