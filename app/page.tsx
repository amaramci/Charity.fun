'use client';

import MemeCoins from "../components/MemeCoins";
import { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import WalletContextProvider from '../components/WalletContextProvider';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
      <h1 className={styles.shinyText}>Charity.fun</h1>
      <meta name="description" content="Charity.fun" />
      </Head>
      <WalletContextProvider />
      <MemeCoins />
    </div>
  );
};

export default Home;
