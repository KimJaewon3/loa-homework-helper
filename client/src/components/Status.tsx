import React from 'react';
import styled, { keyframes } from 'styled-components'

interface CircleProgressProps {
  size: number;
  progress: number;
  circumference: number;
  overall: boolean;
}

const CircleProgress = styled.div<CircleProgressProps>`
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  .circle-progress-sketch {
    position: absolute;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    circle {
      fill: none;
      stroke: #c1c1c1;
      stroke-width: 10;
    }
  }
  .circle-progress {
    position: absolute;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    circle {
      transform: rotate(-90deg);
      transform-origin: center;
      fill: none;
      stroke: ${props => props.overall ? `#d75959` : `#3aa639`};
      stroke-width: 10;
      stroke-linecap: round;
      stroke-dasharray: ${props => props.circumference}px;
      animation: ${props => movePercent(props.circumference, props.progress)} 1s ease forwards;
    }
  }
  span {
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    line-height: ${props => props.size}px;
  }
`;

const movePercent = (circumference: number, progress: number) => keyframes`
  from {
    stroke-dashoffset: ${circumference};
  }
  to {
    stroke-dashoffset: ${progress};
  }
`;

interface Props {
  percent: number;
  overall: boolean;
}

export default function Status({ percent, overall }: Props) {
  const RADIUS = 50; // 원크기 조절
  const circumference = 2 * Math.PI * RADIUS;
  const progress = circumference * (1 - percent / 100);

  return (
    <CircleProgress size={RADIUS * 2 + 20} progress={progress} circumference={circumference} overall={overall}>
      <svg className='circle-progress-sketch'>
        <circle cx={RADIUS + 10} cy={RADIUS + 10} r={RADIUS}/>
      </svg>
      
      <svg className='circle-progress'>
        <circle cx={RADIUS + 10} cy={RADIUS + 10} r={RADIUS}/>
      </svg>
      
      <span>{Math.floor(percent)}%</span>
    </CircleProgress>
  )
}
