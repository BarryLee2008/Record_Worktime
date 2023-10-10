import React, { useState } from "react";
import PunchButton from "./components/PunchButton";
import TimeCard from "./components/TimeCard";
import LocationSelection from "./components/LocationSelection";
import { NextPage } from "next";
import styles from "../styles/PunchPage.module.css";
import getCurrentTimeString from "./utils/getCurrentTimeString";
import { Spin } from 'antd';
import punchClockIn from 'services/punchClockIn';
import { locationOptions } from './utils/data';
import punchClockOut from 'services/punchCloukOut';
import Navigation from './components/Navigation/Navigation';

const DefaultTimeString: string = '00:00:00';
const ON_DUTY = 1;
const OFF_DUTY = 2;
const CLOCK_BLOCK_TIME = 15000;
const SUCCESS = 200;

const PunchPage: NextPage = () => {
  const [dutyState, setDutyState] = useState(OFF_DUTY);
  const [waitting, setWaitting] = useState(false);
  const [clockInTime, setClockInTime] = useState(DefaultTimeString);
  const [clockOutTime, setClockOutTime] = useState(DefaultTimeString);
  const [locationEable, setLocationEnalbe] = useState(true);
  const [location, setLocation] = useState(locationOptions[0].value);
  const [clockEnable, setClockEnable] = useState(true);

  const changeDutyState = (status: number | void) => {
    if (status !== SUCCESS) {
      setWaitting(false);
      return;
    }

    if (dutyState === ON_DUTY) {
      setClockOutTime(getCurrentTimeString());
      setLocationEnalbe(true);
      setDutyState(OFF_DUTY);
    } else {
      setClockInTime(getCurrentTimeString());
      setClockOutTime(DefaultTimeString);
      setLocationEnalbe(false);
      setDutyState(ON_DUTY);
    }
    setWaitting(false);
  };

  const punch = () => {
    setClockEnable(false);
    setWaitting(true);
    const taskID = Number.parseInt(String(localStorage.getItem('taskID')));

    if (dutyState === OFF_DUTY)
      punchClockIn({ location }).then((status) => changeDutyState(status));
    else if (dutyState === ON_DUTY)
      punchClockOut({ taskID }).then((status) => changeDutyState(status));

    setTimeout(() => setClockEnable(true), CLOCK_BLOCK_TIME);
  };

  return (
    <div className={styles.layout}>
      <Navigation />
      <div className={styles.header}>
        <PunchButton enable={clockEnable} callback={punch} />
      </div>
      <div className={styles.content}>
        <TimeCard title="In" content={clockInTime} />
        {dutyState === OFF_DUTY && waitting === false && (
          <div className={styles.offLabel}> Off Duty</div>
        )}
        {dutyState === ON_DUTY && waitting === false && (
          <div className={styles.onLabel}> On Duty</div>
        )}
        {waitting && <Spin size="large" />}
        <TimeCard title="Out" content={clockOutTime} />
      </div>
      <div className={styles.footer}>
        <LocationSelection
          locationEanble={locationEable}
          callback={setLocation}
        />
      </div>
    </div>
  );
};

export default PunchPage;
