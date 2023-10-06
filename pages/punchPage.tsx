import React, { useState } from "react";
import PunchButton from "./components/PunchButton";
import TimeCard from "./components/TimeCard";
import LocationSelection from "./components/LocationSelection";
import { NextPage } from "next";
import styles from "../styles/PunchPage.module.css";
import getCurrentTimeString from "./utils/getCurrentTimeString";

const DefaultTimeString: string = "00:00:00";

const PunchPage: NextPage = () => {
  const [onDuty, setOnDuty] = useState(false);
  const [clockInTime, setClockInTime] = useState(DefaultTimeString);
  const [clockOutTime, setClockOutTime] = useState(DefaultTimeString);
  const punch = () => {
    if (onDuty) setClockOutTime(getCurrentTimeString());
    else {
      setClockInTime(getCurrentTimeString());
      setClockOutTime(DefaultTimeString);
    }

    setOnDuty(!onDuty);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <PunchButton callback={punch} />
      </div>
      <div className={styles.content}>
        <TimeCard title="In" content={clockInTime} />
        {!onDuty && <div className={styles.offLabel}> Off Duty</div>}
        {onDuty && <div className={styles.onLabel}> On Duty</div>}
        <TimeCard title="Out" content={clockOutTime} />
      </div>
      <div className={styles.footer}>
        <LocationSelection />
      </div>
    </div>
  );
};

export default PunchPage;
