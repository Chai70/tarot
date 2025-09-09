import React, { useState } from 'react';
import { runeData, runeSpreadTypes, type Rune } from '../../data/rune-data';
import './RuneGame.css';

interface DrawnRune extends Rune {
  isRevealed: boolean;
  position: string;
  isReversed: boolean;
}

const RuneGame: React.FC = () => {
  const [selectedSpread, setSelectedSpread] = useState<string>('single-rune');
  const [drawnRunes, setDrawnRunes] = useState<DrawnRune[]>([]);
  const [selectedRune, setSelectedRune] = useState<DrawnRune | null>(null);
  const [isReading, setIsReading] = useState(false);

  const drawRunes = () => {
    let numRunes = 1;
    let positions: string[] = [];

    switch (selectedSpread) {
      case 'single-rune':
        numRunes = 1;
        positions = ['指引'];
        break;
      case 'three-rune':
        numRunes = 3;
        positions = ['过去', '现在', '未来'];
        break;
      case 'celtic-cross':
        numRunes = 5;
        positions = ['核心问题', '挑战', '过去影响', '未来可能', '最终结果'];
        break;
      case 'daily-guidance':
        numRunes = 1;
        positions = ['今日指引'];
        break;
    }

    const shuffled = [...runeData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numRunes);

    setDrawnRunes(
      selected.map((rune, index) => ({
        ...rune,
        isRevealed: false,
        position: positions[index],
        isReversed: Math.random() < 0.2, // 20%概率为逆位
      }))
    );
    setSelectedRune(null);
    setIsReading(true);
  };

  const revealRune = (rune: DrawnRune, index: number) => {
    const updatedRunes = [...drawnRunes];
    updatedRunes[index].isRevealed = true;
    setDrawnRunes(updatedRunes);
    setSelectedRune(rune);
  };

  const resetReading = () => {
    setDrawnRunes([]);
    setSelectedRune(null);
    setIsReading(false);
  };

  return (
    <div className="rune-game">
      <div className="rune-header">
        <p>探索古老的北欧智慧，获得人生指引</p>
      </div>

      {!isReading && (
        <div className="rune-setup">
          <div className="spread-selector">
            <h3>请选择占卜方式：</h3>
            <div className="spread-options">
              {Object.entries(runeSpreadTypes).map(([key, name]) => (
                <button
                  key={key}
                  className={`spread-option ${selectedSpread === key ? 'selected' : ''}`}
                  onClick={() => setSelectedSpread(key)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <button className="draw-runes-btn" onClick={drawRunes}>
            开始占卜
          </button>
        </div>
      )}

      {isReading && (
        <div className="rune-reading">
          <div className="runes-display">
            <h3>点击符文石揭示含义：</h3>
            <div className={`runes-grid ${selectedSpread}`}>
              {drawnRunes.map((rune, index) => (
                <div key={rune.id} className="rune-wrapper">
                  <div 
                    className={`rune-stone ${rune.isRevealed ? 'revealed' : ''} ${rune.isReversed ? 'reversed' : ''}`}
                    onClick={() => !rune.isRevealed && revealRune(rune, index)}
                  >
                    {rune.isRevealed ? (
                      <div className="rune-content">
                        <div className="rune-symbol">{rune.symbol}</div>
                        <div className="rune-name">{rune.name}</div>
                        {rune.isReversed && <div className="reversed-indicator">逆位</div>}
                      </div>
                    ) : (
                      <div className="rune-back">
                        <div className="rune-mystery">?</div>
                      </div>
                    )}
                  </div>
                  <p className="rune-position">{rune.position}</p>
                </div>
              ))}
            </div>
          </div>

          {selectedRune && (
            <div className="rune-interpretation">
              <div className="interpretation-card">
                <div className="interpretation-header">
                  <span className="rune-symbol-large">{selectedRune.symbol}</span>
                  <h3>{selectedRune.name}</h3>
                  <p className="position-label">{selectedRune.position}</p>
                  {selectedRune.isReversed && <span className="reversed-badge">逆位</span>}
                </div>
                
                <div className="interpretation-content">
                  <div className="meaning-section">
                    <h4>含义：</h4>
                    <p>{selectedRune.isReversed ? selectedRune.reversedMeaning : selectedRune.meaning}</p>
                  </div>
                  
                  <div className="description-section">
                    <h4>解读：</h4>
                    <p>{selectedRune.description}</p>
                  </div>
                  
                  <div className="keywords-section">
                    <h4>关键词：</h4>
                    <div className="keywords">
                      {selectedRune.keywords.map((keyword, index) => (
                        <span key={index} className="keyword">{keyword}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="rune-actions">
            <button className="reset-btn" onClick={resetReading}>
              重新占卜
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RuneGame;
