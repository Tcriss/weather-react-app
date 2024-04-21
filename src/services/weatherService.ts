import axios, { AxiosResponse } from 'axios';
import { Weather } from '../common/types/weather.type';

const url: string = import.meta.env.VITE_URL;
const key: string = import.meta.env.VITE_KEY;

export async function getCurrentWeather(city?: string, lang?: string): Promise<AxiosResponse<Weather>> {
    console.log('ulr: ',url + 'current.json')
    return axios.get<Weather>(url + 'current.json', {
        headers: { 'accept': 'application/json' },
        params: {
            q: city ?? 'santo domingo',
            lan: lang ?? 'en',
            key: key
        }
    });
}

export async function getForecast(): Promise<void> {}