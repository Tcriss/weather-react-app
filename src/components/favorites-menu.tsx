import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SearchResultsI } from '../common/interfaces';
import * as favoriteService from '../services/favorites.service';
import Card from './card';

function FavoritesMenu() {
    const [favorites, setFavorites] = useState<SearchResultsI[]>([]);

    useEffect(() => {
        getFavorites();
    }, []);

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
        <motion.div id="favorites"
            initial={{ opacity: 0, translateY: -30 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -30 }}
            className="fixed inset-y-20 right-10 w-96 h-5/6 z-10 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] backdrop-blur-xl rounded-xl px-4 py-4 bg-slate-200/80 flex flex-col gap-3 overflow-y-scroll"
        >
            <h3 className="text-black/65 text-lg font-bold">Favorites cities</h3>
            {
                favorites.length > 0 ? favorites.map(favorite => {
                    return (
                        <Card
                            key={favorite.id}
                            city={favorite}
                            isFav={isFavorite(favorite)}
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
        </motion.div>
    )
}

export default FavoritesMenu;