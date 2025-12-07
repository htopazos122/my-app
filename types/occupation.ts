export interface Skill {
  name: string
  level: number // 1-5
  importance: number // 1-5
  category: 'technical' | 'business' | 'soft' | 'domain'
}

export interface MarketValue {
  score: number // 0-100
  salaryRange: string
  growthRate: number // percentage
  aiRisk: number // percentage (0-100)
}

export interface CareerPath {
  prerequisites: string[] // occupation IDs
  nextSteps: string[] // occupation IDs
}

export interface Occupation {
  id: string
  name: string
  nameEn: string
  category: string
  description: string
  marketValue2040: MarketValue
  skills: Skill[]
  careerPath: CareerPath
  tags: string[]
}

export type OccupationCategory =
  | 'IT'
  | 'Healthcare'
  | 'Education'
  | 'Manufacturing'
  | 'Creative'
  | 'Business'
  | 'Service'
  | 'Research'
