import { Stack,SplashScreen } from "expo-router";
import "@/global.css"
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { QueryClient, QueryClientProvider,focusManager } from '@tanstack/react-query'
import { AppState } from 'react-native'
import { useEffect } from "react";
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {

useEffect(()=>{
  AppState.addEventListener('change', (status) => {
    focusManager.setFocused(status === 'active')
  })

},[])
  const queryClient = new QueryClient()
  const [loaded] = useFonts({
    PlayfairDisplay_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
  });
 if (!loaded) return null; // wait for fonts to load before rendering
  return (
    <QueryClientProvider client={queryClient}>
       <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  )
}
