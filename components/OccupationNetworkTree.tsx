'use client'

import { useEffect, useMemo } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Position,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { Occupation } from '@/types/occupation'

interface OccupationNetworkTreeProps {
  occupations: Occupation[]
  onSelectOccupation: (occupation: Occupation) => void
  selectedOccupation: Occupation | null
}

// カスタムノードコンポーネント
function NetworkNode({ data }: any) {
  const { occupation, onSelect, isSelected, index } = data
  const { marketValue2040 } = occupation

  // 市場価値に基づいて色を決定
  const getNodeColor = (score: number) => {
    if (score >= 85) return '#00d4aa' // ターコイズ（高需要）
    if (score >= 60) return '#64748b' // グレー（中需要）
    return '#94a3b8' // ライトグレー（低需要）
  }

  const nodeColor = getNodeColor(marketValue2040.score)
  const isHighlighted = isSelected

  return (
    <div
      className="relative cursor-pointer transition-all"
      onClick={(e) => {
        e.stopPropagation()
        console.log('Node clicked:', occupation.name, occupation.id)
        onSelect(occupation)
      }}
      style={{
        width: isHighlighted ? '140px' : '100px',
        height: isHighlighted ? '140px' : '100px',
      }}
    >
      {/* 外側の円 */}
      <div
        className="absolute inset-0 rounded-full border-4 flex items-center justify-center transition-all"
        style={{
          borderColor: nodeColor,
          backgroundColor: isHighlighted ? nodeColor : 'transparent',
        }}
      >
        {/* 番号 */}
        <div className="text-center w-full px-2">
          <div
            className={`font-bold font-mono ${
              isHighlighted ? 'text-white text-2xl' : 'text-white text-xl'
            }`}
          >
            {index}
          </div>
          {!isHighlighted && (
            <div className="text-[9px] text-white mt-1 leading-tight break-words">
              {occupation.name}
            </div>
          )}
        </div>
      </div>

      {/* ハイライト時の職業名 */}
      {isHighlighted && (
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-white text-base font-bold whitespace-nowrap bg-black/50 px-3 py-1 rounded">
          {occupation.name}
        </div>
      )}
    </div>
  )
}

const nodeTypes = {
  network: NetworkNode,
}

export default function OccupationNetworkTree({
  occupations,
  onSelectOccupation,
  selectedOccupation,
}: OccupationNetworkTreeProps) {
  // ネットワーク図風のノードとエッジを生成
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = []
    const edges: Edge[] = []

    const centerX = 400
    const centerY = 300
    const radius = 250

    occupations.forEach((occ, index) => {
      // 円状に配置
      const angle = (index / occupations.length) * 2 * Math.PI
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      nodes.push({
        id: occ.id,
        type: 'network',
        position: { x, y },
        data: {
          occupation: occ,
          onSelect: onSelectOccupation,
          isSelected: selectedOccupation?.id === occ.id,
          index: index + 1,
        },
      })

      // キャリアパスのエッジを作成
      occ.careerPath.nextSteps.forEach((nextId) => {
        if (occupations.find((o) => o.id === nextId)) {
          edges.push({
            id: `${occ.id}-${nextId}`,
            source: occ.id,
            target: nextId,
            type: 'default',
            style: {
              stroke: selectedOccupation?.id === occ.id || selectedOccupation?.id === nextId
                ? '#00d4aa'
                : '#64748b',
              strokeWidth: selectedOccupation?.id === occ.id || selectedOccupation?.id === nextId
                ? 3
                : 2,
            },
            animated: selectedOccupation?.id === occ.id || selectedOccupation?.id === nextId,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: selectedOccupation?.id === occ.id || selectedOccupation?.id === nextId
                ? '#00d4aa'
                : '#64748b',
            },
          })
        }
      })
    })

    console.log('Generated nodes:', nodes.length)
    console.log('Generated edges:', edges.length, edges)

    return { initialNodes: nodes, initialEdges: edges }
  }, [occupations])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // occupationsが変更されたらノードとエッジを再生成
  useEffect(() => {
    const newNodes: Node[] = []
    const newEdges: Edge[] = []

    const centerX = 400
    const centerY = 300
    const radius = 250

    occupations.forEach((occ, index) => {
      const angle = (index / occupations.length) * 2 * Math.PI
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      newNodes.push({
        id: occ.id,
        type: 'network',
        position: { x, y },
        data: {
          occupation: occ,
          onSelect: onSelectOccupation,
          isSelected: selectedOccupation?.id === occ.id,
          index: index + 1,
        },
      })

      occ.careerPath.nextSteps.forEach((nextId) => {
        if (occupations.find((o) => o.id === nextId)) {
          newEdges.push({
            id: `${occ.id}-${nextId}`,
            source: occ.id,
            target: nextId,
            type: 'default',
            style: {
              stroke: selectedOccupation?.id === occ.id || selectedOccupation?.id === nextId
                ? '#00d4aa'
                : '#64748b',
              strokeWidth: selectedOccupation?.id === occ.id || selectedOccupation?.id === nextId
                ? 3
                : 2,
            },
            animated: selectedOccupation?.id === occ.id || selectedOccupation?.id === nextId,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: selectedOccupation?.id === occ.id || selectedOccupation?.id === nextId
                ? '#00d4aa'
                : '#64748b',
            },
          })
        }
      })
    })

    setNodes(newNodes)
    setEdges(newEdges)
  }, [occupations, onSelectOccupation, selectedOccupation, setNodes, setEdges])

  return (
    <div className="w-full h-full bg-black/20 rounded-none border border-white/10">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.3}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
        nodesFocusable={true}
        edgesFocusable={false}
        panOnDrag={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#ffffff05" />
        <Controls className="bg-white/10 border border-white/20" />
      </ReactFlow>
    </div>
  )
}
