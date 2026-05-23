import { Stack } from "expo-router";
import "@/global.css"
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { QueryClient, QueryClientProvider,focusManager } from '@tanstack/react-query'
import { AppState } from 'react-native'
import { useEffect } from "react";
import { StatusBar } from 'expo-status-bar'


// SplashScreen.preventAutoHideAsync();
export default function RootLayout() {

  // SplashScreen.preventAutoHideAsync() tells Expo to keep the splash screen visible until you manually hide it with SplashScreen.hideAsync().

useEffect(()=>{
  AppState.addEventListener('change', (status) => {
    focusManager.setFocused(status === 'active')
  })
  // It keeps your feteched  data fresh when users switch between apps.
},[])


  const queryClient = new QueryClient()
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
  });

 
  useEffect(() => {
    if (fontsLoaded) {
      // SplashScreen.hideAsync();
    }
  }, [fontsLoaded]); // wait for fonts to load before rendering
  return (
    <QueryClientProvider client={queryClient}>
       <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false,contentStyle:
         { backgroundColor: '#FF3131' } }} />
    </QueryClientProvider>
  )
}
