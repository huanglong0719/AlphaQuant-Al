import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { StrategyLab } from './components/StrategyLab';
import { MarketData } from './components/MarketData';
import { BacktestEngine } from './components/BacktestEngine';
import { RiskMatrix } from './components/RiskMatrix';
import { View } from './types';

// Mock Data for Dashboard Equity Curve
const mockEquityData = [
  { date: '2023-01', value: 1000000 },
  { date: '2023-02', value: 1025000 },
  { date: '2023-03', value: 1018000 },
  { date: '2023-04', value: 1065000 },
  { date: '2023-05', value: 1042000 },
  { date: '2023-06', value: 1089000 },
  { date: '2023-07', value: 1120000 },
  { date: '2023-08', value: 1150000 },
  { date: '2023-09', value: 1115000 },
  { date: '2023-10', value: 1180000 },
  { date: '2023-11', value: 1215000 },
  { date: '2023-12', value: 1245890 },
];

const App = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard equityData={mockEquityData} />;
      case View.STRATEGY_LAB:
        return <StrategyLab />;
      case View.MARKET_DATA:
        return <MarketData />;
      case View.BACKTEST:
        return <BacktestEngine />;
      case View.RISK_MATRIX:
        return <RiskMatrix />;
      default:
        return <Dashboard equityData={mockEquityData} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="ml-64 p-8 min-h-screen">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">
              {currentView === View.DASHBOARD && "资产组合总览"}
              {currentView === View.STRATEGY_LAB && "Alpha 策略挖掘"}
              {currentView === View.MARKET_DATA && "市场情报"}
              {currentView === View.BACKTEST && "回测引擎"}
              {currentView === View.RISK_MATRIX && "风险与合规"}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              AI 驱动量化交易系统 v2.0
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
               <p className="text-xs text-slate-500">市场状态</p>
               <p className="text-emerald-400 text-sm font-bold flex items-center gap-1">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 交易中
               </p>
             </div>
             <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border-2 border-slate-800 shadow-lg">
               AQ
             </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);