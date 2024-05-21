import { useEffect } from "react";
import clsx from 'clsx';

import Toolbar from "../components/toolbar";
import CurrentWeather from "../components/current-weather";
import Forecast from "../components/forecast";
import useStore from "../hooks/store.hook";
import { getCurrentWeather, getForecast, getSettings } from "../services/weather.service";
import { Weather } from "../common/types/weather.type";

function HomePage() {
    const weather: Partial<Weather> = useStore(state => state.weather);
    const updateCurrentWeather = useStore(state => state.setWeather);
    const updateForecast = useStore(state => state.setForecast);
    const updateSettings = useStore(state => state.setSettings);

    useEffect(() => {
        getCurrentWeather()
            .then(res => updateCurrentWeather(res.data));
        getForecast()
            .then(res => updateForecast(res.data.forecast.forecastday));

        getSettings()
            .then(res => updateSettings(res))
    }, []);

    return(
        <div id="home" className={clsx(`w-full h-screen font-poppins text-white flex flex-col items-center`, { 
            'bg-gradient-to-r from-sky-400 to-blue-400': weather.current?.condition.code === 1000,
            'bg-gradient-to-r from-slate-400 to-blue-200': weather.current?.condition.code === 1003,
            'bg-gradient-to-r from-slate-300 to-slate-400': weather.current?.condition.code === (1006 || 1009 || 1222 || 1225 || 1237 || 1240 || 1243),
            'bg-gradient-to-r from-stone-300 to-slate-400': weather.current?.condition.code === 1030,
            'bg-gradient-to-r from-cyan-900 to-sky-600': weather.current?.condition.code === 1063,
            'bg-gradient-to-r from-zinc-300 to-slate-400': weather.current?.condition.code === 1066,
            'bg-gradient-to-r from-slate-600 to-sky-50': weather.current?.condition.code === (1069 || 1072),
            'bg-gradient-to-r from-sky-900 to-slate-900': weather.current?.condition.code === 1087,
            'bg-gradient-to-r from-slate-400 to-sky-100': weather.current?.condition.code === 1114,
            'bg-gradient-to-r from-gray-500 to-slate-400': weather.current?.condition.code === 1117,
            'bg-gradient-to-r from-zinc-300 to-zinc-300': weather.current?.condition.code === (1135 || 1147),
            'bg-gradient-to-r from-sky-50 to-slate-500': weather.current?.condition.code === (1150 || 1153),
            'bg-gradient-to-r from-sky-200 to-slate-500': weather.current?.condition.code === 1168,
            'bg-gradient-to-r from-cyan-50 to-indigo-200': weather.current?.condition.code === 1171,
            'bg-gradient-to-r from-sky-200 to-slate-400': weather.current?.condition.code === (1183 || 1186 || 1189),
            'bg-gradient-to-r from-slate-500 to-cyan-900': weather.current?.condition.code === 1192,
            'bg-gradient-to-r from-slate-700 to-cyan-900': weather.current?.condition.code === 1195,
            'bg-gradient-to-r from-slate-700 to-slate-300': weather.current?.condition.code === 1198,
            'bg-gradient-to-r from-slate-700 to-slate-400': weather.current?.condition.code === (1201 || 1207),
            'bg-gradient-to-r from-slate-700 to-gray-200': weather.current?.condition.code === 1204,
            'bg-gradient-to-r from-slate-200 to-gray-400': weather.current?.condition.code === (1210 || 1213 || 1216 || 1219),
            'bg-gradient-to-r from-slate-500 to-slate-800': weather.current?.condition.code === 1246,
            'bg-gradient-to-r from-gray-400 to-slate-800': weather.current?.condition.code === (1249 || 1252),
            'bg-gradient-to-r from-zinc-50 to-slate-500': weather.current?.condition.code === (1255 || 1258),
            'bg-gradient-to-r from-gray-500 to-gray-500': weather.current?.condition.code === 1261,
            'bg-gradient-to-r from-slate-700 to-gray-500': weather.current?.condition.code === 1264,
            'bg-gradient-to-r from-blue-200 to-gray-500': weather.current?.condition.code === 1273,
            'bg-gradient-to-r from-sky-900 to-gray-500': weather.current?.condition.code === 1276,
            'bg-gradient-to-r from-blue-100 to-gray-600': weather.current?.condition.code === (1279 || 1282),
         })}>
            <Toolbar/>
            <CurrentWeather/>
            <Forecast/>
        </div>
    )
}

export default HomePage;