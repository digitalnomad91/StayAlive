import * as Location from 'expo-location';

// 📍 Centralized location service for consistent permission handling.
export const requestCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }

    const current = await Location.getCurrentPositionAsync({});
    return current.coords;
  } catch (error) {
    // If any error occurs while requesting permissions or location, return null.
    return null;
  }
};
