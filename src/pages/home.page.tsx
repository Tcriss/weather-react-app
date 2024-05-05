import { useEffect } from "react";

import Toolbar from "../components/toolbar";
import CurrentWeather from "../components/current-weather";
import Forecast from "../components/forecast";
import useStore from "../hooks/store.hook";
import { getCurrentWeather, getForecast, getSettings } from "../services/weather.service";
import { weatherCodes } from "../common/utils/codes.list";
import { Weather } from "../common/types/weather.type";
import { WeatherCodeI } from "../common/interfaces";

function HomePage() {
    const updateCurrentWeather = useStore(state => state.setWeather);
    const updateForecast = useStore(state => state.setForecast);
    const updateBackground = useStore(state => state.setBackground);
    const updateSettings = useStore(state => state.setSettings);
    const background: string = useStore(state => state.background);

    useEffect(() => {
        getCurrentWeather()
            .then(res => {
                updateCurrentWeather(res.data);
                getWeatherBackground(res.data);
            });
        getForecast()
            .then(res => updateForecast(res.data.forecast.forecastday));

        getSettings()
            .then(res => updateSettings(res))
    }, []);

    function getWeatherBackground(weather: Weather): void {
        const condition: WeatherCodeI | undefined = weatherCodes.find(code => code.code === weather.current?.condition.code);

        updateBackground(condition ? condition.bg : 'bg-gradient-to-br from-sky-400 to-blue-400');
    }

    return(
        <div id="home" className={`w-full h-screen font-poppins text-white flex flex-col items-center ${ background }`}>
            <Toolbar/>
            <CurrentWeather/>
            <Forecast/>
        </div>
    )
}

export default HomePage;