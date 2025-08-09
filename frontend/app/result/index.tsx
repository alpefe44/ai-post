import { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { AIContext } from '../context/AIContext';


export default function Result() {
    const { data } = useContext(AIContext);

    if (!data) {
        return (
            <View>
                <Text>Sonuç bulunamadı.</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>{data.title}</Text>
            <Text>{data.content}</Text>
            {data.image ? (
                <Image source={{ uri: data.image }} style={{ width: 200, height: 200 }} />
            ) : null}
        </View>
    );
}
