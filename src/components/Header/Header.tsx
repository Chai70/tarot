import React from 'react';
import './Header.css';
import type { GameType } from '../../App';

interface HeaderProps {
  currentGame: GameType;
  onGameChange: (game: GameType) => void;
}

const Header: React.FC<HeaderProps> = ({ currentGame, onGameChange }) => {
  const getPageTitle = () => {
    switch (currentGame) {
      case 'tarot':
        return '塔罗占卜';
      case 'lotto':
        return '大乐透';
      case 'shuangseqiu':
        return '双色球';
      case 'rune':
        return '符文占卜';
      case 'numerology':
        return '数字命理';
      case 'coin':
        return '硬币占卜';
      default:
        return '塔罗占卜';
    }
  };

  return (
    <header className="app-header">
      <nav className="header-nav">
        <button 
          className={`nav-tab ${currentGame === 'tarot' ? 'active' : ''}`}
          onClick={() => onGameChange('tarot')}
        >
          塔罗占卜
        </button>
        <button 
          className={`nav-tab ${currentGame === 'rune' ? 'active' : ''}`}
          onClick={() => onGameChange('rune')}
        >
          符文占卜
        </button>
        <button 
          className={`nav-tab ${currentGame === 'numerology' ? 'active' : ''}`}
          onClick={() => onGameChange('numerology')}
        >
          数字命理
        </button>
        <button 
          className={`nav-tab ${currentGame === 'coin' ? 'active' : ''}`}
          onClick={() => onGameChange('coin')}
        >
          硬币占卜
        </button>
        <button 
          className={`nav-tab ${currentGame === 'lotto' ? 'active' : ''}`}
          onClick={() => onGameChange('lotto')}
        >
          大乐透
        </button>
        <button 
          className={`nav-tab ${currentGame === 'shuangseqiu' ? 'active' : ''}`}
          onClick={() => onGameChange('shuangseqiu')}
        >
          双色球
        </button>
      </nav>
      <h1>{getPageTitle()}</h1>
    </header>
  );
};

export default Header;
