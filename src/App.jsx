import React, { useState, useEffect } from 'react';
import './App.css';

// صور العملة اللي بعتها
const HEADS_IMG = "https://i.ibb.co/LzN78fW/heads.jpg"; // ارفع صورتك هنا
const TAILS_IMG = "https://i.ibb.co/M9YV8Yp/tails.jpg"; // ارفع صورتك هنا

function App() {
  const [gameState, setGameState] = useState('lobby'); // lobby, matching, playing, result
  const [user, setUser] = useState({ id: "641124", name: "عبدالرحمن", balance: 1000, isDemo: false });
  const [bet, setBet] = useState(10);
  const [selectedSide, setSelectedSide] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [rounds, setRounds] = useState([]); // نتائج الجولات
  const [isSpinning, setIsSpinning] = useState(false);

  // نظام البحث عن خصم (5 ثواني)
  const startMatch = (side) => {
    if (user.balance < bet) return alert("رصيدك لا يكفي!");
    setSelectedSide(side);
    setGameState('matching');
    
    // بوتات بأسماء مصرية
    const bots = ["أحمد علي", "سارة محمد", "محمود كابو", "إبراهيموفيتش المصري"];
    setOpponent({ name: bots[Math.floor(Math.random()*bots.length)], balance: bet });

    setTimeout(() => {
      setGameState('playing');
      playRound();
    }, 5000);
  };

  const playRound = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'head' : 'tail';
      setIsSpinning(false);
      setRounds(prev => [...prev, result]);
      // هنا بنطبق منطق الـ 3 جولات
    }, 2000);
  };

  return (
    <div className="app-container">
      {/* Header - الرصيد */}
      <div className="header">
        <div className="logo" onTouchStart={() => console.log("Secret Admin Login")}>ROYAL FLIP</div>
        <div className="balance-box">رصيدك: {user.balance} ج.م</div>
      </div>

      {gameState === 'lobby' && (
        <div className="lobby">
          <div className="coin-preview">🪙</div>
          <h3>اختار الرهان</h3>
          <div className="bet-buttons">
            {[10, 50, 100, 500].map(amt => (
              <button key={amt} onClick={() => setBet(amt)} className={bet === amt ? 'active' : ''}>{amt}</button>
            ))}
          </div>
          <div className="play-actions">
            <button onClick={() => startMatch('head')}>ملك 🤴</button>
            <button onClick={() => startMatch('tail')}>كتابة 🦅</button>
          </div>
          <button className="demo-btn">وضع التجربة (DEMO)</button>
        </div>
      )}

      {gameState === 'matching' && (
        <div className="matching-screen">
          <div className="loader"></div>
          <h2>جاري البحث عن خصم...</h2>
          <div className="countdown">5</div>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="game-field">
          <div className="arena">
            <div className="player">أنت</div>
            <div className="central-vault">الخزنة: {bet * 2} ج.م</div>
            <div className="opponent">{opponent?.name}</div>
          </div>
          <div className={`main-coin ${isSpinning ? 'spin' : ''}`}>
            {/* هنا تظهر صورة العملة */}
          </div>
        </div>
      )}

      {/* Navigation Bottom */}
      <div className="nav-bottom">
        <button>الرئيسية</button>
        <button>إيداع</button>
        <button>سحب</button>
        <button>الملف الشخصي</button>
      </div>
    </div>
  );
}

export default App;
