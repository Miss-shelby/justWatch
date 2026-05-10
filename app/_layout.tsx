import { Stack,SplashScreen } from "expo-router";
import "@/global.css"
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';

export default function RootLayout() {
  const [loaded] = useFonts({
    PlayfairDisplay_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
  });
 if (!loaded) return null; // wait for fonts to load before rendering
  return <Stack  screenOptions={{headerShown:false}}/>;
}
