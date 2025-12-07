'use client'

import { useCallback, useMemo } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { Occupation } from '@/types/occupation'
import OccupationNode from './OccupationNode'

interface OccupationTreeProps {
  occupations: Occupation[]
  onSelectOccupation: (occupation: Occupation) => void
}

const nodeTypes = {
  occupation: OccupationNode,
}

export default function OccupationTree({
  occupations,
  onSelectOccupation,
}: OccupationTreeProps) {
  // ノードとエッジを生成
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = []
    const edges: Edge[] = []
    const nodeSpacing = 300
    const levelHeight = 200

    // カテゴリーごとにグループ化
    const categories: { [key: string]: Occupation[] } = {}
    occupations.forEach((occ) => {
      if (!categories[occ.category]) {
        categories[occ.category] = []
      }
      categories[occ.category].push(occ)
    })

    let yPosition = 0
    Object.entries(categories).forEach(([category, occs]) => {
      occs.forEach((occ, index) => {
        const xPosition = index * nodeSpacing

        nodes.push({
          id: occ.id,
          type: 'occupation',
          position: { x: xPosition, y: yPosition },
          data: { occupation: occ, onSelect: onSelectOccupation },
        })

        // キャリアパスのエッジを作成
        occ.careerPath.prerequisites.forEach((preId) => {
          if (occupations.find((o) => o.id === preId)) {
            edges.push({
              id: `${preId}-${occ.id}`,
              source: preId,
              target: occ.id,
              animated: true,
              style: { stroke: '#3b82f6', strokeWidth: 2 },
            })
          }
        })
      })
      yPosition += levelHeight
    })

    return { initialNodes: nodes, initialEdges: edges }
  }, [occupations, onSelectOccupation])

  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="w-full h-full bg-black/20 rounded-none border border-white/10">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#ffffff10" />
        <Controls className="bg-white/10 border border-white/20" />
      </ReactFlow>
    </div>
  )
}
