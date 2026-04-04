import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { Shield, Zap, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

const PLANS = [
  { id: 'basic', name: 'Basic', premium: 20, coverage: 200, color: 'text-main', icon: <Shield size={32} />, features: ['Coverage for Heavy Rain', 'Basic AI Alerts'] },
  { id: 'standard', name: 'Standard', premium: 30, coverage: 300, color: 'text-primary', highlight: true, icon: <ShieldCheck size={32} className="text-primary"/>, features: ['Rain & Extreme Heat', 'Priority AI Alerts', '24/7 Priority Support'] },
  { id: 'premium', name: 'Premium', premium: 50, coverage: 500, color: 'text-secondary', icon: <Zap size={32} className="text-secondary"/>, features: ['All Weather Events', 'AQI > 400 Coverage', 'Strikes & Curfews Coverage', 'Zero Deductible'] }
];

const Plans = () => {
  const { buyPlan, activePlan, walletBalance, user } = useAppContext();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const getDynamicPremium = (basePremium) => {
    if (user?.areaRisk === 'High Risk') return basePremium + 5;
    if (user?.areaRisk === 'Low Risk') return basePremium - 5;
    return basePremium;
  };

  const handleSelect = (plan) => {
    setSelectedPlan({ ...plan, premium: getDynamicPremium(plan.premium) });
    setShowPayment(true);
    setError(null);
  };

  const handlePurchase = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      // Simulate network request
      await new Promise(r => setTimeout(r, 1500));
      buyPlan(selectedPlan);
      setIsProcessing(false);
      setShowPayment(false);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setIsProcessing(false);
    }
  };

  return (
    <div className="animate-fade-in relative">
      <div className="mb-8 text-center max-w-2xl mx-auto">
         <h2 className="text-3xl font-bold mb-3">AI-Powered Income Protection</h2>
         <p className="text-muted">Choose a weekly plan that fits your needs. Premium is dynamically adjusted based on your city's historical risk data.</p>
      </div>

      {activePlan && (
         <div className="mb-8 p-4 glass-panel flex items-center gap-4 border-l-4 border-primary justify-center text-center">
            <CheckCircle2 className="text-primary" size={24} />
            <span className="font-semibold text-lg">You are currently protected by the {activePlan.name} Plan</span>
         </div>
      )}

      {user?.areaRisk && (
        <div className="mb-6 p-3 rounded text-center text-sm font-bold shadow-sm inline-block mx-auto left-1/2 relative -translate-x-1/2" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}>
           Dynamically adjusted for: <span className={user.areaRisk === 'High Risk' ? 'text-danger' : user.areaRisk === 'Low Risk' ? 'text-success' : 'text-primary'}>{user.areaRisk} Zone ({user.areaRisk === 'High Risk' ? '+₹5' : user.areaRisk === 'Low Risk' ? '-₹5' : 'Base Premium'})</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {PLANS.map((plan) => (
          <Card 
            key={plan.id} 
            className={`flex flex-col relative ${plan.highlight ? 'border-2 border-primary' : ''} ${activePlan?.name === plan.name ? 'border-2 border-success' : ''}`}
          >
            {plan.highlight && (
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold py-1 px-3 rounded-sm shadow-lg">
                 RECOMMENDED FOR YOU
               </div>
            )}
            
            <div className="text-center mb-6 mt-4">
              <div className="flex justify-center mb-4">{plan.icon}</div>
              <h3 className={`text-2xl font-bold mb-2 ${plan.color}`}>{plan.name}</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-sm text-muted">₹</span>
                <span className="text-4xl font-bold">{getDynamicPremium(plan.premium)}</span>
                <span className="text-sm text-muted">/week</span>
              </div>
            </div>

            <div className="p-4 mb-6 rounded-lg text-center" style={{ background: 'var(--bg-surface)' }}>
               <div className="text-sm text-muted mb-1">Guaranteed Auto-Payout</div>
               <div className="text-2xl font-bold text-success">₹{plan.coverage}</div>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
               {plan.features.map((feature, i) => (
                 <li key={i} className="flex items-start gap-2 text-sm text-main">
                   <div style={{ marginTop: '2px' }}><CheckCircle2 size={16} className="text-primary" /></div>
                   {feature}
                 </li>
               ))}
            </ul>

            <Button 
                fullWidth 
                variant={plan.highlight ? 'primary' : 'secondary'}
                disabled={activePlan?.name === plan.name}
                onClick={() => handleSelect(plan)}
            >
                {activePlan?.name === plan.name ? 'Current Plan' : 'Select Plan'}
            </Button>
          </Card>
        ))}
      </div>

      {showPayment && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'var(--bg-dark)' }}>
          <Card hover={false} className="w-full max-w-md animate-fade-in relative overflow-hidden" style={{ border: '1px solid var(--border-light)' }}>
            <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
            
            <div className="p-4 mb-6 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
               <div className="flex justify-between mb-2">
                 <span>Plan</span>
                 <span className="font-bold">{selectedPlan.name} Weekly</span>
               </div>
               <div className="flex justify-between text-sm text-muted mb-4 border-b pb-4" style={{ borderColor: 'var(--border-glass)' }}>
                 <span>Coverage</span>
                 <span>₹{selectedPlan.coverage} Limit</span>
               </div>
               <div className="flex justify-between items-center text-lg font-bold">
                 <span>Total Payable</span>
                 <span className="text-primary">₹{selectedPlan.premium}</span>
               </div>
            </div>

            <div className="mb-6 flex justify-between items-center text-sm p-3 rounded-md" style={{ background: 'rgba(255,255,255,0.05)' }}>
               <span>Wallet Balance</span>
               <span className={`font-bold ${walletBalance < selectedPlan.premium ? 'text-danger' : 'text-success'}`}>₹{walletBalance}</span>
            </div>

            {error && (
               <div className="flex items-center gap-2 text-danger text-sm mb-4 p-2 bg-danger bg-opacity-10 rounded">
                 <AlertCircle size={16}/> {error}
               </div>
            )}

            <div className="flex gap-3">
               <Button fullWidth variant="secondary" onClick={() => setShowPayment(false)} disabled={isProcessing}>Cancel</Button>
               <Button fullWidth variant="primary" onClick={handlePurchase} disabled={isProcessing}>
                  {isProcessing ? 'Processing UPI...' : `Pay ₹${selectedPlan.premium}`}
               </Button>
            </div>
            
            {isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-20">
                 <div className="w-12 h-12 border-4 border-t-primary border-transparent rounded-full animate-spin mb-4" />
                 <p className="font-bold tracking-wide">Awaiting UPI Confirmation...</p>
                 <p className="text-xs text-muted mt-2">Check your simulator device</p>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default Plans;
