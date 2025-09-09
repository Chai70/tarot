import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TarotGame from './components/TarotGame';
import LottoGame from './components/LottoGame';
import ShuangSeQiuGame from './components/ShuangSeQiuGame';
import RuneGame from './components/RuneGame/RuneGame';
import NumerologyGame from './components/NumerologyGame/NumerologyGame';
import CoinOracle from './components/CoinOracle/CoinOracle';

export type GameType = 'tarot' | 'lotto' | 'shuangseqiu' | 'rune' | 'numerology' | 'coin';

const App: React.FC = () => {
  const [currentGame, setCurrentGame] = useState<GameType>('tarot');

  const renderCurrentGame = () => {
    switch (currentGame) {
      case 'tarot':
        return <TarotGame />;
      case 'lotto':
        return <LottoGame />;
      case 'shuangseqiu':
        return <ShuangSeQiuGame />;
      case 'rune':
        return <RuneGame />;
      case 'numerology':
        return <NumerologyGame />;
      case 'coin':
        return <CoinOracle />;
      default:
        return <TarotGame />;
    }
  };

  return (
    <div className="App">
      <Header currentGame={currentGame} onGameChange={setCurrentGame} />
      <main>
        {renderCurrentGame()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
