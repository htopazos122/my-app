import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '職業年表事典 - 2040年のキャリアを見据える',
  description: '2040年の職業市場価値を可視化し、キャリアパス設計を支援するインタラクティブな系統樹アプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
