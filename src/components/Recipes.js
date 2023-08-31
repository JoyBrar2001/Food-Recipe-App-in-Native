import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list'
import { mealData } from '../constants'
import Animated, { FadeInDown } from 'react-native-reanimated'
import Loading from './Loading'
import { useNavigation } from '@react-navigation/native'

const RecipeCard = ({ item, index, navigation, left }) => {
  let isEven = index % 2 == 0
  let isThird = index % 3 == 0

  // console.log(item)

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
      <Pressable
        className='flex justify-center mb-4 space-y-1'
        style={{ width: '100%' }}
        onPress={() => navigation.navigate('RecipeDetail', { ...item })}
      >
        <Animated.Image
          source={{ uri: item.strMealThumb }}
          style={{ width: '100%', height: left && isThird ? hp(25) : !left && isEven ? hp(35) : hp(25), borderRadius: 35 }}
          className='bg-black/5'
        // sharedTransitionTag={item.idMeal}
        />
        <Text className='font-semibold ml-2 text-neutral-600'>
          {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  )
}

const Recipes = ({ categories, recipes }) => {
  const navigation = useNavigation()

  const leftRecipes = recipes.filter((_, index) => index % 2 === 0);
  const rightRecipes = recipes.filter((_, index) => index % 2 !== 0);

  // console.log('\n\n\nLeft Recipes : ', leftRecipes)
  // console.log('\n\n\nRight Recipes : ', rightRecipes)

  return (
    <View className='mx-4 space-y-3'>
      <Text style={{ fontSize: hp(3) }} className='font-semibold text-neutral-600'>Recipes</Text>
      <View>
        {categories.length == 0 || recipes.length == 0 ? (
          <Loading className='mt-20' />
        ) : (
          // <MasonryList
          //   data={recipes}
          //   keyExtractor={(item) => item.idMeal}
          //   numColumns={2}
          //   showsVerticalScrollIndicator={false}
          //   renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
          //   onEndReachedThreshold={0.1}
          // />

          // recipes.map((recipe, index) => (
          //   <RecipeCard item={recipe} key={index} index={index} navigation={navigation} />
          // ))

          <View className='flex-row gap-4'>
            <View className='flex-[0.5]'>
              {leftRecipes.map((recipe, index) => (
                <RecipeCard item={recipe} key={index} index={index} navigation={navigation} left={true} />
              ))}
            </View>
            <View className='flex-[0.5]'>
              {rightRecipes.map((recipe, index) => (
                <RecipeCard item={recipe} key={index} index={index} navigation={navigation} left={false} />
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

export default Recipes

const styles = StyleSheet.create({})