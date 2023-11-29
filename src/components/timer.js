import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { icons } from "../utils/images";

const Timer = ({ deadline }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <TimerWrapper>
        <img src={icons.sandClock} alt='sand-clock' />
        <p>{days}d : {hours}h : {minutes}m : {seconds}s</p>
    </TimerWrapper>
  );
};

const TimerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    gap: 0.5rem;
`;

export default Timer;