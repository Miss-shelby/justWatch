import { Pressable, Text, View } from "react-native";

export const ChatMessage = ({ chat }: { chat: any }) => {
  return chat.user_role === "AI" ? (
    <View className="bg-card self-start border border-[#333] max-w-[82%] py-3 px-3 rounded-xl rounded-bl-sm">
      <Text className="text-[#ddd]">{chat.message}</Text>
    </View>
  ) : (
    <View className="bg-red self-end border border-[#333] max-w-[82%] py-3 px-3 rounded-xl rounded-br-sm">
      <Text className="text-white">{chat.message}</Text>
    </View>
  );
};
 
export const PendingMessage = ({ message }: { message: string }) => (
  <View className="bg-red self-end border border-[#333] max-w-[82%] py-3 px-3 rounded-xl rounded-br-sm">
    <Text className="text-white">{message}</Text>
  </View>
);

export const FailedMessage = ({ message, onRetry, onDismiss }: { message: string; onRetry: () => void; onDismiss: () => void }) => (
  <View className="self-end max-w-[82%]">
    <View className="bg-red/60 border border-red py-3 px-3 rounded-xl rounded-br-sm">
      <Text className="text-white">{message}</Text>
    </View>
    <View className="flex-row items-center gap-3 mt-1 self-end">
      <Pressable onPress={onRetry} hitSlop={10}>
        <Text className="text-red text-xs">Retry</Text>
      </Pressable>
      <Pressable onPress={onDismiss} hitSlop={10}>
        <Text className="text-gray text-xs">Dismiss</Text>
      </Pressable>
    </View>
  </View>
);