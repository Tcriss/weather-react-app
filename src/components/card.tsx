import { useEffect, useState } from "react";
import { SearchResultsI } from "../common/interfaces";
import { changeCurrentCity } from "../services/weather.service";

interface CardProps {
    city: SearchResultsI,
    isFavorite: Function,
    add: Function, 
    remove: Function 
}

function Card({ city, isFavorite, add, remove }: CardProps) {
    const [isFav, setIsFav] = useState<boolean>(false)
    const active: string = 'bg-yellow-400 text-slate-100';

    useEffect(() => {
        check();
    }, []);

    async function handleClick(): Promise<void> {
        const math: boolean = await isFavorite(city);

        if (math === true) remove(city);
        if (math === false) add(city);
            
        console.log('status: ', await isFavorite(city));
        setIsFav(await isFavorite(city));
    };

    async function check(): Promise<void> {
        setIsFav(await isFavorite(city));
    };

    async function changeCity(latLong: string): Promise<void> {
        await changeCurrentCity(latLong);
    }

    return (
        <article id="result" className="cursor-pointer w-full flex justify-between bg-white rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] text-black px-2 py-2 active:scale-95">
            <div id="city" onClick={() => changeCity(`${city.lat},${city.lon}`)}>
                <p className="font-semibold">{city.name}</p>
                <div id="extra-info" className="flex gap-2">
                    <p className="text-slate-400 text-sm">{city.region}</p>
                    <p className="text-slate-400 text-sm">{city.country}</p>
                </div>
            </div>
            <div id="actions" className="w-7 h-full flex justify-center items-center">
                <button onClick={() => handleClick()} className={`${ isFav === false || active } w-full h-7 flex rounded-full justify-center items-center transition-all hover:bg-yellow-500 hover:text-white hover:scale-105 active:scale-95 active:shadow-lg`}>
                    <i className={`fi ${ isFav ? 'fi-sr-star' : 'fi-br-star' } flex justify-center items-center`}></i>
                </button>
            </div>
        </article>
    )
}

export default Card;