import React from 'react';
import LogoText from '../../assets/image/logo-text.png';
import introImg from '../../assets/image/intro.png';
import bg1 from '../../assets/image/bg-1.png';

import './style.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { WalletConnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Header() {
    const location = useLocation();

    return (
        <header className={`relative pb-10 w-full gap-5 ${location.pathname !== '/' ? '' : 'bg-header'} `}>
            <div className="absolute">
                <img src={bg1} alt="" />
            </div>
            <div className="pt-5 relative container mx-auto px-2 lg:px-5">
                <div className="flex flex-col item-center gap-6 justify-between lg:flex-row">
                    <NavLink to="/" className="header-logo flex items-center w-[200px] mx-auto lg:mx-0">
                        <img className="max-w-full" src={LogoText} alt="header-logo" />
                    </NavLink>
                    <ul className="flex items-center lg:text-lg justify-center gap-5 lg:gap-10 lg:px-10">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'text-[#00FFA3] hover:text-[#00FFA3]' : 'hover:text-[#00FFA3]'
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/launchpads"
                            className={({ isActive }) =>
                                isActive ? 'text-[#00FFA3] hover:text-[#00FFA3]' : 'hover:text-[#00FFA3]'
                            }
                        >
                            Projects
                        </NavLink>
                        <a
                            href="https://solanapad.gitbook.io/docs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#00FFA3]"
                        >
                            White paper
                        </a>
                        <a href="#community" className="hover:text-[#00FFA3]">
                            Community
                        </a>

                        {/* <div class="load-icon loading">
          <span></span>
          <span></span>
          <span></span>
        </div> */}
                    </ul>

                    <div className="flex justify-center items-center">
                        <WalletMultiButton />
                    </div>
                </div>

                {location?.pathname === '/' && (
                    <div className="flex items-center flex-col lg:flex-row justify-between gap-10 pt-16">
                        <div className="max-w-xl text-center lg:text-left">
                            <h2 className="text-5xl font-bold">The Next Generation Of Launchpad in Solana</h2>
                            <span className="text-2xl block mt-8">
                                Full-scale Blockchain Ecosystem for IDOs & NFT Pre-Sales on Solana
                            </span>
                            <div className="flex justify-center lg:justify-start gap-5 mt-10">
                                <a
                                    className="bg-[#9745FF] border-[1px] border-[#9745FF] lg:text-lg font-bold py-[18px] px-8 rounded-full transition-all hover:opacity-80"
                                    href="#launchpad-list"
                                >
                                    Launchpad List
                                </a>
                                <a
                                    className="text-[#00FFA3] bg-transparent lg:text-lg font-bold py-[18px] px-8 rounded-full border-[1px] border-[#00FFA3] transition-all hover:bg-[#00FFA3] hover:text-black"
                                    href="https://forms.gle/CEerFUejKwT2oJnn8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Submit Project
                                </a>
                            </div>
                            <div className="flex flex-col mt-14">
                                <span>Join Our Community</span>
                                <div className="flex justify-center lg:justify-start gap-5 mt-5">
                                    <a href="https://twitter.com/SolanapadX" target="_blank" rel="noopener noreferrer">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="60"
                                            height="60"
                                            viewBox="0 0 60 60"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_47_5310)">
                                                <path
                                                    d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
                                                    fill="#1DA1F2"
                                                    fillOpacity="0.2"
                                                />
                                                <path
                                                    d="M25.2863 42.9987C36.43 42.9987 42.5245 33.7664 42.5245 25.7606C42.5245 25.4979 42.5195 25.2366 42.5069 24.9777C43.6894 24.1219 44.7186 23.0551 45.5291 21.8412C44.4434 22.3237 43.2747 22.6479 42.0495 22.795C43.2999 22.0448 44.2612 20.8585 44.7135 19.4436C43.5424 20.1372 42.2468 20.6424 40.8671 20.9138C39.7612 19.7364 38.1867 19 36.445 19C33.0987 19 30.3857 21.713 30.3857 25.0581C30.3857 25.5331 30.4385 25.9956 30.5427 26.4391C25.5075 26.1866 21.0428 23.7751 18.0546 20.1096C17.5343 21.0043 17.234 22.0448 17.234 23.1544C17.234 25.2567 18.3034 27.1114 19.9307 28.1971C18.9367 28.167 18.003 27.893 17.1862 27.4394C17.185 27.4645 17.185 27.4897 17.185 27.516C17.185 30.4502 19.2735 32.9006 22.0456 33.456C21.5366 33.5943 21.0013 33.6697 20.4484 33.6697C20.0576 33.6697 19.6781 33.6307 19.3099 33.5603C20.0815 35.9668 22.3182 37.7185 24.9697 37.7687C22.8963 39.3935 20.2838 40.3624 17.4451 40.3624C16.9563 40.3624 16.4737 40.3347 16 40.2782C18.6816 41.996 21.8646 43 25.2876 43"
                                                    fill="#1DA1F2"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_47_5310">
                                                    <rect width="60" height="60" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </a>
                                    <a href="https://t.me/Solanapad_TG" target="_blank" rel="noopener noreferrer">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="60"
                                            height="60"
                                            viewBox="0 0 60 60"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_47_5313)">
                                                <path
                                                    d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
                                                    fill="#32A9DD"
                                                    fillOpacity="0.2"
                                                />
                                                <path
                                                    d="M14.9278 28.3231L33.6582 20.6058C35.5071 19.802 41.7774 17.2295 41.7774 17.2295C41.7774 17.2295 44.6713 16.1041 44.4302 18.8373C44.3498 19.9627 43.7067 23.9017 43.0636 28.1623L41.0539 40.7832C41.0539 40.7832 40.8931 42.6321 39.5265 42.9537C38.1599 43.2752 35.909 41.8283 35.5071 41.5067C35.1855 41.2655 29.478 37.6481 27.3879 35.8795C26.8252 35.3972 26.1821 34.4326 27.4683 33.3071C30.3623 30.6543 33.819 27.3584 35.909 25.2683C36.8737 24.3037 37.8384 22.0528 33.819 24.786L22.4842 32.4229C22.4842 32.4229 21.198 33.2267 18.7864 32.5033C16.3748 31.7798 13.5612 30.8151 13.5612 30.8151C13.5612 30.8151 11.6319 29.6093 14.9278 28.3231Z"
                                                    fill="#32A9DD"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_47_5313">
                                                    <rect width="60" height="60" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </a>
                                    <a>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="60"
                                            height="60"
                                            viewBox="0 0 60 60"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_47_5317)">
                                                <path
                                                    d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
                                                    fill="#5865F2"
                                                    fillOpacity="0.2"
                                                />
                                                <mask
                                                    id="mask0_47_5317"
                                                    maskUnits="userSpaceOnUse"
                                                    x="10"
                                                    y="15"
                                                    width="40"
                                                    height="30"
                                                >
                                                    <path
                                                        d="M49.1172 15.1885H10.8826V44.8117H49.1172V15.1885Z"
                                                        fill="white"
                                                    />
                                                </mask>
                                                <g mask="url(#mask0_47_5317)">
                                                    <path
                                                        d="M41.8926 19.1542C39.7216 18.1552 37.3873 17.4251 34.9474 17.0024C34.8993 17.0024 34.8609 17.0121 34.8321 17.0505C34.5343 17.5884 34.1981 18.2801 33.9675 18.8276C31.3451 18.4338 28.7322 18.4338 26.1674 18.8276C25.9368 18.2705 25.591 17.5884 25.2932 17.0505C25.274 17.0121 25.226 16.9928 25.178 17.0024C22.738 17.4251 20.4133 18.1552 18.2328 19.1542C18.2135 19.1542 18.1943 19.1734 18.1847 19.1926C13.7563 25.8016 12.5459 32.2473 13.1415 38.6162C13.1415 38.645 13.1607 38.6738 13.1896 38.693C16.1098 40.8352 18.934 42.1416 21.7102 42.9965C21.7582 43.0061 21.8062 42.9965 21.8254 42.9581C22.4786 42.0647 23.0646 41.1137 23.5641 40.1243C23.593 40.0667 23.5641 39.9994 23.5065 39.9706C22.5747 39.6152 21.6909 39.1925 20.8456 38.7026C20.7784 38.6642 20.7688 38.5681 20.836 38.5201C21.0185 38.3856 21.1914 38.2511 21.3643 38.107C21.3932 38.0782 21.4412 38.0782 21.47 38.0878C27.0511 40.6334 33.103 40.6334 38.6169 38.0878C38.6553 38.0686 38.6937 38.0782 38.7322 38.0974C38.9051 38.2415 39.078 38.376 39.2605 38.5105C39.3181 38.5585 39.3181 38.6546 39.2605 38.693C38.4151 39.1925 37.5314 39.6056 36.5996 39.961C36.542 39.9802 36.5131 40.0571 36.542 40.1147C37.0511 41.1041 37.6371 42.0551 38.2807 42.9485C38.3095 42.9869 38.3575 43.0061 38.3959 42.9869C41.1817 42.1224 44.0155 40.8256 46.9262 38.6834C46.955 38.6642 46.9646 38.6354 46.9742 38.6066C47.685 31.2483 45.783 24.8506 41.931 19.183C41.931 19.1638 41.9022 19.1542 41.8829 19.1446L41.8926 19.1542ZM24.4095 34.7353C22.7284 34.7353 21.3451 33.1887 21.3451 31.2963C21.3451 29.4039 22.6996 27.8573 24.4095 27.8573C26.1194 27.8573 27.5026 29.4135 27.4738 31.2963C27.4738 33.1887 26.1194 34.7353 24.4095 34.7353ZM35.7447 34.7353C34.0636 34.7353 32.6803 33.1887 32.6803 31.2963C32.6803 29.4039 34.0348 27.8573 35.7447 27.8573C37.4545 27.8573 38.8378 29.4135 38.809 31.2963C38.809 33.1887 37.4641 34.7353 35.7447 34.7353Z"
                                                        fill="#5865F2"
                                                    />
                                                </g>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_47_5317">
                                                    <rect width="60" height="60" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </a>
                                    <a>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="60"
                                            height="60"
                                            viewBox="0 0 60 60"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_47_5324)">
                                                <path
                                                    d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
                                                    fill="#FF0000"
                                                    fillOpacity="0.2"
                                                />
                                                <path
                                                    d="M46.2787 21.7551C45.8753 20.2866 44.6925 19.1293 43.1943 18.7342C40.4549 18 29.4999 18 29.4999 18C29.4999 18 18.5437 18 15.8056 18.7063C14.3348 19.1013 13.1245 20.2878 12.7211 21.7562C12 24.4391 12 30.0006 12 30.0006C12 30.0006 12 35.5912 12.7211 38.2449C13.1245 39.7134 14.3074 40.8707 15.8056 41.2658C18.5735 42 29.4999 42 29.4999 42C29.4999 42 40.4561 42 43.1943 41.2937C44.6937 40.8987 45.8753 39.7402 46.2787 38.2729C46.9999 35.5901 46.9999 30.0286 46.9999 30.0286C46.9999 30.0286 47.0284 24.4379 46.2787 21.7551ZM26.0109 35.139V24.861L35.1214 29.9994L26.0109 35.1379V35.139Z"
                                                    fill="#FF0000"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_47_5324">
                                                    <rect width="60" height="60" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block max-w-lg 2xl:max-w-xl">
                            <img src={introImg} alt="" />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
