import { AstroI, DayI, HourI } from ".";

export interface ForecastI {
    date: string,
    date_epoch: number,
    day: DayI,
    astro: AstroI,
    hour: HourI[]
}