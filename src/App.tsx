import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'; 
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import { Toaster } from 'react-hot-toast';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './common.scss';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
// import Loading from './components/Loading';
import Projects from './pages/Projects';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
require('@solana/wallet-adapter-react-ui/styles.css');

export const App: FC = () => {
    // const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        AOS.refresh();
    }, []);

    return (
        <Context>
            {/* <Header />
            <Pool /> */}
            <div className="app min-h-[100vh] relative" lang="en-US">
                {/* {isLoading && <Loading />} */}
                <Router>
                    <Header />

                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/launchpad/:id" element={<Detail />} />
                            <Route path="/launchpads" element={<Projects />} />
                        </Routes>
                    </main>

                    <Footer />
                </Router>
            </div>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 2500,
                }}
            />
        </Context>
    );
};

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), []);
    const wallets = useMemo(
    () => [
        new SolflareWalletAdapter()
    ], // PhantomWallet does not need an adapter
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
