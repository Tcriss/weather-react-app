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
        <div className="weather">
            <p>weatheeerrrrrr, u know!</p>
            <pre></pre>
        </div>
    )
}

export default CurrentWeather