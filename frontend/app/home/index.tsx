//import liraries
import React, { Component, useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';

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
            const response = await fetch("http://10.0.2.2:3000/generate", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
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
        <SafeAreaView style={styles.safeArea}> 
            <View style={styles.container}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size={'large'} color={'#8f94fb'} />
                    </View>
                ) : (
                    <>
                        <Text style={styles.headerTitle}>AI Post App</Text>
                        <Text style={styles.subTitle}>Sorunu yaz, biz güzel bir gönderiye dönüştürelim.</Text>

                        <View style={styles.card}>
                            <TextInput
                                style={styles.input}
                                value={textValue}
                                onChangeText={(text) => setTextValue(text)}
                                placeholder="Ne hakkında bir gönderi istiyorsun?"
                                placeholderTextColor="#94a3b8"
                                multiline
                            />

                            <TouchableOpacity style={styles.primaryButton} onPress={onPressFunction} activeOpacity={0.8}>
                                <Text style={styles.primaryButtonText}>Soruyu Sor</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#0f172a',
        gap: 18,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#e2e8f0',
        letterSpacing: 0.5,
    },
    subTitle: {
        color: '#94a3b8',
        fontSize: 14,
        marginTop: -4,
        marginBottom: 8,
        textAlign: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8,
        gap: 12,
    },
    input: {
        minHeight: 120,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: '#0b1220',
        color: '#e5e7eb',
        borderWidth: 1,
        borderColor: '#1f2937',
        textAlignVertical: 'top',
    },
    primaryButton: {
        backgroundColor: '#4e54c8',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        shadowColor: '#4e54c8',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
    },
    primaryButtonText: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
});

//make this component available to the app
export default HomePage;
