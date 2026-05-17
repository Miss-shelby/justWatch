import { Text, View, Image, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert, ScrollView } from "react-native";
import Animated from "react-native-reanimated";
import { useAnimatedHeader } from "@/components/hooks/useAnimatedHeader";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/Api";
import Toast from "react-native-toast-message";

const signUpSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  username: z.string().min(1, "Username is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  password: z.string().min(12, "Password must be at least 12 characters"),
  confirm_password: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirm_password, {
  path: ["confirm_password"],
  message: "Passwords must match",
});

export default function SignUp() {
 const { scrollHandler } = useAnimatedHeader();
 const SafeAreaView = styled(RNSafeAreaView)
 const [formData, setFormData] = useState({
   email: "",
   password: "",
   username: "",
   first_name: "",
   last_name: "",
   confirm_password: "",
 });
 const [touched, setTouched] = useState({
   email: false,
   username: false,
   first_name: false,
   last_name: false,
   password: false,
   confirm_password: false,
 });
 const [displayPassword, setDisplayPassword] = useState(true)
 const [displayConfirmPassword, setDisplayConfirmPassword] = useState(true)
 const signUpValidation = signUpSchema.safeParse(formData);
 const formValid = signUpValidation.success;
 const fieldErrors = signUpValidation.success
   ? ({} as Record<string, string[]>)
   : signUpValidation.error.flatten().fieldErrors;
   const router = useRouter()

    const mutation = useMutation<any, any, any>({
    mutationFn: register, 
    onSuccess: (response: any) => {  
      const { data, message, status } = response;

      if (status === "success" && data?.profile) {
        // dispatch(setUser(data.profile));
        // Show success message
         Toast.show({
              type: "sucess",
              text1: data?.response?.data?.message || "User not verified",
              position: "top",
        });

        // Handle routing 
        router.push("/(auth)/signIn")
       
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        JSON.stringify(error?.response?.data?.message) ||
        "An error occurred";

      Alert.alert("Error", errorMessage);
      Toast.show({
           type: "error",
           text1: errorMessage,
           position: "top",
         });
      console.log(error?.response?.data,'error from react query');
      
    },
  });

  const onSubmit = () => {
    mutation.mutate(formData);
    // console.log(values,'login values');

    
  };

  return (
    // <Animated.ScrollView
    //  contentInsetAdjustmentBehavior="never"
    //   onScroll={scrollHandler}
    //   scrollEventThrottle={16}
    //   showsVerticalScrollIndicator ={false}
    //   style={{ backgroundColor: '#0e0e0e' }}
    //   contentContainerStyle={{
    //     flexGrow: 1,
    //     justifyContent: 'center',
    //     paddingTop: 0,
    //     paddingBottom: 40,
    //     paddingHorizontal: 20
    //   }}
    // >
      <SafeAreaView className="flex-1 w-full bg-[#0e0e0e] p-5">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            className="flex-1"
          >
          <ScrollView className="flex-1"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="w-full items-center">
              <View className="flex-row">
                  <Text className="text-white font-bold text-3xl ">Just</Text>
                  <Text className="text-red font-bold text-3xl ">Watch</Text>
              </View>
            </View>
            <View className="flex-1 mt-10 w-full justify-center items-center px-2">
              <View className="w-full items-center">
                  <Text className="text-white text-center font-body text-2xl ">Create Account!</Text>
                  <Text className="text-white font-medium pt-3 text-center text-xl ">Lets get you started and create your  {"\n"}account</Text>
              </View>
              <View className="mt-14 w-full">
                  <View className="w-full">
                      <TextInput 
                          className='bg-[#141414] w-full rounded-2xl border-none px-4 py-4 text-lg font-sans-medium text-white placeholder:text-gray!'
                          autoCapitalize="none"
                          value={formData.email}
                          placeholder="Email"
                          placeholderTextColor="rgba(255,255,255,0.4)"
                          onChangeText={(value) => setFormData((prev) => ({ ...prev, email: value }))}
                          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                          keyboardType="email-address"
                          autoComplete="email"
                                      />
                      {touched.email && fieldErrors.email?.[0] ? (
                        <Text className="text-red mt-2">{fieldErrors.email[0]}</Text>
                      ) : null}
                  </View>
                  <View className="w-full mt-6 relative">
                      <TextInput 
                          className='bg-[#141414] w-full rounded-2xl border-none px-4 py-4  text-lg font-sans-medium text-white placeholder:text-gray!'
                          autoCapitalize="none"
                          value={formData.username}
                          placeholder="Username"
                          placeholderTextColor="rgba(255,255,255,0.4)"
                          onChangeText={(value) => setFormData((prev) => ({ ...prev, username: value }))}
                          onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
                          keyboardType="default"
                          autoComplete="username"
                                      />
                      {touched.username && fieldErrors.username?.[0] ? (
                        <Text className="text-red mt-2">{fieldErrors.username[0]}</Text>
                      ) : null}
                  </View>
                  <View className="w-full mt-6 relative">
                      <TextInput 
                          className='bg-[#141414] w-full rounded-2xl border-none px-4 py-4  text-lg font-sans-medium text-white placeholder:text-gray!'
                          autoCapitalize="none"
                          value={formData.first_name}
                          placeholder="First Name"
                          placeholderTextColor="rgba(255,255,255,0.4)"
                          onChangeText={(value) => setFormData((prev) => ({ ...prev, first_name: value }))}
                          onBlur={() => setTouched((prev) => ({ ...prev, first_name: true }))}
                          keyboardType="default"
                          autoComplete="name"
                                      />
                      {touched.first_name && fieldErrors.first_name?.[0] ? (
                        <Text className="text-red mt-2">{fieldErrors.first_name[0]}</Text>
                      ) : null}
                  </View>
                  <View className="w-full mt-6 relative">
                      <TextInput 
                          className='bg-[#141414] w-full rounded-2xl border-none px-4 py-4  text-lg font-sans-medium text-white placeholder:text-gray!'
                          autoCapitalize="none"
                          value={formData.last_name}
                          placeholder="Last Name"
                          placeholderTextColor="rgba(255,255,255,0.4)"
                          onChangeText={(value) => setFormData((prev) => ({ ...prev, last_name: value }))}
                          onBlur={() => setTouched((prev) => ({ ...prev, last_name: true }))}
                          keyboardType="default"
                          autoComplete="name"
                                      />
                      {touched.last_name && fieldErrors.last_name?.[0] ? (
                        <Text className="text-red mt-2">{fieldErrors.last_name[0]}</Text>
                      ) : null}
                  </View>
                  <View className="w-full mt-6 relative">
                      <TextInput 
                          className='bg-[#141414] w-full rounded-2xl border-none px-4 py-4  text-lg font-sans-medium text-white placeholder:text-gray!'
                          autoCapitalize="none"
                          value={formData.password}
                          placeholder="Password"
                          placeholderTextColor="rgba(255,255,255,0.4)"
                          onChangeText={(value) => setFormData((prev) => ({ ...prev, password: value }))}
                          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                          secureTextEntry={displayPassword}
                          autoComplete="password"
                                      />
                          <Pressable onPress={() => setDisplayPassword(!displayPassword)} className="absolute right-4 top-4">
                              <Ionicons name={displayPassword ? "eye-off" : "eye"} color="#888888" size={22} />
                          </Pressable>
                      {touched.password && fieldErrors.password?.[0] ? (
                        <Text className="text-red mt-2">{fieldErrors.password[0]}</Text>
                      ) : null}
                  </View>
                  <View className="w-full mt-6 relative">
                      <TextInput 
                          className='bg-[#141414] w-full rounded-2xl border-none px-4 py-4  text-lg font-sans-medium text-white placeholder:text-gray!'
                          autoCapitalize="none"
                          value={formData.confirm_password}
                          placeholder="Confirm Password"
                          placeholderTextColor="rgba(255,255,255,0.4)"
                          onChangeText={(value) => setFormData((prev) => ({ ...prev, confirm_password: value }))}
                          onBlur={() => setTouched((prev) => ({ ...prev, confirm_password: true }))}
                          secureTextEntry={displayConfirmPassword}
                          autoComplete="password"
                                      />
                          <Pressable onPress={() => setDisplayConfirmPassword(!displayConfirmPassword)} className="absolute right-4 top-4">
                              <Ionicons name={displayConfirmPassword ? "eye-off" : "eye"} color="#888888" size={22} />
                          </Pressable>
                      {touched.confirm_password && fieldErrors.confirm_password?.[0] ? (
                        <Text className="text-red mt-2">{fieldErrors.confirm_password[0]}</Text>
                      ) : null}
                  </View>
                  
                  <Pressable onPress={onSubmit}
                  className={`bg-red  rounded-2xl px-10 mt-10 py-3 self-center ${(!formValid || mutation.isPending ) && ''}`}
                  disabled={!formValid || mutation.isPending} >
                      <Text className="text-white text-body text-lg  ">{
                          mutation.isPending?"Signing....":"Sign Up"
                          }</Text>
                  </Pressable>
                  <View className="mx-auto my-6 h-[1px] w-full bg-[#2a2a2a]" />
                  <View className="mt-6 flex-row items-center justify-center gap-2">
                      <Text className="text-white text-lg">Not Registered yet?</Text>
                      <Link className="text-red" href="/(auth)/signIn">SignIn</Link>
                  </View>
              </View>
            </View>

        </ScrollView>
          </KeyboardAvoidingView>
      </SafeAreaView>
    // </Animated.ScrollView>
  );
}