// src/components/ButtonGroup.tsx

import React, { useState } from 'react';
import '../styles/ButtonGroup.scss';

export interface Button {
  label: string;
  onClick: () => void;
  active?: boolean;
}

interface ButtonGroupProps {
  buttons: Button[];
  x: number;
  y: number;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, x, y }) => {
  // Add active state management
  const [activeButton, setActiveButton] = useState<number | null>(null);
  // Set default active button
  if (activeButton === null) {
    const activeIndex = buttons.findIndex((button) => button.active);
    setActiveButton(activeIndex);
  }
  return (
    <g className='button-group' transform={`translate(${x}, ${y})`}>
      {buttons.map((button, index) => (
        <g
          key={index}
          transform={`translate(${-index * 105}, 0)`}
          onClick={() => {
            button.onClick();
            setActiveButton(index);
          }}
          className={`button ${activeButton === index ? 'active' : ''}`}
        >
          <rect width="100" height="30" rx="5"/>
          <text x="50" y="20">
            {button.label}
          </text>
        </g>
      ))}
    </g>
  );
};

export default ButtonGroup;