'use client';

import React, { FC, useEffect, useState } from 'react';
import { siteSettings } from '../constants';
import cv from '../cv';

const Toolbar: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);

    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date: Date) => {
    const day = date.toLocaleString('en-En', {
      weekday: 'short',
    });
    const month = date.toLocaleString('en-En', {
      month: 'short',
      day: 'numeric',
    });
    const timeString = date.toLocaleTimeString('en-En', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });
    return (
      <div style={{ display: 'flex' }}>
        <span>
          {day}&nbsp;{month}
        </span>
        <div style={{ width: '0.5em' }} />
        <span>{timeString}</span>
      </div>
    );
  };

  return (
    <div className="toolbar" data-theme={siteSettings.toolbarColor}>
      <h1>{cv.general.displayName}</h1>
      <div style={{ marginLeft: 'auto' }}>
        <div>{mounted && time ? formatTime(time) : "Hello there! How's your day going?"}</div>
      </div>
    </div>
  );
};

export default Toolbar;
