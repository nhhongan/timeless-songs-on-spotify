import React from 'react';

interface BarChartProps {
    data: number[];
    width: number;
    height: number;
    barColor: string;
}

const VerticalBarChart: React.FC<BarChartProps> = ({ data, width, height, barColor }) => {
    const maxDataValue = Math.max(...data);
    const barWidth = width / data.length;

    return (
        <svg width={width} height={height}>
            {data.map((value, index) => (
                <rect
                    key={index}
                    x={index * barWidth}
                    y={height - (value / maxDataValue) * height}
                    width={barWidth}
                    height={(value / maxDataValue) * height}
                    fill={barColor}
                />
            ))}
        </svg>
    );
};

export default VerticalBarChart;