import { FC } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import WalletUI from "./WalletUI";
import styles from '../styles/Home.module.css';

require('@solana/wallet-adapter-react-ui/styles.css');


const WalletContextProvider: FC = () => {
  const wallets = [new PhantomWalletAdapter()];
  const endpoint = web3.clusterApiUrl('devnet');

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <div className={styles.centeredContent}>
            <h1 className={styles.title}>Charity.fun</h1>
            <p className={styles.subtitle}>Are you ready to donate and maybe win x1000?</p>
            <WalletUI></WalletUI>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;