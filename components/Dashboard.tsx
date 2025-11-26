import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, Wallet } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface DashboardProps {
  equityData: ChartDataPoint[];
}

export const Dashboard: React.FC<DashboardProps> = ({ equityData }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="总资产" 
          value="¥ 1,245,890" 
          change="+12.5%" 
          isPositive={true} 
          icon={Wallet} 
        />
        <StatCard 
          label="当日盈亏" 
          value="¥ 8,340" 
          change="+0.68%" 
          isPositive={true} 
          icon={DollarSign} 
        />
        <StatCard 
          label="最大回撤" 
          value="-4.2%" 
          change="-0.5%" 
          isPositive={false} 
          inverse={true}
          icon={TrendingDown} 
        />
        <StatCard 
          label="运行策略" 
          value="3" 
          change="运行中" 
          isPositive={true} 
          icon={Activity} 
          neutral={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-100">投资组合表现</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-800 text-xs rounded-full text-slate-400">1月</span>
              <span className="px-3 py-1 bg-blue-600 text-xs rounded-full text-white">3月</span>
              <span className="px-3 py-1 bg-slate-800 text-xs rounded-full text-slate-400">1年</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equityData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">市场情绪 (AI)</h2>
          <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">贪婪恐慌指数</span>
                <span className="text-sm font-bold text-emerald-400">贪婪 (68)</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">市场趋势</span>
                <span className="text-sm font-bold text-blue-400">看涨</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                DeepSeek 分析表明，相对于沪深300指数，科技和新能源板块存在强劲的买盘压力。
              </p>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <h3 className="text-sm text-slate-400 mb-2">机会前瞻</h3>
              <ul className="space-y-2">
                <li className="flex justify-between text-xs">
                  <span className="text-slate-300">600519.SH (贵州茅台)</span>
                  <span className="text-emerald-400">+2.4%</span>
                </li>
                <li className="flex justify-between text-xs">
                  <span className="text-slate-300">000858.SZ (五粮液)</span>
                  <span className="text-emerald-400">+1.8%</span>
                </li>
                <li className="flex justify-between text-xs">
                  <span className="text-slate-300">300750.SZ (宁德时代)</span>
                  <span className="text-emerald-400">+5.1%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  inverse?: boolean;
  neutral?: boolean;
  icon: any;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, isPositive, inverse, neutral, icon: Icon }) => {
  const isGood = inverse ? !isPositive : isPositive;
  const colorClass = neutral 
    ? 'text-blue-400' 
    : isGood 
      ? 'text-emerald-400' 
      : 'text-rose-400';
  
  const bgClass = neutral
    ? 'bg-blue-500/10'
    : isGood
      ? 'bg-emerald-500/10'
      : 'bg-rose-500/10';

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-400 font-medium">{label}</p>
          <h3 className="text-2xl font-bold text-slate-100 mt-2">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${bgClass}`}>
          <Icon className={`w-5 h-5 ${colorClass}`} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className={`text-sm font-medium ${colorClass}`}>
          {change}
        </span>
        {!neutral && <span className="text-xs text-slate-500">较昨日</span>}
      </div>
    </div>
  );
};