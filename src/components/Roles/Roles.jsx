import React, { useState, useEffect, useRef } from 'react';
import './_roles.scss';

const ROLES = [
  'Ingeniero de Software',
  'Diseñador UX',
  'Desarrollador Web',
  'Emprendedor',
  'Me gusta el color verde'
];

// Append first item for seamless loop
const ITEMS = [...ROLES, ROLES[0]];

export const Roles = () => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setIndex((prev) => prev + 1);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index === ITEMS.length - 1) {
      // Reached the duplicate first item: wait for transition to finish, then reset to 0 silently
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(0);
      }, 550);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  const itemHeightPercent = 100 / ITEMS.length;

  return (
    <div className="roles" aria-live="polite">
      <div
        className="roles__track"
        style={{
          transform: `translateY(-${index * itemHeightPercent}%)`,
          transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
        }}
      >
        {ITEMS.map((role, i) => (
          <p key={i} className="roles__item">
            {role}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Roles;
