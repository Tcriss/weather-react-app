import { useEffect, useState } from "react";
import { SearchResultsI } from "../common/interfaces";
import Card from './card';
import * as favoriteService from '../services/favorites.service';
import { changeCurrentCity } from "../services/weather.service";

function Favorites() {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<SearchResultsI[]>([]);

    useEffect(() => {
        getFavorites();
    }, []);

    async function getFavorites(): Promise<void> {
        setFavorites(await favoriteService.find());
    };

    async function addFavorite(city: SearchResultsI): Promise<void> {
        await favoriteService.add(city);
    }

    async function removeFavorite(city: SearchResultsI): Promise<void> {
        await favoriteService.remove(city.id);
    }

    async function isFavorite(city: SearchResultsI): Promise<boolean> {
        getFavorites();
        const match = favorites.find(favorite => favorite.id === city.id);

        return match ? true : false;
    }

    return (
        <section>
            <div id="toggle" className="w-7 h-full flex justify-center items-center">
                <button onClick={() => setOpen(!isOpen)} className="w-full h-7 flex rounded-full justify-center items-center transition-all bg-slate-50/25 hover:bg-yellow-500 hover:text-white hover:scale-105 active:scale-95 active:shadow-lg">
                    <i className="fi fi-br-star flex justify-center items-center"></i>
                </button>
            </div>
            {
                isOpen === true && (
                    <div id="favorites" className="fixed inset-y-20 right-10 w-96 h-5/6 z-10 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] backdrop-blur-xl rounded-xl px-4 py-4 bg-slate-200/80 flex flex-col gap-3 overflow-y-scroll">
                        <h3 className="text-black/65 text-lg font-bold">Favorites cities</h3>
                        {
                            favorites.length > 0 ? favorites.map(favorite => {
                                return (
                                    <Card
                                        key={favorite.id}
                                        city={favorite}
                                        isFavorite={isFavorite}
                                        add={addFavorite}
                                        remove={removeFavorite}
                                    />
                                )
                            }) : (
                                <div className="h-full flex justify-center items-center">
                                    <h3 id="empty-ms" className="text-center font-bold text-black/35">You don't have favorites cities added yet</h3>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </section>
    )
}

export default Favorites;