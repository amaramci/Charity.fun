import { FC, useState } from "react";
import styles from "../styles/Home.module.css";

interface Props {
  onBack: () => void;
}

const ReadTestamentForm: FC<Props> = ({ onBack }) => {
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  const sampleProjects = [
    {
      id: 1,
      title: "Help Build a School",
      description: "Support building a school for underprivileged children.",
      image: "/projects/school.jpg",
    },
    {
      id: 2,
      title: "Animal Rescue Fund",
      description: "Donate to save and shelter stray animals.",
      image: "/projects/animals.jpg",
    },
  ];

  return (
    <div className={styles.formContainer}>
      <button className={styles.backButton} onClick={onBack}>
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
          <button className={styles.primaryButton}>Submit Donation</button>
        </>
      )}
    </div>
  );
};

export default ReadTestamentForm;