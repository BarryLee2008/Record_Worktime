import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";

const locationOptions = [
  { label: "Burnaby", value: "Burnaby" },
  { label: "Downtown Vancourve", value: "Downtown Vancourve" },
  { label: "Surrey", value: "Surrey" },
  { label: "South Vancouver", value: "South Vancouver" },
  { label: "Coquitlam", value: "Coquitlam" },
  { label: "Richmond", value: "Richmond" },
  { label: "Outside", value: "Outside" },
];

const LocationSelection: React.FC = () => {
  const [location, setLocation] = useState("Richmond");
  const onLocationChange = ({ target: { value } }: RadioChangeEvent) => {
    setLocation(value);
  };

  return (
    <>
      <Radio.Group
        options={locationOptions}
        onChange={onLocationChange}
        value={location}
        optionType="button"
        buttonStyle="solid"
        size="large"
      />
    </>
  );
};

export default LocationSelection;
