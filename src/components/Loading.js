import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View className='flex-1 flex justify-center items-center'>
      <ActivityIndicator animating={true} size='large' color='#f8b619' />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})