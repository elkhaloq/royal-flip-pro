import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Howl } from 'howler';
import './App.css';

// --- المؤثرات الصوتية (v43.0) ---
const sounds = {
  spin: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'] }),
  win: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'] }),
  lose: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2530/2530-preview.mp3'] }),
  match: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/1084/1084-preview.mp3'] }),
};

function App() {
  // --- الحالات الأساسية (States) ---
  const [view, setView] = useState('terms'); // التنقل بين الصفحات
  const [isDemo, setIsDemo] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [side, setSide] = useState('ملك'); 
  const [gameState, setGameState] = useState('idle'); // idle, matching, playing, result
  const [rounds, setRounds] = useState([]);
  const [opponent, setOpponent] = useState(null);
  const [adminMode, setAdminMode] = useState(false);

  // --- 1. نظام الدخول السري للأدمن (5 ثوانٍ) ---
  let adminTimer;
  const startAdminTimer = () => {
    adminTimer = setTimeout(() => {
      const pin = prompt("أدخل رمز الإدارة السري:");
      if (pin === "64112416") setAdminMode(true);
    }, 5000);
  };

  // --- 2. محرك البحث عن خصم وهمي (Matchmaking) ---
  const startMatch = () => {
    if (!isDemo && balance < bet) return alert("رصيدك لا يكفي! اشحن الآن.");
    setGameState('matching');
    sounds.match.play();
    
    const bots = ["أحمد كابو", "سارة ميسي", "الفرعون", "محمود الجوكر", "كريم نيدفيد", "ياسين التيتو"];
    setOpponent({ 
      name: bots[Math.floor(Math.random() * bots.length)], 
      id: Math.floor(100000 + Math.random() * 900000) 
    });

    setTimeout(() => {
      setGameState('playing');
      runGameLogic();
    }, 5000);
  };

  // --- 3. منطق الجولات (3 جولات + فاصلة) ---
  const runGameLogic = () => {
    let currentRounds = [];
    const playRound = () => {
      setTimeout(() => {
        // نسبة الفوز (70% في الديمو، وفي الحقيقي تعتمد على إعدادات الأدمن)
        const winChance = isDemo ? 0.7 : 0.5; 
        const result = Math.random() < winChance ? side : (side === 'ملك' ? 'كتابة' : 'ملك');
        
        currentRounds.push(result);
        setRounds([...currentRounds]);
        sounds.spin.play();

        if (currentRounds.length < 3) {
          playRound();
        } else {
          // حساب النتيجة النهائية
          const wins = currentRounds.filter(r => r === side).length;
          setTimeout(() => finalizeGame(wins >= 2), 1000);
        }
      }, 2000);
    };
    playRound();
  };

  const finalizeGame = (isWinner) => {
    setGameState('result');
    if (isWinner) {
      sounds.win.play();
      if (!isDemo) setBalance(prev => prev + (bet * 1.85)); // خصم 15% عمولة
    } else {
      sounds.lose.play();
      if (!isDemo) setBalance(prev => prev - bet);
    }
  };

  // --- واجهة الأدمن السرية ---
  if (adminMode) return (
    <div className="admin-screen">
      <h2>لوحة التحكم المطلق v43.0 👑</h2>
      <div className="admin-card">
        <label>نسبة الفوز العامة: </label>
        <input type="number" defaultValue="70" /> %
        <button className="save-btn">حفظ التعديلات</button>
      </div>
      <div className="admin-card">
        <p>إدارة المحافظ: 010XXXXXXXX (فودافون كاش)</p>
        <button>تغيير الرقم</button>
      </div>
      <button onClick={() => setAdminMode(false)} className="exit-admin">خروج</button>
    </div>
  );

  // --- واجهة الشروط والسياسات ---
  if (view === 'terms') return (
    <div className="screen center">
      <div className="terms-card">
        <h3>أهلاً بك في عائلة رويال فليب! 👑</h3>
        <p>• يتم خصم 10% من جولات الفوز فقط لتطوير السيرفرات.</p>
        <p>• السحب متاح بمجرد وصول مراهناتك لـ 70% من إيداعك.</p>
        <p>• أي تلاعب يؤدي لتجميد الحساب فوراً.</p>
        <button onClick={() => setView('lobby')} className="btn-gold">أنا موافق ويالا بينا</button>
      </div>
    </div>
  );

  return (
    <div className="screen no-scroll">
      {/* Header */}
      <nav className="top-nav">
        <div className="logo" 
             onTouchStart={startAdminTimer} 
             onMouseDown={startAdminTimer}
             onTouchEnd={() => clearTimeout(adminTimer)}
             onMouseUp={() => clearTimeout(adminTimer)}>
          ROYAL FLIP
        </div>
        <div className="balance-box">
          {isDemo ? 'رصيد وهمي' : 'رصيدك'}: <span className="gold-text">{isDemo ? 1000 : balance} ج.م</span>
        </div>
      </nav>

      {/* Main Lobby */}
      {gameState === 'idle' && (
        <div className="lobby-content">
          <div className="bet-selector">
            <p>اختر مبلغ الرهان:</p>
            <div className="bet-buttons">
              {[10, 50, 100, 500].map(amt => (
                <button key={amt} className={bet === amt ? 'active' : ''} onClick={() => setBet(amt)}>{amt}</button>
              ))}
            </div>
          </div>

          <div className="side-selector">
            <button className={side === 'ملك' ? 'active-side' : ''} onClick={() => setSide('ملك')}>ملك 🤴</button>
            <button className={side === 'كتابة' ? 'active-side' : ''} onClick={() => setSide('كتابة')}>كتابة 🦅</button>
          </div>

          <button className="main-play-btn" onClick={startMatch}>العب الآن</button>
          
          <button className={`demo-btn ${isDemo ? 'exit-demo' : ''}`} onClick={() => setIsDemo(!isDemo)}>
            {isDemo ? 'العودة للرصيد الحقيقي' : 'وضع التجربة (DEMO)'}
          </button>
        </div>
      )}

      {/* Matching Screen */}
      {gameState === 'matching' && (
        <div className="matching-screen">
          <div className="spinner"></div>
          <h2>جاري البحث عن خصم...</h2>
          <div className="opponent-card">
            <p>الخصم: {opponent?.name}</p>
            <p>ID: #{opponent?.id}</p>
          </div>
        </div>
      )}

      {/* Game Arena */}
      {gameState === 'playing' && (
        <div className="arena">
          <div className="vault-box">الخزنة الذهبية: {bet * 2} ج.م</div>
          <div className="coin-container">
            <div className="coin spinning-coin">💰</div>
          </div>
          <div className="rounds-display">
            {rounds.map((r, i) => (
              <span key={i} className="round-dot">{r === side ? '✅' : '❌'}</span>
            ))}
          </div>
        </div>
      )}

      {/* Result Screen */}
      {gameState === 'result' && (
        <div className="result-layer">
          <div className="result-card">
            <h2>{rounds.filter(r => r === side).length >= 2 ? 'كسبت الماتش! 🎉' : 'خسرت الماتش! 💸'}</h2>
            <p>تم خصم عمولة المنصة (15%)</p>
            <button onClick={() => {setGameState('idle'); setRounds([]);}}>جولة جديدة</button>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <footer className="bottom-nav">
        <button onClick={() => setGameState('idle')}>الرئيسية</button>
        <button onClick={() => alert('رقم الإيداع: 010XXXXXXXX')}>إيداع</button>
        <button onClick={() => alert('سيتم مراجعة طلبك')}>سحب</button>
        <button>الملف الشخصي</button>
      </footer>
    </div>
  );
}

export default App;
