import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from "expo-router"

export default function StartPage() {

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        console.log("settimeoutbaşı")
        setTimeout(() => {
            setLoading(true);
            router.replace("home");
        }, 2000);
        console.log("settimeoutsonu")

    }, [])

    if (!loading) return <ActivityIndicator size={'large'}></ActivityIndicator>

    return (
        <View>
            <Text>index</Text>
        </View>
    )
}