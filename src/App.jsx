import React, { useState, useEffect } from 'react';

function App() {
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const flipCoin = () => {
    if (balance < bet) {
      alert("رصيدك لا يكفي!");
      return;
    }
    
    setSpinning(true);
    setResult(null);
    
    setTimeout(() => {
      const isWin = Math.random() > 0.5;
      if (isWin) {
        setBalance(prev => prev + bet);
        setResult("فوز! 🎉");
      } else {
        setBalance(prev => prev - bet);
        setResult("خسارة! 💸");
      }
      setSpinning(false);
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'gold', fontSize: '3rem', marginBottom: '20px' }}>Royal Flip</h1>
      
      <div style={{ backgroundColor: '#1e293b', padding: '30px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <h2 style={{ fontSize: '1.5rem' }}>رصيدك: <span style={{ color: '#10b981' }}>{balance} ج.م</span></h2>
        
        <div style={{ margin: '30px 0' }}>
          <div style={{ 
            width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'gold', margin: '0 auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem',
            transition: 'transform 1s', transform: spinning ? 'rotateY(1800deg)' : 'none',
            boxShadow: '0 0 20px gold'
          }}>
            💰
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>مبلغ الرهان: </label>
          <input 
            type="number" 
            value={bet} 
            onChange={(e) => setBet(Number(e.target.value))}
            style={{ padding: '8px', borderRadius: '5px', border: 'none', width: '80px', textAlign: 'center' }}
          />
        </div>

        <button 
          onClick={flipCoin} 
          disabled={spinning}
          style={{ 
            padding: '15px 40px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer',
            backgroundColor: spinning ? '#64748b' : '#f59e0b', color: 'white', border: 'none', borderRadius: '10px'
          }}
        >
          {spinning ? 'جاري السحب...' : 'العب الآن'}
        </button>

        {result && <h3 style={{ marginTop: '20px', color: result.includes("فوز") ? '#10b981' : '#ef4444' }}>{result}</h3>}
      </div>
    </div>
  );
}

export default App;
