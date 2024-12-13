import React, { useState, useEffect, useRef } from "react";
import './Timer.scss'
interface TimerProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Timer: React.FC<TimerProps> = ({ currentTab, onTabChange }) => {
  const [timer, setTimer] = useState(25 * 60); // Default 25 minutes for Pomodoro
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null); // Ref to track the interval

  // Handle tab change and reset the timer based on the selected mode
  const handleTabChange = (tab: string) => {
    setIsRunning(false); // Stop the timer
    clearInterval(intervalRef.current!);
    onTabChange(tab);

    if (tab === "Pomodoro") setTimer(25 * 60);
    else if (tab === "Short Break") setTimer(5 * 60);
    else if (tab === "Long Break") setTimer(15 * 60);
  };

  // Format time as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Start the timer countdown
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = window.setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!); // Stop timer at 0
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  // Stop the timer
  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
  };

  // Clean up the interval on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current!);
  }, []);

  return (
    <div className="timer">
      <div className="tabs">
        <button
          onClick={() => handleTabChange("Pomodoro")}
          className={currentTab === "Pomodoro" ? "active" : ""}
        >
          Pomodoro
        </button>
        <button
          onClick={() => handleTabChange("Short Break")}
          className={currentTab === "Short Break" ? "active" : ""}
        >
          Short Break
        </button>
        <button
          onClick={() => handleTabChange("Long Break")}
          className={currentTab === "Long Break" ? "active" : ""}
        >
          Long Break
        </button>
      </div>
      <div className="time-display">
        <h2>{formatTime(timer)}</h2>
      </div>
      <button className="start-button" onClick={startTimer}>
        {isRunning ? "RUNNING" : "START"}
      </button>
      <button className="stop-button" onClick={stopTimer}>
        STOP
      </button>
    </div>
  );
};

export default Timer;
