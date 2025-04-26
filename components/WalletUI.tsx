import { FC } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import styles from '../styles/Home.module.css'
import { useState } from "react";

import ReadTestamentForm from "./CreateDonation";
import Donate from "./Donate";

const WalletUI: FC = () => {
  const { publicKey } = useWallet();
  const [activeForm, setActiveForm] = useState<"create" | "read" | null>(null);

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: '2rem 3rem',
      borderRadius: '1.5rem',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      marginTop: '1rem',
      maxWidth: '600px',
      width: '100%'
    }}>
      <WalletMultiButton />
      
      {publicKey && activeForm===null &&(
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    alignItems: 'center'
  }}>

    <h1 className={styles.formTitle}>What would you like to do?</h1>
    <button className={styles.actionButton} onClick={() => setActiveForm("create")}>
    Donate
    </button>
    <button className={styles.actionButton} onClick={() => setActiveForm("read")}>
    Create Donation</button>

  </div>
)}
    {publicKey && activeForm==="create" && (
        <Donate onBack={() => setActiveForm(null)} />
    )}

    {publicKey && activeForm === "read" && (
        <ReadTestamentForm onBack={()=> setActiveForm(null)}></ReadTestamentForm>
    )}

    </div>
  );
};

export default WalletUI;
