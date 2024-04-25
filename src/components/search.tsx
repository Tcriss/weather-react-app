import { useState } from "react";
import { getSearchResutls } from '../services/weather.service';
import { SearchResultsI } from "../common/interfaces";
import toast from "react-hot-toast";

function Search() {
    const [search, setSearch] = useState<SearchResultsI[]>([]);
    const [visible, setVisible] = useState<boolean>(false);

    async function handleSearch(city: string): Promise<void> {
        console.log('input: ', city)
        await getSearchResutls(city)
            .then(res => setSearch(res.data))
            .catch(err => toast.error(err.response.data.error.message));
    }

    return (
        <section id="search" className="relative w-full h-22 flex flex-col gap-3 justify-center items-center py-4">
            <div className="relative w-96">
                <input type="text" onChange={(e) => handleSearch(e.target.value)} id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Search city name..." required />
                <div id="input-icon" className="absolute flex justify-center items-center inset-y-1 inset-x-1 w-8 h-8 text-sm font-medium text-black rounded-lg">
                    <i className="fi fi-br-search flex justify-center items-center"></i>
                </div>
            </div>
            {
                search.length > 0 && (
                    <div id="results" className="inset-y-20 w-96 z-10 fixed shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] backdrop-blur-xl rounded-xl px-4 py-4 bg-slate-200/80 flex flex-col gap-3 max-h-96 overflow-y-scroll">
                        {
                            search.map((res, index) => {
                                return (
                                    <div key={index} id="result" className="w-full flex justify-between bg-white rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] text-black px-2 py-2">
                                        <div id="city">
                                            <p className="font-semibold">{res.name}</p>
                                            <div id="extra-info" className="flex gap-2">
                                                <p className="text-slate-400 text-sm">{res.region}</p>
                                                <p className="text-slate-400 text-sm">{res.country}</p>
                                            </div>
                                        </div>
                                        <div id="actions" className="w-7 h-full flex justify-center items-center">
                                            <button id="add-favorite-btn" className="w-full h-7 flex rounded-full justify-center items-center transition-all hover:bg-yellow-500 hover:scale-105 active:scale-95 hover:text-white active:shadow-lg">
                                                <i className="fi fi-br-star flex justify-center items-center"></i>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </section>
    )
}

export default Search;