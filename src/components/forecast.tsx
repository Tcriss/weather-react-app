import { useEffect, useState } from "react";
import { getForecast } from "../services/weather-service";
import { ForecastI } from "../common/interfaces";
import { forecastList } from "../common/utils/forecast.list";

function Forecast() {
    const [forecast, setForecast] = useState<ForecastI[] | undefined>();

    useEffect(() => {
        setForecast(forecastList);
        //getWeatherForecast();
    }, []);

    async function getWeatherForecast(): Promise<void> {
        await getForecast()
            .then(res => setForecast(res.data.forecast.forecastday))
            .catch(err => {
                console.log(err.message);
            });
    }

    return (
        <section id="forecast" className="w-full flex justify-center items-center gap-4 py-3">
            {
                forecast ? forecast.map((fc, index) => {
                    return (
                        <div key={index} id="card" className="rounded-xl shadow-xl flex flex-col items-center gap-2 px-3 py-3 text-white bg-white bg-opacity-15">
                            <p id="day" className="uppercase">{fc.date}</p>
                            <div id="icon">
                                <img className="w-16" src="./assets/weather-icons/01.sun-light.png" />
                            </div>
                            <p id="temperature" className="text-2xl font-semibold">{fc.day.maxtemp_c + '/' + fc.day.mintemp_c}</p>
                            <p id="condition" className="text-xs font-semibold uppercase text-opacity-5">{fc.day.condition.text}</p>
                        </div>
                    )
                }) : (<p>Loading...</p>)
            }
        </section>
    )
}

export default Forecast;