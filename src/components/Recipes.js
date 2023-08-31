import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list'
import { mealData } from '../constants'
import Animated, { FadeInDown } from 'react-native-reanimated'
import Loading from './Loading'

const RecipeCard = ({ item, index }) => {
  let isEven = index % 2 == 0
  let isThird = index % 3 == 0

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
      <Pressable
        className='flex justify-center mb-4 space-y-1'
        style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{ width: '100%', height: isThird ? hp(25) : hp(35), borderRadius: 35 }}
          className='bg-black/5'
        />
        <Text className='font-semibold ml-2 text-neutral-600'>
          {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  )
}

const Recipes = ({ categories, recipes }) => {
  return (
    <View className='mx-4 space-y-3'>
      <Text style={{ fontSize: hp(3) }} className='font-semibold text-neutral-600'>Recipes</Text>
      <View>
        {categories.length == 0 || recipes.length == 0 ? (
          <Loading className='mt-20' />
        ) :
          <MasonryList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
            onEndReachedThreshold={0.1}
          />
        }
      </View>
    </View>
  )
}

export default Recipes

const styles = StyleSheet.create({})