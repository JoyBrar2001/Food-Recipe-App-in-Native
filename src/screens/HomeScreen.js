import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Categories, Recipes } from '../components'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

const HomeScreen = () => {
  
  const [activeCategory, setActiveCategory] = useState('Beef')
  const [categories, setCategories] = useState([])
  const [recipes, setRecipes] = useState([])

  useEffect(()=>{
    getCategories()
    getRecipes()
  },[])

  const handleChangeCategory = (category) => {
    getRecipes(category)
    setActiveCategory(category)
    setRecipes([])
  }

  const getCategories = async() => {
    try{
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      if(response){
        // console.log('Got Categories : ' , response.data.categories)
        setCategories(response.data.categories)
      }
    }catch(err){
      console.log('Error' , err.message)
    }
  }
  const getRecipes = async(category = 'Beef') => {
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      if(response){
        // console.log('Got Recipes : ' , response.data.meals)
        setRecipes(response.data.meals)
      }
    }catch(err){
      console.log('Error' , err.message)
    }
  }

  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='dark' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className='space-y-6 pt-14'
      >
        <View className='mx-4 flex-row justify-between items-center mb-2'>
          <Image 
            source={require('../../assets/images/avatar.png')}
            style={{ height: hp(5), width: hp(5.5) }}
          />
          <FontAwesome5 
            name="bell" 
            size={24} 
            color="black" 
          />
        </View>

        <View className='mx-4 space-y-2 mb-2'>
          <Text className='text-neutral-600' style={{ fontSize: hp(1.7) }}>Hello, Joy!</Text>
          <View>
            <Text style={{ fontSize: hp(3.8) }} className='font-semibold text-neutral-600'>Make your own food,</Text>
          </View>
          <View>
            <Text style={{ fontSize: hp(3.8) }} className='font-semibold text-neutral-600'>stay at <Text className='text-amber-400'>home</Text></Text>
          </View>
        </View>

        <View className='mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]'>
          <TextInput 
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            style={{ fontSize: hp(1.7) }}
            className='flex-1 text-base pl-3 tracking-wider'
          />

          <View className='bg-white rounded-full p-3'>
            <FontAwesome5 name="search" size={20} color="gray" />
          </View>
        </View>

        <View>
          {categories.length > 0 &&
            <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
          }
        </View>

        <View>
          <Recipes recipes={recipes} categories={categories} />
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})