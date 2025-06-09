import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import {urlFor} from "../../client";

const Head = ({ head }) => {
    return (
        <div className="group bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-md rounded-xl p-6 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-400 hover:scale-[1.02] border border-slate-700/30 h-full">
            <div className="flex flex-col items-center text-center space-y-4 h-full">
                {/* Profile Image */}
                <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden ring-3 ring-emerald-500/30 group-hover:ring-emerald-400/50 transition-all duration-300">
                        <img
                            src={urlFor(head.image).width(300).height(300).url()}
                            alt={head.name}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-400"
                            onError={(e) => {
                                e.target.src = '/images/placeholder.jpg';
                                e.target.onerror = null;
                            }}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                    {/* Name and Details */}
                    <div>
                        <h4 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors duration-300 tracking-wide">
                            {head.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 tracking-wide">
                            {`${head.year} year, ${head.department} dept`}
                        </p>
                    </div>

                    {/* Domain and LinkedIn */}
                    <div className="space-y-3">
                        <div className="inline-block px-3 py-1.5 bg-gradient-to-r from-emerald-600/70 to-teal-600/70 rounded-lg text-sm font-medium text-white shadow-lg">
                            {head.domain}
                        </div>

                        {(head.linkedin || head.lnurl) && (
                            <div>
                                <a
                                    href={head.linkedin || head.lnurl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 inline-block hover:scale-110 transform"
                                >
                                    <FaLinkedin size={18} />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Head;