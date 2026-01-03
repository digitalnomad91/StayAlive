import { useEffect, useState } from 'react';

/**
 * Shared countdown hook for the safety timer.
 *
 * Starts from the provided number of seconds and, while `isActive` is `true`,
 * decrements the value by 1 every second. The countdown automatically
 * stops at zero and will not go negative.
 *
 * @param {number} initialSeconds - Initial number of seconds to start the countdown from.
 * @param {boolean} isActive - Whether the countdown is currently running.
 * @returns {{ secondsLeft: number; setSecondsLeft: (value: number) => void; resetCountdown: () => void }}
 * An object containing the current number of seconds left, a setter to update
 * the remaining seconds, and a function to reset the countdown to `initialSeconds`.
 */
export const useCountdown = (initialSeconds: number, isActive: boolean) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const resetCountdown = () => {
    setSecondsLeft(initialSeconds);
  };

  return { secondsLeft, setSecondsLeft, resetCountdown };
};
