import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { cn } from '@/scripts/utils'

const PrimaryButton = ({ ButtonClass = "", TextClass = "", onPress, title }: { ButtonClass?: string, TextClass?: string, onPress: () => void, title: string }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} className={cn('bg-black rounded-lg min-h-[56px] justify-center items-center text-white mx-5', ButtonClass)}>
            <Text className='text-white font-bold'>{title}</Text>
        </TouchableOpacity>
    )
}

export default PrimaryButton