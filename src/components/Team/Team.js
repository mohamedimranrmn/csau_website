import React from "react";
import { useMatch, useRouter } from "@tanstack/react-location";
import { FaLinkedin } from "react-icons/fa";
import Footer from "../Footer/Footer";

// President Card
const President = ({ president }) => (
    <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 border border-slate-700/50 max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center text-center md:text-left space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative flex-shrink-0">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-blue-500/30 group-hover:ring-blue-400/50 transition-all duration-300">
                    {president.image?.asset ? (
                        <img
                            src={president.image.asset.url}
                            alt={president.name}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                                console.log('President image failed to load:', president.image.asset.url);
                                e.target.style.display = 'none';
                            }}
                            onLoad={() => {
                                console.log('President image loaded:', president.name);
                            }}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-sm">
                            No Image
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-3 flex-1">
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 tracking-wide">
                        {president.name}
                    </h3>
                    <p className="text-sm text-slate-300 tracking-wide ml-2 mt-3">
                        {`${president.year} year, ${president.department} dept`}
                    </p>
                </div>

                {(president.linkedin || president.lnurl) && (
                    <a
                        href={president.linkedin || president.lnurl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform"
                    >
                        <span className="ml-4 mr-1 font-bold">LinkedIn</span>
                        <FaLinkedin size={30} />
                    </a>
                )}
            </div>
        </div>
    </div>
);

// Head Card
const Head = ({ head }) => (
    <div className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-xl p-6 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-400 hover:scale-[1.02] border border-slate-700/30 h-full">
        <div className="flex flex-col items-center text-center space-y-4 h-full">
            <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-3 ring-emerald-500/30 group-hover:ring-emerald-400/50 transition-all duration-300">
                    {head.image?.asset ? (
                        <img
                            src={head.image.asset.url}
                            alt={head.name}
                            className="w-full h-full object-cover object-center"
                            onError={(e) => {
                                console.log('Head image failed to load:', head.image.asset.url);
                                e.target.style.display = 'none';
                            }}
                            onLoad={() => {
                                console.log('Head image loaded:', head.name);
                            }}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-sm">
                            No Image
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors duration-300 tracking-wide">
                        {head.name}
                    </h4>
                    <p className="inline-block px-3 py-1 mt-1 bg-emerald-500/10 text-emerald-200 text-xs font-semibold rounded-xl backdrop-blur-sm tracking-wide shadow-md border border-emerald-500/20 transition-all duration-300 hover:scale-105">
                        {`${head.year} year, ${head.department} dept`}
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="inline-block px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-white drop-shadow-lg bg-gradient-to-bl from-emerald-600/80 to-teal-600/80 backdrop-blur-sm border border-emerald-500/30 transition-all duration-300 group-hover:scale-105 hover:from-emerald-500/90 hover:to-teal-500/90 shadow-lg">
                        <span className="break-words">{head.domain}</span>
                    </div>

                    {(head.linkedin || head.lnurl) && (
                        <a
                            href={head.linkedin || head.lnurl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform"
                        >
                            <span className="ml-4 mr-1 font-bold">LinkedIn</span>
                            <FaLinkedin size={30} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// DeputyHead Card
const DeputyHead = ({ dhead }) => (
    <div className="group bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-lg p-5 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] border border-slate-700/20 h-full">
        <div className="flex flex-col items-center text-center space-y-3 h-full">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-purple-500/30 group-hover:ring-purple-400/50 transition-all duration-300">
                {dhead.image?.asset ? (
                    <img
                        src={dhead.image.asset.url}
                        alt={dhead.name}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                            console.log('Deputy head image failed to load:', dhead.image.asset.url);
                            e.target.style.display = 'none';
                        }}
                        onLoad={() => {
                            console.log('Deputy head image loaded:', dhead.name);
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-sm">
                        No Image
                    </div>
                )}
            </div>

            <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                    <h5 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors duration-300 tracking-wide">
                        {dhead.name}
                    </h5>
                    <p className="inline-block px-3 py-1 mt-1 bg-purple-500/10 text-purple-200 text-xs font-semibold rounded-xl backdrop-blur-sm tracking-wide shadow-md border border-purple-500/20 transition-all duration-300 hover:scale-105">
                        {`${dhead.year} year, ${dhead.department} dept`}
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="inline-block px-2 py-1.5 bg-gradient-to-r from-purple-600/70 to-pink-600/70 backdrop-blur-sm rounded-lg text-xs sm:text-sm font-medium text-white shadow-lg border border-purple-500/30 transition-all duration-300 group-hover:scale-105 hover:from-purple-500/80 hover:to-pink-500/80">
                        <span className="break-words">{dhead.domain}</span>
                    </div>

                    {(dhead.linkedin || dhead.lnurl) && (
                        <a
                            href={dhead.linkedin || dhead.lnurl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform"
                        >
                            <span className="ml-4 mr-1 font-bold">LinkedIn</span>
                            <FaLinkedin size={30} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// Section Heading
const SectionHeader = ({ title }) => (
    <div className="text-center mb-12">
        <div className="inline-block relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                {title}
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>
    </div>
);

// Main Team Component
const Team = () => {
    const { data } = useMatch();
    const router = useRouter();

    // Add loading spinner similar to Events component
    if (router.pending) {
        return (
            <div className="flex items-center justify-center space-x-2 animate-pulse h-screen w-screen">
                <div className="w-40 h-40 border-t-4 border-b-4 rounded-full animate-spin"></div>
            </div>
        );
    }

    // Add debug logging like in Events component
    console.log("Team data:", data);

    // Check if data exists and has the expected structure
    if (!data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">No data available</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
                {/* Presidents Section */}
                {data?.presidents?.length > 0 && (
                    <>
                        <SectionHeader title="Presidents" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
                            {data.presidents.map((president, i) => (
                                <President key={i} president={president} />
                            ))}
                        </div>
                    </>
                )}

                {/* General Secretary Section */}
                {data?.gensec?.length > 0 && (
                    <>
                        <SectionHeader title="General Secretary" />
                        <div className="flex justify-center mb-20">
                            <div className="w-full max-w-md">
                                {data.gensec.map((g, i) => (
                                    <President key={i} president={g} />
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Domain Heads Section */}
                {data?.domainHeads?.length > 0 && (
                    <>
                        <SectionHeader title="Heads" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                            {data.domainHeads.map((head, i) => (
                                <Head key={i} head={head} />
                            ))}
                        </div>
                    </>
                )}

                {/* Deputy Heads Section */}
                {data?.deputyHeads?.length > 0 && (
                    <>
                        <SectionHeader title="Deputy Heads" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                            {data.deputyHeads.map((d, i) => (
                                <DeputyHead key={i} dhead={d} />
                            ))}
                        </div>
                    </>
                )}

                {/* Core Members Section */}
                {data?.coreMembers?.length > 0 && (
                    <>
                        <SectionHeader title="Core Members" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                            {data.coreMembers.map((c, i) => (
                                <DeputyHead key={i} dhead={c} />
                            ))}
                        </div>
                    </>
                )}

                {/* Fallback if no data sections are available */}
                {(!data?.presidents?.length && !data?.gensec?.length && !data?.domainHeads?.length && !data?.deputyHeads?.length && !data?.coreMembers?.length) && (
                    <div className="text-center text-white text-xl">
                        No team members found
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Team;