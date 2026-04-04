import React, { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import PolicyCard from '../components/PolicyCard';
import TriggerPanel from '../components/TriggerPanel';
import ClaimsSection from '../components/ClaimsSection';
import { Shield } from 'lucide-react';

const Phase2Flow = () => {
  // Navigation State
  const [step, setStep] = useState(1);

  // App Data State
  const [user, setUser] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [claims, setClaims] = useState([]);

  // Sequence Handlers
  const handleRegistration = (data) => {
    setUser(data);
    setStep(2);
  };

  const handleAcceptPolicy = (policyDetails) => {
    setPolicy(policyDetails);
    setStep(3);
  };

  const handleSimulateDisruption = (eventType, compensationAmount) => {
    const newClaim = {
      id: `CLM-${Math.floor(100000 + Math.random() * 900000)}`,
      event: eventType,
      amount: compensationAmount,
      time: new Date().toLocaleTimeString()
    };
    
    // Add to top of list
    setClaims([newClaim, ...claims]);
  };

  return (
     <div className="animate-fade-in pb-10">
         <div className="mb-12 p-10 rounded-[32px] text-center max-w-4xl mx-auto border glass-panel transition-none hover:transform-none" style={{ background: 'var(--secondary)', borderColor: 'rgba(255,255,255,0.05)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
           <div className="flex justify-center mb-6">
             <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10">
               <Shield className="text-primary" size={40} />
             </div>
           </div>
           <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Phase 2: Automation & Protection</h1>
           <p className="text-lg text-white/60 font-medium mb-8 max-w-lg mx-auto">
             Real-time Underwriting, Smart Oracles & Automated Parametric Claims
           </p>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] uppercase tracking-[0.2em] font-black">
             <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-white/40">1. Registration</div>
             <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-white/40">2. ML Underwriting</div>
             <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-white/40">3. IoT Oracles</div>
             <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-white/40">4. Auto Claims</div>
           </div>
         </div>

       {/* Step 1: Registration form */}
       {step === 1 && (
         <RegistrationForm onSubmit={handleRegistration} />
       )}

       {/* Step 2: Policy Card Generation */}
       {step === 2 && user && !policy && (
         <PolicyCard user={user} onAccept={handleAcceptPolicy} />
       )}

       {/* Step 3: Simulation Environment */}
       {step === 3 && policy && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
           <TriggerPanel onTrigger={handleSimulateDisruption} />
           <ClaimsSection claims={claims} />
         </div>
       )}

       {/* Dev breadcrumb navigation for reseting state easily */}
       {step > 1 && (
         <div className="text-center mt-12">
            <button 
              onClick={() => { setStep(1); setUser(null); setPolicy(null); setClaims([]); }}
              className="text-xs text-muted hover:text-black font-semibold bg-transparent border-none cursor-pointer underline decoration-dotted"
            >
              Restart Simulation Flow
            </button>
         </div>
       )}
    </div>
  );
};

export default Phase2Flow;
