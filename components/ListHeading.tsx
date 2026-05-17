import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

    const ListHeading = ({ title }: { title: string }) => {
  return (
    <View className='flex-row justify-between items-center pt-4'>
      <Text className="text-white font-heading text-3xl ">{title}</Text>
      <Link href="/search" className="text-white font-body text-sm underline ">View All</Link>
    </View>
  )
}

export default ListHeading