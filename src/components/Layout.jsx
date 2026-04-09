import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Upload, FileText, BarChart3,
  Users, LogOut, Menu, X, Bot, Bell, ChevronRight
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import clsx from 'clsx'

const NAV = [
  { to: '/',           label: 'Dashboard',   icon: LayoutDashboard },
  { to: '/upload',     label: 'Upload Resume', icon: Upload },
  { to: '/job',        label: 'Job Description', icon: FileText },
  { to: '/results',    label: 'AI Results',  icon: BarChart3 },
  { to: '/candidates', label: 'Candidates',  icon: Users },
]

export default function Layout() {
  const { user, logout, stats } = useApp()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={clsx(
        'flex flex-col bg-dark-900/95 border-r border-white/8 transition-all duration-300 z-20',
        sidebarOpen ? 'w-64' : 'w-[72px]'
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-glow-sm">
            <Bot size={20} className="text-white" />
          </div>
          {sidebarOpen && (
            <div className="animate-fade-in">
              <p className="font-bold text-sm text-white leading-tight">AI Resume</p>
              <p className="text-[10px] text-brand-400 font-semibold tracking-widest uppercase">Screener</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(p => !p)}
            className="ml-auto text-white/40 hover:text-white/80 transition-colors p-1 rounded-lg hover:bg-white/5"
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) => clsx('sidebar-link', isActive && 'active', !sidebarOpen && 'justify-center px-0')}
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span className="animate-fade-in">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Stats pill */}
        {sidebarOpen && (
          <div className="mx-3 mb-3 p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 animate-fade-in">
            <p className="text-[10px] text-brand-400 font-semibold uppercase tracking-widest mb-2">Quick Stats</p>
            <div className="grid grid-cols-2 gap-2">
              {[['Total', stats.total], ['Screened', stats.screened], ['Pending', stats.pending], ['Avg Score', `${stats.avgScore}%`]].map(([k, v]) => (
                <div key={k}>
                  <p className="text-white text-sm font-bold">{v}</p>
                  <p className="text-white/40 text-[10px]">{k}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User */}
        <div className={clsx('p-3 border-t border-white/8 flex items-center gap-3', !sidebarOpen && 'justify-center')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-blue-500 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
            {user?.avatar}
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-white/40">{user?.role}</p>
            </div>
          )}
          {sidebarOpen && (
            <button onClick={handleLogout} className="text-white/30 hover:text-red-400 transition-colors p-1">
              <LogOut size={15} />
            </button>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-white/8 bg-dark-950/80 backdrop-blur-xl flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>AI Resume Screener</span>
            <ChevronRight size={14} />
            <span className="text-white/70">Overview</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/80 transition-colors">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-500 rounded-full" />
            </button>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                {user?.avatar}
              </div>
              <span className="text-sm text-white/70 font-medium">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
