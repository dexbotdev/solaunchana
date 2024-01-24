import React, { useEffect, useState } from 'react';

import bg2 from '../../assets/image/bg-2.png';
import logo from '../../assets/image/logo.png';
import choose1 from '../../assets/image/soltradingbot.png';
import choose2 from '../../assets/image/choose2.png';
import community from '../../assets/image/community.png';
// import trendingproject from '../../assets/image/trending-project.png';
import chooseAb from '../../assets/image/choose-ab.png';
import CardProject from '../../components/CardProject';

import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

export default function Home() {
    const [projects, setProjects] = useState([]);
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
                    return setProjects(data);
                })
                .catch((error) => console.error(error))
        );
    };

    const [trendingProjects, setTrendingProjects] = useState<[]>([]);
    const fetchTrendingProjects = () => {
        // Where we're fetching data from
        return (
            fetch(`/api/trending.json`, {
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
                    return setTrendingProjects(data);
                })
                .catch((error) => console.error(error))
        );
    };

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const renderTrendingProject = (screenWidth: number, trendingProjects: []) => {
        let temp;

        if (isEmpty(trendingProjects)) return <></>;

        if (screenWidth > 1300) {
            temp = trendingProjects.slice(0, 10);
        } else if (screenWidth > 800) {
            temp = trendingProjects?.slice(0, 7);
        } else {
            temp = trendingProjects?.slice(0, 3);
        }

        return temp.map((item, index) => (
            <div key={index} className={`w-20 h-20 rounded-full overflow-hidden opacity-[0.9]`}>
                <img src={item} alt="" />
            </div>
        ));
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        fetchProjects();
        fetchTrendingProjects();
    }, []);

    return (
        <div>
            <div className="relative py-10 flex justify-center">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="186" height="186" viewBox="0 0 186 186" fill="none">
                    <circle cx="93" cy="93" r="93" fill="#9745FF" fillOpacity="0.2" />
                    <circle cx="93" cy="93" r="92" stroke="#00FFA3" strokeOpacity="0.2" strokeWidth="2" />
                    <path
                        d="M139.884 93.6858C139.757 93.1946 139.439 92.7689 139.01 92.5233L114.878 78.1806C113.67 77.4602 112.16 78.3116 112.081 79.7361L110.221 111.631C110.173 112.449 109.616 113.153 108.838 113.366L38.8271 132.686C37.2215 133.128 36.9353 135.355 38.382 136.206L61.226 149.796C61.6552 150.058 62.1639 150.123 62.6408 149.992L146.577 126.825C147.579 126.546 148.167 125.498 147.896 124.467L139.884 93.6858Z"
                        fill="url(#paint0_linear_47_5266)"
                    />
                    <path
                        d="M112.08 79.7209L110.22 111.534C110.173 112.401 110.681 113.187 111.492 113.466L145.067 125.156C146.481 125.647 147.849 124.321 147.467 122.831L139.884 93.6707C139.757 93.1795 139.439 92.7538 139.01 92.5082L114.878 78.1655C113.67 77.4451 112.16 78.2965 112.08 79.7209Z"
                        fill="url(#paint1_linear_47_5266)"
                    />
                    <path
                        d="M147.022 50.069L124.178 36.4959C123.748 36.2339 123.24 36.1684 122.763 36.2994L38.8265 59.4671C37.825 59.7454 37.2368 60.7933 37.5071 61.8248L45.5192 92.6058C45.6463 93.097 45.9643 93.5227 46.3935 93.7683L70.5252 108.111C71.7333 108.831 73.2436 107.98 73.323 106.556L75.183 74.6611C75.2307 73.8425 75.7871 73.1384 76.566 72.9256L146.592 53.6056C148.198 53.1635 148.484 50.9368 147.037 50.0854L147.022 50.069Z"
                        fill="url(#paint2_linear_47_5266)"
                    />
                    <path
                        d="M73.3077 106.556L75.1676 74.7437C75.2153 73.8759 74.7066 73.09 73.8959 72.8117L39.0019 60.6466C38.1594 60.3519 37.3327 61.1541 37.5553 62.0383L45.5038 92.5901C45.631 93.0813 45.9489 93.507 46.3781 93.7526L70.5098 108.095C71.718 108.816 73.2282 107.964 73.3077 106.54V106.556Z"
                        fill="url(#paint3_linear_47_5266)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_47_5266"
                            x1="147.944"
                            y1="113.988"
                            x2="37.444"
                            y2="113.988"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#00FFA3" />
                            <stop offset="0.5" stopColor="#31ABDE" />
                            <stop offset="1" stopColor="#DC1FFF" />
                        </linearGradient>
                        <linearGradient
                            id="paint1_linear_47_5266"
                            x1="131.9"
                            y1="129.144"
                            x2="117.477"
                            y2="76.8821"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#00FFA3" />
                            <stop offset="1" stopColor="#6D90D0" />
                        </linearGradient>
                        <linearGradient
                            id="paint2_linear_47_5266"
                            x1="147.944"
                            y1="72.3034"
                            x2="39.0332"
                            y2="72.3034"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#00FFA3" />
                            <stop offset="0.5" stopColor="#31ABDE" />
                            <stop offset="1" stopColor="#DC1FFF" />
                        </linearGradient>
                        <linearGradient
                            id="paint3_linear_47_5266"
                            x1="67.1451"
                            y1="109.621"
                            x2="52.5443"
                            y2="56.7141"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#6D90D0" />
                            <stop offset="1" stopColor="#DC1FFF" />
                        </linearGradient>
                    </defs>
                </svg> */}
                <img src={logo} alt="" style={{ width: '186px', height: '186px' }} />
            </div>

            <section className="relative py-14 lg:py-20" data-aos="fade-up">
                <div className="max-w-md absolute right-0">
                    <img src={chooseAb} alt="" />
                </div>
                <div className="container mx-auto px-2 lg:px-5">
                    <h3 className="text-4xl font-bold">Choose your best tool</h3>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-12">
                        <a
                            href="https://t.me/SolTradingBot"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-aos="fade-right"
                            data-aos-delay="100"
                            className="bg-gradient-choose p-7 max-w-md rounded-3xl"
                        >
                            <div className="w-14 h-14">
                                <img src={choose1} alt="" />
                            </div>
                            <h3 className="text-2xl font-bold my-3">Use Soltradingbot</h3>
                            <p className="text-lg">Using the Bot for easily Trading and Snipe on Solana!</p>
                        </a>
                        <a
                            href="https://phantom.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-aos="fade-right"
                            data-aos-delay="300"
                            className="bg-gradient-choose p-7 max-w-md rounded-3xl"
                        >
                            <div className="w-14 h-14">
                                <img src={choose2} alt="" />
                            </div>
                            <h3 className="text-2xl font-bold my-3">Use Phantom Wallet</h3>
                            <p className="text-lg">A friendly Solana wallet build for Defi, NFTs and Trading!</p>
                        </a>
                    </div>
                    <div className="mt-12" data-aos="fade-up">
                        {/* <img src={trendingproject} alt="" /> */}
                        <div className="p-7 bg-gradient-trending rounded-2xl">
                            <div className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                >
                                    <mask
                                        id="mask0_47_5345"
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="28"
                                        height="28"
                                    >
                                        <rect width="28" height="28" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_47_5345)">
                                        <path
                                            d="M4.6665 16.3333C4.6665 14.2917 5.15262 12.4736 6.12484 10.8792C7.09706 9.28472 8.1665 7.94306 9.33317 6.85417C10.4998 5.76528 11.5693 4.93403 12.5415 4.36042L13.9998 3.5V7.35C13.9998 8.06944 14.2429 8.63819 14.729 9.05625C15.2151 9.47431 15.7596 9.68333 16.3623 9.68333C16.6929 9.68333 17.0089 9.61528 17.3103 9.47917C17.6116 9.34306 17.8887 9.11944 18.1415 8.80833L18.6665 8.16667C20.0665 8.98333 21.1943 10.116 22.0498 11.5646C22.9054 13.0132 23.3332 14.6028 23.3332 16.3333C23.3332 18.0444 22.9151 19.6049 22.079 21.0146C21.2429 22.4243 20.1443 23.5375 18.7832 24.3542C19.1137 23.8875 19.3714 23.3771 19.5561 22.8229C19.7408 22.2687 19.8332 21.6806 19.8332 21.0583C19.8332 20.2806 19.6873 19.5465 19.3957 18.8562C19.104 18.166 18.6859 17.5486 18.1415 17.0042L13.9998 12.95L9.88734 17.0042C9.32345 17.5681 8.89567 18.1903 8.604 18.8708C8.31234 19.5514 8.1665 20.2806 8.1665 21.0583C8.1665 21.6806 8.25887 22.2687 8.44359 22.8229C8.62831 23.3771 8.88595 23.8875 9.2165 24.3542C7.85539 23.5375 6.75678 22.4243 5.92067 21.0146C5.08456 19.6049 4.6665 18.0444 4.6665 16.3333ZM13.9998 16.2167L16.479 18.6375C16.8096 18.9681 17.0623 19.3375 17.2373 19.7458C17.4123 20.1542 17.4998 20.5917 17.4998 21.0583C17.4998 22.0111 17.1596 22.8229 16.479 23.4937C15.7984 24.1646 14.9721 24.5 13.9998 24.5C13.0276 24.5 12.2012 24.1646 11.5207 23.4937C10.8401 22.8229 10.4998 22.0111 10.4998 21.0583C10.4998 20.6111 10.5873 20.1785 10.7623 19.7604C10.9373 19.3424 11.1901 18.9681 11.5207 18.6375L13.9998 16.2167Z"
                                            fill="#fff"
                                        />
                                    </g>
                                </svg>
                                <h3>Trending project</h3>
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                {/* {!isEmpty(trendingProjects) &&
                                    trendingProjects.map((project, index) => (
                                        <div
                                            key={index}
                                            className={`w-20 h-20 rounded-full overflow-hidden opacity-[0.9]`}
                                        >
                                            <img src={project} alt="" />
                                        </div>
                                    ))} */}
                                {renderTrendingProject(screenWidth, trendingProjects)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="launchpad-list" className="relative py-10 lg:py-24">
                <div className="absolute -top-10">
                    <img src={bg2} alt="" />
                </div>
                <div data-aos="fade-up" className="relative container mx-auto px-2 lg:px-5">
                    <h3 className="text-4xl font-bold">Discover the hottest projects</h3>

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
                                    <mask
                                        id="mask0_47_5398"
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="18"
                                        height="18"
                                    >
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
                                    <mask
                                        id="mask0_47_5403"
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="18"
                                        height="18"
                                    >
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
                                    <mask
                                        id="mask0_47_5408"
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="18"
                                        height="18"
                                    >
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
                            {/* <div className="flex gap-1 items-center justify-center text-center px-4 py-3 rounded-full text-[#24FF00] bg-[#24FF0033]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                >
                                    <mask
                                        id="mask0_47_5413"
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="18"
                                        height="18"
                                    >
                                        <rect width="18" height="18" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_47_5413)">
                                        <path
                                            d="M7.95 12.45L13.2375 7.1625L12.1875 6.1125L7.95 10.35L5.8125 8.2125L4.7625 9.2625L7.95 12.45ZM9 16.5C7.9625 16.5 6.9875 16.3031 6.075 15.9094C5.1625 15.5156 4.36875 14.9813 3.69375 14.3063C3.01875 13.6313 2.48438 12.8375 2.09063 11.925C1.69687 11.0125 1.5 10.0375 1.5 9C1.5 7.9625 1.69687 6.9875 2.09063 6.075C2.48438 5.1625 3.01875 4.36875 3.69375 3.69375C4.36875 3.01875 5.1625 2.48438 6.075 2.09063C6.9875 1.69687 7.9625 1.5 9 1.5C10.0375 1.5 11.0125 1.69687 11.925 2.09063C12.8375 2.48438 13.6313 3.01875 14.3063 3.69375C14.9813 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.0375 16.3031 11.0125 15.9094 11.925C15.5156 12.8375 14.9813 13.6313 14.3063 14.3063C13.6313 14.9813 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5Z"
                                            fill="#24FF00"
                                        />
                                    </g>
                                </svg>
                                <span className="uppercase font-bold">Success</span>
                            </div> */}
                            <div className="flex gap-1 items-center justify-center text-center px-4 py-3 rounded-full text-[#FF1F1F] bg-[#FF1F1F33]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                >
                                    <mask
                                        id="mask0_47_5418"
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="18"
                                        height="18"
                                    >
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
                                    <mask
                                        id="mask0_47_5382"
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="18"
                                        height="18"
                                    >
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
                                    <mask
                                        id="mask0_47_5377"
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="18"
                                        height="18"
                                    >
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
                                    <mask
                                        id="mask0_47_5387"
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="18"
                                        height="18"
                                    >
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
                                    <mask
                                        id="mask0_47_5392"
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="18"
                                        height="18"
                                    >
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
                            {!isEmpty(projects) &&
                                projects?.map(
                                    ({
                                        id,
                                        isAudit,
                                        isDoxx,
                                        isKYC,
                                        isSafu,
                                        logoUrl,
                                        shortDescription,
                                        title,
                                        status,
                                    }) => (
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
                            {/* <CardProject
                                name="SolDragon"
                                desc="As the next Chinese New Year heralds the Year of the Dragon, so does the blockchain world witness the rise of SolDragon on the Solana network. Much like the mythical creature it draws inspiration from, SolDragon symbolizes strength, wisdom, and a powerful force in the decentralized realm."
                                logo={soldragonLogo}
                                safu
                                audit
                                kyc
                                doxx
                                rank="1"
                                live
                                link="/launchpad/soldragon"
                            />
                            <CardProject
                                name="Mochi Cat"
                                desc="Mochi cat is a term that can refer to different things. If you are referring to a game, Mochicats Collection is a simulation game where you can invite and interact with over 50 different mochicats, who love eating and playing around."
                                logo={mochiLogo}
                                safu
                                audit
                                kyc
                                doxx
                                rank="2"
                                live
                                link="/launchpad/mochicat"
                            />
                            <CardProject
                                name="Unknows"
                                desc="Just a sample text, we’re creating with love and passion!"
                                logo={unknows}
                                safu
                                audit
                                kyc
                                doxx
                            /> */}
                        </div>
                    </div>

                    <div className="flex justify-center mt-12">
                        <Link
                            className="inline-flex gap-2 items-center justify-center text-center text-[#00FFA3] bg-transparent font-bold py-3.5 px-8 rounded-full border-[1px] border-[#00FFA3] transition-all hover:opacity-80 "
                            to="/launchpads"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                            >
                                <mask id="mask0_47_5609" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
                                    <rect width="28" height="28" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_47_5609)">
                                    <path
                                        d="M19.8333 18.6668V8.16683H9.33333V5.8335H22.1667V18.6668H19.8333ZM14 24.5002V14.0002H3.5V11.6668H16.3333V24.5002H14Z"
                                        fill="#00FFA3"
                                    />
                                </g>
                            </svg>
                            <span>View All</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section id="community" className="py-10">
                <div className="container mx-auto px-2 lg:px-5">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 justify-between">
                        <div className="max-w-xl mt-16 text-center lg:text-left" data-aos="fade-right">
                            <h3 className="text-4xl font-bold">Solpad Community</h3>
                            <span className="text-xl block mt-8">
                                There is something for everybody. Follow us and read up on what we are doing. Peace!
                            </span>
                            <a
                                className="inline-flex gap-2 items-center justify-center text-center text-[#00FFA3] bg-transparent font-bold py-3.5 px-6 rounded-full border-[1px] border-[#00FFA3] transition-all hover:opacity-80 mt-6"
                                href="#"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                >
                                    <mask
                                        id="mask0_47_5609"
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="28"
                                        height="28"
                                    >
                                        <rect width="28" height="28" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_47_5609)">
                                        <path
                                            d="M19.8333 18.6668V8.16683H9.33333V5.8335H22.1667V18.6668H19.8333ZM14 24.5002V14.0002H3.5V11.6668H16.3333V24.5002H14Z"
                                            fill="#00FFA3"
                                        />
                                    </g>
                                </svg>
                                <span>Show More</span>
                            </a>
                        </div>
                        <div className="max-w-xl" data-aos="fade-left">
                            <img src={community} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
