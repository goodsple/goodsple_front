import { useEffect, useState } from 'react';

const calculateTimeLeft = (dueDate: Date) => {
  const difference = +dueDate - +new Date();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

const CountdownTimer = ({ dueDate }: { dueDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(dueDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(dueDate));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  if (timeLeft.days > 0) timerComponents.push(`${timeLeft.days}일`);
  timerComponents.push(timeLeft.hours.toString().padStart(2, '0'));
  timerComponents.push(timeLeft.minutes.toString().padStart(2, '0'));
  timerComponents.push(timeLeft.seconds.toString().padStart(2, '0'));

  return <span>결제까지 남은 시간: {timerComponents.join(':')}</span>;
};

export default CountdownTimer;