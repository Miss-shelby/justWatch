import { Platform, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";

// This defines what props this component accepts
// scrollY is the scroll position value shared from the screen
type Props = {
  scrollY: SharedValue<number>;
}

export function AnimatedHeader({ scrollY }: Props) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 80], [0, 1], 'clamp'),
  }));


   // iOS: blur effect
  if (Platform.OS === 'ios') {
    return (
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
      </Animated.View>
    );
  }
 // Android: solid dark background
  return (
    <Animated.View 
      style={[StyleSheet.absoluteFill, { backgroundColor: '#1E1E1E' }, animatedStyle]} 
    />
  );
}