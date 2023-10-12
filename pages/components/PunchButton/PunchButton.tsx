import React, { useState } from "react";
import styles from "./PunchButton.module.css";
import getCurrentTimeString from "../../utils/getCurrentTimeString";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const SECOND = 1000;
const INIT_CLOCK = '00:00:00';

const PunchButton: React.FC<{ enable: boolean, callback: Function }> = ({
  enable,
  callback,
}) => {
  const onClick = () => {
    modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => callback(),
    });
  };

  const [currentTime, setCurrentTime] = useState(INIT_CLOCK);
  const [modal, contextHolder] = Modal.useModal();

  setInterval(() => {
    const currentTimeString = getCurrentTimeString();
    setCurrentTime(currentTimeString);
  }, SECOND);

  return (
    <div className={styles.layout}>
      <button className={styles.button} onClick={onClick} disabled={!enable}>
        {currentTime}
      </button>
      {contextHolder}
    </div>
  );
};

export default PunchButton;
