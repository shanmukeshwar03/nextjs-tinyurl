import { useEffect, useState } from 'react';

const Toast = ({ err }) => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const cursor = setTimeout(() => {
      setActive(false);
    }, 2300);
    return () => {
      clearInterval(cursor);
    };
  }, []);

  return (
    <div className={`toast__container ${!active && 'inactive'}`}>{err}</div>
  );
};

export default Toast;
