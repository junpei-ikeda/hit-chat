// components/Clock.js
'use client';
import { useEffect, useState } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('ja-JP', { hour12: false });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ja-JP', {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  return (
    <div className="text-center mb-8">
      <div className="text-gray-600 text-sm">{formatDate(time)}</div>
      <div className="text-4xl font-bold">{formatTime(time)}</div>
    </div>
  );
}