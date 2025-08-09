import { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, Share, Platform, Alert, TouchableOpacity } from 'react-native';
import { AIContext } from '../context/AIContext';


export default function Result() {
    const { data } = useContext(AIContext);

    if (!data) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Sonuç bulunamadı.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>{data.title}</Text>

                {data.image ? (
                    <Image source={{ uri: data.image }} style={styles.image} />
                ) : null}

                <View style={styles.contentCard}>
                    <Text style={styles.contentText}>{data.content}</Text>
                </View>

                <TouchableOpacity
                    style={styles.shareButton}
                    activeOpacity={0.85}
                    onPress={async () => {
                        try {
                            const message = `${data.title}\n\n${data.content}${data.image ? `\n${data.image}` : ''}`;
                            const sharePayload = Platform.select({
                                ios: { message, title: 'Paylaş', url: data.image ?? undefined },
                                android: { message, title: 'Paylaş' },
                                default: { message },
                            });
                            await Share.share(sharePayload as any);
                        } catch (err: any) {
                            Alert.alert('Paylaşım Hatası', err?.message || 'Bilinmeyen bir hata oluştu');
                        }
                    }}
                >
                    <Text style={styles.shareButtonText}>Paylaş</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0f172a',
        justifyContent: 'center',
    },
    container: {
        flexGrow: 1,
        padding: 20,
        gap: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#e2e8f0',
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 16,
        backgroundColor: '#111827',
    },
    contentCard: {
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8,
    },
    contentText: {
        color: '#cbd5e1',
        fontSize: 16,
        lineHeight: 22,
    },
    shareButton: {
        backgroundColor: '#10b981',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    shareButtonText: {
        color: '#062a23',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.3,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    emptyText: {
        color: '#94a3b8',
        fontSize: 16,
    },
});
