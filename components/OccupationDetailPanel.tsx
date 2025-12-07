'use client'

import { Occupation } from '@/types/occupation'

interface OccupationDetailPanelProps {
  occupation: Occupation | null
  onClose: () => void
}

export default function OccupationDetailPanel({
  occupation,
  onClose,
}: OccupationDetailPanelProps) {
  if (!occupation) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-muted">
        <p>職業を選択して詳細を表示</p>
      </div>
    )
  }

  const { marketValue2040, skills } = occupation

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* ヘッダー */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-2xl font-bold">{occupation.name}</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-muted mb-1">{occupation.nameEn}</p>
        <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
          {occupation.category}
        </span>
      </div>

      {/* 概要 */}
      <div className="mb-6">
        <p className="text-sm leading-relaxed text-muted">{occupation.description}</p>
      </div>

      {/* 市場価値 */}
      <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
        <h3 className="text-sm font-bold mb-4 uppercase tracking-wide">
          2040年市場価値
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted mb-1">スコア</p>
            <p className="text-3xl font-bold font-mono">{marketValue2040.score}</p>
          </div>
          <div>
            <p className="text-xs text-muted mb-1">予測年収</p>
            <p className="text-sm font-semibold">{marketValue2040.salaryRange}</p>
          </div>
          <div>
            <p className="text-xs text-muted mb-1">成長率</p>
            <p className="text-lg font-semibold">
              {marketValue2040.growthRate > 0 ? '+' : ''}
              {marketValue2040.growthRate}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted mb-1">AI代替リスク</p>
            <p className="text-lg font-semibold">{marketValue2040.aiRisk}%</p>
          </div>
        </div>
      </div>

      {/* 必須スキル */}
      <div className="mb-6">
        <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">必須スキル</h3>
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-xs text-muted font-mono">
                  Lv.{skill.level} / 重要度 {skill.importance}
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(skill.level / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* タグ */}
      <div>
        <h3 className="text-sm font-bold mb-2 uppercase tracking-wide">タグ</h3>
        <div className="flex flex-wrap gap-2">
          {occupation.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/5 border border-white/10 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
