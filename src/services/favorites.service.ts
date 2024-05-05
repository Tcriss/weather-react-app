import toast from "react-hot-toast";

import { SearchResultsI } from "../common/interfaces";

export async function find(): Promise<SearchResultsI[]> {
    const items: string | null = localStorage.getItem('favorites');
    
    if (items) {
        const favorites: SearchResultsI[] = JSON.parse(items) || [];

        return favorites;
    };

    return [];
}

export async function add(city: SearchResultsI): Promise<void> {
    const favorites: SearchResultsI[] = await find();
    const match: SearchResultsI | undefined = favorites.find(fav => fav.id === city.id);

    if (match) return;

    const newFavorite = [...favorites, city];

    localStorage.setItem('favorites', JSON.stringify(newFavorite));
    toast.success('City added to favorites.');
}

export async function remove(id: number): Promise<void> {
    let favorites: SearchResultsI[] = await find();
    const edited: SearchResultsI[] = favorites.filter(favorite => favorite.id !== id)

    localStorage.setItem('favorites', JSON.stringify(edited));
    toast.success('City removed from favorites.')
}