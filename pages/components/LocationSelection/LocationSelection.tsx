import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio, Space } from "antd";
import styles from './LocationSelection.module.css';

const LocationOptions = [
  { id: 0, label: 'Burnaby', value: 'Burnaby', column: 1 },
  { id: 1, label: 'Downtown', value: 'Downtown Vancourve', column: 1 },
  { id: 2, label: 'Surrey', value: 'Surrey', column: 1 },
  { id: 3, label: 'South Vancouver', value: 'South Vancouver', column: 2 },
  { id: 4, label: 'Coquitlam', value: 'Coquitlam', column: 2 },
  { id: 5, label: 'Richmond', value: 'Richmond', column: 2 },
  { id: 6, label: 'Outside', value: 'Outside', column: 2 },
];

const LocationSelection: React.FC<{
  locationEanble: Boolean,
  callback: Function | undefined,
}> = ({ locationEanble, callback }) => {
  const [location, setLocation] = useState(LocationOptions[0].value);
  const onLocationChange = ({ target: { value } }: RadioChangeEvent) => {
    setLocation(value);
    callback && callback(value);
  };

  return (
    <div className={styles.layout}>
      <Radio.Group
        onChange={onLocationChange}
        value={location}
        optionType="button"
        buttonStyle="solid"
        size="large"
        disabled={!locationEanble}
      >
        <Space direction="vertical">
          {LocationOptions.map(
            (o) =>
              o.column === 1 && (
                <Radio
                  className={styles.radioButton}
                  key={o.value}
                  value={o.value}
                >
                  {o.label}
                </Radio>
              )
          )}
        </Space>
        <Space direction="vertical">
          {LocationOptions.map(
            (o) =>
              o.column === 2 && (
                <Radio
                  className={styles.radioButton}
                  key={o.value}
                  value={o.value}
                >
                  {o.label}
                </Radio>
              )
          )}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default LocationSelection;
