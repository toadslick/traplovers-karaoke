import React from 'react';

const ProgressCircle = ({
  percent,
  radius,
  strokeWidth,
  secondaryColor,
  primaryColor,
  enabled,
}) => {
  const diameter = radius * 2;
  const perimeter = diameter * Math.PI;
  return (
    <div style={{ width: diameter, height: diameter }}>
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
          strokeWidth={strokeWidth / 2}
        />
        <circle
          cx={radius}
          cy={radius}
          fill="none"
          r={radius - strokeWidth / 2}
          stroke={primaryColor}
          strokeDasharray={perimeter}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          style={{
            strokeDashoffset: enabled
              ? perimeter - perimeter * Math.min(1, percent)
              : perimeter,
            transition: enabled ? 'stroke-dashoffset 0.3s' : '',
          }}
        />
      </svg>
    </div>
  );
};

ProgressCircle.defaultProps = {
  radius: 100,
  strokeWidth: 10,
  secondaryColor: '#ccc',
  primaryColor: '#000',
  enabled: true,
};

export default ProgressCircle;
