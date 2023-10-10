import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio, Space } from "antd";
import styles from './LocationSelection.module.css';
import { locationOptions } from 'pages/utils/data';

const LocationSelection: React.FC<{
  locationEanble: Boolean,
  callback: Function | undefined,
}> = ({ locationEanble, callback }) => {
  const [location, setLocation] = useState(locationOptions[0].value);
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
          {locationOptions.map(
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
          {locationOptions.map(
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
