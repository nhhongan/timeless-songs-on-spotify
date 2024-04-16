// src/components/ButtonGroup.tsx

import React from 'react';
import '../styles/ButtonGroup.scss';

interface Button {
  label: string;
  onClick: () => void;
}

interface ButtonGroupProps {
  buttons: Button[];
  x: number;
  y: number;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, x, y }) => {
  return (
    <g className='button-group' transform={`translate(${x}, ${y})`}>
      {buttons.map((button, index) => (
        <g
          key={index}
          transform={`translate(${-index * 105}, 0)`}
          onClick={button.onClick}
          className='button'
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