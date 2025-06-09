import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import CalenderIcon from "../Icons/CalenderIcon";
import PlaceIcon from "../Icons/PlaceIcon";
import "./event-card.css";

function EventCards({
                        coverImage,
                        title,
                        description,
                        date,
                        location,
                        background,
                        buttonText,
                        clickfunc,
                        designation,
                    }) {
    const [isHovered, setIsHovered] = useState(false);

    const borderStyles = useSpring({
        borderColor: isHovered ? "rgba(255, 255, 255, 0.5)" : "transparent",
        transform: isHovered ? "scale(1.03)" : "scale(1)",
    });

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    // Conditional card styling
    const isPresidentOrGS =
        designation?.toLowerCase().includes("president") ||
        designation?.toLowerCase().includes("general secretary");

    const isHeadOrDeputy =
        designation?.toLowerCase().includes("head") ||
        designation?.toLowerCase().includes("deputy");

    return (
        <animated.div
            className={`event-card w-full xlg:w-[90vw] mx-auto my-8 flex flex-col xlg:flex-row items-center justify-between rounded-2xl p-6 xlg:p-10 relative
        ${
                isPresidentOrGS
                    ? "border-2"
                    : "border-[1.5px] border-transparent"
            } ${isHovered ? "pulsate-border" : ""}`}
            style={{ ...borderStyles, background }}
            onClickCapture={clickfunc}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Cover Image */}
            {coverImage && (
                <div className="w-[80%] xlg:w-[30%] mb-6 xlg:mb-0 flex justify-center items-center">
                    <img
                        src={coverImage}
                        alt={title}
                        className="rounded-xl shadow-lg w-60 xlg:w-72 object-cover"
                    />
                </div>
            )}

            {/* Content Section */}
            <div className="w-full xlg:w-[65%] flex flex-col justify-center px-4 text-white">
                {/* Title */}
                <h2 className="text-xl xlg:text-3xl font-extrabold uppercase tracking-wide mb-2 text-center xlg:text-left">
                    {title}
                </h2>

                {/* Designation if available */}
                {designation && (
                    <p
                        className={`text-sm xlg:text-base font-semibold italic text-[#41e6a6] ${
                            isHeadOrDeputy ? "mb-3 mt-1" : "mb-4"
                        } text-center xlg:text-left`}
                    >
                        {designation}
                    </p>
                )}

                {/* Description */}
                {description && (
                    <p className="text-sm xlg:text-base leading-7 text-justify mb-4 opacity-90">
                        {truncate(description, 600)}
                    </p>
                )}

                {/* Meta Information */}
                {(date || location) && (
                    <div className="flex flex-col xlg:flex-row justify-between border-t border-b border-[#41e6a680] py-3 gap-4">
                        {date && (
                            <div className="flex items-center gap-3 text-sm xlg:text-lg uppercase tracking-wide">
                                <CalenderIcon height={25} width={25} />
                                <span>{date}</span>
                            </div>
                        )}
                        {location && (
                            <div className="flex items-center gap-3 text-sm xlg:text-lg uppercase tracking-wide">
                                <PlaceIcon height={25} width={25} />
                                <span>{location}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* CTA Button */}
                {buttonText && (
                    <div className="mt-6 flex justify-center xlg:justify-end">
                        <button className="bg-white text-[#192444] text-sm xlg:text-base font-bold rounded-xl shadow-md hover:bg-[#41e6a7] hover:text-white transition-all duration-300 ease-in-out">
                            {buttonText}
                        </button>
                    </div>
                )}
            </div>
        </animated.div>
    );
}

export default EventCards;
