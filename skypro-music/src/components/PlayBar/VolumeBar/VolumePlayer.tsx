import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import styles from "./VolumeBar.module.css";

type VolumePlayerType = {
  max: number | undefined;
  value: number;
  step: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function VolumePlayer({
  max,
  value,
  step,
  onChange,
}: VolumePlayerType) {
  return (
    <div>
      <input
        type="range"
        min="0"
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
