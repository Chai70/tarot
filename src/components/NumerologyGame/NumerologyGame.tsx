import React, { useState } from 'react';
import './NumerologyGame.css';

interface NumerologyResult {
  lifePathNumber: number;
  destinyNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  interpretation: {
    lifePath: string;
    destiny: string;
    soulUrge: string;
    personality: string;
  };
}

const NumerologyGame: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // 数字命理计算函数
  const reduceToSingleDigit = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const calculateLifePath = (dateString: string): number => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    const total = day + month + year;
    return reduceToSingleDigit(total);
  };

  const getLetterValue = (letter: string): number => {
    const values: { [key: string]: number } = {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
      J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
      S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
    };
    return values[letter.toUpperCase()] || 0;
  };

  // 获取中文字符的数字值（基于笔画数模9）
  const getChineseCharValue = (char: string): number => {
    // 获取字符的Unicode码点，然后转换为1-9的数字
    const codePoint = char.codePointAt(0) || 0;
    return (codePoint % 9) + 1;
  };

  const calculateNameNumber = (name: string, consonantsOnly = false, vowelsOnly = false): number => {
    const vowels = 'AEIOU';
    let total = 0;
    
    // 检测是否包含中文字符
    const hasChinese = /[\u4e00-\u9fff]/.test(name);
    
    if (hasChinese) {
      // 中文姓名处理逻辑
      const chars = Array.from(name);
      
      if (consonantsOnly) {
        // 对于中文，取偶数位置的字符作为"辅音"等价
        chars.forEach((char, index) => {
          if (index % 2 === 1 && /[\u4e00-\u9fff]/.test(char)) {
            total += getChineseCharValue(char);
          }
        });
      } else if (vowelsOnly) {
        // 对于中文，取奇数位置的字符作为"元音"等价
        chars.forEach((char, index) => {
          if (index % 2 === 0 && /[\u4e00-\u9fff]/.test(char)) {
            total += getChineseCharValue(char);
          }
        });
      } else {
        // 计算全部中文字符
        chars.forEach(char => {
          if (/[\u4e00-\u9fff]/.test(char)) {
            total += getChineseCharValue(char);
          }
        });
      }
    } else {
      // 英文姓名处理逻辑（原有逻辑）
      for (const char of name.toUpperCase()) {
        if (char.match(/[A-Z]/)) {
          const isVowel = vowels.includes(char);
          if (consonantsOnly && isVowel) continue;
          if (vowelsOnly && !isVowel) continue;
          total += getLetterValue(char);
        }
      }
    }
    
    return reduceToSingleDigit(total);
  };

  const getInterpretation = (num: number, type: string): string => {
    const interpretations: { [key: string]: { [key: number]: string } } = {
      lifePath: {
        1: '领导者和开拓者。你天生具有独立性和创新精神，适合创业和领导。',
        2: '合作者和调解者。你擅长与他人协作，具有外交天赋和直觉力。',
        3: '创造者和表达者。你富有想象力和艺术天赋，善于沟通和娱乐他人。',
        4: '建设者和组织者。你务实稳重，注重细节，适合需要耐心的工作。',
        5: '自由精神和冒险家。你渴望自由和变化，适合旅行和探索新事物。',
        6: 'nurturing和服务者。你关爱他人，有强烈的责任感和家庭观念。',
        7: '思考者和研究者。你喜欢深入思考，追求真理和精神成长。',
        8: '成就者和管理者。你有商业头脑，追求物质成功和权力。',
        9: '人道主义者和导师。你关心社会，有服务他人的使命感。',
        11: '直觉大师。你具有超凡的直觉力和精神洞察力。',
        22: '大建造师。你有实现宏伟目标的能力和视野。',
        33: '大师教师。你有启发和治愈他人的特殊天赋。'
      },
      destiny: {
        1: '你的使命是成为领导者，开创新的道路和机会。',
        2: '你的使命是建立和谐，促进合作和理解。',
        3: '你的使命是通过创造和表达带给世界joy和启发。',
        4: '你的使命是建立稳固的基础，创造持久的价值。',
        5: '你的使命是探索和传播自由、变化和新体验。',
        6: '你的使命是nurturing他人，创造和谐的家庭和社区。',
        7: '你的使命是寻求真理，分享智慧和精神洞察。',
        8: '你的使命是实现物质成功，建立有影响力的事业。',
        9: '你的使命是服务人类，推动世界向更好方向发展。',
        11: '你的使命是成为精神导师，启发他人的觉醒。',
        22: '你的使命是实现伟大的愿景，造福全人类。',
        33: '你的使命是成为大师级教师，治愈和指导他人。'
      },
      soulUrge: {
        1: '你内心渴望独立、领导和开创新事物。',
        2: '你内心渴望和谐、合作和深层的情感连接。',
        3: '你内心渴望创造性表达和与他人分享joy。',
        4: '你内心渴望稳定、秩序和实用的成就。',
        5: '你内心渴望自由、冒险和多样化的体验。',
        6: '你内心渴望nurturing他人和创造美好的家庭。',
        7: '你内心渴望理解生命的深层含义和真理。',
        8: '你内心渴望物质成功和被他人认可的成就。',
        9: '你内心渴望为人类服务和推动世界进步。',
        11: '你内心渴望精神启蒙和帮助他人觉醒。',
        22: '你内心渴望实现宏伟的愿景和留下持久影响。',
        33: '你内心渴望治愈他人和传播无条件的爱。'
      },
      personality: {
        1: '他人看你是一个强有力的领导者和开拓者。',
        2: '他人看你是一个友善的合作者和和平制造者。',
        3: '他人看你是一个有魅力的表达者和娱乐者。',
        4: '他人看你是一个可靠的组织者和实干家。',
        5: '他人看你是一个充满活力的冒险家和自由精神。',
        6: '他人看你是一个关爱的nurturing者和负责任的人。',
        7: '他人看你是一个神秘的思考者和智慧的导师。',
        8: '他人看你是一个成功的商人和有权威的领导者。',
        9: '他人看你是一个慷慨的人道主义者和理想主义者。',
        11: '他人看你是一个有直觉力的精神导师。',
        22: '他人看你是一个有远见的大建造师。',
        33: '他人看你是一个充满爱心的大师级治愈者。'
      }
    };
    
    return interpretations[type]?.[num] || '暂无解释';
  };

  const calculateNumerology = () => {
    if (!birthDate || !fullName.trim()) {
      alert('请填写完整的生日和姓名');
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const lifePathNumber = calculateLifePath(birthDate);
      const destinyNumber = calculateNameNumber(fullName.replace(/\s/g, ''));
      const soulUrgeNumber = calculateNameNumber(fullName.replace(/\s/g, ''), false, true);
      const personalityNumber = calculateNameNumber(fullName.replace(/\s/g, ''), true, false);

      const numerologyResult: NumerologyResult = {
        lifePathNumber,
        destinyNumber,
        soulUrgeNumber,
        personalityNumber,
        interpretation: {
          lifePath: getInterpretation(lifePathNumber, 'lifePath'),
          destiny: getInterpretation(destinyNumber, 'destiny'),
          soulUrge: getInterpretation(soulUrgeNumber, 'soulUrge'),
          personality: getInterpretation(personalityNumber, 'personality')
        }
      };

      setResult(numerologyResult);
      setIsCalculating(false);
    }, 1500);
  };

  const resetCalculation = () => {
    setResult(null);
    setBirthDate('');
    setFullName('');
  };

  return (
    <div className="numerology-game">
      <div className="numerology-header">
        <p>通过你的生日和姓名，解读生命密码</p>
      </div>

      {!result && (
        <div className="numerology-input">
          <div className="input-section">
            <h3>请输入你的信息：</h3>
            
            <div className="input-group">
              <label>出生日期：</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="date-input"
              />
            </div>

            <div className="input-group">
              <label>姓名（中文或英文）：</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="请输入你的完整姓名"
                className="name-input"
              />
            </div>

            <button 
              className="calculate-btn" 
              onClick={calculateNumerology}
              disabled={isCalculating}
            >
              {isCalculating ? '计算中...' : '开始计算'}
            </button>
          </div>

          <div className="info-section">
            <h4>数字命理学简介：</h4>
            <ul>
              <li><strong>生命路径数：</strong>基于出生日期，揭示你的人生使命</li>
              <li><strong>命运数：</strong>基于姓名，显示你的人生目标</li>
              <li><strong>心灵渴望数：</strong>基于姓名中的元音，反映内心渴望</li>
              <li><strong>性格数：</strong>基于姓名中的辅音，展现外在性格</li>
            </ul>
          </div>
        </div>
      )}

      {result && (
        <div className="numerology-result">
          <h3>你的数字命理报告</h3>
          
          <div className="result-grid">
            <div className="result-card life-path">
              <div className="result-header">
                <span className="result-number">{result.lifePathNumber}</span>
                <h4>生命路径数</h4>
              </div>
              <p>{result.interpretation.lifePath}</p>
            </div>

            <div className="result-card destiny">
              <div className="result-header">
                <span className="result-number">{result.destinyNumber}</span>
                <h4>命运数</h4>
              </div>
              <p>{result.interpretation.destiny}</p>
            </div>

            <div className="result-card soul-urge">
              <div className="result-header">
                <span className="result-number">{result.soulUrgeNumber}</span>
                <h4>心灵渴望数</h4>
              </div>
              <p>{result.interpretation.soulUrge}</p>
            </div>

            <div className="result-card personality">
              <div className="result-header">
                <span className="result-number">{result.personalityNumber}</span>
                <h4>性格数</h4>
              </div>
              <p>{result.interpretation.personality}</p>
            </div>
          </div>

          <div className="numerology-actions">
            <button className="reset-btn" onClick={resetCalculation}>
              重新计算
            </button>
          </div>
        </div>
      )}

      {isCalculating && (
        <div className="calculating-overlay">
          <div className="calculating-content">
            <div className="spinner"></div>
            <p>正在分析你的数字密码...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumerologyGame;
