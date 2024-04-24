import axios, { AxiosResponse } from 'axios';
import { Weather } from '../common/types/weather.type';
import { ForecastI } from '../common/interfaces';
import { ForecastResponseI } from '../common/interfaces/response.interface';

const url: string = import.meta.env.VITE_URL;
const key: string = import.meta.env.VITE_KEY;

export async function getCurrentWeather(city?: string): Promise<AxiosResponse<Weather>> {
    return axios.get<Weather>(url + 'current.json', {
        headers: { 'accept': 'application/json' },
        params: {
            q: city ?? 'santo domingo',
            lan: 'en',
            key: key
        }
    });
}

export async function getForecast(city?: string): Promise<AxiosResponse<ForecastResponseI>> {
    return axios.get<ForecastResponseI>(url + 'forecast.json', {
        headers: { 'accept': 'application/json' },
        params: {
            q: city ?? 'Santo Domingo',
            days: 3,
            key: key
        }
    })
}