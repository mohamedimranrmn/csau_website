import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import {urlFor} from "../../client";

const President = ({ president, isGeneralSecretary = false }) => {
    return (
        <div className={`group relative bg-gradient-to-br from-slate-800/50 to-slate-900/70 backdrop-blur-lg rounded-2xl p-6 
      hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-[1.02] 
      border border-slate-700/50 ${isGeneralSecretary ? 'max-w-2xl mx-auto' : 'max-w-md'}`}>

            {/* Glass overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center text-center md:text-left space-y-4 md:space-y-0 md:space-x-6">
                {/* Profile Image */}
                <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-blue-500/30 group-hover:ring-blue-400/50 transition-all duration-300">
                        <img
                            src={urlFor(president.image).width(300).height(300).url()}
                            alt={president.name}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                                e.target.src = '/images/placeholder.jpg';
                                e.target.onerror = null;
                            }}
                        />
                    </div>
                    {/* Status indicator */}
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-800 shadow-lg"></div>
                </div>

                {/* Content */}
                <div className="space-y-3 flex-1">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 tracking-wide">
                            {president.name}
                        </h3>
                        <p className="text-sm text-slate-300 mt-1 tracking-wide">
                            {`${president.year} year, ${president.department} dept`}
                        </p>
                        {isGeneralSecretary && (
                            <div className="mt-2 inline-block px-3 py-1 bg-gradient-to-r from-blue-600/70 to-purple-600/70 rounded-lg text-sm font-medium text-white shadow-md">
                                General Secretary
                            </div>
                        )}
                    </div>

                    {/* LinkedIn */}
                    {(president.linkedin || president.lnurl) && (
                        <a
                            href={president.linkedin || president.lnurl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform"
                        >
                            <FaLinkedin size={20} />
                            <span className="ml-2 text-sm">Connect</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default President;