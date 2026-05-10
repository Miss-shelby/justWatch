import { Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView)
;
export default function Profile() {
  return (
    <SafeAreaView className="p-5 flex-1">
      <View className=""  >
        <Text className="text-red-500 text-3xl">PROFILE page</Text>
        <Text> Hello word again </Text>
      </View>

    </SafeAreaView>
  );
}
