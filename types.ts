export enum View {
  DASHBOARD = 'DASHBOARD',
  STRATEGY_LAB = 'STRATEGY_LAB',
  MARKET_DATA = 'MARKET_DATA',
  BACKTEST = 'BACKTEST',
  RISK_MATRIX = 'RISK_MATRIX'
}

export interface StockTicker {
  code: string;
  name: string;
  price: number;
  change: number;
  pctChange: number;
  volume: number;
  pe: number;
}

export interface StrategyParam {
  name: string;
  value: number | string;
  type: 'int' | 'float' | 'select';
  options?: string[];
}

export interface GeneratedStrategy {
  id: string;
  title: string;
  description: string;
  logic: string;
  pythonCode: string;
  status: 'draft' | 'backtesting' | 'active';
  metrics?: {
    sharpe: number;
    annualReturn: number;
    maxDrawdown: number;
  };
}

export interface ChartDataPoint {
  date: string;
  value: number;
  benchmark?: number;
}

export interface BacktestResult {
  metrics: {
    totalReturn: number;
    annualizedReturn: number;
    maxDrawdown: number;
    sharpeRatio: number;
    volatility: number;
    winRate: number;
    trades: number;
  };
  equityCurve: ChartDataPoint[];
  aiAnalysis: string;
}

export interface Trade {
  id: string;
  date: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  price: number;
  quantity: number;
  pnl?: number;
}