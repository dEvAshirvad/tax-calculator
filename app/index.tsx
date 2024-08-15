import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import PrimaryButton from '@/components/primaryButton'
import { useRouter } from 'expo-router'

const App = () => {
    const router = useRouter()
    return (
        <View className='flex-1'>
            <SafeAreaView className="flex-1 justify-between">
                <View className='py-10 flex items-center'>
                    <View>
                        <Text className='text-5xl font-bold'>Tax Calculator</Text>
                    </View>
                    <Image source={require('@/assets/images/HeroImg.png')} style={{ width: 300, height: 300 }} className='mt-10 animate-bounce' />
                </View>

                <View>
                    <PrimaryButton
                        title={`Let's Calculate`}
                        onPress={() => {
                            router.push("/tax")
                        }} />
                </View>
            </SafeAreaView>
        </View>
    )
}

export default App