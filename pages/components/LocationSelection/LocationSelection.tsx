import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio, Space } from "antd";

const locationOptions = [
  { label: "Burnaby", value: "Burnaby", column: 1 },
  { label: "Downtown Vancourve", value: "Downtown Vancourve", column: 1 },
  { label: "Surrey", value: "Surrey", column: 1 },
  { label: "South Vancouver", value: "South Vancouver", column: 2 },
  { label: "Coquitlam", value: "Coquitlam", column: 2 },
  { label: "Richmond", value: "Richmond", column: 2 },
  { label: "Outside", value: "Outside", column: 2 },
];

const LocationSelection: React.FC = () => {
  const [location, setLocation] = useState("Richmond");
  const onLocationChange = ({ target: { value } }: RadioChangeEvent) => {
    setLocation(value);
  };

  return (
    <>
      <Radio.Group
        onChange={onLocationChange}
        value={location}
        optionType="button"
        buttonStyle="solid"
        size="large"
      >
        <Space direction="vertical">
          {locationOptions.map(
            (o) =>
              o.column === 1 && (
                <Radio key={o.value} value={o.value}>
                  {o.label}
                </Radio>
              )
          )}
        </Space>
        <Space direction="vertical">
          {locationOptions.map(
            (o) =>
              o.column === 2 && (
                <Radio key={o.value} value={o.value}>
                  {o.label}
                </Radio>
              )
          )}
        </Space>
      </Radio.Group>
    </>
  );
};

export default LocationSelection;
