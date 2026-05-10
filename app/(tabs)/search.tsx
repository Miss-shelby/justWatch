import { Text, View, Image, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import image from "@/constants/image";
import { useAnimatedHeader } from "@/components/hooks/useAnimatedHeader";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

export default function SearchScreen() {
 const { scrollHandler } = useAnimatedHeader();
 const SafeAreaView = styled(RNSafeAreaView)

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      style={{ backgroundColor: '#0e0e0e' }}
      contentContainerStyle={{
        paddingTop: 80,
        paddingBottom: 100,
        paddingHorizontal: 20
      }}
    >
      <SafeAreaView>
      <Text className="text-white">Hello world</Text>
      <Image source={image.splashPattern} className="h-72 w-full mt-5" />
      <Image source={image.splashPattern} className="h-72 w-full mt-5" />
      <Image source={image.splashPattern} className="h-72 w-full mt-5" />
      <Image source={image.splashPattern} className="h-72 w-full mt-5" />
      <Image source={image.splashPattern} className="h-72 w-full mt-5" />

      </SafeAreaView>
    </Animated.ScrollView>
  );
}