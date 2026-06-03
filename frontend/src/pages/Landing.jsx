import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#fff', minHeight: '100vh' }}>

      {/* Navbar */}
      <header style={{ borderBottom: '1px solid #e8edf2', position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #2d6a4f, #40916c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M11 6H13V10H17V12H13V18H11V12H7V10H11V6Z" fill="white"/></svg>
            </div>
            <span style={{ fontSize: '20px', fontWeight: '700', color: '#1a2332', fontFamily: 'Georgia, serif' }}>Rx<span style={{ color: '#2d6a4f' }}>Recall</span></span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none', padding: '8px 20px', fontSize: '14px', fontWeight: '500', color: '#2d6a4f', border: '1.5px solid #2d6a4f', borderRadius: '8px' }}>Log In</Link>
            <Link to="/signup" style={{ textDecoration: 'none', padding: '8px 20px', fontSize: '14px', fontWeight: '600', color: '#fff', background: '#2d6a4f', borderRadius: '8px' }}>Get Started Free</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #f0faf5 0%, #e8f5e9 50%, #f0faf5 100%)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', background: '#d4edda', color: '#2d6a4f', fontSize: '12px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', marginBottom: '20px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              AI-Powered Health Assistant
            </div>
            <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#1a2332', lineHeight: '1.15', marginBottom: '20px', fontFamily: 'Georgia, serif' }}>
              Your complete health journey, <span style={{ color: '#2d6a4f' }}>organized by AI</span>
            </h1>
            <p style={{ fontSize: '17px', color: '#4a5568', lineHeight: '1.7', marginBottom: '36px', maxWidth: '480px' }}>
              Track symptoms, scan prescriptions, get doctor-ready summaries, and follow personalized recovery plans — all in one place.
            </p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Link to="/signup" style={{ textDecoration: 'none', padding: '14px 32px', background: '#2d6a4f', color: '#fff', borderRadius: '10px', fontSize: '15px', fontWeight: '600', boxShadow: '0 4px 14px rgba(45,106,79,0.3)' }}>
                Start for Free
              </Link>
              <Link to="/login" style={{ textDecoration: 'none', padding: '14px 24px', color: '#2d6a4f', fontSize: '15px', fontWeight: '500' }}>
                Already have account? Log in →
              </Link>
            </div>
            <div style={{ display: 'flex', gap: '32px', marginTop: '40px' }}>
              {[['10k+', 'Patients helped'], ['98%', 'Accuracy rate'], ['Free', 'Forever plan']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: '#2d6a4f' }}>{num}</div>
                  <div style={{ fontSize: '12px', color: '#718096', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview Card */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', border: '1px solid #e8edf2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fc8181' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f6ad55' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#68d391' }}></div>
              <span style={{ marginLeft: '8px', fontSize: '12px', color: '#a0aec0', fontFamily: 'monospace' }}>rxrecall.app/dashboard</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a2332', marginBottom: '16px' }}>Good morning, Rahul</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              {[['3/5', 'Medicines taken', '#f0faf5', '#2d6a4f'], ['7', 'Symptoms logged', '#fff8f0', '#c05621'], ['AI Ready', 'Doctor brief', '#2d6a4f', '#fff']].map(([val, label, bg, color]) => (
                <div key={label} style={{ background: bg, borderRadius: '12px', padding: '14px', border: '1px solid #e8edf2' }}>
                  <div style={{ fontSize: '18px', fontWeight: '800', color }}>{val}</div>
                  <div style={{ fontSize: '11px', color: bg === '#2d6a4f' ? 'rgba(255,255,255,0.8)' : '#718096', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
            {[['Metformin 500mg', 'After breakfast', true], ['Vitamin D3', 'After lunch', false], ['Paracetamol', 'If needed', false]].map(([med, time, taken]) => (
              <div key={med} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '8px', background: taken ? '#f0faf5' : '#f7f9fc', marginBottom: '6px', border: `1px solid ${taken ? '#c6f6d5' : '#e8edf2'}` }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: taken ? '#276749' : '#2d3748', textDecoration: taken ? 'line-through' : 'none' }}>{med}</div>
                  <div style={{ fontSize: '11px', color: '#a0aec0' }}>{time}</div>
                </div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: taken ? '#276749' : '#a0aec0', background: taken ? '#c6f6d5' : '#edf2f7', padding: '3px 8px', borderRadius: '20px' }}>
                  {taken ? 'Taken' : 'Pending'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1a2332', fontFamily: 'Georgia, serif', marginBottom: '12px' }}>Everything you need to manage your health</h2>
            <p style={{ fontSize: '16px', color: '#718096' }}>From symptoms to recovery — one intelligent platform</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { icon: '📋', title: 'Symptom Tracking', desc: 'Log daily symptoms with severity, body location and notes. Build a complete timeline.', color: '#ebf8ff', iconBg: '#bee3f8' },
              { icon: '🔬', title: 'Prescription OCR', desc: 'Upload prescription photos. AI reads handwriting and extracts all medicine details.', color: '#f0faf5', iconBg: '#c6f6d5' },
              { icon: '🧠', title: 'AI Doctor Brief', desc: 'Get a professional medical summary of your symptoms before every doctor visit.', color: '#faf5ff', iconBg: '#e9d8fd' },
              { icon: '🗓', title: 'Recovery Plans', desc: 'Personalized day-by-day recovery plan with diet, medicine schedule, and warnings.', color: '#fff8f0', iconBg: '#feebc8' },
            ].map(f => (
              <div key={f.title} style={{ background: f.color, borderRadius: '16px', padding: '24px', border: '1px solid #e8edf2' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: f.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '16px' }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1a2332', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontSize: '13px', color: '#718096', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 24px', background: '#f7f9fc' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1a2332', fontFamily: 'Georgia, serif', marginBottom: '12px' }}>How RxRecall works</h2>
          <p style={{ fontSize: '16px', color: '#718096', marginBottom: '56px' }}>Three simple steps to better health management</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { step: '01', title: 'Log your symptoms', desc: 'Record how you feel every day — severity, location, and notes. Takes less than 30 seconds.' },
              { step: '02', title: 'Visit your doctor', desc: 'Share the AI-generated summary with your doctor. They get full context immediately.' },
              { step: '03', title: 'Follow your recovery', desc: 'Upload your prescription. AI creates your personal recovery plan and medicine reminders.' },
            ].map(s => (
              <div key={s.step} style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '40px', fontWeight: '900', color: '#e8edf2', fontFamily: 'Georgia, serif', marginBottom: '12px' }}>{s.step}</div>
                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1a2332', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: '#718096', lineHeight: '1.7' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: '#2d6a4f' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Start managing your health today</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', marginBottom: '32px' }}>Free forever. No credit card required.</p>
          <Link to="/signup" style={{ textDecoration: 'none', display: 'inline-block', padding: '14px 40px', background: '#fff', color: '#2d6a4f', borderRadius: '10px', fontSize: '15px', fontWeight: '700' }}>
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1a2332', padding: '32px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#fff', fontFamily: 'Georgia, serif' }}>Rx<span style={{ color: '#40916c' }}>Recall</span></span>
          <span style={{ fontSize: '13px', color: '#718096' }}>Not a medical diagnosis tool. Always consult a licensed healthcare professional.</span>
        </div>
      </footer>
    </div>
  )
}

export default Landing