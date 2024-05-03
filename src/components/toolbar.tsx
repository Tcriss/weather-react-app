import Search from "./search";
import Favorites from "./favorites";
import Settings from "./settings";

function Toolbar() {

    return (
        <div id="toolbar" className="w-full flex justify-between px-10">
            <div className="w-16"></div>
            <div>
                <Search/>
            </div>
            <div className="flex gap-3">
                <Favorites/>
                <Settings/>
            </div>
        </div>
    )
}

export default Toolbar;