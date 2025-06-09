import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import {urlFor} from "../../client";

const DeputyHead = ({ dhead }) => {
    return (
        <div className="group bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-lg p-5 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] border border-slate-700/20 h-full">
            <div className="flex flex-col items-center text-center space-y-3 h-full">
                {/* Profile Image */}
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-purple-500/30 group-hover:ring-purple-400/50 transition-all duration-300">
                    <img
                        src={urlFor(dhead.image).width(300).height(300).url()}
                        alt={dhead.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                            e.target.src = '/images/placeholder.jpg';
                            e.target.onerror = null;
                        }}
                    />
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                    {/* Name and Details */}
                    <div>
                        <h5 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors duration-300 tracking-wide">
                            {dhead.name}
                        </h5>
                        <p className="text-xs text-slate-400 mt-1 tracking-wide">
                            {`${dhead.year} year, ${dhead.department} dept`}
                        </p>
                    </div>

                    {/* Domain and LinkedIn */}
                    <div className="space-y-3">
                        <div className="inline-block px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded text-xs font-medium text-white shadow-md">
                            {dhead.domain}
                        </div>

                        {(dhead.linkedin || dhead.lnurl) && (
                            <div>
                                <a
                                    href={dhead.linkedin || dhead.lnurl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-purple-400 transition-colors duration-300 inline-block hover:scale-110 transform"
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

export default DeputyHead;