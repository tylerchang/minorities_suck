import { connectFirestoreEmulator } from "firebase/firestore/lite";
import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const { time, onExpire } = props;

  const startMin = Math.floor(time / 60);
  const startSec = Math.floor(time % 60);

  const [seconds, setSeconds] = useState(startSec);
  const [minutes, setMinutes] = useState(startMin);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // let interval =
    let interval = setInterval(() => {
      console.log(minutes, seconds);
      if (isActive) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          onExpire();
          setIsActive(false);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <h1>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </h1>
  );
};

export default Timer;
