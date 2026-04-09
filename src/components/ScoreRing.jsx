import React from 'react'
import { getScoreColor } from '../utils/aiEngine'

export default function ScoreRing({ score, size = 80, strokeWidth = 7 }) {
  const r  = (size - strokeWidth) / 2
  const cx = size / 2
  const cy = size / 2
  const circ  = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color  = getScoreColor(score)

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <span className="absolute text-white font-bold" style={{ fontSize: size * 0.22, color }}>
        {score}%
      </span>
    </div>
  )
}
