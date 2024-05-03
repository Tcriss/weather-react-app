import { useState } from "react";
import { Units, MeasureUnits } from '../common/enums';

function Settings() {
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <section id="settigns">
            <div id="toggle" className="w-7 h-full flex justify-center items-center">
                <button onClick={() => setOpen(!isOpen)} className="w-full h-7 flex rounded-full justify-center items-center transition-all bg-slate-50/25 hover:bg-yellow-500 hover:text-white hover:scale-105 active:scale-95 active:shadow-lg">
                    <i className="fi fi-br-settings flex justify-center items-center"></i>
                </button>
            </div>
            {
                isOpen === true && (
                    <div id="favorites" className="fixed inset-y-20 right-10 w-96 h-auto z-10 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] backdrop-blur-xl rounded-xl px-4 py-4 bg-slate-200/80 flex flex-col gap-3 overflow-y-scroll">
                        <h3 className="text-black/65 text-lg font-bold">Settings</h3>
                        <article id="setting" className="w-full flex gap-3 bg-white rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] text-black px-2 py-2">
                            <div id="toggle" className="w-8 h-8 flex items-center gap-2 rounded-full justify-center bg-slate-50/25">
                                <i className="fi fi-br-temperature-high flex justify-center items-center"></i>
                            </div>
                            <div id="extra-info" className="flex flex-col grow gap-2">
                                <label htmlFor="temperature" className="block text-sm font-medium leading-6 text-gray-900">Temperature</label>
                                <div className="mt-2 w-full">
                                    <select id="temperature" name="temperature" autoComplete="country-name" className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                        <option>{Units.F}</option>
                                        <option>{Units.C}</option>
                                    </select>
                                </div>
                            </div>
                        </article>
                        <article id="setting" className="w-full flex gap-3 bg-white rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] text-black px-2 py-2">
                            <div id="toggle" className="w-8 h-8 flex items-center gap-2 rounded-full justify-center bg-slate-50/25">
                                <i className="fi fi-br-settings flex justify-center items-center"></i>
                            </div>
                            <div id="extra-info" className="flex flex-col grow gap-2">
                                <label htmlFor="unity" className="block text-sm font-medium leading-6 text-gray-900">Measure unity</label>
                                <div className="w-full">
                                    <select id="unity" name="unity" autoComplete="country-name" className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                        <option selected={true}>{MeasureUnits.M}</option>
                                        <option selected={false}>{MeasureUnits.K}</option>
                                    </select>
                                </div>
                            </div>
                        </article>
                    </div >
                )
            }
        </section >
    )
}

export default Settings;