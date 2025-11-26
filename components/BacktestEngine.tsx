import React, { useState } from 'react';
import { Play, Calendar, DollarSign, BarChart2, Activity, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BacktestResult, ChartDataPoint } from '../types';
import { analyzeBacktestResult } from '../services/geminiService';

export const BacktestEngine: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<BacktestResult | null>(null);

  // Mock initial equity curve generation
  const runSimulation = async () => {
    setIsRunning(true);
    setResult(null);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock data
    const days = 100;
    const data: ChartDataPoint[] = [];
    let value = 100000;
    const now = new Date();
    
    for (let i = days; i > 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const change = (Math.random() - 0.48) * 2000; // Slight upward bias
      value += change;
      data.push({
        date: date.toISOString().split('T')[0],
        value: value
      });
    }

    const totalReturn = (value - 100000) / 100000;
    
    // Get AI Analysis
    const metrics = {
      totalReturn: (totalReturn * 100).toFixed(2) + "%",
      annualizedReturn: (totalReturn * 3.65 * 100).toFixed(2) + "%",
      maxDrawdown: "8.5%",
      sharpeRatio: 1.92,
      volatility: "14.2%",
      winRate: "58%",
      trades: 142
    };

    const analysis = await analyzeBacktestResult(metrics);

    setResult({
      metrics: {
        totalReturn: totalReturn,
        annualizedReturn: totalReturn * 3.65,
        maxDrawdown: 0.085,
        sharpeRatio: 1.92,
        volatility: 0.142,
        winRate: 0.58,
        trades: 142
      },
      equityCurve: data,
      aiAnalysis: analysis
    });

    setIsRunning(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
      {/* Configuration Panel */}
      <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-full">
        <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
          <BarChart2 className="text-blue-500" />
          回测配置
        </h2>
        
        <div className="space-y-6 flex-1">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">策略选择</label>
            <select className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option>均线交叉策略 (活跃)</option>
              <option>RSI 均值回归</option>
              <option>多因子 Alpha</option>
              <option>DeepSeek 生成策略 #001</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">初始资金</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 text-slate-500" size={16} />
              <input 
                type="number" 
                defaultValue={100000}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">日期范围</label>
            <div className="space-y-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 text-slate-500" size={16} />
                <input 
                  type="date" 
                  defaultValue="2023-01-01"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-200 text-sm"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 text-slate-500" size={16} />
                <input 
                  type="date" 
                  defaultValue="2023-12-31"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-200 text-sm"
                />
              </div>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-400 mb-2">佣金与滑点</label>
             <div className="grid grid-cols-2 gap-2">
               <input type="text" value="0.03%" disabled className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-xs text-slate-400" />
               <input type="text" value="0.1%" disabled className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-xs text-slate-400" />
             </div>
          </div>
        </div>

        <button 
          onClick={runSimulation}
          disabled={isRunning}
          className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
            isRunning 
              ? 'bg-blue-600/50 cursor-wait text-blue-200'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isRunning ? (
            <>
              <RefreshCw className="animate-spin" size={18} />
              处理中...
            </>
          ) : (
            <>
              <Play size={18} />
              运行回测
            </>
          )}
        </button>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-9 flex flex-col gap-6 h-full overflow-hidden">
        {/* Chart Area */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex-1 min-h-[400px] flex flex-col">
           <h3 className="text-slate-200 font-semibold mb-4 shrink-0">资金曲线</h3>
           <div className="w-full flex-1 min-h-0">
             {result ? (
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={result.equityCurve}>
                   <defs>
                     <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
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
                     formatter={(value: number) => [`¥ ${value.toFixed(2)}`, '净值']}
                   />
                   <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#equityGradient)" />
                 </AreaChart>
               </ResponsiveContainer>
             ) : (
               <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-slate-800 rounded-lg">
                 <p className="text-slate-500 flex items-center gap-2">
                   <Activity size={20} />
                   准备开始策略模拟
                 </p>
               </div>
             )}
           </div>
        </div>

        {/* Metrics Area */}
        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto">
             <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-slate-200 font-semibold mb-4">关键绩效指标</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <MetricItem label="总收益率" value={`${(result.metrics.totalReturn * 100).toFixed(2)}%`} isPositive={result.metrics.totalReturn > 0} />
                  <MetricItem label="年化收益率" value={`${(result.metrics.annualizedReturn * 100).toFixed(2)}%`} isPositive={result.metrics.annualizedReturn > 0} />
                  <MetricItem label="夏普比率" value={result.metrics.sharpeRatio.toFixed(2)} />
                  <MetricItem label="最大回撤" value={`-${(result.metrics.maxDrawdown * 100).toFixed(2)}%`} isPositive={false} />
                  <MetricItem label="胜率" value={`${(result.metrics.winRate * 100).toFixed(0)}%`} />
                  <MetricItem label="交易次数" value={result.metrics.trades.toString()} />
                </div>
             </div>
             
             <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-emerald-400" />
                  AI 策略分析
                </h3>
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 h-[calc(100%-2.5rem)] overflow-y-auto">
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {result.aiAnalysis}
                  </p>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MetricItem = ({ label, value, isPositive }: { label: string, value: string, isPositive?: boolean }) => {
  let color = 'text-slate-100';
  if (isPositive === true) color = 'text-emerald-400';
  if (isPositive === false) color = 'text-rose-400';

  return (
    <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className={`font-mono font-bold ${color}`}>{value}</span>
    </div>
  );
};