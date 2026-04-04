import React from 'react';
import Card from './Card';
import Button from './Button';
import Badge from './Badge';
import { ShieldCheck, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';

const PolicyCard = ({ user, onAccept }) => {
  const basePremium = 20;
  
  // Dynamic Premium & Coverage Calculation (AI Predictive Model)
  let dynamicPremium = basePremium;
  let coverageHours = 40; // Default weekly protected hours
  let modifierText = 'Standard Area Rate';
  let isHighRisk = false;
  let isLowRisk = false;

  if (user.areaRisk.includes('High Risk')) {
    dynamicPremium += 5;
    coverageHours = 35; // Reduced coverage hours in extremely volatile zones
    modifierText = '+₹5 Risk Surcharge';
    isHighRisk = true;
  } else if (user.areaRisk.includes('Low Risk')) {
    dynamicPremium -= 2; // Matches screenshot: ₹2 less per week in safe zones
    coverageHours = 60; // Bonus: Increased coverage hours for safer predictive zones
    modifierText = '-₹2 Safe Zone Discount';
    isLowRisk = true;
  } else {
    coverageHours = 48; // Standard
  }

  const coverage = 300; // Base coverage per event

  return (
    <Card hover={false} className="w-full max-w-lg mx-auto relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <ShieldCheck size={120} />
      </div>

      <div className="text-center mb-6 relative z-10">
         <div className="flex justify-center gap-2 mb-4">
           <Badge variant="primary">Step 2: Policy Offer</Badge>
           <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">AI Risk Model v2.4</Badge>
         </div>
         <h2 className="text-2xl font-bold mb-1">{user.name}'s {user.category} Plan</h2>
         <p className="text-sm text-muted">Machine Learning adjustment for <b>{user.city}</b> ({user.areaRisk})</p>
      </div>

      <div className="p-4 mb-6 rounded-lg relative z-10" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)' }}>
         <div className="flex justify-between items-center mb-4 pb-4 border-b" style={{ borderColor: 'var(--border-light)' }}>
           <div>
             <div className="text-sm text-muted mb-1">Weekly Premium</div>
             <div className="text-3xl font-bold text-primary flex items-end gap-1">
               ₹{dynamicPremium} <span className="text-sm text-muted font-normal mb-1">/ wk</span>
             </div>
           </div>

           <div className="text-right">
             <div className="text-sm text-muted mb-1">Weekly Coverage</div>
             <div className="text-3xl font-bold text-success flex items-end justify-end gap-1">
               {coverageHours} <span className="text-sm text-muted font-normal mb-1">hrs/wk</span>
             </div>
           </div>
         </div>

         <div className="flex flex-col gap-2">
           <div className="flex items-center justify-between text-sm">
             <span className="text-muted">Base Premium</span>
             <span className="font-semibold">₹{basePremium}</span>
           </div>
           {(isHighRisk || isLowRisk) && (
             <div className="flex items-center justify-between text-sm">
               <span className="text-muted flex items-center gap-1">
                 {isHighRisk ? <TrendingUp size={14} className="text-danger" /> : <TrendingDown size={14} className="text-success" />}
                 Risk Adjustment
               </span>
               <span className={`font-semibold ${isHighRisk ? 'text-danger' : 'text-success'}`}>
                 {modifierText}
               </span>
             </div>
           )}
           <div className="flex items-center justify-between text-sm">
             <span className="text-muted">Assigned Zone</span>
             <span className="font-semibold">{user.areaRisk} ({user.city})</span>
           </div>
         </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-sm mb-3">Covered Parametric Triggers</h4>
        <ul className="flex flex-col gap-2">
           <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-success" /> Torrential Rainfall (&gt;65mm/hr)</li>
           <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-success" /> Severe Heatwave (&gt;43°C)</li>
           <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-success" /> High Pollution (AQI &gt; 400)</li>
        </ul>
      </div>

      <Button fullWidth onClick={() => onAccept({ premium: dynamicPremium, coverage })} variant="secondary" className="border-primary text-primary">
        Accept Policy & Proceed
      </Button>
    </Card>
  );
};

export default PolicyCard;
