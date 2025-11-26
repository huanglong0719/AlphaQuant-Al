import React from 'react';
import { LayoutDashboard, BrainCircuit, LineChart, BarChart3, ShieldAlert, Activity } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: View.DASHBOARD, label: '仪表盘', icon: LayoutDashboard },
    { id: View.MARKET_DATA, label: '市场数据', icon: BarChart3 },
    { id: View.STRATEGY_LAB, label: 'AI 策略实验室', icon: BrainCircuit },
    { id: View.BACKTEST, label: '回测引擎', icon: LineChart },
    { id: View.RISK_MATRIX, label: '风险矩阵', icon: ShieldAlert },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Activity className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-slate-100 text-lg tracking-tight">AlphaQuant</h1>
          <p className="text-xs text-slate-400">AI 驱动 A 股策略</p>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded p-3">
          <p className="text-xs text-slate-500 font-mono mb-1">系统状态</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-emerald-400">Tushare 接口在线</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-xs text-blue-400">AI 引擎就绪</span>
          </div>
        </div>
      </div>
    </div>
  );
};