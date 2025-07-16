export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  category: 'web' | 'mobile' | 'desktop' | 'other'
  createdAt: Date
}

export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'mobile' | 'tools' | 'other'
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  icon: string
  color: string
}

export interface Experience {
  id: string
  company: string
  position: string
  description: string
  startDate: Date
  endDate?: Date
  current: boolean
  technologies: string[]
}

export interface ContactForm {
  name: string
  email: string
  message: string
}
