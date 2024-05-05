import { create } from 'zustand';

import { Weather } from '../common/types/weather.type';
import { ForecastI, SettingsI, WeatherStoreI } from '../common/interfaces';
import { MeasureUnits, Units } from '../common/enums';

const useStore = create<WeatherStoreI>(set => ({
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