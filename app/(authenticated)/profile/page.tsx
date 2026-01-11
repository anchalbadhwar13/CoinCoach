'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Shield, Award, TrendingUp, Clock, Edit2, Save, X } from 'lucide-react'
import GlassCard from '@/components/GlassCard'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Crypto Learner',
    email: 'learner@example.com',
    joinDate: 'January 2026',
  })
  const [editForm, setEditForm] = useState(profile)

  // Mock stats - in a real app, these would come from a database
  const stats = {
    safetyScore: 72,
    lessonsCompleted: 8,
    simulatorSessions: 12,
    totalTrades: 45,
    bestROI: 15.3,
    learningStreak: 5,
  }

  const achievements = [
    { name: 'First Trade', description: 'Made your first simulated trade', earned: true, icon: '🎯' },
    { name: 'Risk Aware', description: 'Checked risk scores for 5 coins', earned: true, icon: '🛡️' },
    { name: 'Market Watcher', description: 'Viewed market data 10 times', earned: true, icon: '📊' },
    { name: 'Profitable Trader', description: 'Achieved 10% ROI in simulator', earned: true, icon: '💰' },
    { name: 'Safety First', description: 'Reach 80 Safety Score', earned: false, icon: '🏆' },
    { name: 'Trading Pro', description: 'Complete 100 trades', earned: false, icon: '⭐' },
  ]

  const handleSave = () => {
    setProfile(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(profile)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-gray-400">Manage your account and track your learning progress</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <GlassCard className="p-6 lg:col-span-1">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-cyber-cyan to-cyber-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-cyber-dark" />
            </div>
            
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-cyber-navy/60 border border-white/10 rounded-lg px-4 py-2 text-center focus:outline-none focus:border-cyber-cyan"
                  placeholder="Your name"
                />
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-cyber-navy/60 border border-white/10 rounded-lg px-4 py-2 text-center focus:outline-none focus:border-cyber-cyan"
                  placeholder="Your email"
                />
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-cyber-neon-green/20 border border-cyber-neon-green/50 rounded-lg hover:bg-cyber-neon-green/30 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                <p className="text-gray-400 mb-2">{profile.email}</p>
                <p className="text-sm text-gray-500 mb-4">Member since {profile.joinDate}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 mx-auto bg-cyber-cyan/20 border border-cyber-cyan/50 rounded-lg hover:bg-cyber-cyan/30 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              </>
            )}
          </div>

          {/* Safety Score */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Safety Score</span>
              <span className="text-2xl font-bold text-cyber-neon-green">{stats.safetyScore}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-cyber-cyan to-cyber-neon-green h-3 rounded-full transition-all duration-500"
                style={{ width: `${stats.safetyScore}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">Keep learning to improve your score!</p>
          </div>
        </GlassCard>

        {/* Stats Grid */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Lessons Completed', value: stats.lessonsCompleted, icon: Award, color: 'text-cyber-cyan' },
            { label: 'Simulator Sessions', value: stats.simulatorSessions, icon: TrendingUp, color: 'text-cyber-neon-green' },
            { label: 'Total Trades', value: stats.totalTrades, icon: Shield, color: 'text-cyber-orange' },
            { label: 'Best ROI', value: `${stats.bestROI}%`, icon: TrendingUp, color: 'text-green-400' },
            { label: 'Learning Streak', value: `${stats.learningStreak} days`, icon: Clock, color: 'text-purple-400' },
            { label: 'Safety Score', value: stats.safetyScore, icon: Shield, color: 'text-cyber-neon-green' },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassCard className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-cyber-cyan" />
          Achievements
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-lg border ${
                achievement.earned
                  ? 'bg-cyber-cyan/10 border-cyber-cyan/30'
                  : 'bg-gray-800/50 border-white/10 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{achievement.icon}</span>
                <div>
                  <p className="font-bold">{achievement.name}</p>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              </div>
              {achievement.earned && (
                <span className="text-xs text-cyber-neon-green mt-2 block">✓ Earned</span>
              )}
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Learning Progress */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold mb-6">Learning Progress</h2>
        <div className="space-y-4">
          {[
            { name: 'Crypto Basics', progress: 100, color: 'from-cyber-cyan to-cyber-cyan' },
            { name: 'Understanding Risk', progress: 75, color: 'from-cyber-neon-green to-cyber-neon-green' },
            { name: 'Market Analysis', progress: 50, color: 'from-cyber-orange to-cyber-orange' },
            { name: 'Trading Strategies', progress: 25, color: 'from-purple-500 to-purple-500' },
            { name: 'Advanced Topics', progress: 0, color: 'from-gray-500 to-gray-500' },
          ].map((course, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{course.name}</span>
                <span className="text-gray-400">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${course.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
