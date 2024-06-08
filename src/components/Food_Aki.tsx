import React, { useState, useEffect } from 'react';
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase"; // Import the initialized Firestore instance
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // useNavigateをインポート
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Akinator from "./akinator.png"; 
import { Height } from '@mui/icons-material';
import useViewportHeight from "../hooks/useViewportHeight"; // Import the custom hook

const FoodAki: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);
  const viewportHeight = useViewportHeight(); // Use the custom hook

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

  const handleOptionToggle = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option) ? prev.filter(opt => opt !== option) : [...prev, option]
    );
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("ユーザーがログインしていません");
      return;
    }
    if (selectedOptions.length === 0) {
      console.error("オプションを選択してください");
      
    }

    try {
      const userAkiRef = doc(db, "Users_Aki", user.uid);
      await setDoc(userAkiRef, {
        food: selectedOptions,
        created_at: serverTimestamp()
      }, { merge: true });
      console.log("Selected options saved successfully.");
      setShowCheckmark(true);
      setTimeout(() => {
        setShowCheckmark(false);
        navigate('/sleep');
      }, 500); 
    } catch (error) {
      console.error("Error saving selected options: ", error);
    }
  };

  return (
    <div style={{ ...styles.container, height: viewportHeight-60 }}>
      <header style={styles.header}>
        <h1 style={styles.title}>BurgerNator</h1>
      </header>
      <main style={styles.main}>
        {showCheckmark ? (
          <CheckCircleOutlineIcon style={styles.checkmark} />
        ) : (
          <>
            <div style={styles.questionContainer}>
              <img src={Akinator} alt="Akinator"  /> 
              <h2 style={styles.question}>質問2/4:</h2>
              <p style={styles.subQuestion}>食事をいつしますか？（複数選択可）</p>
            </div>
            <div style={styles.optionsContainer}>

              {['朝', '昼', '夜'].map(option => (
                <button
                  key={option}
                  style={{
                    ...styles.optionButton,
                    backgroundColor: selectedOptions.includes(option) ? '#f4a261' : '#f1faee',
                  }}
                  onClick={() => handleOptionToggle(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button style={styles.submitButton} onClick={handleSubmit}>
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
  optionButton: {
    width: '80%',
    padding: '10px 0',
    margin: '10px 0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#f4a261',
    color: '#1d3557',
    border: 'none',
    padding: '10px 20px',
    margin: '20px 0 0 0',
    fontSize: '1em',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  checkmark: {
    fontSize: '4em',
    color: '#f4a261',
  },
};

export default FoodAki;
