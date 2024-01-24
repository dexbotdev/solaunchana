import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import CardProject from '../../components/CardProject';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [searchedProject, setSearchedProject] = useState([]);

    const fetchProjects = () => {
        // Where we're fetching data from
        return (
            fetch(`/api/projects.json`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            })
                // We get the API response and receive data in JSON format
                .then((response) => {
                    // setIsLoading(true);
                    return response.json();
                })
                .then((data) => {
                    // setIsLoading(false);
                    setProjects(data);
                    setSearchedProject(data);
                    return;
                })
                .catch((error) => console.error(error))
        );
    };

    const [inputSearch, setInputSearch] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="relative py-10">
            <div data-aos="fade-up" className="relative container mx-auto px-2 lg:px-5">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    <h3 className="text-4xl font-bold">Discover the hottest projects</h3>
                    <input
                        value={inputSearch}
                        placeholder="Search project"
                        className="w-full lg:w-[350px] max-w-sm text-lg px-4 py-3 bg-white/10 rounded-full"
                        onChange={(e) => {
                            setInputSearch(e?.target.value);
                            if (e.target.value === '') {
                                return setSearchedProject([...projects]);
                            }

                            return setSearchedProject(
                                projects?.filter((project:any) =>
                                    project?.title?.toLowerCase()?.includes(e.target.value.toLowerCase().trim())
                                )
                            );
                        }}
                    />
                </div>

                <div className="hidden mt-20 lg:flex flex-col lg:flex-row items-center  justify-center lg:justify-end gap-5 text-sm">
                    <div className="flex gap-2 lg:gap-5 items-center">
                        <div className="flex gap-1 items-center justify-center text-center px-4 py-3 rounded-full text-black bg-[#FF551F]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                            >
                                <mask id="mask0_47_5398" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                                    <rect width="18" height="18" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_47_5398)">
                                    <path
                                        d="M3 10.5C3 9.1875 3.3125 8.01875 3.9375 6.99375C4.5625 5.96875 5.25 5.10625 6 4.40625C6.75 3.70625 7.4375 3.17188 8.0625 2.80313L9 2.25V4.725C9 5.1875 9.15625 5.55313 9.46875 5.82188C9.78125 6.09063 10.1313 6.225 10.5188 6.225C10.7313 6.225 10.9344 6.18125 11.1281 6.09375C11.3219 6.00625 11.5 5.8625 11.6625 5.6625L12 5.25C12.9 5.775 13.625 6.50312 14.175 7.43437C14.725 8.36562 15 9.3875 15 10.5C15 11.6 14.7312 12.6031 14.1938 13.5094C13.6562 14.4156 12.95 15.1313 12.075 15.6562C12.2875 15.3562 12.4531 15.0281 12.5719 14.6719C12.6906 14.3156 12.75 13.9375 12.75 13.5375C12.75 13.0375 12.6562 12.5656 12.4688 12.1219C12.2812 11.6781 12.0125 11.2812 11.6625 10.9312L9 8.325L6.35625 10.9312C5.99375 11.2937 5.71875 11.6938 5.53125 12.1313C5.34375 12.5688 5.25 13.0375 5.25 13.5375C5.25 13.9375 5.30938 14.3156 5.42812 14.6719C5.54688 15.0281 5.7125 15.3562 5.925 15.6562C5.05 15.1313 4.34375 14.4156 3.80625 13.5094C3.26875 12.6031 3 11.6 3 10.5ZM9 10.425L10.5938 11.9813C10.8063 12.1938 10.9688 12.4313 11.0813 12.6938C11.1938 12.9563 11.25 13.2375 11.25 13.5375C11.25 14.15 11.0312 14.6719 10.5938 15.1031C10.1562 15.5344 9.625 15.75 9 15.75C8.375 15.75 7.84375 15.5344 7.40625 15.1031C6.96875 14.6719 6.75 14.15 6.75 13.5375C6.75 13.25 6.80625 12.9719 6.91875 12.7031C7.03125 12.4344 7.19375 12.1938 7.40625 11.9813L9 10.425Z"
                                        fill="black"
                                    />
                                </g>
                            </svg>
                            <span className="uppercase font-bold">TRending</span>
                        </div>
                        <div className="flex gap-1 items-center justify-center text-center px-4 py-3 rounded-full text-[#FFE91F] bg-[#FFE91F33]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                            >
                                <mask id="mask0_47_5403" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                                    <rect width="18" height="18" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_47_5403)">
                                    <path
                                        d="M6.675 12.375L10.5 8.55V10.2375H12V6H7.7625V7.5H9.43125L5.625 11.3062L6.675 12.375ZM9 16.5C7.9625 16.5 6.9875 16.3031 6.075 15.9094C5.1625 15.5156 4.36875 14.9813 3.69375 14.3063C3.01875 13.6313 2.48438 12.8375 2.09063 11.925C1.69687 11.0125 1.5 10.0375 1.5 9C1.5 7.9625 1.69687 6.9875 2.09063 6.075C2.48438 5.1625 3.01875 4.36875 3.69375 3.69375C4.36875 3.01875 5.1625 2.48438 6.075 2.09063C6.9875 1.69687 7.9625 1.5 9 1.5C10.0375 1.5 11.0125 1.69687 11.925 2.09063C12.8375 2.48438 13.6313 3.01875 14.3063 3.69375C14.9813 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.0375 16.3031 11.0125 15.9094 11.925C15.5156 12.8375 14.9813 13.6313 14.3063 14.3063C13.6313 14.9813 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5Z"
                                        fill="#FFE91F"
                                    />
                                </g>
                            </svg>
                            <span className="uppercase font-bold">coming</span>
                        </div>
                        <div className="flex gap-1 items-center justify-center text-center px-4 py-3 rounded-full text-[#00FFA3] bg-[#00FFA333]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                            >
                                <mask id="mask0_47_5408" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                                    <rect width="18" height="18" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_47_5408)">
                                    <path
                                        d="M9 11.25C9.625 11.25 10.1562 11.0312 10.5938 10.5938C11.0312 10.1562 11.25 9.625 11.25 9C11.25 8.375 11.0312 7.84375 10.5938 7.40625C10.1562 6.96875 9.625 6.75 9 6.75C8.375 6.75 7.84375 6.96875 7.40625 7.40625C6.96875 7.84375 6.75 8.375 6.75 9C6.75 9.625 6.96875 10.1562 7.40625 10.5938C7.84375 11.0312 8.375 11.25 9 11.25ZM9 16.5C7.9625 16.5 6.9875 16.3031 6.075 15.9094C5.1625 15.5156 4.36875 14.9813 3.69375 14.3063C3.01875 13.6313 2.48438 12.8375 2.09063 11.925C1.69687 11.0125 1.5 10.0375 1.5 9C1.5 7.9625 1.69687 6.9875 2.09063 6.075C2.48438 5.1625 3.01875 4.36875 3.69375 3.69375C4.36875 3.01875 5.1625 2.48438 6.075 2.09063C6.9875 1.69687 7.9625 1.5 9 1.5C10.0375 1.5 11.0125 1.69687 11.925 2.09063C12.8375 2.48438 13.6313 3.01875 14.3063 3.69375C14.9813 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.0375 16.3031 11.0125 15.9094 11.925C15.5156 12.8375 14.9813 13.6313 14.3063 14.3063C13.6313 14.9813 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5Z"
                                        fill="#00FFA3"
                                    />
                                </g>
                            </svg>
                            <span className="uppercase font-bold">live</span>
                        </div>

                        <div className="flex gap-1 items-center justify-center text-center px-4 py-3 rounded-full text-[#FF1F1F] bg-[#FF1F1F33]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                            >
                                <mask id="mask0_47_5418" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                                    <rect width="18" height="18" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_47_5418)">
                                    <path
                                        d="M5.25 9.75H12.75V8.25H5.25V9.75ZM9 16.5C7.9625 16.5 6.9875 16.3031 6.075 15.9094C5.1625 15.5156 4.36875 14.9813 3.69375 14.3063C3.01875 13.6313 2.48438 12.8375 2.09063 11.925C1.69687 11.0125 1.5 10.0375 1.5 9C1.5 7.9625 1.69687 6.9875 2.09063 6.075C2.48438 5.1625 3.01875 4.36875 3.69375 3.69375C4.36875 3.01875 5.1625 2.48438 6.075 2.09063C6.9875 1.69687 7.9625 1.5 9 1.5C10.0375 1.5 11.0125 1.69687 11.925 2.09063C12.8375 2.48438 13.6313 3.01875 14.3063 3.69375C14.9813 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.0375 16.3031 11.0125 15.9094 11.925C15.5156 12.8375 14.9813 13.6313 14.3063 14.3063C13.6313 14.9813 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5Z"
                                        fill="#FF1F1F"
                                    />
                                </g>
                            </svg>
                            <span className="uppercase font-bold">END</span>
                        </div>
                    </div>

                    <div className="hidden lg:block w-[2px] bg-white/40 h-[30px]"></div>

                    <div className="flex gap-5 items-center">
                        <div className="flex gap-1 items-center justify-center text-center px-4 py-3 rounded-full text-[#DC1FFF] bg-[#DC1FFF33]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                            >
                                <mask id="mask0_47_5382" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                                    <rect width="18" height="18" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_47_5382)">
                                    <path
                                        d="M9 16.5C7.2625 16.0625 5.82812 15.0656 4.69688 13.5094C3.56563 11.9531 3 10.225 3 8.325V3.75L9 1.5L15 3.75V8.325C15 10.225 14.4344 11.9531 13.3031 13.5094C12.1719 15.0656 10.7375 16.0625 9 16.5ZM7.5 12H10.5C10.7125 12 10.8906 11.9281 11.0344 11.7844C11.1781 11.6406 11.25 11.4625 11.25 11.25V9C11.25 8.7875 11.1781 8.60938 11.0344 8.46563C10.8906 8.32188 10.7125 8.25 10.5 8.25V7.5C10.5 7.0875 10.3531 6.73438 10.0594 6.44063C9.76563 6.14687 9.4125 6 9 6C8.5875 6 8.23438 6.14687 7.94063 6.44063C7.64687 6.73438 7.5 7.0875 7.5 7.5V8.25C7.2875 8.25 7.10938 8.32188 6.96562 8.46563C6.82187 8.60938 6.75 8.7875 6.75 9V11.25C6.75 11.4625 6.82187 11.6406 6.96562 11.7844C7.10938 11.9281 7.2875 12 7.5 12ZM8.25 8.25V7.5C8.25 7.2875 8.32188 7.10938 8.46562 6.96562C8.60938 6.82188 8.7875 6.75 9 6.75C9.2125 6.75 9.39063 6.82188 9.53438 6.96562C9.67813 7.10938 9.75 7.2875 9.75 7.5V8.25H8.25Z"
                                        fill="#DC1FFF"
                                    />
                                </g>
                            </svg>
                            <span className="uppercase font-bold">safu</span>
                        </div>
                        <div className="flex gap-1 items-center justify-center text-center px-4 py-3 rounded-full text-[#31ABDE] bg-[#31ABDE33]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                            >
                                <mask id="mask0_47_5377" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                                    <rect width="18" height="18" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_47_5377)">
                                    <path
                                        d="M8.2125 11.6625L12.45 7.425L11.3813 6.35625L8.2125 9.525L6.6375 7.95L5.56875 9.01875L8.2125 11.6625ZM9 16.5C7.2625 16.0625 5.82812 15.0656 4.69688 13.5094C3.56563 11.9531 3 10.225 3 8.325V3.75L9 1.5L15 3.75V8.325C15 10.225 14.4344 11.9531 13.3031 13.5094C12.1719 15.0656 10.7375 16.0625 9 16.5Z"
                                        fill="#31ABDE"
                                    />
                                </g>
                            </svg>
                            <span className="uppercase font-bold">audit</span>
                        </div>
                        <div className="flex gap-1 items-center justify-center text-center px-4 py-3 rounded-full text-[#00FFA3] bg-[#00FFA333]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                            >
                                <mask id="mask0_47_5387" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                                    <rect width="18" height="18" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_47_5387)">
                                    <path
                                        d="M9 9.75C9.725 9.75 10.3438 9.49375 10.8563 8.98125C11.3688 8.46875 11.625 7.85 11.625 7.125C11.625 6.4 11.3688 5.78125 10.8563 5.26875C10.3438 4.75625 9.725 4.5 9 4.5C8.275 4.5 7.65625 4.75625 7.14375 5.26875C6.63125 5.78125 6.375 6.4 6.375 7.125C6.375 7.85 6.63125 8.46875 7.14375 8.98125C7.65625 9.49375 8.275 9.75 9 9.75ZM9 16.5C7.175 16.0375 5.71875 15.0375 4.63125 13.5C3.54375 11.9625 3 10.2375 3 8.325V3.75L9 1.5L15 3.75V8.325C15 10.2375 14.4563 11.9625 13.3687 13.5C12.2812 15.0375 10.825 16.0375 9 16.5ZM9 14.925C9.7375 14.6875 10.3906 14.3156 10.9594 13.8094C11.5281 13.3031 12.025 12.7312 12.45 12.0938C11.9125 11.8188 11.3531 11.6094 10.7719 11.4656C10.1906 11.3219 9.6 11.25 9 11.25C8.4 11.25 7.80938 11.3219 7.22813 11.4656C6.64688 11.6094 6.0875 11.8188 5.55 12.0938C5.975 12.7312 6.47188 13.3031 7.04063 13.8094C7.60938 14.3156 8.2625 14.6875 9 14.925Z"
                                        fill="#00FFA3"
                                    />
                                </g>
                            </svg>
                            <span className="uppercase font-bold">kyc</span>
                        </div>
                        <div className="flex gap-1 items-center justify-center text-center px-4 py-3 rounded-full text-[#FFE91F] bg-[#FFE91F33]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                            >
                                <mask id="mask0_47_5392" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                                    <rect width="18" height="18" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_47_5392)">
                                    <path
                                        d="M9 9.75C9.725 9.75 10.3438 9.49375 10.8563 8.98125C11.3688 8.46875 11.625 7.85 11.625 7.125C11.625 6.4 11.3688 5.78125 10.8563 5.26875C10.3438 4.75625 9.725 4.5 9 4.5C8.275 4.5 7.65625 4.75625 7.14375 5.26875C6.63125 5.78125 6.375 6.4 6.375 7.125C6.375 7.85 6.63125 8.46875 7.14375 8.98125C7.65625 9.49375 8.275 9.75 9 9.75ZM9 16.5C7.175 16.0375 5.71875 15.0375 4.63125 13.5C3.54375 11.9625 3 10.2375 3 8.325V3.75L9 1.5L15 3.75V8.325C15 10.2375 14.4563 11.9625 13.3687 13.5C12.2812 15.0375 10.825 16.0375 9 16.5ZM9 14.925C9.7375 14.6875 10.3906 14.3156 10.9594 13.8094C11.5281 13.3031 12.025 12.7312 12.45 12.0938C11.9125 11.8188 11.3531 11.6094 10.7719 11.4656C10.1906 11.3219 9.6 11.25 9 11.25C8.4 11.25 7.80938 11.3219 7.22813 11.4656C6.64688 11.6094 6.0875 11.8188 5.55 12.0938C5.975 12.7312 6.47188 13.3031 7.04063 13.8094C7.60938 14.3156 8.2625 14.6875 9 14.925Z"
                                        fill="#FFE91F"
                                    />
                                </g>
                            </svg>
                            <span className="uppercase font-bold">DOXX</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {!isEmpty(searchedProject) &&
                            searchedProject?.map(
                                ({ id, isAudit, isDoxx, isKYC, isSafu, logoUrl, shortDescription, title, status }) => (
                                    <CardProject
                                        key={id}
                                        name={title}
                                        logo={logoUrl}
                                        desc={shortDescription}
                                        safu={isSafu}
                                        audit={isAudit}
                                        doxx={isDoxx}
                                        kyc={isKYC}
                                        link={`/launchpad/${id}`}
                                        status={status}
                                    />
                                )
                            )}
                    </div>
                </div>

                <div className="flex justify-center mt-12">
                    <a
                        className="inline-flex gap-2 items-center justify-center text-center text-[#00FFA3] bg-transparent font-bold py-3.5 px-8 rounded-full border-[1px] border-[#00FFA3] transition-all hover:opacity-80 "
                        href="#"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
                            <mask id="mask0_44_3832" maskUnits="userSpaceOnUse" x="0" y="0" width="29" height="28">
                                <rect x="0.5" width="28" height="28" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_44_3832)">
                                <path
                                    d="M14.5 18.6668L19.1667 14.0002L17.5334 12.3668L15.6667 14.2335V9.3335H13.3334V14.2335L11.4667 12.3668L9.83337 14.0002L14.5 18.6668ZM14.5 25.6668C12.8862 25.6668 11.3695 25.3606 9.95004 24.7481C8.5306 24.1356 7.29587 23.3043 6.24587 22.2543C5.19587 21.2043 4.36462 19.9696 3.75212 18.5502C3.13962 17.1307 2.83337 15.6141 2.83337 14.0002C2.83337 12.3863 3.13962 10.8696 3.75212 9.45016C4.36462 8.03072 5.19587 6.796 6.24587 5.746C7.29587 4.696 8.5306 3.86475 9.95004 3.25225C11.3695 2.63975 12.8862 2.3335 14.5 2.3335C16.1139 2.3335 17.6306 2.63975 19.05 3.25225C20.4695 3.86475 21.7042 4.696 22.7542 5.746C23.8042 6.796 24.6355 8.03072 25.248 9.45016C25.8605 10.8696 26.1667 12.3863 26.1667 14.0002C26.1667 15.6141 25.8605 17.1307 25.248 18.5502C24.6355 19.9696 23.8042 21.2043 22.7542 22.2543C21.7042 23.3043 20.4695 24.1356 19.05 24.7481C17.6306 25.3606 16.1139 25.6668 14.5 25.6668Z"
                                    fill="#00FFA3"
                                />
                            </g>
                        </svg>
                        <span>Show More Projects</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
