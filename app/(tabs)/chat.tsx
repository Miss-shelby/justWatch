/* eslint-disable react/no-unescaped-entities */
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const SafeAreaView = styled(RNSafeAreaView);

export default function Chat() {
  const [userMsg, setUserMsg] = useState('');
  
  return (
    <SafeAreaView className="bg-bg flex-1">
      {/* FIXED HEADER */}
      <View className="flex-row gap-4 border-b px-5 py-4 border-[#2A2A2A] bg-bg">
        <View className="bg-red h-10 w-10 flex justify-center items-center rounded-full">
          <Text className="text-white font-heading text-sm">AI</Text>
        </View>
        <View>
          <Text className="text-white text-lg font-heading">JustYou AI</Text>
          <View className="flex-row items-center gap-2">
            <View className="bg-[#4ADE80] h-1 w-1 rounded-full"></View>
            <Text className="text-[#4ADE80] font-body text-xs">Online</Text>
          </View>
        </View>
      </View>

      {/* SCROLLABLE MESSAGES */}
      <ScrollView 
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingVertical: 16, gap: 16 }}
      >
        {/* AI Message */}
        <View className="bg-card self-start border border-[#333] max-w-[82%] py-3 px-3 rounded-xl rounded-bl-sm">
          <Text className="text-[#ddd]">Hey! I'm your personal movie AI. Tell me your mood and I'll find your next favorite film.</Text>
        </View>

        {/* User Messages */}
        <View className="bg-red self-end border border-[#333] max-w-[82%] py-3 px-3 rounded-xl rounded-br-sm">
          <Text className="text-white">I love sci-fi movies</Text>
        </View>

        {/* AI Response */}
        <View className="bg-card self-start border border-[#333] max-w-[82%] py-3 px-3 rounded-xl rounded-bl-sm">
          <Text className="text-[#ddd]">Great! I found some amazing sci-fi films for you...</Text>
        </View>
         {/* User Messages */}
        <View className="bg-red self-end border border-[#333] max-w-[82%] py-3 px-3 rounded-xl rounded-br-sm">
          <Text className="text-white">What should I watch if I'm feeling nostalgic?</Text>
        </View>
        <View className="bg-card self-start border border-[#333] max-w-[82%] py-3 px-3 rounded-xl rounded-bl-sm">
          <Text className="text-[#ddd]">For a nostalgic night in, I'd suggest The Grand Budapest Hotel or Cinema Paradiso — a deeply emotional journey through cinema itself. What genre hits hardest for you?
        </Text>
        </View>

        {/* User typing message (if userMsg exists) */}
        {userMsg && (
          <View className="bg-red self-end border border-[#333] max-w-[82%] py-3 px-3 rounded-xl rounded-br-sm">
            <Text className="text-white">{userMsg}</Text>
          </View>
        )}
      </ScrollView>

      {/* FIXED INPUT AREA */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <View className="w-full relative flex-row items-center pb-20  border-t px-5 py-4 border-[#2A2A2A] bg-bg gap-3">
          <TextInput
            className='bg-[#252525] rounded-full border border-[#333] flex-1 px-4 pb-1 text-white placeholder:text-gray text-base h-12'
            autoCapitalize="none"
            value={userMsg}
            placeholder="Ask me anything about movies"
            placeholderTextColor="#666"
            onChangeText={setUserMsg}
          />
         <Pressable onPress={()=>setUserMsg('')} className="absolute right-28 top-7"> <Ionicons size={20} name="close" color='red'/></Pressable>
          <Pressable className="bg-red px-4 py-3 rounded-full">
            <Text className="text-white font-medium">Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}