import { useEffect, useState } from "react";
import { getForecast, getSettings } from "../services/weather.service";
import { ForecastI, SettingsI } from "../common/interfaces";
import toast from "react-hot-toast";
import { MeasureUnits, Units } from "../common/enums";

function Forecast() {
    const [forecast, setForecast] = useState<ForecastI[] | undefined>();
    const [settings, setSettings] = useState<SettingsI>({ unit: Units.C, measureUnit: MeasureUnits.K });

    useEffect(() => {
        getWeatherForecast();
    }, [forecast, settings]);

    async function getWeatherForecast(): Promise<void> {
        setSettings(await getSettings());
        await getForecast()
            .then(res => setForecast(res.data.forecast.forecastday))
            .catch(err => {
                toast.error(err)
            });
    }

    return (
        <section id="forecast" className="w-full flex justify-center items-center gap-4 py-3">
            {
                forecast ? forecast.map((fc, index) => {
                    return (
                        <div key={index} id="card" className="w-36 rounded-xl shadow-xl flex flex-col items-center gap-2 px-3 py-3 text-white bg-white bg-opacity-15">
                            <p id="day" className="uppercase">{fc.date}</p>
                            <div id="icon">
                                <img className="w-16" src="./assets/weather-icons/01.sun-light.png" />
                            </div>
                            <p id="temperature" className="text-2xl font-normal">{ settings.unit === Units.C ? fc.day.maxtemp_c + '/' + fc.day.mintemp_c : fc.day.maxtemp_f + '/' + fc.day.mintemp_f }</p>
                            <p id="condition" className="text-xs font-semibold uppercase text-opacity-5 text-ellipsis overflow-hidden whitespace-nowrap">{fc.day.condition.text}</p>
                        </div>
                    )
                }) : (
                    <div id="card" className="animate-pulse w-36 rounded-xl shadow-xl flex flex-col items-center gap-2 px-3 py-3 text-white bg-white bg-opacity-15">
                        <div className="w-full h-6 rounded-lg bg-slate-300/40"></div>
                        <div id="icon">
                            <img className="w-16" src="./assets/weather-icons/01.sun-light.png" />
                        </div>
                        <div className="w-full h-8 rounded-lg bg-slate-300/40"></div>
                        <div className="w-full h-4 rounded-lg bg-slate-300/40"></div>
                    </div>
                )
            }
        </section>
    )
}

export default Forecast;