import useStore from '../hooks/store.hook';
import { Weather } from '../common/types/weather.type';
import { CurrentI, SettingsI, WeatherCodeI } from '../common/interfaces';
import { MeasureUnits, Units } from '../common/enums';
import { weatherCodes } from '../common/utils/codes.list';

function CurrentWeather() {
    const settings: SettingsI = useStore(state => state.settings);
    const weather: Partial<Weather> = useStore(state => state.weather);

    function updateIcon(currentWeather: CurrentI): string {
        const condition: WeatherCodeI | undefined = weatherCodes.find(code => currentWeather.condition.code === code?.code);
        return condition ? condition.icon : './assets/weather-icons/sun-light.png';
    }

    return weather.current && weather.location ? (
        <section id="current-weather" className="w-full flex flex-col grow items-center justify-center gap-3">
            <div id="weather-img">
                <img src={updateIcon(weather.current)} className="max-[480px]:w-48 w-3/2 max-w-72" alt="" />
            </div>
            <h3 id="city-name" className="xs:text-base text-xl font-medium">{weather.location?.name}</h3>
            <div id="info" className="flex gap-7 items-center">
                <h3 id="temperature" className="max-[430px]:text-5xl text-7xl font-medium text-white">{ settings.unit === Units.C ? weather.current?.temp_c + '°C' : weather.current?.temp_f + '°F'}</h3>
                <div id="details" className="flex flex-col justify-between">
                    <div id="wind" className="flex gap-2">
                        <i className="fi fi-br-wind"></i>
                        <p>{ settings.measureUnit === MeasureUnits.K ? weather.current?.wind_kph + 'kph' : weather.current?.wind_mph + 'mph'}</p>
                    </div>
                    <div id="humidity" className="flex gap-2">
                        <i className="fi fi-br-dewpoint"></i>
                        <p>{weather.current?.humidity}%</p>
                    </div>
                </div>
            </div>
            <p id="condition" className="font-semibold text-gray-200">{weather.current.condition.text}</p>
        </section>
    ) : (
        <section id="current-weather" className="w-full flex flex-col grow items-center justify-center gap-3">
            <div id="weather-img">
                <img src="./assets/weather-icons/sun-light.png" className="w-3/2 max-w-72" alt="" />
            </div>
            <div className="animate-pulse w-60 h-14 bg-slate-300/40 rounded-lg"></div>
            <div className="animate-pulse flex gap-7 items-center">
                <div className="w-36 h-14 bg-slate-300/40 rounded-lg"></div>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                        <i className="fi fi-br-wind"></i>
                        <div className="w-12 h-5 bg-slate-300/40 rounded-lg"></div>
                    </div>
                    <div className="flex gap-2">
                        <i className="fi fi-br-dewpoint"></i>
                        <div className="w-12 h-5 bg-slate-300/40 rounded-lg"></div>
                    </div>
                </div>
            </div>
            <div className="animate-pulse w-60 h-5 bg-slate-300/40 rounded-lg"></div>
        </section>
    )
}

export default CurrentWeather