import { create } from 'zustand';
import { Weather } from '../common/types/weather.type';
import { ForecastI, SettingsI } from '../common/interfaces';
import { MeasureUnits, Units } from '../common/enums';

interface WeatherStore {
    background: string,
    weather: Partial<Weather>,
    forecast: ForecastI[],
    settings: SettingsI,
    setBackground: (background: string) => void,
    setWeather: (weather: Weather) => void,
    setForecast: (forecast: ForecastI[]) => void,
    setSettings: (settings: SettingsI) => void
}

const useStore = create<WeatherStore>(set => ({
    background: 'bg-blue-400',
    weather: {},
    forecast: [],
    settings: {
        unit: Units.C,
        measureUnit: MeasureUnits.K
    },
    setBackground: (background: string) => set(() => ({ background: background})),
    setWeather: (weather: Weather) =>  set(() => ({ weather: weather })),
    setForecast: (forecast: ForecastI[]) => set(() => ({ forecast: forecast })),
    setSettings: (settings: SettingsI) => set(() => ({ settings: settings}))
}));

export default useStore;