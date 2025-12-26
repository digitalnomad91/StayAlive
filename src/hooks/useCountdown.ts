import { useEffect, useState } from 'react';

/**
 * Shared countdown hook for the safety timer.
 *
 * Starts from the provided number of seconds and, while `isActive` is `true`,
 * decrements the value by 1 every second. The countdown does not
 * automatically stop at zero and can continue into negative values unless
 * the caller intervenes (for example, by deactivating the timer or resetting it).
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
      setSecondsLeft((current) => current - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const resetCountdown = () => {
    setSecondsLeft(initialSeconds);
  };

  return { secondsLeft, setSecondsLeft, resetCountdown };
};
