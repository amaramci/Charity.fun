import { FC, useState } from "react";
import styles from "../styles/Home.module.css";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  Transaction,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";

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
    if (!amount || isNaN(Number(amount))) return alert("Enter a valid amount");

    try {
      const programId = new PublicKey("7wUQXRQtBzTmyp9kcrmok9FKcc4RSYXxPYN9FGDLnqxb");

      const recipient = publicKey; // TODO: Replace with real recipient if needed
      const lamports = Math.floor(Number(amount) * 1e9); // Convert SOL to lamports
      if (lamports <= 0) throw new Error("Amount too small");

      const data = Buffer.alloc(8);
      data.writeBigUInt64LE(BigInt(lamports));

      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: publicKey, isSigner: true, isWritable: true },  // sender
          { pubkey: recipient, isSigner: false, isWritable: true }, // recipient
          { pubkey: programId, isSigner: false, isWritable: false } // program (not writable!)
        ],
        programId,
        data,
      });

      const transaction = new Transaction().add(instruction);
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "processed");

      alert("Donation sent to contract!");
    } catch (error) {
      console.error("Transaction failed:", error);
      if (error instanceof Error) {
        alert(`Transaction failed: ${error.message}`);
      } else {
        alert(`Transaction failed: ${String(error)}`);
      }
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
          <img
            src={partitions.find((p) => p.id === selectedPartition)?.image}
            alt="Partition"
            style={{ width: "100%", borderRadius: "1rem" }}
          />
          <h2 className={styles.formTitle}>
            {partitions.find((p) => p.id === selectedPartition)?.title}
          </h2>
          <p className={styles.subtitle}>
            {partitions.find((p) => p.id === selectedPartition)?.description}
          </p>
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
