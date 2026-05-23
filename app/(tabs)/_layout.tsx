import { Redirect, Tabs } from "expo-router";
import "@/global.css"
import { Ionicons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import { Image, Platform, StyleSheet } from "react-native"
import image from "@/constants/image";
import { useState } from "react";

export default function TabsLayout() {
  const [isSignedIn, setIsSignedIn] = useState(true)

  if (!isSignedIn) {
    return <Redirect href="/(auth)/signIn" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#6b6b6b',
        // animation: 'fade',
       
        // Frosted glass tab bar on iOS, solid on Android
        ...(Platform.OS === 'ios' 
          ? {
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
                position: 'absolute',
              },
            }
          : {
              tabBarStyle: {
                borderTopWidth: 0,
                backgroundColor: '#1E1E1E',
              },
            }
        ),

        // Header transparent by default
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
          height: 90,
        },
          headerTitleContainerStyle: {
          // paddingBottom: 10,  // pushes title down, reducing top space
        },
        headerTitleAlign: 'left',
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: 22
        },
        // Profile icon on the right
        // headerRight: () => (
        //   <Ionicons className="pb-[10px]"
        //     name="person-circle-outline"
        //     size={32}
        //     color="#ffffff"
        //   />
        // ),
        headerLeftContainerStyle: {
          paddingLeft: 20,  
        },
        headerRightContainerStyle: {
          paddingRight: 20, 
          // paddingBottom: 10

        },
      }}
    >
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
        ),
        headerLeft: () => (
          <Image 
            className="h-7 w-7 object-contain"
            source={image.logo}
          />
        ),
         headerRight: () => (  // ✅ moved here because i want it visible here only 
        <Ionicons
          name="person-circle-outline"
          size={32}
          color="#ffffff"
          style={{ paddingBottom: 10, paddingRight: 20 }}
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
        //  tabBarStyle: { display: 'none' },
          headerShown: false,
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? "heart" : "heart-outline"} color={color} size={size} />
        )
      }} />
      <Tabs.Screen name="chat" options={{
          title: "chat",
          headerShown: false,
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} color={color} size={size} />
        )
      }} />
      <Tabs.Screen name="profile" options={{
        title: "Profile",
         headerShown: false,
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? "person" : "person-outline"} color={color} size={size} />
        )
      }} />
       <Tabs.Screen name="movieDetails/[id]" options={{ 
        href: null,
         title:"",
         tabBarStyle: { display: 'none' },
          headerShown: false,
          }} />
    </Tabs>
  )
}