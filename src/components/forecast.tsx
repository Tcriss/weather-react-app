import { useState } from "react";
import { ForecastI, SettingsI, WeatherCodeI } from "../common/interfaces";
import { MeasureUnits, Units } from "../common/enums";
import { weatherCodes } from "../common/utils/codes.list";
import useStore from "../hooks/store.hook";

function Forecast() {
    const forecast: ForecastI[] = useStore(state => state.forecast);
    const [settings, setSettings] = useState<SettingsI>({ unit: Units.C, measureUnit: MeasureUnits.K });
    const skeletons: unknown[] = Array(3).fill(null);

    function updateIcon(forecast: ForecastI): string {
        const condition: WeatherCodeI | undefined = weatherCodes.find(code => forecast.day.condition.code === code.code);
        return condition ? condition.icon : './assets/weather-icons/sun-light.png';
    }

    return (
        <section id="forecast" className="w-full flex justify-center items-center gap-4 py-3">
            {
                forecast.length > 0 ? forecast.map((fc, index) => {
                    return (
                        <div key={index} id="card" className="w-36 rounded-xl shadow-xl flex flex-col items-center gap-2 px-3 py-3 text-white bg-white bg-opacity-15">
                            <p id="day" className="uppercase">{fc.date}</p>
                            <div id="icon">
                                <img className="w-16" src={updateIcon(fc)} />
                            </div>
                            <p id="temperature" className="text-xl font-normal">{settings.unit === Units.C ? fc.day.maxtemp_c + '/' + fc.day.mintemp_c + ' °C' : fc.day.maxtemp_f + '/' + fc.day.mintemp_f + ' °F'}</p>
                            <p id="condition" className="text-xs font-semibold uppercase text-opacity-5 text-ellipsis overflow-hidden whitespace-nowrap">{fc.day.condition.text}</p>
                        </div>
                    )
                }) : (
                    <div id="skeleton" className="w-full flex justify-center items-center gap-4">
                        {
                            skeletons.map((_, index) => {
                                return (
                                    <div id="card" key={index} className="w-36 h-44 rounded-xl shadow-xl flex flex-col items-center gap-2 px-3 py-3 text-white bg-white bg-opacity-15">
                                        <div className=" animate-pulsew-full h-6 rounded-lg bg-slate-300/40"></div>
                                        <div id="icon">
                                            <img className="w-16 animate-pulse" src="./assets/weather-icons/sun-light.png" />
                                        </div>
                                        <div className="animate-pulse w-full h-6 rounded-lg bg-slate-300/40"></div>
                                        <div className="animate-pulse w-full h-4 rounded-lg bg-slate-300/40"></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </section>
    )
}

export default Forecast;