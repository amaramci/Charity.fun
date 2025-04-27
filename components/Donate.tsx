import { FC, useState } from "react";
import styles from "../styles/Home.module.css";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Transaction, SystemProgram, PublicKey } from "@solana/web3.js";

interface DonateProps {
  onBack: () => void;
}

const partitions = [
  {
    id: 1,
    title: "Orphanage Support",
    description: "Help provide food, shelter, and education to orphans.",
    image: "/projects/orphan.png",
  },
  {
    id: 2,
    title: "Animal Shelter",
    description: "Support rescue operations and shelter for abandoned animals.",
    image: "/projects/animals.png",
  },
  {
    id: 3,
    title: "Clean Water Project",
    description: "Fund wells and clean water systems in developing countries.",
    image: "/projects/water.png",
  },
];

const Donate: FC<DonateProps> = ({ onBack }) => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [mode, setMode] = useState<'select-partition' | 'fill-donation'>('select-partition');
  const [selectedPartition, setSelectedPartition] = useState<number | null>(null);
  const [amount, setAmount] = useState("");

  const handleSelectPartition = (id: number) => {
    setSelectedPartition(id);
    setMode('fill-donation');
  };

  const handleBack = () => {
    if (mode === 'fill-donation') {
      setMode('select-partition');
      setAmount("");
    } else {
      onBack();
    }
  };

  const handleDonate = async () => {
    if (!publicKey) return alert("Connect wallet first!");
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey, // Placeholder: Ideally this would be a project account
          lamports: 1000, // Dummy amount
        })
      );
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "processed");
      alert("Donation Created and Transaction Signed!");
    } catch (error) {
      console.error("Transaction failed", error);
      alert("Transaction failed!");
    }
  };

  return (
    <div className={styles.formContainer}>
      <button className={styles.backButton} onClick={handleBack}>
        ← Back
      </button>

      {mode === 'select-partition' && (
        <>
          <h1 className={styles.formTitle}>Choose a Cause</h1>
          {partitions.map((partition) => (
            <button
              key={partition.id}
              className={styles.actionButton}
              onClick={() => handleSelectPartition(partition.id)}
            >
              {partition.title}
            </button>
          ))}
        </>
      )}

      {mode === 'fill-donation' && selectedPartition !== null && (
        <>
          <img src={partitions.find(p => p.id === selectedPartition)?.image} alt="Partition" style={{ width: '100%', borderRadius: '1rem' }} />
          <h2 className={styles.formTitle}>{partitions.find(p => p.id === selectedPartition)?.title}</h2>
          <p className={styles.subtitle}>{partitions.find(p => p.id === selectedPartition)?.description}</p>
          <input
            className={styles.input}
            placeholder="SOL"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className={styles.primaryButton} onClick={handleDonate}>
            Donate
          </button>
          </>
      )}
    </div>
  );
};

export default Donate;