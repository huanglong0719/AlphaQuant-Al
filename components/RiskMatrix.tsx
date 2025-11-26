import React, { useEffect, useState } from 'react';
import { ShieldCheck, AlertTriangle, Activity, TrendingDown, RefreshCcw } from 'lucide-react';
import { analyzeRiskReport } from '../services/geminiService';

export const RiskMatrix: React.FC = () => {
  const [report, setReport] = useState<string>("正在加载 AI 风险分析...");
  const [loading, setLoading] = useState(true);
  
  // Mock Risk Metrics
  const riskMetrics = {
    var95: 2.1, // Value at Risk 95%
    cvar95: 3.5, // Conditional VaR
    beta: 0.85, 
    sharpe: 1.8,
    volatility: 18.5,
    maxDrawdown: 12.4
  };

  const handleRefreshAnalysis = async () => {
    setLoading(true);
    setReport("正在分析投资组合结构与市场相关性...");
    const text = await analyzeRiskReport(riskMetrics);
    setReport(text);
    setLoading(false);
  };

  useEffect(() => {
    handleRefreshAnalysis();
  }, []);

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2">
      <div className="flex justify-between items-center mb-2">
         <h2 className="text-2xl font-bold text-slate-100">风险管理中心</h2>
         <button 
           onClick={handleRefreshAnalysis}
           className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm flex items-center gap-2"
         >
           <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
           更新评估
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RiskCard title="VaR (95%)" value={`${riskMetrics.var95}%`} desc="日风险价值" level="low" icon={ShieldCheck} />
        <RiskCard title="CVaR (95%)" value={`${riskMetrics.cvar95}%`} desc="预期亏损" level="medium" icon={AlertTriangle} />
        <RiskCard title="Beta系数" value={`${riskMetrics.beta}`} desc="市场敏感度" level="low" icon={Activity} />
        <RiskCard title="年化波动率" value={`${riskMetrics.volatility}%`} desc="标准差" level="medium" icon={TrendingDown} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" />
              AI 风险评估
            </h2>
            <div className="prose prose-invert max-w-none">
              <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-wrap font-sans text-sm">
                {report}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-4">压力测试 (蒙特卡洛模拟)</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div>
                  <h4 className="font-medium text-slate-200">2015年 股灾情景模拟</h4>
                  <p className="text-xs text-slate-500">模拟3个月内市场下跌45%</p>
                </div>
                <div className="text-right">
                  <p className="text-rose-400 font-bold">-22.4%</p>
                  <p className="text-xs text-slate-500">预计组合影响</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div>
                  <h4 className="font-medium text-slate-200">科技板块回调</h4>
                  <p className="text-xs text-slate-500">模拟TMT板块下跌20%</p>
                </div>
                <div className="text-right">
                  <p className="text-rose-400 font-bold">-8.1%</p>
                  <p className="text-xs text-slate-500">预计组合影响</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div>
                  <h4 className="font-medium text-slate-200">加息测试 (+50bps)</h4>
                  <p className="text-xs text-slate-500">债券收益率敏感度测试</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold">+1.2%</p>
                  <p className="text-xs text-slate-500">预计组合影响</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-100 mb-4">风险贡献</h3>
            <div className="space-y-3">
              <RiskBar label="信息技术" pct={45} color="bg-blue-500" />
              <RiskBar label="日常消费" pct={25} color="bg-emerald-500" />
              <RiskBar label="金融" pct={15} color="bg-indigo-500" />
              <RiskBar label="医疗保健" pct={10} color="bg-purple-500" />
              <RiskBar label="其他" pct={5} color="bg-slate-600" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-100 mb-2">动态仓位管理</h3>
            <p className="text-xs text-slate-400 mb-4">
              基于当前波动率机制 (High) 的建议调整。
            </p>
            <div className="space-y-3">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-300">目标现金</span>
                 <span className="text-emerald-400 font-mono">15% -> 25%</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-300">最大持仓比例</span>
                 <span className="text-rose-400 font-mono">10% -> 8%</span>
               </div>
               <button className="w-full mt-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg text-sm hover:bg-blue-600/30 transition-colors">
                 应用调整
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RiskCardProps {
  title: string;
  value: string;
  desc: string;
  level: 'low' | 'medium' | 'high';
  icon: any;
}

const RiskCard: React.FC<RiskCardProps> = ({ title, value, desc, level, icon: Icon }) => {
  const colors = {
    low: 'text-emerald-400',
    medium: 'text-yellow-400',
    high: 'text-rose-400'
  };
  const bgs = {
    low: 'bg-emerald-500/10',
    medium: 'bg-yellow-500/10',
    high: 'bg-rose-500/10'
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
      <div className="flex justify-between items-start z-10 relative">
        <div>
          <p className="text-sm text-slate-400 font-medium">{title}</p>
          <h3 className={`text-2xl font-bold mt-2 ${colors[level]}`}>{value}</h3>
          <p className="text-xs text-slate-500 mt-1">{desc}</p>
        </div>
        <div className={`p-2 rounded-lg ${bgs[level]}`}>
          <Icon className={`w-5 h-5 ${colors[level]}`} />
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 w-full h-1 ${level === 'low' ? 'bg-emerald-500' : level === 'medium' ? 'bg-yellow-500' : 'bg-rose-500'}`} />
    </div>
  );
};

const RiskBar = ({ label, pct, color }: { label: string, pct: number, color: string }) => (
  <div>
    <div className="flex justify-between text-xs mb-1">
      <span className="text-slate-300">{label}</span>
      <span className="text-slate-400">{pct}%</span>
    </div>
    <div className="w-full bg-slate-800 rounded-full h-1.5">
      <div className={`${color} h-1.5 rounded-full`} style={{ width: `${pct}%` }}></div>
    </div>
  </div>
);