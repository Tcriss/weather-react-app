import { ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence } from 'framer-motion';

function Toggle({ children, icon, activeIcon, color }: { children: ReactNode, icon: string, activeIcon: string, color: string }) {
    const [isOpen, setOpen] = useState<boolean>(false);
    const menuRef = useRef<any>();

    useEffect(() => {
        function close(event: any): void {
            if (event.current !== null) {
                if (!menuRef.current.contains(event.target)) setOpen(false);
            }
        }

        document.addEventListener('mousedown', close);
    });

    return (
        <section ref={menuRef}>
            <div id="toggle" className="w-7 h-full flex justify-center items-center">
                <button onClick={() => setOpen(val => val = !val)} className={`w-full h-7 flex rounded-full justify-center items-center transition-all ${ isOpen ? color : 'bg-slate-50/25'} hover:${color} hover:text-white hover:5 active: active:shadow-lg`}>
                    <i className={`fi ${ isOpen ? activeIcon : icon } flex justify-center items-center`}></i>
                </button>
            </div>
            <AnimatePresence>{ isOpen && children }</AnimatePresence>
        </section>
    )
}

export default Toggle;