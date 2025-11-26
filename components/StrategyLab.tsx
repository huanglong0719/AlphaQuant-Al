import React, { useState } from 'react';
import { Sparkles, Play, Code, FileText, Loader2, Save } from 'lucide-react';
import { GeneratedStrategy } from '../types';
import { generateQuantStrategy } from '../services/geminiService';

export const StrategyLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStrategy, setGeneratedStrategy] = useState<GeneratedStrategy | null>(null);
  const [indicators, setIndicators] = useState<string[]>(['MACD', 'RSI']);
  const [riskProfile, setRiskProfile] = useState('稳健');

  const availableIndicators = ['MACD', 'RSI', 'KDJ', '布林带', '移动平均线', '成交量'];
  const riskProfiles = ['保守', '稳健', '激进'];

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    // Simulate API call to Gemini
    const result = await generateQuantStrategy(prompt, indicators, riskProfile);
    
    setGeneratedStrategy({
      id: Date.now().toString(),
      title: result.title,
      description: prompt,
      logic: result.logic,
      pythonCode: result.pythonCode,
      status: 'draft',
    });
    
    setIsGenerating(false);
  };

  const toggleIndicator = (ind: string) => {
    if (indicators.includes(ind)) {
      setIndicators(indicators.filter(i => i !== ind));
    } else {
      setIndicators([...indicators, ind]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
      {/* Input Panel */}
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="text-blue-500" size={24} />
            AI 策略挖掘
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            用自然语言描述您的交易思路，DeepSeek 将自动生成策略逻辑和 Python 代码。
          </p>
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">策略描述</label>
            <textarea
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[120px]"
              placeholder="例如：当 RSI 低于 30 且价格高于 200 日均线时买入，RSI 高于 70 时卖出。"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">技术指标</label>
            <div className="flex flex-wrap gap-2">
              {availableIndicators.map(ind => (
                <button
                  key={ind}
                  onClick={() => toggleIndicator(ind)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    indicators.includes(ind)
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">风险偏好</label>
            <div className="grid grid-cols-3 gap-2">
              {riskProfiles.map(r => (
                <button
                  key={r}
                  onClick={() => setRiskProfile(r)}
                  className={`py-2 text-sm rounded-lg border transition-colors ${
                    riskProfile === r
                      ? 'bg-slate-700 border-slate-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
          生成策略
        </button>
      </div>

      {/* Output Panel */}
      <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-full overflow-hidden">
        {!generatedStrategy ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
            <BrainCircuitPlaceholder />
            <p className="mt-4">等待输入...</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-800">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">{generatedStrategy.title}</h2>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded">AI 生成</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded">Backtrader</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center gap-2 text-sm">
                  <Save size={16} /> 保存
                </button>
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2 text-sm font-medium">
                  <Play size={16} /> 运行回测
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                  <FileText size={18} /> 策略逻辑
                </h3>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {generatedStrategy.logic}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
                  <Code size={18} /> Python 实现 (Backtrader)
                </h3>
                <pre className="bg-[#0d1117] p-4 rounded-lg border border-slate-800 text-slate-300 text-xs font-mono overflow-x-auto">
                  <code>{generatedStrategy.pythonCode}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BrainCircuitPlaceholder = () => (
  <svg className="w-24 h-24 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 3 2.5 2.5 0 0 0 0 2 2.5 2.5 0 0 0 1.32 3 2.5 2.5 0 0 0 1.98 3 2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 4.96.46 2.5 2.5 0 0 0 1.98-3 2.5 2.5 0 0 0 1.32-3 2.5 2.5 0 0 0 0-2 2.5 2.5 0 0 0-1.32-3 2.5 2.5 0 0 0-1.98-3 2.5 2.5 0 0 0-4.96.46 2.5 2.5 0 0 0-5 0Z" />
    <path d="M12 8.5v7" />
    <path d="m9 10 6 4" />
    <path d="m15 10-6 4" />
  </svg>
);