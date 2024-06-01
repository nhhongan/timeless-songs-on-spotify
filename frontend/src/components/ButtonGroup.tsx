// src/components/ButtonGroup.tsx

import React, { useState } from 'react';
import '../styles/ButtonGroup.scss';
import { Genre } from '../utils/api';

export interface Button {
  label: string;
  value: any;
  active?: boolean;
  color?: string;
  width?: number;
  height?: number;
  fontSize?: number;
}

interface ButtonGroupProps {
  buttons: Button[];
  x: number;
  y: number;
  onValueChange: (value: any) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, x, y, onValueChange: onGenreChange }) => {
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
          transform={`translate(${-index * ( (button.width ?? 100) + 5 )}, 0)`}
          onClick={() => {
            onGenreChange(button.value);
            setActiveButton(index);
          }}
          className={`button ${activeButton === index ? 'active' : ''}`}
        >
          <rect width={button.width ?? 100} height={button.height ?? 30} rx="5"/>
          <text x={(button.width ?? 100) / 2} y={(button.height ?? 30) * 2 / 3} fontSize={button.fontSize}>
            {button.label }
          </text>
        </g>
      ))}
    </g>
  );
};

export default ButtonGroup;