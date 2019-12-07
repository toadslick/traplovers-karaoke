import React from 'react';

const ProgressCircle = ({
  percent,
  radius,
  strokeWidth,
  secondaryColor,
  primaryColor,
}) => {
  const diameter = radius * 2;
  const perimeter = diameter * Math.PI;
  return (
    <div
      style={{
        width: diameter,
        height: diameter,
        transform: `rotate(-90deg)`,
      }}
    >
      <svg
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
        width={diameter}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={radius}
          cy={radius}
          fill="none"
          r={radius - strokeWidth / 2}
          stroke={secondaryColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={radius}
          cy={radius}
          fill="none"
          r={radius - strokeWidth / 2}
          stroke={primaryColor}
          strokeDasharray={perimeter}
          strokeWidth={strokeWidth}
          style={{
            strokeDashoffset: perimeter - perimeter * Math.min(1, percent),
            transition: 'stroke-dashoffset 0.3s',
          }}
        />
      </svg>
    </div>
  );
};

ProgressCircle.defaultProps = {
  radius: 50,
  strokeWidth: 4,
  secondaryColor: '#444',
  primaryColor: '#fff',
};

export default ProgressCircle;
