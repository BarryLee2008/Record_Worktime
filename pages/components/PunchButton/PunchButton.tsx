import React, { useState } from "react";
import styles from "./PunchButton.module.css";
import getCurrentTimeString from "../../utils/getCurrentTimeString";

const PunchButton: React.FC<{ enable: boolean, callback: Function }> = ({
  enable,
  callback,
}) => {
  const onClick = () => {
    console.log('Punch Clock');
    callback();
  };

  const [currentTime, setCurrentTime] = useState('00:00:00');

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
        disabled={!enable}
      />
    </div>
  );
};

export default PunchButton;
