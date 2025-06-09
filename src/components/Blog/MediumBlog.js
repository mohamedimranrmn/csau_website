import { useMatch, useRouter } from '@tanstack/react-location';
import React from 'react';

const MediumBlogCard = ({ imageURL, title, body, link }) => (
    <a
        href={link}
        target="_blank"
        rel="noreferrer noopener"
        className="transition-transform transform hover:scale-105 duration-200 h-full"
    >
        <div className="glassIco flex flex-col justify-between h-full rounded-lg shadow-lg overflow-hidden">
            <img
                className="object-cover w-full h-48"
                src={imageURL}
                alt={title}
            />
            <div className="p-4 flex flex-col justify-between h-full">
                <h5 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50 line-clamp-2">
                    {title}
                </h5>
                <div className="flex justify-end mt-auto pt-4">
                    <button
                        type="button"
                        className="rounded bg-navSpecial px-4 py-2 text-sm font-medium text-navbarBg hover:bg-opacity-90 transition"
                    >
                        Read more
                    </button>
                </div>
            </div>
        </div>
    </a>
);

function MediumBlog() {
    const { data } = useMatch();
    const router = useRouter();

    if (router.pending) {
        return (
            <div className="flex items-center justify-center space-x-2 animate-pulse h-screen w-screen">
                <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin text-navSpecial"></div>
            </div>
        );
    }

    if (data.blogs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-screen">
                <h1 className="font-semibold text-xl md:text-5xl text-navSpecial">
                    No blogs present! Stay tuned for more updates
                </h1>
            </div>
        );
    }

    return (
        <div className="pt-[7em] px-4 md:px-7 pb-7">
            <div className="text-white font-main font-bold text-[20px] mb-[2em] xlg:text-[30px] text-center uppercase flex justify-center">
                <p className="w-fit border-white border-t-[5px] border-b-[5px]">Blogs</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {data.blogs.map((blog, index) => {
                    const imageURL = blog.description?.toString().match(/<img[^>]+src="([^">]+)"/)?.[1] || "/fallback.jpg";
                    return (
                        <MediumBlogCard
                            key={index}
                            imageURL={imageURL}
                            title={blog.title}
                            link={blog.link}
                            body={blog.content}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default MediumBlog;
