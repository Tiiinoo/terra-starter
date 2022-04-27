import React, { useState, useEffect } from "react";
import * as execute from '../contract/execute';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import LoadingIndicator from '../components/LoadingIndicator';

const Play = () => {
  const connectedWallet = useConnectedWallet();
  // Configure this as you want, I like shorter games
  const playTime = 15;

  const [time, setTime] = useState(playTime);
  const [gameOver, setGameOver] = useState(false);
  // We use this to track where the target is on the screen
	const [targetPosition, setTargetPosition] = useState({ top: "15%", left: "50%" });
	const [targetPosition1, setTargetPosition1] = useState({ top: "50%", left: "30%" });
	const [targetPosition2, setTargetPosition2] = useState({ top: "30%", left: "80%" });
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  
  // Every second we're going to lower the value of time.
  useEffect(() => {
    const unsubscribe = setInterval(() => {
      setTime(time => time > 0 ? time - 1 : 0);
    }, 1000);
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    if (time === 0) {
			setTargetPosition({ display: 'none' });
			setTargetPosition1({ display: 'none' });
			setTargetPosition2({ display: 'none' });
      // Show alert to let user know it's game over
      alert(`Game Over! Your score is ${score}. Please confirm transaction to submit score.`);
      submitScore();
    }
  }, [time]);

  const submitScore = async () => {
    if (connectedWallet && connectedWallet.network.name === 'testnet') {
      setLoading(true);
      const tx = await execute.setScore(connectedWallet, score);
      console.log(tx);
      // Once the transaction is confirmed, we let the user know and navigate to the leaderboard
      alert('Score submitted!');
      setLoading(false);
      window.location.href = '/leaderboard';
    }
  };

  const handleClick = () => {
    // OGs will know this :)
    let audio = new Audio("/Zergling_explodes.mp3");
    
    // Don't let it get too loud!
    audio.volume = 0.2;
    audio.play();

    setScore(score => score + 1);
    
    // Play around with this to control bounds!
    setTargetPosition({
      top: `${Math.floor(Math.random() * 80)}%`,
      left: `${Math.floor(Math.random() * 80)}%`
    });
	};
	
	const handleClick1 = () => {
    // OGs will know this :)
    let audio = new Audio("/Zergling_explodes.mp3");
    
    // Don't let it get too loud!
    audio.volume = 0.2;
    audio.play();

    setScore(score => score + 1);
    
    // Play around with this to control bounds!
    setTargetPosition1({
      top: `${Math.floor(Math.random() * 50)}%`,
      left: `${Math.floor(Math.random() * 40)}%`
    });
	};
	const handleClick2 = () => {
    // OGs will know this :)
    let audio = new Audio("/Zergling_explodes.mp3");
    
    // Don't let it get too loud!
    audio.volume = 0.2;
    audio.play();

    setScore(score => score + 1);
    
    // Play around with this to control bounds!
    setTargetPosition2({
      top: `${Math.floor(Math.random() * 30)}%`,
      left: `${Math.floor(Math.random() * 90)}%`
    });
  };

  return (
    <div className="score-board-container">
      <div className="play-container">
        <span>Score: {score}</span>
        <span>Fight!</span>
        <span>Time left: {time} s</span>
      </div>

      {/* Render loading or game container */}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="game-container">
          <img src={"algo.png"} id="target" alt="Target" style={{ ...targetPosition }} onClick={handleClick} />
					<img src={"./fudder1.png"} id="target1" alt="Target" style={{ ...targetPosition1 }} onClick={handleClick1} />
					<img src={"fudder2.png"} id="target2" alt="Target" style={{ ...targetPosition2 }} onClick={handleClick2} />
          <img src="DoKween.png" id="dokween-img" alt="Do Kween" />
        </div>
      )}
    </div>
  );
};

export default Play;
