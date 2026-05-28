/* eslint-disable react/no-unescaped-entities */
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View, Keyboard } from "react-native";
import { useEffect, useState, useRef } from "react";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { postAiChat, useGetAiChatHistory } from "@/services/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatMessage, FailedMessage, PendingMessage } from "@/components/messages/MessagesUi";

const SafeAreaView = styled(RNSafeAreaView);



export default function Chat() { 
  const [userMsg, setUserMsg] = useState('');
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const queryClient = useQueryClient();
  const {data:chatHistory,isLoading,isError,refetch} = useGetAiChatHistory();

  const mutation = useMutation<any, any, any>({
    mutationFn: postAiChat,
    onSuccess: async () => {
      // Refetch real history from server, then clear pending
      await refetch();
      setPendingMessage(null);
    },
    onError: (error: any) => {
      console.log(error?.response?.data, "send message error");
      // Keep pendingMessage visible — FailedMessage will show retry/dismiss
    },
  });

  const messages = chatHistory?.result?.slice().reverse(); // Oldest first

  const handleSend = () => {
    if (!userMsg.trim()) return;
    const msgToSend = userMsg.trim();
    setPendingMessage(msgToSend);
    setUserMsg('');
    mutation.mutate(msgToSend);
  };

  const handleRetry = () => {
    if (pendingMessage) {
      mutation.mutate(pendingMessage);
    }
  };

  const handleDismiss = () => {
    setPendingMessage(null);
    mutation.reset();
  };


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
        ref={scrollViewRef}
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', paddingVertical: 16, gap: 16 }}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
      >
        {/* AI Message */}

        {isLoading && <Text className="text-gray text-center">Loading chat history...</Text>}
        {isError && !messages?.length &&  
           <View className=" flex-1 items-center justify-center">
            <Text className="text-white text-center">Failed to fetch history 😿.</Text>
            <Text className="text-gray text-sm mt-2" onPress={() => refetch()}>Tap to retry</Text>
      </View>
        }
        {
           messages?.length > 0 &&(
             messages.map((chat:any, index:number)=>
                <ChatMessage key={index} chat={chat} />
             )
           )
        }

        {/* Pending message — show instantly on Send */}
        {pendingMessage && !mutation.isError && (
          <PendingMessage message={pendingMessage} />
        )}

        {/* AI typing indicator while awaiting response */}
        {mutation.isPending && (
          <View className="bg-card self-start border border-[#333] px-4 py-3 rounded-xl rounded-bl-sm flex-row items-center gap-2">
            <ActivityIndicator size="small" color="#aaa" />
            <Text className="text-gray text-sm">Thinking...</Text>
          </View>
        )}

        {/* Failed message with retry/dismiss */}
        {pendingMessage && mutation.isError && (
          <FailedMessage
            message={pendingMessage}
            onRetry={handleRetry}
            onDismiss={handleDismiss}
          />
        )}
         
        {
          messages?.length == 0 && !isLoading && !isError && (
            <View className=" flex-1 items-center justify-center">
              <Text className="text-white text-center">No chat history yet.</Text>
            </View>
          )
        }
      </ScrollView>

      {/* FIXED INPUT AREA */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <View className={`w-full relative flex-row items-center border-t px-5 py-4 border-[#2A2A2A] bg-bg gap-3 ${!isKeyboardVisible ? 'pb-18' : ''}`}>
          <TextInput
            className='bg-[#252525] rounded-3xl border border-[#333] flex-1 px-4  pt-3 pb-1.5 text-white placeholder:text-gray text-base' 
            style={{ minHeight: 48, maxHeight: 120 }}
            autoCapitalize="none"
            multiline={true} 
            value={userMsg}
            placeholder="Ask me anything about movies"
            placeholderTextColor="#666"
            onChangeText={setUserMsg}
          />
          <Pressable onPress={()=>setUserMsg('')} className="absolute right-28 top-7.5"><Ionicons size={20} name="close" color='red'/></Pressable> 
          <Pressable onPress={handleSend} disabled={mutation.isPending || !userMsg.trim() || mutation.isError} className={`bg-red px-4 py-3 rounded-full ${!userMsg.trim() || mutation.isPending || mutation.isError ? 'opacity-50' : ''}`}>
            <Text className="text-white font-medium">Send</Text>
          </Pressable>
        </View> 
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}