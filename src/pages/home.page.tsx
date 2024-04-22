import CurrentWeather from "../components/current-weather";
import Search from '../components/search';

function HomePage() {
    return(
        <div id="home" className="w-full h-screen font-poppins text-white flex flex-col items-center bg-blue-300">
            <Search/>
            <CurrentWeather/>
            <div className="h-44"></div>
        </div>
    )
}

export default HomePage;