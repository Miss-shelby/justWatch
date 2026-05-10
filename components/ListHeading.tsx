import { View, Text } from 'react-native'
import React from 'react'

    const ListHeading = ({ title }: { title: string }) => {
  return (
    <View>
    <Text className="text-white font-heading text-3xl pt-4">{title}</Text>
    </View>
  )
}

export default ListHeading