import CurrentWeather from "../components/current-weather";
import Search from '../components/search';
import Forecast from "../components/forecast";

function HomePage() {
    return(
        <div id="home" className="w-full h-screen font-poppins text-white flex flex-col items-center bg-blue-600">
            <Search/>
            <CurrentWeather/>
            <Forecast/>
        </div>
    )
}

export default HomePage;