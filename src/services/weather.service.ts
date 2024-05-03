import axios, { AxiosResponse } from 'axios';
import { Weather } from '../common/types/weather.type';
import { ForecastResponseI } from '../common/interfaces/response.interface';
import { SearchResultsI, SettingsI } from '../common/interfaces';
import toast from 'react-hot-toast';

const url: string = import.meta.env.VITE_URL;
const key: string = import.meta.env.VITE_KEY;

export async function getCurrentWeather(): Promise<AxiosResponse<Weather>> {
    const city: string = await getCurrentCity();

    return await axios.get<Weather>(url + 'current.json', {
        headers: { 'accept': 'application/json' },
        params: {
            q: city || 'santo domingo',
            lan: 'en',
            key: key
        }
    });
}

export async function getForecast(): Promise<AxiosResponse<ForecastResponseI>> {
    const currentCity: string = await getCurrentCity();

    return axios.get<ForecastResponseI>(url + 'forecast.json', {
        headers: { 'accept': 'application/json' },
        params: {
            q: currentCity || 'santo domingo',
            days: 3,
            key: key
        }
    });
}

export async function getSearchResutls(city: string): Promise<AxiosResponse<SearchResultsI[]>> {
    return axios.get<SearchResultsI[]>(url + 'search.json', {
        params: { q: city, key: key }
    });
}

export async function getCurrentCity(): Promise<string> {
    const city: string | null = localStorage.getItem('current');

    return city ? JSON.parse(city) : '';
}

export async function changeCurrentCity(city: string): Promise<void> {
    localStorage.setItem('current', JSON.stringify(city));
    getCurrentWeather();

    toast.success(`Current city changed`);
}

export async function getSettings(): Promise<SettingsI> {
    const items: string | null = localStorage.getItem('settings');

    return items ? JSON.parse(items) : null;
}

export async function setSettings(settings: SettingsI): Promise<void> {
    localStorage.setItem('settings', JSON.stringify(settings));
    toast.success('Settings updated succesfully');
}