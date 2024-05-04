import Search from "./search";
import FavoritesMenu from "./favorites-menu";
import Toggle from "./toggle";
import SettingsMenu from "./settings-menu";

function Toolbar() {

    return (
        <div id="toolbar" className="w-full flex justify-between px-10">
            <div className="w-16"></div>
            <div>
                <Search/>
            </div>
            <div className="flex gap-3">
                <Toggle icon={'fi-br-star'}>
                    <FavoritesMenu></FavoritesMenu>
                </Toggle>
                <Toggle icon={'fi-br-settings'}>
                    <SettingsMenu></SettingsMenu>
                </Toggle>
            </div>
        </div>
    )
}

export default Toolbar;