import React from "react";
import { Zap } from 'lucide-react';


const Navbar = () => {
    return(
        <header className=' sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm
        border-b border-gray-200 font-sans'>
            <div className=' flex items-center justify-between px-4 py-3 md:px-6 max-w-7x1 mx-auto'>
                {/* LOGO */}
                <div className=' flex items-center gap-2 cursor-pointer group'
                onClick={() => Navigatie('/')}>
                    {/* LOGO */}
                    <div className=' relative w-10 h-10 flex items-center justify-center rounded-x1 bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 shadow-lg group-hover:shadow-purple-300/50
                    group-hover:scale-105 transition-all duration-300'>

                        </div>'




                </div>
            </div>
        </header>
    )
}

export default Navbar