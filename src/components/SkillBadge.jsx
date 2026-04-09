import React from 'react'
import clsx from 'clsx'

const COLORS = [
  'bg-brand-500/15 text-brand-300 border-brand-500/25',
  'bg-blue-500/15 text-blue-300 border-blue-500/25',
  'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  'bg-purple-500/15 text-purple-300 border-purple-500/25',
  'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  'bg-amber-500/15 text-amber-300 border-amber-500/25',
]

function hashColor(str) {
  let h = 0
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff
  return COLORS[Math.abs(h) % COLORS.length]
}

export default function SkillBadge({ skill, matched = false, size = 'sm' }) {
  const base = matched
    ? 'bg-green-500/15 text-green-300 border-green-500/30'
    : hashColor(skill)
  return (
    <span className={clsx(
      'inline-flex items-center border rounded-md font-mono font-medium capitalize',
      size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1',
      base
    )}>
      {skill}
    </span>
  )
}
