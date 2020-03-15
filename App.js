import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import Loader from "./Loader";
import Weather from "./Weather";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "55c98800dda696d3a1a109d4de346aeb";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState(null);
  const [condition, setCondition] = useState("Clear");

  const getWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const data = await axios.get(url).then(res => res.data);
    return data;
  };

  const getCurrentPosition = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
      const {
        main: { temp },
        weather
      } = await getWeather(latitude, longitude);
      console.log(temp, weather);
      setTemp(temp.toFixed(0));
      setCondition(weather[0].main);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("can't not find you");
    }
  };

  useEffect(() => {
    getCurrentPosition();
  });

  return isLoading ? <Loader /> : <Weather temp={temp} condition={condition} />;
}
