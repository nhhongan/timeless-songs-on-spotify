import React from "react";
import "../styles/Searchbar.scss";
interface SearchBarProps {
  x: number;
  y: number;
  text: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ x, y, text, onSearch }) => {
  return (
    <g id="searchbar" transform={`translate(${x}, ${y})`}>
      <text className="label" fill="white" fontSize={5}>
        {text}
      </text>
      <foreignObject x={20} y={-10} width={20} height={20}>
        <input
          type="text"
          onChange={() => {}}
          style={{ width: "1", height: "1" }}
        />
      </foreignObject>
    </g>
  );
};

export default SearchBar;
