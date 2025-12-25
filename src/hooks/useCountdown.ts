import { useEffect, useState } from 'react';

// 🔁 Shared countdown hook for the safety timer.
export const useCountdown = (initialSeconds: number, isActive: boolean) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((current) => current - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const resetCountdown = () => {
    setSecondsLeft(initialSeconds);
  };

  return { secondsLeft, setSecondsLeft, resetCountdown };
};
