import Toolbar from "../components/toolbar";
import CurrentWeather from "../components/current-weather";
import Forecast from "../components/forecast";

function HomePage() {
    return(
        <div id="home" className="w-full h-screen font-poppins text-white flex flex-col items-center bg-blue-400">
            <Toolbar/>
            <CurrentWeather/>
            <Forecast/>
        </div>
    )
}

export default HomePage;