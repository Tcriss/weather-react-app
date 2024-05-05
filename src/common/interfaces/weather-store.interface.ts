import { Weather } from "../types/weather.type";
import { ForecastI, SettingsI } from "./";

export interface WeatherStoreI {
    background: string,
    weather: Partial<Weather>,
    forecast: ForecastI[],
    settings: SettingsI,
    setBackground: (background: string) => void,
    setWeather: (weather: Weather) => void,
    setForecast: (forecast: ForecastI[]) => void,
    setSettings: (settings: SettingsI) => void
};