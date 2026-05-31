import { ActivityIndicator, Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import Animated from "react-native-reanimated";
import { useAnimatedHeader } from "@/components/hooks/useAnimatedHeader";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { login } from "@/services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";

export default function SignIn() {
  
  //  const { scrollHandler } = useAnimatedHeader();
  const SafeAreaView = styled(RNSafeAreaView);
  const router = useRouter();
  const { setIsSignedIn } = useAuth();

  const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  });

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [displayPassword, setDisplayPassword] = useState(true);

  const {
    success,
    data: validatedData,
    error: validationError,
  } = signInSchema.safeParse(formData);
  const fieldErrors = validationError?.flatten().fieldErrors || {};

  const mutation = useMutation<any, any, any>({
    mutationFn: login,

    onSuccess: async (response) => {
      const token = response.access_token;
      await AsyncStorage.setItem("access_token", token);
      Alert.alert("Signed in successfully!");
      Toast.show({ type: "success", text1: "Signed in successfully!" });
      setIsSignedIn(true); // Update auth state
      setTimeout(() => {
        router.push("/(tabs)");
      }, 1000);
    },
    onError: (error: any) => {
      // console.log(error, "login error");

      Alert.alert("Error", error?.response?.data?.message || "Login failed");
    },
  });

  return (
    <SafeAreaView className="flex-1 w-full bg-[#0e0e0e] p-5">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
          className="flex-1"
        >
          <View className="w-full items-center">
            <View className="flex-row">
              <Text className="text-white font-bold text-3xl ">Just</Text>
              <Text className="text-red font-bold text-3xl ">Watch</Text>
            </View>
          </View>
          <View className="flex-1 w-full items-center px-2">
            <View className="w-full items-center">
              <Text className="text-white text-center font-body text-2xl mt-14">
                Welcome Back!
              </Text>
              <Text className="text-white font-medium pt-3 text-center text-xl ">
                Please sign in to your account{"\n"}to continue
              </Text>
            </View>
            <View className="mt-14 w-full">
              <View className="w-full">
                <TextInput
                  className="bg-[#141414] w-full rounded-2xl border-none px-4 pt-3 pb-4.5 text-lg font-sans-medium text-white placeholder:text-gray!"
                  style={{ textAlignVertical: 'center', includeFontPadding: false }}
                  autoCapitalize="none"
                  value={formData.email}
                  placeholder="Email"
                  placeholderTextColor=""
                  onChangeText={(value) =>
                    setFormData((prev) => ({ ...prev, email: value }))
                  }
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, email: true }))
                  }
                  keyboardType="email-address"
                  autoComplete="email"
                />
                {touched.email && fieldErrors.email?.[0] && (
                  <Text className="text-red text-sm mt-1">
                    {fieldErrors.email[0]}
                  </Text>
                )}
              </View>
              <View className="w-full mt-6 relative">
                <TextInput
                  className="bg-[#141414] w-full rounded-2xl border-none px-4 pt-3 pb-4.5 text-lg font-sans-medium text-white placeholder:text-gray!"
                  style={{ textAlignVertical: 'center', includeFontPadding: false }}
                  autoCapitalize="none"
                  value={formData.password}
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  onChangeText={(value) =>
                    setFormData((prev) => ({ ...prev, password: value }))
                  }
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, password: true }))
                  }
                  secureTextEntry={displayPassword}
                  autoComplete="password"
                />
                <Pressable
                  onPress={() => setDisplayPassword(!displayPassword)}
                  className="absolute right-4 top-4"
                >
                  <Ionicons
                    name={displayPassword ? "eye-off" : "eye"}
                    color="#888888"
                    size={22}
                  />
                </Pressable>
                {touched.password && fieldErrors.password?.[0] && (
                  <Text className="text-red text-sm mt-1">
                    {fieldErrors.password[0]}
                  </Text>
                )}
              </View>
              <Pressable
                className={`bg-red  rounded-2xl px-10 mt-10 py-3 self-center ${
                  (mutation.isPending || !success) && "opacity-30"
                }`}
                onPress={() => {
                  if (success) {
                    mutation.mutate(validatedData);
                  } else {
                    Alert.alert(
                      "Validation Error",
                      "Please fix the errors before submitting.",
                    );
                  }
                }}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <View className="flex-row items-center gap-2">
                    <Text className="text-white text-body text-lg  ">
                      Signing
                    </Text>
                    <ActivityIndicator size={15} color="white" />
                  </View>
                ) : (
                  <Text className="text-white text-body text-lg">Sign In</Text>
                )}
              </Pressable>
              <View className="mx-auto my-6 h-px w-full bg-[#2a2a2a]" />
              <View className="mt-6 flex-row items-center justify-center gap-2">
                <Text className="text-white text-lg">Not Registered yet?</Text>
                <Link className="text-red" href="/(auth)/signUp">
                  SignUp
                </Link>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
