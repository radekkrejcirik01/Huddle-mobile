import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistStorageKeys } from './PersistStorage.enum';

class SecureStorage {
    setItem = async (key: PersistStorageKeys, value: string) => {
        await AsyncStorage.setItem(key, value);
    };

    getItem = async (key: PersistStorageKeys): Promise<string> => {
        const result = await AsyncStorage.getItem(key);
        return Promise.resolve(result);
    };
}

export const PersistStorage = new SecureStorage();
