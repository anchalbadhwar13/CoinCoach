'use client'

import Link from 'next/link'
import { TrendingUp, TrendingDown, BookOpen, AlertTriangle, Gamepad2, Award, ArrowRight } from 'lucide-react'
import GlassCard from '@/components/GlassCard'
import { useCryptoMarketData } from '@/lib/hooks/useCryptoData'

export default function DashboardPage() {
  const { data: marketData, isLoading } = useCryptoMarketData()

  // Get top 4 coins for quick view
  const topCoins = marketData?.slice(0, 4) || []

  const quickActions = [
    { name: 'Continue Learning', href: '/learn', icon: BookOpen, color: 'from-blue-500 to-cyan-500', desc: '3 lessons in progress' },
    { name: 'Check Risk Lab', href: '/risk-lab', icon: AlertTriangle, color: 'from-orange-500 to-yellow-500', desc: 'Analyze coin risks' },
    { name: 'Practice Trading', href: '/game', icon: Gamepad2, color: 'from-purple-500 to-pink-500', desc: 'Risk-free simulator' },
  ]

  const stats = {
    safetyScore: 72,
    lessonsCompleted: 3,
    tradesExecuted: 45,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here&apos;s your crypto learning overview</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <GlassCard className="p-4 text-center">
          <div className="text-3xl font-bold text-cyber-neon-green">{stats.safetyScore}</div>
          <div className="text-sm text-gray-400">Safety Score</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-3xl font-bold text-cyber-cyan">{stats.lessonsCompleted}</div>
          <div className="text-sm text-gray-400">Lessons Done</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">{stats.tradesExecuted}</div>
          <div className="text-sm text-gray-400">Sim Trades</div>
        </GlassCard>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.name} href={action.href}>
                <GlassCard className="p-5 glass-card-hover cursor-pointer group">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-1 flex items-center gap-2">
                    {action.name}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-400">{action.desc}</p>
                </GlassCard>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Market Overview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Market Overview</h2>
          <Link href="/market" className="text-cyber-cyan text-sm hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <GlassCard key={i} className="p-4 animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-24 mb-2" />
                <div className="h-8 bg-gray-700 rounded w-32 mb-2" />
                <div className="h-4 bg-gray-700 rounded w-16" />
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topCoins.map((coin: any) => {
              const isPositive = coin.price_change_percentage_24h >= 0
              return (
                <GlassCard key={coin.id} className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="font-bold">{coin.symbol.toUpperCase()}</div>
                      <div className="text-xs text-gray-400">{coin.name}</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold mb-1">
                    ${coin.current_price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
                  </div>
                </GlassCard>
              )
            })}
          </div>
        )}
      </div>

      {/* Recent Achievement */}
      <GlassCard className="p-6 bg-gradient-to-r from-cyber-cyan/10 to-cyber-neon-green/10 border-cyber-cyan/30">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Latest Achievement</h3>
            <p className="text-gray-400">Completed &quot;Candlestick Charts&quot; lesson</p>
            <p className="text-xs text-cyber-neon-green mt-1">+10 Safety Score points earned!</p>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
