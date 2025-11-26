import React from 'react';
import { ArrowUp, ArrowDown, Search } from 'lucide-react';
import { StockTicker } from '../types';

export const MarketData: React.FC = () => {
  // Mock Data mimicking Tushare output
  const stocks: StockTicker[] = [
    { code: '600519.SH', name: '贵州茅台', price: 1725.50, change: 45.2, pctChange: 2.68, volume: 45000, pe: 32.5 },
    { code: '000858.SZ', name: '五粮液', price: 154.20, change: 1.8, pctChange: 1.18, volume: 120000, pe: 24.1 },
    { code: '601318.SH', name: '中国平安', price: 42.15, change: -0.35, pctChange: -0.82, volume: 890000, pe: 6.8 },
    { code: '300750.SZ', name: '宁德时代', price: 198.60, change: 8.4, pctChange: 4.41, volume: 210000, pe: 28.9 },
    { code: '600036.SH', name: '招商银行', price: 31.80, change: 0.15, pctChange: 0.47, volume: 450000, pe: 5.9 },
    { code: '000001.SZ', name: '平安银行', price: 10.45, change: -0.05, pctChange: -0.48, volume: 650000, pe: 4.8 },
    { code: '601888.SH', name: '中国中免', price: 85.30, change: -1.2, pctChange: -1.39, volume: 85000, pe: 35.2 },
    { code: '002594.SZ', name: '比亚迪', price: 235.60, change: 5.2, pctChange: 2.25, volume: 150000, pe: 25.4 },
    { code: '603288.SH', name: '海天味业', price: 45.90, change: 0.8, pctChange: 1.77, volume: 56000, pe: 38.0 },
    { code: '601012.SH', name: '隆基绿能', price: 28.50, change: 1.1, pctChange: 4.01, volume: 340000, pe: 14.5 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
        <h2 className="text-xl font-bold text-slate-100">市场概览 (Tushare 数据)</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="搜索代码..." 
            className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-blue-500 w-64"
          />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">代码</th>
                <th className="px-6 py-4 font-medium">名称</th>
                <th className="px-6 py-4 font-medium text-right">价格 (CNY)</th>
                <th className="px-6 py-4 font-medium text-right">涨跌额</th>
                <th className="px-6 py-4 font-medium text-right">涨跌幅</th>
                <th className="px-6 py-4 font-medium text-right">成交量</th>
                <th className="px-6 py-4 font-medium text-right">市盈率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {stocks.map((stock) => (
                <tr key={stock.code} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-blue-400 font-mono">{stock.code}</td>
                  <td className="px-6 py-4 text-sm text-slate-200">{stock.name}</td>
                  <td className="px-6 py-4 text-sm text-right text-slate-200 font-mono">{stock.price.toFixed(2)}</td>
                  <td className={`px-6 py-4 text-sm text-right font-mono ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium font-mono ${
                      stock.pctChange >= 0 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {stock.pctChange >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      {Math.abs(stock.pctChange).toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-slate-400 font-mono">{(stock.volume / 10000).toFixed(1)}w</td>
                  <td className="px-6 py-4 text-sm text-right text-slate-400 font-mono">{stock.pe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};