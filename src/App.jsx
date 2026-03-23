import React, { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState({ balance: 0, name: "لاعب رويال" });
  const [bet, setBet] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [side, setSide] = useState('head'); // head or tail

  // دالة الإيداع (تفتح واتساب أو تظهر رقم فودافون كاش)
  const handleDeposit = () => {
    const phoneNumber = "010XXXXXXXX"; // حط رقمك هنا
    alert(`لإتمام الإيداع، قم بتحويل المبلغ إلى: ${phoneNumber} ثم أرسل صورة التحويل للدعم.`);
    window.open(`https://wa.me/20${phoneNumber.substring(1)}?text=اريد_شحن_رصيد`);
  };

  const play = (chosenSide) => {
    if (user.balance < bet) return alert("رصيدك غير كافٍ! اشحن الآن.");
    setIsSpinning(true);
    
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'head' : 'tail';
      setSide(result);
      setIsSpinning(false);
      
      if (chosenSide === result) {
        setUser(prev => ({ ...prev, balance: prev.balance + bet }));
        alert("مبروك! كسبت ضعف الرهان 🎉");
      } else {
        setUser(prev => ({ ...prev, balance: prev.balance - bet }));
        alert("حظ أوفر المرة القادمة 💸");
      }
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>
      {/* Header */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#1e293b' }}>
        <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#fbbf24' }}>ROYAL FLIP 👑</div>
        <div style={{ backgroundColor: '#0f172a', padding: '5px 15px', borderRadius: '10px' }}>
          الرصيد: <span style={{ color: '#10b981' }}>{user.balance} ج.م</span>
        </div>
      </nav>

      {/* Game Body */}
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <div className={`coin ${isSpinning ? 'spinning' : ''}`} style={{
          width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#fbbf24',
          margin: '0 auto', fontSize: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px #fbbf24', transition: '2s'
        }}>
          {side === 'head' ? '🤴' : '🦅'}
        </div>

        <h2 style={{ marginTop: '30px' }}>اختار وجه العملة والعب</h2>
        
        <div style={{ margin: '20px' }}>
          <input type="number" value={bet} onChange={(e) => setBet(Number(e.target.value))} 
            style={{ padding: '10px', borderRadius: '5px', width: '100px', textAlign: 'center' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button onClick={() => play('head')} disabled={isSpinning} style={btnStyle('#fbbf24')}>ملك</button>
          <button onClick={() => play('tail')} disabled={isSpinning} style={btnStyle('#94a3b8')}>كتابة</button>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ position: 'fixed', bottom: '20px', width: '100%', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={handleDeposit} style={actionBtn('#10b981')}>إيداع 💰</button>
        <button onClick={() => alert('سيتم مراجعة طلب السحب')} style={actionBtn('#ef4444')}>سحب 💳</button>
      </div>

      <style>{`
        .spinning { transform: rotateY(1800deg); }
      `}</style>
    </div>
  );
}

const btnStyle = (bg) => ({ padding: '15px 30px', backgroundColor: bg, color: 'black', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' });
const actionBtn = (bg) => ({ padding: '12px 25px', backgroundColor: bg, color: 'white', border: 'none', borderRadius: '50px', fontWeight: 'bold' });

export default App;
