import React, { useState } from "react";
import styles from "./PunchButton.module.css";
import getCurrentTimeString from "../../utils/getCurrentTimeString";

const PunchButton: React.FC<{ callback: Function }> = ({ callback }) => {
  const onClick = () => {
    console.log("Punch Clock");
    callback();
  };

  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [onDuty, setOnDuty] = useState(false);

  setInterval(() => {
    const currentTimeString = getCurrentTimeString();
    setCurrentTime(currentTimeString);
  }, 1000);

  return (
    <div className={styles.layout}>
      <input
        type="button"
        className={styles.button}
        onClick={onClick}
        value={currentTime}
      />
    </div>
  );
};

export default PunchButton;
