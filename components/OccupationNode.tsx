'use client'

import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import { Occupation } from '@/types/occupation'

interface OccupationNodeProps {
  data: {
    occupation: Occupation
    onSelect: (occupation: Occupation) => void
  }
}

function OccupationNode({ data }: OccupationNodeProps) {
  const { occupation, onSelect } = data
  const { marketValue2040 } = occupation

  // 市場価値に基づいて色を決定
  const getNodeColor = (score: number) => {
    if (score >= 85) return 'bg-high-demand border-high-demand'
    if (score >= 60) return 'bg-mid-demand border-mid-demand'
    return 'bg-low-demand border-low-demand'
  }

  // サイズを決定
  const getNodeSize = (score: number) => {
    if (score >= 85) return 'w-48 h-32'
    if (score >= 60) return 'w-44 h-28'
    return 'w-40 h-24'
  }

  return (
    <div
      className={`${getNodeSize(marketValue2040.score)} ${getNodeColor(
        marketValue2040.score
      )} bg-opacity-10 border-2 rounded-lg p-4 cursor-pointer transition-all hover:scale-105 hover:bg-opacity-20 backdrop-blur-sm`}
      onClick={() => onSelect(occupation)}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="text-white">
        <h3 className="font-bold text-sm mb-1 leading-tight">{occupation.name}</h3>
        <p className="text-xs text-muted mb-2">{occupation.category}</p>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono font-semibold">{marketValue2040.score}</span>
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                marketValue2040.score >= 85
                  ? 'bg-high-demand'
                  : marketValue2040.score >= 60
                  ? 'bg-mid-demand'
                  : 'bg-low-demand'
              }`}
              style={{ width: `${marketValue2040.score}%` }}
            />
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  )
}

export default memo(OccupationNode)
