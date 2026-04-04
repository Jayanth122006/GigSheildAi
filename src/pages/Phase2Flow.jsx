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
        <div className="mb-10 p-6 rounded-2xl shadow-xl text-center max-w-3xl mx-auto border" style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, #1a1a2e 100%)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-md">
              <Shield className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Phase 2: Automation & Protection</h1>
          <p className="text-lg text-blue-200 font-medium mb-4">
            End-to-End Parametric Insurance Simulation
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] uppercase tracking-widest font-bold text-white/60">
            <div className="p-2 border border-white/10 rounded-lg">1. Registration</div>
            <div className="p-2 border border-white/10 rounded-lg">2. ML Underwriting</div>
            <div className="p-2 border border-white/10 rounded-lg">3. IoT Oracles</div>
            <div className="p-2 border border-white/10 rounded-lg">4. Auto claims</div>
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
