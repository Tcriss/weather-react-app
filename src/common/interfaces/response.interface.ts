import { CurrentI, ForecastI, LocationI } from "./";

export interface ForecastResponseI {
    current: CurrentI, 
    location: LocationI,
    forecast: { forecastday: ForecastI[] }
}