
import React from 'react'
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return <Stack screenOptions={{ 
   headerShown: false,
  headerTransparent: true,
  headerTitle: '',
  headerLeft:()=> null 
  // presentation:'modal'
  }} />;
}

export default AuthLayout