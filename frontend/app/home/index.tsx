//import liraries
import React, { Component, useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';

import { useRouter } from 'expo-router';
import { AIContext } from '../context/AIContext';

type ReturnType = {
    title: string,
    content: string
}

const HomePage = () => {

    const [textValue, setTextValue] = useState<string>("");
    const [returnValue, setReturnValue] = useState<ReturnType>();

    const [loading, setLoading] = useState(false);

    const { setData } = useContext(AIContext);

    const router = useRouter();

    const getPrompt = async () => {
        try {
            const response = await fetch("http://192.168.1.100:3000/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: textValue,
                    image: null
                })
            })
            const data = await response.json();
            setData(data);
            setReturnValue(data);
        } catch (error) {
            console.log(error)
        }

    }

    const onPressFunction = async () => {
        setLoading(true);
        await getPrompt();
        setLoading(false);

        console.log("geçti")
        router.push("/result");
    }


    return (
        <View style={styles.container}>

            {
                loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'}></ActivityIndicator>
                </View> :
                    <>
                        <TextInput style={{ backgroundColor: 'white', width: '80%' }} value={textValue} onChangeText={(text) => setTextValue(text)}></TextInput>
                        <Button title='Soruyu Sor' onPress={onPressFunction}></Button>
                    </>
            }

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        gap: 15
    },
});

//make this component available to the app
export default HomePage;
