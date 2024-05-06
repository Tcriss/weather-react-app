import Search from "./search";
import FavoritesMenu from "./favorites-menu";
import Toggle from "./toggle";
import SettingsMenu from "./settings-menu";

function Toolbar() {

    return (
        <nav id="toolbar" className="w-full flex justify-between gap-2 px-3 py-3 md:px-10 transition-all">
            <div className="xs:w-0 md:w-16"></div>
            <div>
                <Search />
            </div>
            <div className="flex gap-3">
                <Toggle
                    icon={'fi-br-star'}
                    activeIcon={'fi-sr-star'}
                    color={'bg-yellow-500'}
                >
                    <FavoritesMenu></FavoritesMenu>
                </Toggle>
                <Toggle
                    icon={'fi-br-settings'}
                    activeIcon={'fi-sr-settings'}
                    color={'bg-blue-500'}
                >
                    <SettingsMenu></SettingsMenu>
                </Toggle>
            </div>
        </nav>
    )
}

export default Toolbar;