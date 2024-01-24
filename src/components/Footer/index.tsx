import React from 'react';
import logotext from '../../assets/image/logo-text.png';
import tw from '../../assets/image/tw.png';
import tg from '../../assets/image/tg.png';
import discord from '../../assets/image/discord.png';
import ytb from '../../assets/image/ytb.png';

import './style.scss';

export default function Footer() {
    return (
        <div className="py-12">
            <div className="container mx-auto px-2 lg:px-5">
                <div className="flex flex-col lg:flex-row justify-between gap-5 items-center pb-9 border-b border-white/40">
                    <div className="text-center lg:text-left">
                        <div className="max-w-40 mx-auto lg:mx-0">
                            <img src={logotext} alt="" />
                        </div>
                        <span className="block mt-4 text-lg">The Next Generation Of Launchpad on Solana</span>
                    </div>
                    <div className="flex gap-5 mt-5">
                        <a href="https://twitter.com/SolanapadX" target="_blank" rel="noopener noreferrer">
                            <img width="50px" height="50px" src={tw} alt="" />
                        </a>
                        <a href="https://t.me/Solanapad_TG" target="_blank" rel="noopener noreferrer">
                            <img width="50px" height="50px" src={tg} alt="" />
                        </a>
                        <a>
                            <img width="50px" height="50px" src={discord} alt="" />
                        </a>
                        <a>
                            <img width="50px" height="50px" src={ytb} alt="" />
                        </a>
                    </div>
                </div>
                <div className="pt-8 flex flex-col lg:flex-row items-center lg:justify-between gap-3">
                    <span className="text-white/40">©2023 Solanapad. All Rights Reserved.</span>
                    <span>Privacy Policy • Terms of Use</span>
                </div>
            </div>
        </div>
    );
}
