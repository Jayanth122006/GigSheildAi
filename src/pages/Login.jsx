import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { ShieldAlert, Smartphone, MapPin, Briefcase } from 'lucide-react';

const Login = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();
  
  const [mode, setMode] = useState('login');
  const [step, setStep] = useState(1);
  
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [profile, setProfile] = useState({ 
    name: '', 
    city: 'Bangalore', 
    platform: 'Zomato',
    areaRisk: 'Medium Risk',
    workingHours: '8',
    workingDays: '6'
  });

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (phone.length === 10) setStep(2);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp === '1234') {
       if (mode === 'signup') {
         setStep(3);
       } else {
         login({ name: 'Welcome Back Worker', phone, city: 'Bangalore', platform: 'Swiggy', areaRisk: 'Medium Risk' });
         navigate('/');
       }
    }
  };

  const handleComplete = (e) => {
    e.preventDefault();
    login({ ...profile, phone });
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative p-4" style={{ background: 'var(--bg-dark)' }}>
      
      <Card hover={false} className="w-full max-w-md relative z-10 animate-fade-in my-8" style={{ borderTop: '4px solid var(--primary)' }}>
        <div className="flex flex-col items-center mb-8 text-center pt-2">
           <div className="p-3 mb-6 flex items-center justify-center rounded-2xl" style={{ background: 'var(--primary-glow)' }}>
             <ShieldAlert size={40} className="text-primary" />
           </div>
           <h1 className="text-3xl font-extrabold text-main mb-2 tracking-tight">GigShield AI</h1>
           <p className="text-muted text-sm px-4 font-medium leading-relaxed">Parametric income protection against extreme weather.</p>
        </div>

        {step === 1 && (
          <div className="flex p-1 rounded-lg mb-8" style={{ background: 'var(--bg-dark)' }}>
            <button 
              className="flex-1 py-2 text-sm font-semibold rounded-md transition-all border-none"
              style={{ background: mode === 'login' ? 'var(--bg-surface)' : 'transparent', color: mode === 'login' ? 'var(--text-main)' : 'var(--text-muted)', boxShadow: mode === 'login' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer' }}
              onClick={() => { setMode('login'); setPhone(''); setOtp(''); }}
            >
              Login
            </button>
            <button 
              className="flex-1 py-2 text-sm font-semibold rounded-md transition-all border-none"
              style={{ background: mode === 'signup' ? 'var(--bg-surface)' : 'transparent', color: mode === 'signup' ? 'var(--text-main)' : 'var(--text-muted)', boxShadow: mode === 'signup' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer' }}
              onClick={() => { setMode('signup'); setPhone(''); setOtp(''); }}
            >
              Sign Up
            </button>
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSendOTP} className="flex flex-col gap-5 animate-fade-in">
            <div>
              <label className="text-sm font-bold text-main mb-2 block">Mobile Number</label>
              <div className="flex items-center p-3 rounded-lg border focus-within:border-main transition-colors" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-light)' }}>
                <Smartphone size={18} className="text-muted mr-3" />
                <span className="text-main font-semibold mr-2">+91</span>
                <input 
                  type="text" 
                  maxLength={10} 
                  required
                  placeholder="Enter 10 digit number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="bg-transparent border-none outline-none text-black flex-1 w-full font-medium"
                />
              </div>
            </div>
            <Button fullWidth type="submit" disabled={phone.length < 10}>
               {mode === 'login' ? 'Login via OTP' : 'Sign Up via OTP'}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerify} className="flex flex-col gap-4 animate-fade-in">
            <div className="text-center mb-2">
               <p className="text-sm font-medium text-black">OTP sent to +91 {phone}</p>
               <p className="text-xs text-primary font-bold mt-1">(Use 1234 for demo)</p>
            </div>
            <div>
              <label className="text-sm font-bold text-black mb-2 block text-center">Enter OTP</label>
              <div className="flex gap-2 justify-center">
                 <input 
                    type="text" 
                    maxLength={4} 
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="text-center text-xl font-bold rounded border bg-white text-black"
                    style={{ outline: 'none', borderColor: 'var(--border-glass)', width: '120px', padding: '0.75rem', letterSpacing: '8px' }}
                  />
              </div>
            </div>
            <Button fullWidth type="submit" disabled={otp.length !== 4}>Verify OTP</Button>
            <button type="button" onClick={() => setStep(1)} className="text-xs text-muted hover:text-black mt-2 bg-transparent border-none appearance-none cursor-pointer">
              ← Back to mobile entry
            </button>
          </form>
        )}

        {step === 3 && mode === 'signup' && (
          <form onSubmit={handleComplete} className="flex flex-col gap-4 animate-fade-in">
             <h3 className="text-lg font-bold text-black text-center mb-2">Complete Profile</h3>
             
             <div>
              <label className="text-sm font-bold text-black mb-2 block">Full Name</label>
              <input 
                type="text" 
                required
                placeholder="Rahul Kumar" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full p-3 rounded border bg-white text-black font-medium outline-none focus:border-black"
                style={{ borderColor: 'var(--border-light)' }}
              />
            </div>

            <div>
              <label className="text-sm font-bold text-black mb-2 block flex items-center gap-1"><MapPin size={16}/> City</label>
              <select 
                value={profile.city}
                onChange={(e) => setProfile({...profile, city: e.target.value})}
                className="w-full p-3 rounded border bg-white text-black font-medium outline-none focus:border-black"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-black mb-2 block flex items-center gap-1"><Briefcase size={16}/> Delivery Platform</label>
              <div className="flex gap-3">
                {['Zomato', 'Swiggy', 'Zepto'].map(p => (
                   <div 
                      key={p} 
                      onClick={() => setProfile({...profile, platform: p})}
                      className="flex-1 p-3 text-center rounded-lg cursor-pointer transition-all text-sm font-bold border"
                      style={{ 
                        background: profile.platform === p ? 'var(--secondary)' : 'var(--bg-dark)',
                        borderColor: profile.platform === p ? 'var(--secondary)' : 'var(--border-light)',
                        color: profile.platform === p ? 'white' : 'var(--text-muted)'
                      }}
                   >
                      {p}
                   </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="text-sm font-bold text-black mb-2 block">Working Hours/Day</label>
                 <input 
                   type="number" 
                   min="1" max="24" required
                   value={profile.workingHours}
                   onChange={(e) => setProfile({...profile, workingHours: e.target.value})}
                   className="w-full p-3 rounded border bg-white text-black font-medium outline-none focus:border-black"
                   style={{ borderColor: 'var(--border-light)' }}
                 />
              </div>
              <div>
                 <label className="text-sm font-bold text-black mb-2 block">Working Days/Week</label>
                 <input 
                   type="number" 
                   min="1" max="7" required
                   value={profile.workingDays}
                   onChange={(e) => setProfile({...profile, workingDays: e.target.value})}
                   className="w-full p-3 rounded border bg-white text-black font-medium outline-none focus:border-black"
                   style={{ borderColor: 'var(--border-light)' }}
                 />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-black mb-2 block flex items-center gap-1"><ShieldAlert size={16}/> Area Risk Zone</label>
              <select 
                value={profile.areaRisk}
                onChange={(e) => setProfile({...profile, areaRisk: e.target.value})}
                className="w-full p-3 rounded border bg-white text-black font-medium outline-none focus:border-black"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <option value="Low Risk">Low Risk (Fewer Disruptions)</option>
                <option value="Medium Risk">Medium Risk (Standard)</option>
                <option value="High Risk">High Risk (Prone to Floods/Heat)</option>
              </select>
            </div>

            <Button fullWidth type="submit" className="mt-4" disabled={!profile.name}>Create Account</Button>
          </form>
        )}
      </Card>
      
    </div>
  );
};

export default Login;
