import React, { useState, useEffect } from 'react';
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase"; // Import the initialized Firestore instance
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Aki_Smoke: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const navigate = useNavigate(); // useNavigateフックを使用

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleOptionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("ユーザーがログインしていません");
      return;
    }

    if (selectedOption) {
      try {
        const userSmokeRef = doc(db, "Users_Aki", user.uid);
        await setDoc(userSmokeRef, {
          smoke: selectedOption,
          created_at: serverTimestamp()
        }, { merge: true });
        setShowCheckmark(true);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setShowCheckmark(false);
            setFadeOut(false);
            navigate('/task'); // 必要に応じて次のページに遷移
          }, 300); // 0.3秒後に次のページに遷移
        }, 500); // 0.5秒後にチェックマークをフェードアウト
      } catch (error) {
        console.error("Error saving selected option: ", error);
        alert("Error saving selected option.");
      }
    } else {
      alert("オプションを選択してください");
    }
  };

  const options = Array.from({ length: 51 }, (_, i) => `${i}本`);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>BurgerNator</h1>
      </header>
      <main style={styles.main}>
        {showCheckmark ? (
          <CheckCircleOutlineIcon style={{ ...styles.checkmark, ...(fadeOut ? styles.fadeOut : {}) }} />
        ) : (
          <>
            <div style={styles.questionContainer}>
              <h2 style={styles.question}>質問5/5:</h2>
              <p style={styles.subQuestion}>タバコ1日に何本吸いますか？</p>
            </div>
            <div style={styles.optionsContainer}>
              <select style={styles.selectBox} onChange={handleOptionSelect}>
                <option value="">選択してください</option>
                {options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button
              style={{
                ...styles.submitButton,
                backgroundColor: selectedOption ? '#f4a261' : '#ccc',
                cursor: selectedOption ? 'pointer' : 'not-allowed',
              }}
              onClick={handleSubmit}
              disabled={!selectedOption}
            >
              決定
            </button>
          </>
        )}
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 60px)',
    backgroundColor: '#1d3557',
    color: '#f4a261',
  },
  header: {
    width: '100%',
    textAlign: 'center' as 'center',
    backgroundColor: '#1d3557',
    padding: '10px 0',
  },
  title: {
    fontSize: '2.5em',
    margin: '0',
  },
  main: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    backgroundColor: '#f1faee',
    padding: '20px',
    borderRadius: '10px',
  },
  questionContainer: {
    textAlign: 'center' as 'center',
    marginBottom: '20px',
  },
  question: {
    fontSize: '1.5em',
    margin: '0',
    color: '#000',
  },
  subQuestion: {
    fontSize: '1em',
    margin: '0',
    color: '#000',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: '100%',
    alignItems: 'center',
  },
  selectBox: {
    width: '80%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    fontSize: '1em',
  },
  submitButton: {
    color: '#1d3557',
    border: 'none',
    padding: '10px 20px',
    margin: '20px 0 0 0',
    fontSize: '1em',
    borderRadius: '5px',
  },
  checkmark: {
    fontSize: '4em',
    color: '#f4a261',
    transition: 'opacity 0.5s ease-out',
  },
  fadeOut: {
    opacity: 0,
  },
};

export default Aki_Smoke;
