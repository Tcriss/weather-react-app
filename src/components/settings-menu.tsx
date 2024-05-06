import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import useStore from "../hooks/store.hook";
import { MeasureUnits, Units } from "../common/enums";
import { SettingsI } from "../common/interfaces";
import { setSettings } from "../services/weather.service";

function SettingsMenu() {
    const settings: SettingsI = useStore(state => state.settings);
    const updateSettings = useStore(state => state.setSettings);
    const { register, handleSubmit } = useForm<SettingsI>();

    function saveSettings(form: SettingsI): void {
        setSettings(form);
        updateSettings(form);
    };

    return (
        <motion.div id="favorites"
            initial={{ opacity: 0, translateY: -30 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -30 }}
            className="fixed inset-y-20 right-10 max-[480px]:right-4 w-96 max-[415px]:w-11/12 h-auto z-10 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] backdrop-blur-xl rounded-xl px-4 py-4 bg-slate-200/80 flex flex-col gap-3 justify-between"
        >
            <header className="w-full flex justify-between items-center h-8">
                <h3 className="text-black/65 text-lg font-bold">Settings</h3>
            </header>
            <form onSubmit={handleSubmit(saveSettings)} className="w-full flex flex-col gap-3 grow overflow-y-scroll">
                <article id="setting" className="w-full flex gap-3 bg-white rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] text-black px-2 py-2">
                    <div id="toggle" className="w-8 h-8 flex items-center gap-2 rounded-full justify-center bg-slate-50/25">
                        <i className="fi fi-br-temperature-high flex justify-center items-center"></i>
                    </div>
                    <div id="extra-info" className="flex flex-col grow gap-2">
                        <label htmlFor="temperature" className="block text-sm font-medium leading-6 text-gray-900">Temperature</label>
                        <div className="mt-2 w-full">
                            <select id="temperature" {...register('unit')}  autoComplete="country-name" className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option value={Units.F}>{Units.F}</option>
                                <option value={Units.C}>{Units.C}</option>
                            </select>
                        </div>
                    </div>
                </article>
                <article id="setting" className="w-full flex gap-3 bg-white rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] text-black px-2 py-2">
                    <div id="toggle" className="w-8 h-8 flex items-center gap-2 rounded-full justify-center bg-slate-50/25">
                        <i className="fi fi-br-settings flex justify-center items-center"></i>
                    </div>
                    <div id="extra-info" className="flex flex-col grow gap-2">
                        <label htmlFor="unity" className="block text-sm font-medium leading-6 text-gray-900">Measure unit</label>
                        <div className="w-full">
                            <select id="unity" {...register('measureUnit')}  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option value={MeasureUnits.M}>{MeasureUnits.M}</option>
                                <option value={MeasureUnits.K}>{MeasureUnits.K}</option>
                            </select>
                        </div>
                    </div>
                </article>
                <button id="save" className="rounded-lg bg-blue-400 w-full h-12 hover:bg-blue-500 transition-all">Save settings</button>
            </form>
            <footer id="credits" className="w-full grid gap-2 ">
                <div id="author" className="text-black/65 text-sm uppercase text-center">
                    Made by Tcriss, <a href="https://github.com/Tcriss/weather-react-app" className="font-bold" target="_blank">source code</a>
                </div>
            </footer>
        </motion.div>
    )
}

export default SettingsMenu;