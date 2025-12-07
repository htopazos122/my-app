'use client'

import { useState } from 'react'
import { occupations } from '@/data/occupations'
import { Occupation } from '@/types/occupation'
import OccupationNetworkTree from '@/components/OccupationNetworkTree'
import OccupationDetailPanel from '@/components/OccupationDetailPanel'

export default function Home() {
  const [selectedOccupation, setSelectedOccupation] = useState<Occupation | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  // フィルタリング
  const filteredOccupations = occupations.filter((occ) => {
    const matchesSearch = occ.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         occ.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || occ.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...Array.from(new Set(occupations.map((o) => o.category)))]

  return (
    <main className="min-h-screen p-4 lg:p-8">
      <div className="max-w-[1800px] mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 uppercase tracking-tight">
            職業年表事典
          </h1>
          <p className="text-lg lg:text-xl text-muted">
            2040年のキャリアを見据える
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* サイドバー（フィルター） */}
          <aside className="lg:col-span-3 bg-white/5 rounded-none p-6 border border-white/10 h-fit">
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wide">
              検索・フィルター
            </h2>

            {/* 検索 */}
            <div className="mb-6">
              <label className="block text-sm text-muted mb-2">職業検索</label>
              <input
                type="text"
                placeholder="職業名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-none text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* カテゴリフィルター */}
            <div className="mb-6">
              <label className="block text-sm text-muted mb-2">カテゴリ</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-none text-white focus:outline-none focus:border-primary transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-background">
                    {cat === 'all' ? 'すべて' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 凡例 */}
            <div>
              <label className="block text-sm text-muted mb-3">市場価値</label>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-high-demand rounded"></div>
                  <span>高需要 (85+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-mid-demand rounded"></div>
                  <span>中需要 (60-84)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-low-demand rounded"></div>
                  <span>低需要 (~59)</span>
                </div>
              </div>
            </div>
          </aside>

          {/* メインビュー（系統樹） */}
          <section className="lg:col-span-6">
            <div className="bg-white/5 rounded-none border border-white/10 p-4 mb-4">
              <h2 className="text-lg font-bold uppercase tracking-wide">
                職業系統樹
              </h2>
              <p className="text-sm text-muted mt-1">
                {filteredOccupations.length} 件の職業を表示中
              </p>
            </div>
            <div className="h-[600px]">
              <OccupationNetworkTree
                occupations={filteredOccupations}
                onSelectOccupation={setSelectedOccupation}
                selectedOccupation={selectedOccupation}
              />
            </div>
          </section>

          {/* 詳細パネル */}
          <aside className="lg:col-span-3 bg-white/5 rounded-none border border-white/10 h-[700px]">
            <OccupationDetailPanel
              occupation={selectedOccupation}
              onClose={() => setSelectedOccupation(null)}
            />
          </aside>
        </div>
      </div>
    </main>
  )
}
