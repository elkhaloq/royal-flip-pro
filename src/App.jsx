import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [user, setUser] = useState({ id: '641124', balance: 1000, name: 'لاعب رويال' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [gameState, setGameState] = useState('lobby'); // lobby, matching, playing
  const [bet, setBet] = useState(10);
  const [rounds, setRounds] = useState([]); // نتائج الجولات (ملك/كتابة)
  const [isSpinning, setIsSpinning] = useState(false);

  // الدخول السري للأدمن (ضغط مطول 5 ثواني)
  let timer;
  const startAdminTimer = () => {
    timer = setTimeout(() => {
      const pin = prompt("أدخل رمز الإدارة السري:");
      if (pin === "64112416") setIsAdmin(true);
    }, 5000);
  };
  const clearAdminTimer = () => clearTimeout(timer);

  const startMatch = (side) => {
    if (user.balance < bet) return alert("رصيدك غير كافٍ!");
    setGameState('matching');
    // محاكاة البحث عن خصم لمدة 5 ثواني
    setTimeout(() => {
      setGameState('playing');
      handlePlay();
    }, 5000);
  };

  const handlePlay = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'ملك' : 'كتابة';
      setRounds([result]);
      setIsSpinning(false);
      // هنا السيستم بيحدد الفوز بناءً على نسبة الأدمن (هتتبرمج في الخطوة الجاية)
    }, 2000);
  };

  if (isAdmin) return (
    <div className="admin-panel" style={{direction: 'rtl', padding: '20px', background: '#000', height: '100dvh'}}>
      <h2 style={{color: 'gold'}}>لوحة التحكم v43.0 👑</h2>
      <button onClick={() => setIsAdmin(false)}>خروج</button>
      <div style={{marginTop: '20px'}}>
        <p>نسبة الفوز الحالية: 70%</p>
        <button>تغيير أرقام المحافظ</button>
        <button>طلبات الإيداع (0)</button>
        <button>طلبات السحب (0)</button>
      </div>
    </div>
  );

  return (
    <div className="app-container" style={{direction: 'rtl'}}>
      <header className="header">
        <div className="logo" onMouseDown={startAdminTimer} onMouseUp={clearAdminTimer} onTouchStart={startAdminTimer} onTouchEnd={clearAdminTimer}>ROYAL FLIP</div>
        <div className="balance">رصيدك: {user.balance} ج.م</div>
      </header>

      {gameState === 'lobby' && (
        <div className="lobby">
          <div className="bet-selector">
            {[10, 50, 100, 500].map(amt => (
              <button key={amt} onClick={() => setBet(amt)} className={bet === amt ? 'active' : ''}>{amt}</button>
            ))}
          </div>
          <div className="action-buttons">
            <button onClick={() => startMatch('ملك')} className="btn-heads">ملك 🤴</button>
            <button onClick={() => startMatch('كتابة')} className="btn-tails">كتابة 🦅</button>
          </div>
          <button className="demo-btn">وضع DEMO</button>
        </div>
      )}

      {gameState === 'matching' && (
        <div className="matching">
          <div className="loader"></div>
          <h2>جاري البحث عن خصم مصري...</h2>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="game">
          <div className="arena">
            <div className="vault">خزنة الرهان: {bet * 2} ج.م</div>
            <div className={`coin ${isSpinning ? 'spin' : ''}`}>
              {rounds[0] === 'ملك' ? '🤴' : '🦅'}
            </div>
          </div>
        </div>
      )}

      <footer className="footer-nav">
        <button onClick={() => setGameState('lobby')}>الرئيسية</button>
        <button onClick={() => alert('افتح محفظة الإيداع')}>إيداع</button>
        <button onClick={() => alert('افتح صفحة السحب')}>سحب</button>
        <button>الملف الشخصي</button>
      </footer>
    </div>
  );
}

export default App;
