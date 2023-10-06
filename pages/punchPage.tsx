import React, { useState } from "react";
import PunchButton from "./components/PunchButton";
import TimeCard from "./components/TimeCard";
import LocationSelection from "./components/LocationSelection";
import { NextPage } from "next";
import styles from "../styles/PunchPage.module.css";
import getCurrentTimeString from "./utils/getCurrentTimeString";
import { Spin } from 'antd';

const DefaultTimeString: string = '00:00:00';
const ON_DUTY = 1;
const OFF_DUTY = 2;
const WAITTING = 3;

const PunchPage: NextPage = () => {
  const [dutyState, setDutyState] = useState(OFF_DUTY);
  const [clockInTime, setClockInTime] = useState(DefaultTimeString);
  const [clockOutTime, setClockOutTime] = useState(DefaultTimeString);
  const [locationEable, setLocationEnalbe] = useState(true);

  const changeDutyState = () => {
    if (dutyState === ON_DUTY) {
      setClockOutTime(getCurrentTimeString());
      setLocationEnalbe(true);
      setDutyState(WAITTING);
    } else {
      setClockInTime(getCurrentTimeString());
      setClockOutTime(DefaultTimeString);
      setLocationEnalbe(false);
      setDutyState(ON_DUTY);
    }
  };

  const punch = () => {
    changeDutyState();
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <PunchButton callback={punch} />
      </div>
      <div className={styles.content}>
        <TimeCard title="In" content={clockInTime} />
        {dutyState === OFF_DUTY && (
          <div className={styles.offLabel}> Off Duty</div>
        )}
        {dutyState === ON_DUTY && (
          <div className={styles.onLabel}> On Duty</div>
        )}
        {dutyState === WAITTING && <Spin size="large" />}
        <TimeCard title="Out" content={clockOutTime} />
      </div>
      <div className={styles.footer}>
        <LocationSelection locationEanble={locationEable} />
      </div>
    </div>
  );
};

export default PunchPage;
