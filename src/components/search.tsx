import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import Card from "./card";
import { motion, AnimatePresence } from 'framer-motion';
import { getSearchResutls } from '../services/weather.service';
import { SearchResultsI } from "../common/interfaces";
import * as favoriteService from "../services/favorites.service";

function Search() {
    const [search, setSearch] = useState<SearchResultsI[]>([]);
    const [favorites, setFavorites] = useState<SearchResultsI[]>([]);

    useEffect(() => {
        getFavorites();
    }, []);

    async function handleSearch(city: string): Promise<void> {
        if (city === '') return;

        await getSearchResutls(city)
            .then(res => setSearch(res.data))
            .catch(err => toast.error(err.response.data.error.message));
    }

    async function getFavorites(): Promise<void> {
        const favs: SearchResultsI[] = await favoriteService.find();

        setFavorites(favs);
    }

    async function addFavorite(city: SearchResultsI): Promise<void> {
        await favoriteService.add(city);
        getFavorites();
    }

    async function removeFavorite(city: SearchResultsI): Promise<void> {
        await favoriteService.remove(city.id);
        getFavorites();
    }

    function isFavorite(city: SearchResultsI): boolean {
        const match = favorites.find(favorite => favorite.id === city.id);

        return match ? true : false;
    }

    return (
        <section id="search" className="relative max-w-96 h-22 flex flex-col gap-3 justify-center items-center">
            <div className="relative w-full">
                <input type="text" onChange={(e) => handleSearch(e.target.value)} id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Search city name..." required />
                <div id="input-icon" className="absolute flex justify-center items-center inset-y-1 inset-x-1 w-8 h-8 text-sm font-medium text-black rounded-lg">
                    <i className="fi fi-br-search flex justify-center items-center"></i>
                </div>
            </div>
            <AnimatePresence>
                {
                    search.length > 0 && (
                        <motion.div id="results"
                            initial={{ opacity: 0, translateY: -30 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            exit={{ opacity: 0, translateY: -30 }}
                            className="inset-y-20 max-w-96 max-[415px]:w-11/12 max-[480px]:left-4 xs:top-4 z-10 w-full fixed shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] backdrop-blur-xl rounded-xl px-4 py-4 bg-slate-200/80 flex flex-col gap-3 max-h-96 overflow-y-scroll"
                        >
                            {
                                search.map((res, index) => {
                                    return (
                                        <Card
                                            key={index}
                                            city={res}
                                            isFav={isFavorite(res)}
                                            add={addFavorite}
                                            remove={removeFavorite}
                                        />
                                    )
                                })
                            }
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </section>
    )
}

export default Search;