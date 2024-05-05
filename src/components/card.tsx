import useStore from "../hooks/store.hook";
import { SearchResultsI, WeatherCodeI } from "../common/interfaces";
import { changeCurrentCity, getCurrentWeather, getForecast } from "../services/weather.service";
import { Weather } from "../common/types/weather.type";
import { weatherCodes } from "../common/utils/codes.list";

interface CardProps {
    city: SearchResultsI,
    isFav: boolean,
    add: Function,
    remove: Function
}

function Card({ city, isFav, add, remove }: CardProps) {
    const updateCurrentWeather = useStore(state => state.setWeather);
    const updateForecast = useStore(state => state.setForecast);
    const updateBackground = useStore(state => state.setBackground);
    const weather: Partial<Weather> = useStore(state => state.weather);
    const active: string = 'bg-yellow-400 text-slate-100';

    async function handleClick(): Promise<void> {
        if (isFav === true) remove(city);
        if (isFav === false) add(city);
    };

    async function changeCity(latLong: string): Promise<void> {
        await changeCurrentCity(latLong);

        const weather = await getCurrentWeather();
        const res = await getForecast();

        updateCurrentWeather(weather.data);
        updateForecast(res.data.forecast.forecastday);
        getWeatherBackground();
    }

    function getWeatherBackground(): void {
        const condition: WeatherCodeI | undefined = weatherCodes.find(code => code.code === weather.current?.condition.code);

        updateBackground(condition ? condition.bg : 'bg-gradient-to-br from-sky-400 to-blue-400');
    }

    return (
        <article id="result" className="cursor-pointer w-full flex justify-between bg-white rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] text-black px-2 py-2">
            <div id="city" onClick={() => changeCity(`${city.lat},${city.lon}`)} className="grow max-w-72">
                <p className="font-semibold">{city.name}</p>
                <div id="extra-info" className="flex gap-2">
                    <p className="text-slate-400 text-sm text-ellipsis overflow-hidden text-nowrap">{city.region}</p>
                    <p className="text-slate-400 text-sm text-ellipsis overflow-hidden text-nowrap">{city.country}</p>
                </div>
            </div>
            <div id="actions" className="w-7 h-full flex justify-center items-center">
                <button onClick={() => handleClick()} className={`${isFav === false || active} w-full h-7 flex rounded-full justify-center items-center transition-all hover:bg-yellow-500 hover:text-white hover:scale-105 active:scale-95 active:shadow-lg`}>
                    <i className={`fi ${isFav ? 'fi-sr-star' : 'fi-br-star'} flex justify-center items-center`}></i>
                </button>
            </div>
        </article>
    )
}

export default Card;