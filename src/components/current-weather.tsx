import { useEffect, useState } from "react";
import { Weather } from "../common/types/weather.type";
import * as weatherService from '../services/weatherService';

function CurrentWeather() {
    const [weather, setWeather] = useState<Weather | undefined>();

    useEffect(() => {
        //getWeather();
    }, []);

    async function getWeather(): Promise<void> {
        await weatherService.getCurrentWeather('Santo Domingo', '')
            .then(res => {
                console.log('weather: ', res.data);
                setWeather(res.data);
            })
            .catch(err => {
                console.log('error: ', err.message)
            });
    };

    return (
        <section id="current-weather" className="w-full flex flex-col grow items-center justify-center gap-3">
            <div id="weather-img">
                <img src="./assets/weather-icons/05.partial-cloudy-light.png" className="w-3/2" alt="" />
            </div>
            <h3 id="city-name" className="text-xl font-medium z-10">Santo Domingo</h3>
            <div id="info" className="flex gap-7 items-center">
                <h3 id="temperature" className="text-7xl font-medium text-gray-200">27°c</h3>
                <div id="details" className="flex flex-col gap-3">
                    <div id="wind" className="flex gap-2">
                        <i className="fi fi-rr-wind"></i> 
                        <p>1.2mph</p>
                    </div>
                    <div id="humidity" className="flex gap-2">
                        <i className="fi fi-rr-dewpoint"></i>
                        <p>90%</p>
                    </div>
                </div>
            </div>
            <p id="condition" className="font-semibold text-gray-200">Parcialmente nublado</p>
            
        </section>
    )
}

export default CurrentWeather