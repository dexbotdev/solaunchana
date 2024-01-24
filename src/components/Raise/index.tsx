import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL, Connection, clusterApiUrl } from '@solana/web3.js';
import { createBurnCheckedInstruction, TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { ViewportList } from 'react-viewport-list';

import website from '../../assets/image/website.png';
import tw from '../../assets/image/tw.png';
import tg from '../../assets/image/tg.png';
import discord from '../../assets/image/discord.png';
import ytb from '../../assets/image/ytb.png';
import Countdown from 'react-countdown';

import { isEmpty } from 'lodash';

import { useParams } from 'react-router-dom';

import { truncateString } from '../../untils';

import toast from 'react-hot-toast';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// const whitelistTest = [
//     '0x00000000000000001',
//     '0x00000000000000002',
//     '0x00000000000000003',
//     '0x00000000000000004',
//     '0x00000000000000005',
//     '0x00000000000000006',
//     '0x00000000000000007',
//     '0x00000000000000008',
//     '0x00000000000000009',
//     '0x00000000000000010',
//     '0x00000000000000011',
//     '0x00000000000000012',
//     '0x00000000000000013',
//     '0x00000000000000014',
//     '0x00000000000000015',
//     '0x00000000000000016',
// ];

const notify = () => toast.error('Max contribution is 10 SOL!');

const Completionist = ({ status }: any) => (
    <span className={`block text-3xl ${status === 1 ? 'text-[#00FFA3]' : 'text-red-500'} font-bold mt-3`}>
        {status === 1 ? 'Live' : 'End'}
    </span>
);

interface Project {
    id?:string;
    title?: string;
    description?: string;
    isAudit?: boolean;
    isDoxx?: boolean;
    isKYC?: boolean;
    isSafu?: boolean;
    logoUrl?: string;
    maxContribute?: any;
    minContribute?: any;
    status?: any;
    symbol?: string;
    supply?: any;
    telegramUrl?: string;
    websiteUrl?: string;
    twitterUrl?: string;
    softCapacity?: any;
    hardCapacity?: any;
    coverUrl?: string;
    tokenAddress?: any;
    totalRaised?: any;
    solReceiver?: any;
    startAt?: any;
    endAt?: any;
    fixedRaised?: any;
    splToken?: any;
    ath?: any;
    whitelists?: any[];
}

export default function Raise() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const ref = useRef(null);

    const [totalRaised, setTotalRaised] = React.useState(0);
    const [contributeValue, setContributeValue] = React.useState(1);
    const [inputValue, setInputValue] = useState(1);

    const [inputSearch, setInputSearch] = useState('');

    const [whitelists, setWhitelists] = useState([]);
    const [isWhitelist, setIsWhitelist] = useState(false);

    const [searchedWhitelists, setSearchedWhitelists] = useState([]);

    const { id } = useParams();

    const [project, setProject] = useState<Project>({});

    const fetchProject = (id: string) => {
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
                    return {
                        id: "659183856faaf21eef3a2e0a",
                        status: 2,
                        title: "Mochi Cat",
                        logoUrl: "https://pbs.twimg.com/profile_images/1738553952239804416/pb2ML9Fv_400x400.jpg",
                        isKYC: true,
                        isSafu: true,
                        isAudit: true,
                        isDoxx: true,
                        totalRaised: 1529,
                        supply: 1000000000,
                        ath: 7,
                        whitelists:[]
                    }
                })
                .then((data :any) => {
                    setProject(data);
                    setSearchedWhitelists(data?.whitelists);
                    setWhitelists(data?.whitelists);
                })
                .catch((error) => console.error(error))
        );
    };

    const getSolBalance = useCallback(async () => {
        if (!connection) return;
        if (!project?.solReceiver) return 0;
        const devWallet = new PublicKey(project?.solReceiver);
        const balance = await connection.getBalance(devWallet);
        setTotalRaised((balance * 1.02040816327 + 1532 ?? 0) / LAMPORTS_PER_SOL);
    }, [project.solReceiver, connection]);

    useEffect(() => {
        if (!project.splToken)
            setIsWhitelist(true);
        // else {
        //     if (whitelists.includes(publicKey?.toBase58()))
        //         setIsWhitelist(true);
        //     else
        //         setIsWhitelist(false);
        // }
    }, [publicKey, connection, whitelists])

    useEffect(() => {
        fetchProject('659d534be83cbe87cec3b8d1');
    }, [id]);

    const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
        if (completed) {
            // Render a completed state
            return <Completionist status={project?.status} />;
        } else {
            // Render a countdown
            return (
                <>
                    <div className="flex gap-3 font-bold text-2xl mt-3">
                        <span className="flex justify-center items-center text-[#00FFA3] h-14 w-14 rounded-full bg-[#00FFA333]">
                            {days}
                        </span>
                        <span className="flex justify-center items-center text-[#00FFA3] h-14 w-14 rounded-full bg-[#00FFA333]">
                            {hours}
                        </span>
                        <span className="flex justify-center items-center text-[#00FFA3] h-14 w-14 rounded-full bg-[#00FFA333]">
                            {minutes}
                        </span>
                        <span className="flex justify-center items-center text-[#00FFA3] h-14 w-14 rounded-full bg-[#00FFA333]">
                            {seconds}
                        </span>
                    </div>
                </>
            );
        }
    };

    const renderDesc = (project: Project) => {
        return isEmpty(project) ? (
            <></>
        ) : (
            <>
                {project?.title} Presale
                <br />
                <br />
                {project?.description}
                <br />
                <br />
                Symbol: {project?.symbol}
                <br />
                Supply: {new Intl.NumberFormat('en-US').format(project?.supply)}
                <br />
                {project?.softCapacity ? (
                    `Softcap: ${new Intl.NumberFormat('en-US').format(project?.softCapacity)} SOL`
                ) : (
                    <></>
                )}
               
                    {project?.hardCapacity ? (
                        `Hardcap: ${new Intl.NumberFormat('en-US').format(project?.hardCapacity)} SOL`
                    ) : (
                        <></>
                    )}
                
                {/* <br /> */}
                <br />
                Tokens will be sent to your wallet after the Presale ends.
            </>
        );
    };

    const onContributeClicked = useCallback(async () => {
        if (!publicKey) {
            toast.error('Wallet not connected');
            return;
        }
        if (contributeValue > project?.maxContribute) {
            toast.error(`Max contribution is ${project?.maxContribute} SOL!`);
            return;
        }
        if (contributeValue < project?.minContribute) {
            toast.error(`Min contribution is ${project?.minContribute} SOL!`);
            return;
        }
        const response = await fetch('https://api.solanapad.io/status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                wallet: publicKey.toBase58(),
            }),
        });

        if (!response.ok) {
            toast.error('Something went wrong!');
            return;
        }
        const data = await response.json();
        if (data.status === 0) {
            toast.error('Presale is not live!');
            return;
        }
        if (data.status === 2) {
            toast.error('Presale is ended!');
            return;
        }
        if (data.status === 3) {
            toast.error('You are not whitelisted!');
            return;
        }
        const instructions = [
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(project?.solReceiver),
                lamports: contributeValue * 0.98 * LAMPORTS_PER_SOL,
            }),
            //Transfer to pad wallet
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey('Wi4tNX4HzyqxL5RLkEHL5WJFXiAg4as9t1DBMmBgtCw'),
                lamports: contributeValue * 0.02 * LAMPORTS_PER_SOL,
            }),
        ];
        if (project?.splToken) {
            const account = await getAssociatedTokenAddress(new PublicKey(project?.splToken), publicKey);
            console.log(account.toBase58());
            const burntIx = createBurnCheckedInstruction(account, new PublicKey(project?.splToken), publicKey, 1, 0);
            instructions.push(burntIx);
        }
        const transaction = new Transaction().add(...instructions);
        try {
            const signature = await sendTransaction(transaction, connection);
            const latestBlockHash = await connection.getLatestBlockhash();

            const promise = connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: signature,
            });
            toast.promise(promise, {
                loading: 'Waiting for confirm transaction...',
                success: 'Transaction success!',
                error: 'Transaction failed!',
            });
        } catch (error:any) {
            toast.error(`Transaction failed! ${error.message}`);
        } finally {
            getSolBalance();
        }
    }, [publicKey, sendTransaction, connection, contributeValue, project.solReceiver]);

    useEffect(() => {
        getSolBalance();
    }, [getSolBalance]);

    return (
        <div className="relative pt-16 container mx-auto px-2 lg:px-5 flex flex-col lg:flex-row justify-between gap-5">
            {isEmpty(project) ? (
                <></>
            ) : (
                <>
                    <div className="max-w-3xl">
                        <div className="rounded-2xl overflow-hidden">
                            <img src={project?.coverUrl} alt="" />
                        </div>
                        <div className="mt-6 bg-gradient-card-project rounded-3xl p-5 lg:px-8 lg:py-7">
                            <div className="flex flex-col gap-4 lg:flex-row lg:gap-1 justify-between items-center">
                                <div className="flex gap-4 items-center">
                                    <div className="w-14 h-14 rounded-full overflow-hidden">
                                        <img src={project?.logoUrl} alt="" />
                                    </div>
                                    <h3 className="font-bold text-lg">{project?.title || <Skeleton />}</h3>

                                    {project?.status === 0 && (
                                        <div
                                            className={`flex gap-1 items-center justify-center text-center px-4 py-3 rounded-full text-[#FFE91F] bg-[#FFE91F33]`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                            >
                                                <mask
                                                    id="mask0_47_5463"
                                                    maskUnits="userSpaceOnUse"
                                                    x="0"
                                                    y="0"
                                                    width="18"
                                                    height="18"
                                                >
                                                    <rect width="18" height="18" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_47_5463)">
                                                    <path
                                                        d="M9 11.25C9.625 11.25 10.1562 11.0312 10.5938 10.5938C11.0312 10.1562 11.25 9.625 11.25 9C11.25 8.375 11.0312 7.84375 10.5938 7.40625C10.1562 6.96875 9.625 6.75 9 6.75C8.375 6.75 7.84375 6.96875 7.40625 7.40625C6.96875 7.84375 6.75 8.375 6.75 9C6.75 9.625 6.96875 10.1562 7.40625 10.5938C7.84375 11.0312 8.375 11.25 9 11.25ZM9 16.5C7.9625 16.5 6.9875 16.3031 6.075 15.9094C5.1625 15.5156 4.36875 14.9813 3.69375 14.3063C3.01875 13.6313 2.48438 12.8375 2.09063 11.925C1.69687 11.0125 1.5 10.0375 1.5 9C1.5 7.9625 1.69687 6.9875 2.09063 6.075C2.48438 5.1625 3.01875 4.36875 3.69375 3.69375C4.36875 3.01875 5.1625 2.48438 6.075 2.09063C6.9875 1.69687 7.9625 1.5 9 1.5C10.0375 1.5 11.0125 1.69687 11.925 2.09063C12.8375 2.48438 13.6313 3.01875 14.3063 3.69375C14.9813 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.0375 16.3031 11.0125 15.9094 11.925C15.5156 12.8375 14.9813 13.6313 14.3063 14.3063C13.6313 14.9813 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5Z"
                                                        fill="#FFE91F"
                                                    />
                                                </g>
                                            </svg>
                                            <span className="uppercase font-bold">coming</span>
                                        </div>
                                    )}

                                    {project?.status === 1 && (
                                        <div className="flex gap-1 items-center justify-center text-center px-4 py-3 rounded-full text-[#24FF00] bg-[#24FF0033]">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                            >
                                                <mask
                                                    id="mask0_74_5927"
                                                    maskUnits="userSpaceOnUse"
                                                    x="0"
                                                    y="0"
                                                    width="19"
                                                    height="18"
                                                >
                                                    <rect x="0.00012207" width="18" height="18" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_74_5927)">
                                                    <path
                                                        d="M7.95012 12.45L13.2376 7.1625L12.1876 6.1125L7.95012 10.35L5.81262 8.2125L4.76262 9.2625L7.95012 12.45ZM9.00012 16.5C7.96262 16.5 6.98762 16.3031 6.07512 15.9094C5.16262 15.5156 4.36887 14.9813 3.69387 14.3063C3.01887 13.6313 2.4845 12.8375 2.09075 11.925C1.697 11.0125 1.50012 10.0375 1.50012 9C1.50012 7.9625 1.697 6.9875 2.09075 6.075C2.4845 5.1625 3.01887 4.36875 3.69387 3.69375C4.36887 3.01875 5.16262 2.48438 6.07512 2.09063C6.98762 1.69687 7.96262 1.5 9.00012 1.5C10.0376 1.5 11.0126 1.69687 11.9251 2.09063C12.8376 2.48438 13.6314 3.01875 14.3064 3.69375C14.9814 4.36875 15.5157 5.1625 15.9095 6.075C16.3032 6.9875 16.5001 7.9625 16.5001 9C16.5001 10.0375 16.3032 11.0125 15.9095 11.925C15.5157 12.8375 14.9814 13.6313 14.3064 14.3063C13.6314 14.9813 12.8376 15.5156 11.9251 15.9094C11.0126 16.3031 10.0376 16.5 9.00012 16.5Z"
                                                        fill="#24FF00"
                                                    />
                                                </g>
                                            </svg>
                                            <span className="uppercase font-bold">Live</span>
                                        </div>
                                    )}

                                    {project?.status === 2 && (
                                        <div
                                            className={`flex gap-1 items-center justify-center text-center px-4 py-3 rounded-full text-[#FF1F1F] bg-[#FF1F1F33]`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                            >
                                                <mask
                                                    id="mask0_47_5463"
                                                    maskUnits="userSpaceOnUse"
                                                    x="0"
                                                    y="0"
                                                    width="18"
                                                    height="18"
                                                >
                                                    <rect width="18" height="18" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_47_5463)">
                                                    <path
                                                        d="M9 11.25C9.625 11.25 10.1562 11.0312 10.5938 10.5938C11.0312 10.1562 11.25 9.625 11.25 9C11.25 8.375 11.0312 7.84375 10.5938 7.40625C10.1562 6.96875 9.625 6.75 9 6.75C8.375 6.75 7.84375 6.96875 7.40625 7.40625C6.96875 7.84375 6.75 8.375 6.75 9C6.75 9.625 6.96875 10.1562 7.40625 10.5938C7.84375 11.0312 8.375 11.25 9 11.25ZM9 16.5C7.9625 16.5 6.9875 16.3031 6.075 15.9094C5.1625 15.5156 4.36875 14.9813 3.69375 14.3063C3.01875 13.6313 2.48438 12.8375 2.09063 11.925C1.69687 11.0125 1.5 10.0375 1.5 9C1.5 7.9625 1.69687 6.9875 2.09063 6.075C2.48438 5.1625 3.01875 4.36875 3.69375 3.69375C4.36875 3.01875 5.1625 2.48438 6.075 2.09063C6.9875 1.69687 7.9625 1.5 9 1.5C10.0375 1.5 11.0125 1.69687 11.925 2.09063C12.8375 2.48438 13.6313 3.01875 14.3063 3.69375C14.9813 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.0375 16.3031 11.0125 15.9094 11.925C15.5156 12.8375 14.9813 13.6313 14.3063 14.3063C13.6313 14.9813 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5Z"
                                                        fill="#FF1F1F"
                                                    />
                                                </g>
                                            </svg>
                                            <span className="uppercase font-bold">End</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <a href={project?.websiteUrl} target="_blank" rel="noopener noreferrer">
                                        <img width="34px" height="34px" src={website} alt="" />
                                    </a>
                                    <a href={project.twitterUrl} target="_blank" rel="noopener noreferrer">
                                        <img width="34px" height="34px" src={tw} alt="" />
                                    </a>
                                    <a href={project?.telegramUrl} target="_blank" rel="noopener noreferrer">
                                        <img width="34px" height="34px" src={tg} alt="" />
                                    </a>
                                    <a>
                                        <img width="34px" height="34px" src={discord} alt="" />
                                    </a>
                                    <a>
                                        <img width="34px" height="34px" src={ytb} alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-7 text-sm">
                                {project?.isSafu && (
                                    <div className="flex gap-1 items-center justify-center text-center px-3 2xl:px-4 py-3 rounded-full text-[#DC1FFF] bg-[#DC1FFF33]">
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
                                )}
                                {project?.isAudit && (
                                    <div className="flex gap-1 items-center justify-center text-center px-3 2xl:px-4 py-3 rounded-full text-[#31ABDE] bg-[#31ABDE33]">
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
                                )}
                                {project?.isKYC && (
                                    <div className="flex gap-1 items-center justify-center text-center px-3 2xl:px-4 py-3 rounded-full text-[#00FFA3] bg-[#00FFA333]">
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
                                )}
                                {project?.isDoxx && (
                                    <div className="flex gap-1 items-center justify-center text-center px-3 2xl:px-4 py-3 rounded-full text-[#FFE91F] bg-[#FFE91F33]">
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
                                )}
                            </div>

                            <div className="mt-12">
                                <div className="flex items-center gap-3">
                                    <span>Token Address</span>
                                    <div className="cursor-pointer bg-white/20 px-3 py-2 flex gap-1 items-center rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                        >
                                            <mask
                                                id="mask0_82_6203"
                                                maskUnits="userSpaceOnUse"
                                                x="0"
                                                y="0"
                                                width="18"
                                                height="18"
                                            >
                                                <rect width="18" height="18" fill="#D9D9D9" />
                                            </mask>
                                            <g mask="url(#mask0_82_6203)">
                                                <path
                                                    d="M6.75 13.5C6.3375 13.5 5.98438 13.3531 5.69063 13.0594C5.39688 12.7656 5.25 12.4125 5.25 12V3C5.25 2.5875 5.39688 2.23438 5.69063 1.94063C5.98438 1.64688 6.3375 1.5 6.75 1.5H13.5C13.9125 1.5 14.2656 1.64688 14.5594 1.94063C14.8531 2.23438 15 2.5875 15 3V12C15 12.4125 14.8531 12.7656 14.5594 13.0594C14.2656 13.3531 13.9125 13.5 13.5 13.5H6.75ZM3.75 16.5C3.3375 16.5 2.98438 16.3531 2.69063 16.0594C2.39688 15.7656 2.25 15.4125 2.25 15V4.5H3.75V15H12V16.5H3.75Z"
                                                    fill="white"
                                                />
                                            </g>
                                        </svg>
                                        <span
                                            onClick={() => {
                                                navigator.clipboard.writeText(project?.tokenAddress);
                                                toast.success('Copied the token address');
                                            }}
                                        >
                                            {project?.tokenAddress}
                                        </span>
                                    </div>
                                </div>
                                <p className="mt-12">{renderDesc(project)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mx-auto lg:w-1/3 max-w-lg">
                        <div className="bg-gradient-card-project rounded-3xl h-fit">
                            <div className="bg-gradient-raise h-4 rounded-tl-3xl rounded-tr-3xl"></div>

                            <div className="px-5 py-8">
                                {project.endAt !== 0 ? (
                                    <div>
                                        <h3 className="text-lg font-bold">Presale end In</h3>
                                        <Countdown date={project?.endAt} renderer={renderer}>
                                            <Completionist />
                                        </Countdown>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-lg font-bold">Presale starts In</h3>
                                        <Countdown date={project?.startAt} renderer={renderer}>
                                            <Completionist />
                                        </Countdown>
                                    </div>
                                )}
                                <div className="mt-10">
                                    <h3 className="text-lg font-bold">
                                        Total Raised:{' '}
                                        {project?.status === 1
                                            ? totalRaised.toFixed(1)
                                            : project?.totalRaised?.toFixed(1)}{' '}
                                        SOL
                                    </h3>
                                    <h4 className="text-lg font-bold">
                                        Min: {project?.minContribute} SOL | Max: {project?.maxContribute} SOL
                                    </h4>
                                </div>

                                <div className="mt-12">
                                    <h3 className="text-lg font-bold">Contribute</h3>
                                    <div className="mt-4 flex flex-col gap-5">
                                        <div className="w-full relative min-w-[50%] max-w-2xl ">
                                            <div className="absolute top-1/2 -translate-y-1/2 right-3">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M5.71098 15.8663C5.82522 15.7521 5.98017 15.688 6.14169 15.688H21.0446C21.3161 15.688 21.452 16.0162 21.2599 16.2081L18.3151 19.1506C18.2009 19.2648 18.0459 19.3289 17.8844 19.3289H2.98153C2.71004 19.3289 2.57416 19.0006 2.7662 18.8087L5.71098 15.8663Z"
                                                        fill="url(#paint0_linear_82_6249)"
                                                    />
                                                    <path
                                                        d="M5.71098 4.87361C5.82522 4.75944 5.98017 4.69531 6.14169 4.69531H21.0446C21.3161 4.69531 21.452 5.0236 21.2599 5.2155L18.3151 8.15794C18.2009 8.27208 18.0459 8.33622 17.8844 8.33622H2.98153C2.71004 8.33622 2.57416 8.00797 2.7662 7.81607L5.71098 4.87361Z"
                                                        fill="url(#paint1_linear_82_6249)"
                                                    />
                                                    <path
                                                        d="M18.3151 10.335C18.2009 10.2209 18.0459 10.1567 17.8844 10.1567H2.98153C2.71004 10.1567 2.57416 10.485 2.7662 10.6769L5.71098 13.6194C5.82522 13.7335 5.98017 13.7977 6.14169 13.7977H21.0446C21.3161 13.7977 21.452 13.4694 21.2599 13.2775L18.3151 10.335Z"
                                                        fill="url(#paint2_linear_82_6249)"
                                                    />
                                                    <defs>
                                                        <linearGradient
                                                            id="paint0_linear_82_6249"
                                                            x1="15.3007"
                                                            y1="0.681097"
                                                            x2="4.98664"
                                                            y2="20.4367"
                                                            gradientUnits="userSpaceOnUse"
                                                        >
                                                            <stop stopColor="#00FFA3" />
                                                            <stop offset="1" stopColor="#DC1FFF" />
                                                        </linearGradient>
                                                        <linearGradient
                                                            id="paint1_linear_82_6249"
                                                            x1="15.3007"
                                                            y1="0.68121"
                                                            x2="4.98663"
                                                            y2="20.4368"
                                                            gradientUnits="userSpaceOnUse"
                                                        >
                                                            <stop stopColor="#00FFA3" />
                                                            <stop offset="1" stopColor="#DC1FFF" />
                                                        </linearGradient>
                                                        <linearGradient
                                                            id="paint2_linear_82_6249"
                                                            x1="15.3007"
                                                            y1="0.681247"
                                                            x2="4.98663"
                                                            y2="20.4369"
                                                            gradientUnits="userSpaceOnUse"
                                                        >
                                                            <stop stopColor="#00FFA3" />
                                                            <stop offset="1" stopColor="#DC1FFF" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <input
                                                type="number"
                                                className="relative w-full py-3 px-5 pr-16 bg-[#55555533] rounded-lg text-xl"
                                                placeholder="Contribute Token"
                                                onChange={(e) => {
                                                    setContributeValue(+e?.target?.value);
                                                    setInputValue(+e?.target?.value);
                                                }}
                                                value={inputValue}
                                            />
                                        </div>
                                        <button
                                            disabled={
                                                !isWhitelist ||
                                                project?.status !== 1 ||
                                                !contributeValue ||
                                                contributeValue < project?.minContribute ||
                                                contributeValue > project?.maxContribute
                                            }
                                            className={`btn-primary hover:opacity-75 rounded-full py-3.5 text-lg px-5 transition-all`}
                                            onClick={() => {
                                                onContributeClicked();
                                            }}
                                        >
                                            <span className="font-medium">{isWhitelist ? 'Contribute' : 'You are not whitelisted'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {project?.splToken && <div className="mt-6 bg-gradient-card-project rounded-3xl h-fit">
                            <div className="px-5 py-8">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold">Whitelists</h3>
                                    <div className="flex items-center gap-2 px-4 text-lg py-2 rounded-full bg-white/10">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                        >
                                            <mask
                                                id="mask0_291_425"
                                                maskUnits="userSpaceOnUse"
                                                x="0"
                                                y="0"
                                                width="18"
                                                height="18"
                                            >
                                                <rect width="18" height="18" fill="#D9D9D9" />
                                            </mask>
                                            <g mask="url(#mask0_291_425)">
                                                <path
                                                    d="M4.5 16.5C3.875 16.5 3.34375 16.2812 2.90625 15.8438C2.46875 15.4062 2.25 14.875 2.25 14.25V12H4.5V1.5H15.75V14.25C15.75 14.875 15.5312 15.4062 15.0938 15.8438C14.6562 16.2812 14.125 16.5 13.5 16.5H4.5ZM13.5 15C13.7125 15 13.8906 14.9281 14.0344 14.7844C14.1781 14.6406 14.25 14.4625 14.25 14.25V3H6V12H12.75V14.25C12.75 14.4625 12.8219 14.6406 12.9656 14.7844C13.1094 14.9281 13.2875 15 13.5 15ZM6.75 6.75V5.25H13.5V6.75H6.75ZM6.75 9V7.5H13.5V9H6.75Z"
                                                    fill="white"
                                                />
                                            </g>
                                        </svg>
                                        {/* <span>{project?.whitelists.length}</span> */}
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <div className="relative">
                                        <input
                                            value={inputSearch}
                                            placeholder="Search wallet"
                                            className="w-full px-4 font-bold py-3.5 pl-10 bg-white/10 rounded-full text-ba"
                                            onChange={(e) => {
                                                setInputSearch(e?.target.value);
                                                if (e.target.value === '') {
                                                    return setSearchedWhitelists([...whitelists]);
                                                }

                                                return setSearchedWhitelists(
                                                    whitelists?.filter((wallet:any) =>
                                                        wallet?.includes(e.target.value.toLowerCase().trim())
                                                    )
                                                );
                                            }}
                                        />
                                        <div className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 29 28"
                                                fill="none"
                                            >
                                                <mask
                                                    id="mask0_291_432"
                                                    maskUnits="userSpaceOnUse"
                                                    x="0"
                                                    y="0"
                                                    width="29"
                                                    height="28"
                                                >
                                                    <rect width="28.1256" height="28" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_291_432)">
                                                    <path
                                                        d="M22.9692 24.5L15.5862 17.15C15.0003 17.6167 14.3265 17.9861 13.5647 18.2583C12.803 18.5306 11.9924 18.6667 11.133 18.6667C9.00409 18.6667 7.20229 17.9326 5.72765 16.4646C4.25302 14.9965 3.5157 13.2028 3.5157 11.0833C3.5157 8.96389 4.25302 7.17014 5.72765 5.70208C7.20229 4.23403 9.00409 3.5 11.133 3.5C13.262 3.5 15.0638 4.23403 16.5384 5.70208C18.0131 7.17014 18.7504 8.96389 18.7504 11.0833C18.7504 11.9389 18.6137 12.7458 18.3402 13.5042C18.0668 14.2625 17.6957 14.9333 17.2269 15.5167L24.6099 22.8667L22.9692 24.5ZM11.133 16.3333C12.5979 16.3333 13.8431 15.8229 14.8685 14.8021C15.8939 13.7812 16.4066 12.5417 16.4066 11.0833C16.4066 9.625 15.8939 8.38542 14.8685 7.36458C13.8431 6.34375 12.5979 5.83333 11.133 5.83333C9.66816 5.83333 8.42302 6.34375 7.39761 7.36458C6.3722 8.38542 5.85949 9.625 5.85949 11.0833C5.85949 12.5417 6.3722 13.7812 7.39761 14.8021C8.42302 15.8229 9.66816 16.3333 11.133 16.3333Z"
                                                        fill="white"
                                                    />
                                                </g>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <div className="list-none text-lg">
                                            <div className="h-[270px]">
                                                {/* {!isEmpty(searchedWhitelists) &&
                                                    searchedWhitelists.map((item, key) => {
                                                        return (
                                                            <li
                                                                onClick={(e) => {
                                                                    navigator.clipboard.writeText(
                                                                        e?.currentTarget?.getAttribute('data-id')
                                                                    );
                                                                    toast.success('Copied the wallet!');
                                                                }}
                                                                data-id={item}
                                                                key={key}
                                                                className="flex items-center gap-2 py-2 border-b-white/20 border-b"
                                                            >
                                                                <span className="cursor-pointer">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="20"
                                                                        height="20"
                                                                        viewBox="0 0 23 23"
                                                                        fill="none"
                                                                    >
                                                                        <mask
                                                                            id="mask0_291_362"
                                                                            maskUnits="userSpaceOnUse"
                                                                            x="0"
                                                                            y="0"
                                                                            width="23"
                                                                            height="23"
                                                                        >
                                                                            <rect
                                                                                width="23"
                                                                                height="23"
                                                                                fill="#D9D9D9"
                                                                            />
                                                                        </mask>
                                                                        <g mask="url(#mask0_291_362)">
                                                                            <path
                                                                                d="M8.625 17.2501C8.09792 17.2501 7.6467 17.0624 7.27135 16.6871C6.89601 16.3117 6.70833 15.8605 6.70833 15.3334V3.83341C6.70833 3.30633 6.89601 2.85512 7.27135 2.47977C7.6467 2.10442 8.09792 1.91675 8.625 1.91675H17.25C17.7771 1.91675 18.2283 2.10442 18.6036 2.47977C18.979 2.85512 19.1667 3.30633 19.1667 3.83341V15.3334C19.1667 15.8605 18.979 16.3117 18.6036 16.6871C18.2283 17.0624 17.7771 17.2501 17.25 17.2501H8.625ZM4.79167 21.0834C4.26458 21.0834 3.81337 20.8957 3.43802 20.5204C3.06267 20.145 2.875 19.6938 2.875 19.1667V5.75008H4.79167V19.1667H15.3333V21.0834H4.79167Z"
                                                                                fill="white"
                                                                            />
                                                                        </g>
                                                                    </svg>
                                                                </span>
                                                                <span className="cursor-pointer">{item}</span>
                                                            </li>
                                                        );
                                                    })} */}
                                                <div className="wallet-list" ref={ref}>
                                                    {searchedWhitelists.length !== 0 ? (
                                                        <ViewportList viewportRef={ref} items={searchedWhitelists}>
                                                            {(item, index) => (
                                                                <li
                                                                    onClick={(e:any) => {
                                                                        navigator.clipboard.writeText(
                                                                            e?.currentTarget?.getAttribute('data-id')
                                                                        );
                                                                        toast.success('Copied the wallet!');
                                                                    }}
                                                                    data-id={item}
                                                                    key={index}
                                                                    className="flex items-center gap-2 py-2 border-b-white/20 border-b"
                                                                >
                                                                    <span className="cursor-pointer">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="20"
                                                                            height="20"
                                                                            viewBox="0 0 23 23"
                                                                            fill="none"
                                                                        >
                                                                            <mask
                                                                                id="mask0_291_362"
                                                                                maskUnits="userSpaceOnUse"
                                                                                x="0"
                                                                                y="0"
                                                                                width="23"
                                                                                height="23"
                                                                            >
                                                                                <rect
                                                                                    width="23"
                                                                                    height="23"
                                                                                    fill="#D9D9D9"
                                                                                />
                                                                            </mask>
                                                                            <g mask="url(#mask0_291_362)">
                                                                                <path
                                                                                    d="M8.625 17.2501C8.09792 17.2501 7.6467 17.0624 7.27135 16.6871C6.89601 16.3117 6.70833 15.8605 6.70833 15.3334V3.83341C6.70833 3.30633 6.89601 2.85512 7.27135 2.47977C7.6467 2.10442 8.09792 1.91675 8.625 1.91675H17.25C17.7771 1.91675 18.2283 2.10442 18.6036 2.47977C18.979 2.85512 19.1667 3.30633 19.1667 3.83341V15.3334C19.1667 15.8605 18.979 16.3117 18.6036 16.6871C18.2283 17.0624 17.7771 17.2501 17.25 17.2501H8.625ZM4.79167 21.0834C4.26458 21.0834 3.81337 20.8957 3.43802 20.5204C3.06267 20.145 2.875 19.6938 2.875 19.1667V5.75008H4.79167V19.1667H15.3333V21.0834H4.79167Z"
                                                                                    fill="white"
                                                                                />
                                                                            </g>
                                                                        </svg>
                                                                    </span>
                                                                    <span className="cursor-pointer">
                                                                        {item}
                                                                    </span>
                                                                </li>
                                                            )}
                                                        </ViewportList>
                                                    ) : (
                                                        <span className="text-gray-500">
                                                            {inputSearch.trim() ? 'Not found' : 'Empty'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* <div className="mt-5 flex justify-center gap-5 items-center">
                                                <span
                                                    onClick={() => {
                                                        if (inputSearch.trim()) {
                                                            return;
                                                        }
                                                        if (currentPage > 0) {
                                                            setCurrentPage((prev) => prev - 1);
                                                        }
                                                    }}
                                                    className="cursor-pointer inline-block p-1 rounded-full bg-black/25 border-[1px] border-[#00FFA3]"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 28 28"
                                                        fill="none"
                                                    >
                                                        <mask
                                                            id="mask0_291_438"
                                                            maskUnits="userSpaceOnUse"
                                                            x="0"
                                                            y="0"
                                                            width="28"
                                                            height="28"
                                                        >
                                                            <rect width="28" height="28" fill="#D9D9D9" />
                                                        </mask>
                                                        <g mask="url(#mask0_291_438)">
                                                            <path
                                                                d="M11.6667 21L4.66667 14L11.6667 7L13.3 8.69167L9.15833 12.8333H23.3333V15.1667H9.15833L13.3 19.3083L11.6667 21Z"
                                                                fill="#00FFA3"
                                                            />
                                                        </g>
                                                    </svg>
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span>Page</span>
                                                    <span className="py-1 px-5 text-[#00FFA3] border-[1px] border-[#00FFA3] rounded-xl">
                                                        {currentPage + 1}
                                                    </span>
                                                </div>
                                                <span
                                                    onClick={() => {
                                                        if (!inputSearch.trim()) {
                                                            console.log('zo');
                                                            return;
                                                        }
                                                        if (currentPage < totalPage + 1) {
                                                            setCurrentPage((prev) => prev + 1);
                                                        }
                                                    }}
                                                    className="cursor-pointer inline-block p-1 rounded-full bg-black/25 border-[1px] border-[#00FFA3]"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 28 28"
                                                        fill="none"
                                                    >
                                                        <mask
                                                            id="mask0_291_447"
                                                            maskUnits="userSpaceOnUse"
                                                            x="0"
                                                            y="0"
                                                            width="28"
                                                            height="28"
                                                        >
                                                            <rect width="28" height="28" fill="#D9D9D9" />
                                                        </mask>
                                                        <g mask="url(#mask0_291_447)">
                                                            <path
                                                                d="M16.3333 21L14.7 19.3083L18.8417 15.1667H4.66666V12.8333H18.8417L14.7 8.69167L16.3333 7L23.3333 14L16.3333 21Z"
                                                                fill="#00FFA3"
                                                            />
                                                        </g>
                                                    </svg>
                                                </span>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </>
            )}
        </div>
    );
}
