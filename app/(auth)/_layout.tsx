
import React from 'react'
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return <Stack screenOptions={{ 
   headerShown: true,
  headerTransparent: true,
  headerTitle: '',
  }} />;
}

export default AuthLayout