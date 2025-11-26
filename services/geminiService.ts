import { GoogleGenAI, Type } from "@google/genai";

// Initialize the API client
// Note: process.env.API_KEY is assumed to be available in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

export const generateQuantStrategy = async (
  prompt: string,
  indicators: string[],
  riskProfile: string
): Promise<{ title: string; logic: string; pythonCode: string }> => {
  try {
    const fullPrompt = `
      你是一位精通中国A股市场的资深量化分析师。
      请根据以下用户输入设计一个交易策略：
      - 目标: ${prompt}
      - 偏好技术指标: ${indicators.join(', ')}
      - 风险偏好: ${riskProfile}

      请以JSON格式返回结果，严格遵守以下结构：
      {
        "title": "一个专业的策略名称（中文）",
        "logic": "详细的策略逻辑说明，包括入场信号、出场信号和风控措施（中文）。",
        "pythonCode": "实现该逻辑的Python代码片段，使用Backtrader框架语法。保持简洁。"
      }
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            logic: { type: Type.STRING },
            pythonCode: { type: Type.STRING },
          },
          required: ["title", "logic", "pythonCode"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);

  } catch (error) {
    console.error("AI Generation Error:", error);
    return {
      title: "策略生成错误",
      logic: "由于API错误无法生成策略，请检查网络连接或API密钥。",
      pythonCode: "# Error generation code"
    };
  }
};

export const analyzeRiskReport = async (portfolioData: any): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `
        分析以下模拟A股投资组合的风险指标：
        ${JSON.stringify(portfolioData)}
        
        请提供3点简明的风险总结和1条对冲建议。
        请使用中文回答，格式为纯文本。
      `,
    });
    return response.text || "无法获取分析结果。";
  } catch (e) {
    console.error(e);
    return "风险分析暂时不可用。";
  }
};

export const analyzeBacktestResult = async (metrics: any): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `
        作为一名资深基金经理，请评估以下A股交易策略的回测数据：
        ${JSON.stringify(metrics)}

        请提供简短、专业的评估（不超过100字）。
        请包含：
        1. 策略是否可行。
        2. 一个主要优势。
        3. 一个改进建议（例如回撤管理）。
        请使用中文回答。
      `,
    });
    return response.text || "无法获取分析结果。";
  } catch (e) {
    console.error(e);
    return "AI 分析暂时不可用。";
  }
};