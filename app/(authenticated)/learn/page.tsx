'use client'

import { Eye, Shield, Award, Target, TrendingUp } from 'lucide-react'
import GlassCard from '@/components/GlassCard'

interface Lesson {
  id: number
  title: string
  description: string
  progress: number
  icon: any
  views: number
  completed: boolean
}

export default function LearningHubPage() {
  const lessons: Lesson[] = [
    {
      id: 1,
      title: 'What is a Wallet?',
      description: 'Learn the fundamentals of cryptocurrency wallets',
      progress: 75,
      icon: Shield,
      views: 1234,
      completed: false,
    },
    {
      id: 2,
      title: 'Market Cap vs. Price',
      description: 'Understand the difference between market capitalization and token price',
      progress: 50,
      icon: TrendingUp,
      views: 987,
      completed: false,
    },
    {
      id: 3,
      title: 'Candlestick Charts',
      description: 'Master reading candlestick patterns for trading',
      progress: 100,
      icon: Target,
      views: 654,
      completed: true,
    },
    {
      id: 4,
      title: 'Understanding Risk',
      description: 'Learn how to assess and manage risk in crypto trading',
      progress: 25,
      icon: Shield,
      views: 432,
      completed: false,
    },
    {
      id: 5,
      title: 'Scam Prevention',
      description: 'Identify and avoid common cryptocurrency scams',
      progress: 0,
      icon: Shield,
      views: 876,
      completed: false,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold">Learning Hub</h1>
        <p className="text-gray-400 mt-1">Master cryptocurrency fundamentals through interactive lessons</p>
      </div>

      {/* Learning Hub Content */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => {
          const Icon = lesson.icon
          return (
            <GlassCard key={lesson.id} className="p-6 glass-card-hover cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  lesson.completed
                    ? 'bg-gradient-to-br from-cyber-neon-green to-cyber-cyan'
                    : 'bg-cyber-navy/60'
                }`}>
                  <Icon className={`w-6 h-6 ${lesson.completed ? 'text-cyber-dark' : 'text-cyber-cyan'}`} />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Eye className="w-4 h-4" />
                  <span>{lesson.views}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">{lesson.id}. {lesson.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{lesson.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="font-medium">{lesson.progress}%</span>
                </div>
                <div className="h-2 bg-cyber-navy/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-neon-green transition-all duration-300"
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
              </div>
              {lesson.completed && (
                <div className="mt-4 flex items-center gap-2 text-cyber-neon-green text-sm font-medium">
                  <Award className="w-4 h-4" />
                  Completed
                </div>
              )}
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}
