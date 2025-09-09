import React, { useState } from 'react';
import './CoinOracle.css';

interface CoinResult {
  coins: number[];
  hexagram: string;
  meaning: string;
  interpretation: string;
  advice: string;
}

const CoinOracle: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<CoinResult | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentFlip, setCurrentFlip] = useState(0);
  const [coins, setCoins] = useState<number[]>([]);

  // 易经基础卦象和含义
  const hexagrams = {
    '111111': { name: '乾', meaning: '天', interpretation: '刚健中正，自强不息。大吉大利，万事亨通。', advice: '保持积极进取的态度，把握机遇。' },
    '000000': { name: '坤', meaning: '地', interpretation: '厚德载物，柔顺承载。顺应自然，以柔克刚。', advice: '保持谦逊包容的心态，顺势而为。' },
    '100010': { name: '屯', meaning: '水雷屯', interpretation: '初始艰难，需要耐心积累。', advice: '稳扎稳打，积累实力，等待时机。' },
    '010001': { name: '蒙', meaning: '山水蒙', interpretation: '需要学习和启蒙，求教于人。', advice: '虚心学习，寻求指导，增长智慧。' },
    '111010': { name: '需', meaning: '水天需', interpretation: '需要等待，时机尚未成熟。', advice: '保持耐心，做好准备，等待最佳时机。' },
    '010111': { name: '讼', meaning: '天水讼', interpretation: '可能有争议或冲突，需要谨慎。', advice: '避免争执，寻求和解，以和为贵。' },
    '010000': { name: '师', meaning: '地水师', interpretation: '需要组织和领导，团结众人。', advice: '发挥领导力，团结合作，共同努力。' },
    '000010': { name: '比', meaning: '水地比', interpretation: '亲近比邻，寻求支持和合作。', advice: '加强人际关系，寻求合作伙伴。' }
  };

  const getRandomHexagram = () => {
    const hexagramKeys = Object.keys(hexagrams);
    const randomKey = hexagramKeys[Math.floor(Math.random() * hexagramKeys.length)];
    return { key: randomKey, ...hexagrams[randomKey as keyof typeof hexagrams] };
  };

  const flipCoin = () => Math.random() < 0.5 ? 0 : 1; // 0 = 阴, 1 = 阳

  const startDivination = () => {
    if (!question.trim()) {
      alert('请先输入你想要询问的问题');
      return;
    }

    setIsFlipping(true);
    setCurrentFlip(0);
    setCoins([]);
    setResult(null);
    
    flipCoinsSequentially();
  };

  const flipCoinsSequentially = () => {
    let flipCount = 0;
    const allCoins: number[] = [];
    
    const flipInterval = setInterval(() => {
      const newCoin = flipCoin();
      allCoins.push(newCoin);
      flipCount++;
      
      // 更新状态
      setCoins([...allCoins]);
      setCurrentFlip(flipCount);
      
      if (flipCount >= 6) { // 抛6次硬币
        clearInterval(flipInterval);
        // 给用户时间看到第6枚硬币的结果
        setTimeout(() => {
          generateResult(allCoins);
          setIsFlipping(false);
        }, 800);
      }
    }, 800);
  };

  const generateResult = (finalCoins: number[]) => {
    // 将6次抛币结果转换为卦象
    const hexagramKey = finalCoins.join('');
    const hexagram = hexagrams[hexagramKey as keyof typeof hexagrams] || getRandomHexagram();

    const coinResult: CoinResult = {
      coins: finalCoins,
      hexagram: `${hexagram.name}卦`,
      meaning: hexagram.meaning,
      interpretation: hexagram.interpretation,
      advice: hexagram.advice
    };

    setResult(coinResult);
  };

  const resetDivination = () => {
    setQuestion('');
    setResult(null);
    setIsFlipping(false);
    setCurrentFlip(0);
    setCoins([]);
  };

  return (
    <div className="coin-oracle">
      <div className="coin-header">
        <p>古老的易经智慧，通过硬币指引人生</p>
      </div>

      {!result && !isFlipping && (
        <div className="coin-input">
          <div className="question-section">
            <h3>请输入你的问题：</h3>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="请输入你想要咨询的问题，心诚则灵..."
              className="question-input"
              rows={3}
            />
            <button className="start-divination-btn" onClick={startDivination}>
              开始占卜
            </button>
          </div>

          <div className="instruction-section">
            <h4>占卜说明：</h4>
            <ul>
              <li>诚心思考你的问题</li>
              <li>系统将为你抛掷6枚硬币</li>
              <li>根据硬币结果生成易经卦象</li>
              <li>获得人生指引和建议</li>
            </ul>
          </div>
        </div>
      )}

      {isFlipping && (
        <div className="coin-flipping">
          <div className="question-display">
            <h3>你的问题：</h3>
            <p>"{question}"</p>
          </div>
          
          <div className="flipping-area">
            <h4>
              {currentFlip < 6 
                ? `正在抛掷第 ${currentFlip + 1} 枚硬币...` 
                : '抛掷完成，正在生成卦象...'}
            </h4>
            <div className="coins-row">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className={`coin-slot ${index === currentFlip ? 'current' : ''}`}>
                  {coins[index] !== undefined ? (
                    <div className={`coin-result ${coins[index] === 1 ? 'yang' : 'yin'}`}>
                      {coins[index] === 1 ? '阳' : '阴'}
                    </div>
                  ) : index === currentFlip ? (
                    <div className="coin-flipping-animation">🪙</div>
                  ) : (
                    <div className="coin-placeholder">?</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="coin-result">
          <div className="question-display">
            <h3>你的问题：</h3>
            <p>"{question}"</p>
          </div>

          <div className="result-coins">
            <h4>硬币结果：</h4>
            <div className="coins-display">
              {result.coins.map((coin, index) => (
                <div key={index} className={`result-coin ${coin === 1 ? 'yang' : 'yin'}`}>
                  {coin === 1 ? '阳' : '阴'}
                </div>
              ))}
            </div>
          </div>

          <div className="hexagram-result">
            <div className="hexagram-card">
              <div className="hexagram-header">
                <h3>{result.hexagram}</h3>
                <p className="hexagram-meaning">{result.meaning}</p>
              </div>

              <div className="hexagram-content">
                <div className="interpretation-section">
                  <h4>卦象解释：</h4>
                  <p>{result.interpretation}</p>
                </div>

                <div className="advice-section">
                  <h4>指导建议：</h4>
                  <p>{result.advice}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="coin-actions">
            <button className="reset-btn" onClick={resetDivination}>
              重新占卜
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinOracle;
