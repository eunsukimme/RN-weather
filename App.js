import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import Loader from "./Loader";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "55c98800dda696d3a1a109d4de346aeb";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const getWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await axios.get(url).then(res => res.data);
    return response;
  };

  const getCurrentPosition = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
      const weatherResponse = await getWeather(latitude, longitude);
      console.log(weatherResponse);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("can't not find you");
    }
  };

  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  return isLoading ? <Loader /> : null;
}
