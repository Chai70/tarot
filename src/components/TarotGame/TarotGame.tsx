import React, { useState, useEffect, useCallback } from 'react';
import './TarotGame.css';
import { tarotDeck } from '../../data/tarot-cards';
import type { TarotCard } from '../../data/tarot-cards';

// 扩展卡牌数据接口，用于游戏状态
interface GameCard extends TarotCard {
  isFlipped: boolean;
  position: string;
  isReversed: boolean;
}

type SpreadType = 'single-card' | 'three-card' | 'celtic-cross' | 'relationship' | 'daily-card';

const TarotGame: React.FC = () => {
  const [drawnCards, setDrawnCards] = useState<GameCard[]>([]);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<React.ReactNode>('');
  const [isReadingDone, setIsReadingDone] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [spreadType, setSpreadType] = useState<SpreadType>('three-card');
  const [selectedCard, setSelectedCard] = useState<GameCard | null>(null);

  // 根据牌阵类型洗牌和抽牌
  const drawCards = useCallback(() => {
    let numCards: number;
    let positions: string[];
    
    switch (spreadType) {
      case 'single-card':
        numCards = 1;
        positions = ['指引'];
        break;
      case 'three-card':
        numCards = 3;
        positions = ['过去', '现在', '未来'];
        break;
      case 'relationship':
        numCards = 5;
        positions = ['你的状态', '对方的状态', '关系现状', '挑战', '关系前景'];
        break;
      case 'daily-card':
        numCards = 1;
        positions = ['今日指引'];
        break;
      case 'celtic-cross':
      default:
        numCards = 10;
        positions = [
          '1. 核心', '2. 挑战', '3. 根基', '4. 过去',
          '5. 目标', '6. 未来', '7. 你自己', '8. 环境',
          '9. 希望/恐惧', '10. 结果'
        ];
        break;
    }
    
    const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numCards);

    setDrawnCards(
      selected.map((card, index) => ({
        ...card,
        isFlipped: false,
        position: positions[index],
        isReversed: Math.random() < 0.3, // 30%概率为逆位
      }))
    );
  }, [spreadType]);

  // 当牌阵类型改变时，重新抽牌
  // 重置游戏
  const handleReset = useCallback((isNewSpread: boolean = false) => {
    if (!isNewSpread) {
        setQuestion('');
    }
    setResponse('');
    setIsReadingDone(false);
    setAnimationKey(prevKey => prevKey + 1);
    drawCards();
  }, [drawCards]);

  // 当牌阵类型改变时，重新抽牌
  useEffect(() => {
    handleReset(true);
  }, [handleReset]);

  // 获取占卜结果
  const handleGetReading = () => {
    if (!question) {
      alert('请输入你的问题！');
      return;
    }
    const reading = (
      <div>
        <p>关于"{question}"的解读：</p>
        {drawnCards.map(card => (
          <p key={card.id}>
            <strong>{card.position}（{card.isReversed ? '逆位 ' : ''}{card.name}）：</strong> {card.isReversed ? card.reversedMeaning : card.meaning}
          </p>
        ))}
      </div>
    );
    setResponse(reading);
    setDrawnCards(cards => cards.map(card => ({ ...card, isFlipped: true })));
    setIsReadingDone(true);
  };

  return (
    <main className="tarot-game">
      <div className={`card-area ${spreadType}`} key={animationKey}>
        {drawnCards.map((card, index) => (
          <div
            key={card.id}
            className="card-wrapper"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className={`card-container ${card.isFlipped ? 'flipped' : ''} ${card.isReversed ? 'reversed' : ''}`}>  
              <div className="card-inner-simple">
                {!card.isFlipped ? (
                  <div className="card-face card-back-simple">
                    <span className="card-back-text">塔罗牌</span>
                  </div>
                ) : (
                  <div className="card-face card-front-simple" onClick={() => setSelectedCard(card)}>
                    <div className="card-image-container">
                      <div className="card-image-placeholder">
                        {/* 塔罗牌图片 */}
                        <img src={card.imagePath} alt={card.name} className="tarot-card-image" />
                      </div>
                      {card.isReversed && <div className="reversed-indicator">逆</div>}
                    </div>
                    <div className="card-name-container">
                      <span className="card-name">{card.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="card-position-label">{card.position}</p>
          </div>
        ))}
      </div>
      <div className="interaction-area">
        {!isReadingDone ? (
          <>
            <div className="spread-selection">
              <label htmlFor="spread-select" className="spread-label">选择牌阵：</label>
              <select 
                id="spread-select" 
                value={spreadType} 
                onChange={(e) => setSpreadType(e.target.value as SpreadType)}
                className="spread-select"
              >
                <option value="daily-card">每日一卡</option>
                <option value="single-card">单张指引</option>
                <option value="three-card">过去现在未来</option>
                <option value="relationship">关系牌阵</option>
                <option value="celtic-cross">凯尔特十字</option>
              </select>
            </div>
            <div className="question-input-container">
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="在这里输入你的问题..."
                className="question-textarea"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
                style={{ 
                  textTransform: 'none',
                  resize: 'none',
                  overflow: 'hidden'
                }}
              />
            </div>
            <button onClick={handleGetReading} className="reading-button">获取占卜</button>
          </>
        ) : (
          <button onClick={() => handleReset()} className="reading-button">再占卜一次</button>
        )}
        {response && <div className="response-box">{response}</div>}
      </div>
      
      {/* 卡牌详细信息弹窗 */}
      {selectedCard && (
        <div className="card-modal-overlay" onClick={() => setSelectedCard(null)}>
          <div className="card-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCard(null)}>×</button>
            <h2 className="modal-title">
              {selectedCard.isReversed ? '逆位 ' : ''}{selectedCard.name}
            </h2>
            <div className="modal-content">
              <div className="card-meaning-section">
                <h3>牌意</h3>
                <p>{selectedCard.isReversed ? selectedCard.reversedMeaning : selectedCard.meaning}</p>
              </div>
              <div className="card-position-section">
                <h3>位置</h3>
                <p>{selectedCard.position}</p>
              </div>
              <div className="alternative-meaning-section">
                <h3>{selectedCard.isReversed ? '正位含义' : '逆位含义'}</h3>
                <p>{selectedCard.isReversed ? selectedCard.meaning : selectedCard.reversedMeaning}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default TarotGame;
