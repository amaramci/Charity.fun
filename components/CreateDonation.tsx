import { FC, useState } from "react";
import styles from "../styles/Home.module.css";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Transaction, SystemProgram, PublicKey } from "@solana/web3.js";

interface Props {
  onBack: () => void;
}

const CreateDonation: FC<Props> = ({ onBack }) => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pool, setPool] = useState("");
  const [image, setImage] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  const sampleProjects = [
    {
      id: 1,
      title: "Help Build a School",
      description: "Support building a school for underprivileged children.",
      pool: "$45.000",
      image: "/projects/school.png",
    },
    {
      id: 2,
      title: "Animal Rescue Fund",
      description: "Donate to save and shelter stray animals.",
      pool: "$30.000",
      image: "/projects/animals.png",
    },
  ];

  const handleBack = () => {
    if (creating) {
      setCreating(false);
    } else {
      onBack();
    }
  };

  const handleSubmit = async () => {
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
      <h2 className={styles.formTitle}>Create Donation</h2>

      {!creating ? (
        <>
          {sampleProjects.map((project) => (
            <div key={project.id} style={{ marginBottom: "1rem", textAlign: "center" }}>
              <img src={project.image} alt={project.title} style={{ width: "100%", borderRadius: "1rem" }} />
              <h3 className={styles.formSubtitle}>{project.title}</h3>
              <p className={styles.subtitle}>{project.description}</p>
              <h3 className={styles.formSubtitle}>{project.pool}</h3>
            </div>
          ))}
          <button className={styles.primaryButton} onClick={() => setCreating(true)}>
            Create Your Own Donation
          </button>
        </>
      ) : (
        <>
          <input
            className={styles.input}
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <textarea
            className={styles.textarea}
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Goal Amount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
          />
          <button className={styles.primaryButton} onClick={handleSubmit}>
            Submit Donation
          </button>
        </>
      )}
    </div>
  );
};

export default CreateDonation;