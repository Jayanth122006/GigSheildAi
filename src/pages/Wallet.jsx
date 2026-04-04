import React from 'react';
import { useAppContext } from '../context/AppContext';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { Wallet as WalletIcon, Download, AlertTriangle, ShieldCheck, CreditCard, ChevronRight, Zap } from 'lucide-react';

const Wallet = () => {
  const { walletBalance, claims, activePlan, addMoney, simulateDisruption } = useAppContext();

  return (
    <div className="animate-fade-in pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex flex-col gap-6">
           <Card hover={false} className="flex flex-col items-center justify-center text-center p-8 border-t-4" style={{ borderTopColor: 'var(--primary)', minHeight: '260px' }}>
              <div className="p-4 rounded-md mb-4" style={{ background: 'var(--primary)' }}>
                 <WalletIcon size={40} color="white" />
              </div>
              <div className="text-sm text-muted uppercase tracking-widest mb-2">Available Balance</div>
              <div className="text-5xl font-bold mb-6">₹{walletBalance.toLocaleString()}</div>
              
              <div className="flex w-full gap-3">
                 <Button fullWidth variant="secondary" onClick={() => addMoney(100)}>+ ₹100</Button>
                 <Button fullWidth variant="secondary" onClick={() => addMoney(500)}>+ ₹500</Button>
              </div>
           </Card>

           <Card className="border border-warning">
             <div className="flex items-center gap-2 mb-4 text-warning">
                <AlertTriangle size={20} />
                <h3 className="font-bold">Demo Tools</h3>
             </div>
             <p className="text-sm text-muted mb-4">Trigger an external weather disruption to see parametric auto-claims in action.</p>
             <div className="flex flex-col gap-3">
               <Button fullWidth variant="danger" onClick={() => simulateDisruption('Heavy Torrential Rain 🌧️')}>Trigger Heavy Rain</Button>
               <Button fullWidth style={{ background: 'var(--warning)', color: '#000' }} onClick={() => simulateDisruption('Extreme Heatwave 🔥')}>Trigger Heatwave</Button>
               <Button fullWidth style={{ background: 'var(--secondary)', color: 'white' }} onClick={() => simulateDisruption('Severe AQI 🌫️')}>Trigger Severe AQI</Button>
             </div>
           </Card>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
           <Card hover={false} className="flex-1">
              <div className="flex items-center justify-between mb-6 border-b pb-4" style={{ borderColor: 'var(--border-glass)' }}>
                <h3 className="flex items-center gap-2 text-xl font-bold"><ShieldCheck className="text-success"/> Auto-Claim History</h3>
                <Badge variant="success">Fully Automated</Badge>
              </div>
              
              {claims.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-48 text-muted">
                    <CheckCircle2Icon size={48} className="mb-4 opacity-50" />
                    <p>No claims triggered yet.</p>
                    <p className="text-xs mt-2 text-center max-w-sm">When a parameter is met (e.g. rain &gt; 50mm), the smart contract auto-triggers payouts here.</p>
                 </div>
              ) : (
                 <div className="flex flex-col gap-4">
                    {claims.map((claim, idx) => (
                       <div key={idx} className="flex items-center justify-between p-4 rounded-md" style={{ background: 'var(--bg-surface)', borderLeft: '4px solid var(--success)' }}>
                          <div className="flex items-center gap-4">
                             <div className="p-2 rounded-md text-success pl-4" style={{ background: 'transparent' }}>
                                <CreditCard size={20} className="text-success" />
                             </div>
                             <div>
                                <div className="font-bold">{claim.type} Coverage</div>
                                <div className="text-xs text-muted">ID: {claim.id} • {claim.date}</div>
                             </div>
                          </div>
                          <div className="text-right">
                             <div className="font-bold text-lg text-success">+ ₹{claim.amount}</div>
                             <Badge variant="success" className="mt-1">Approved & Paid</Badge>
                          </div>
                       </div>
                    ))}
                 </div>
              )}
           </Card>

           <Card className="p-0 overflow-hidden">
             <div className="p-4 border-b border-border-glass" style={{ background: 'var(--bg-surface)' }}>
                <h3 className="font-bold text-primary flex items-center gap-2"><Zap size={18}/> Smart Contract Flow</h3>
             </div>
             <div className="p-6 flex items-center justify-between gap-2 overflow-x-auto text-sm">
                <div className="flex flex-col items-center text-center gap-2 flex-1 min-w-[100px]">
                   <div className="w-10 h-10 rounded-full bg-surface border border-primary flex items-center justify-center text-primary"><ShieldCheck size={18}/></div>
                   <span className="font-medium text-xs">Active Plan</span>
                </div>
                <ChevronRight className="text-muted" />
                <div className="flex flex-col items-center text-center gap-2 flex-1 min-w-[100px]">
                   <div className="w-10 h-10 rounded-full bg-surface border border-warning flex items-center justify-center text-warning"><AlertTriangle size={18}/></div>
                   <span className="font-medium text-xs">API Detects Event</span>
                </div>
                <ChevronRight className="text-muted" />
                <div className="flex flex-col items-center text-center gap-2 flex-1 min-w-[100px]">
                   <div className="w-10 h-10 rounded-full bg-surface border border-secondary flex items-center justify-center text-secondary"><CreditCard size={18}/></div>
                   <span className="font-medium text-xs">Validation</span>
                </div>
                <ChevronRight className="text-muted" />
                <div className="flex flex-col items-center text-center gap-2 flex-1 min-w-[100px]">
                   <div className="w-10 h-10 rounded-full bg-surface border border-success flex items-center justify-center text-success"><WalletIcon size={18}/></div>
                   <span className="font-medium text-xs text-success">Instant Payout</span>
                </div>
             </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

function CheckCircle2Icon(props) {
  return <ShieldCheck {...props} />;
}

export default Wallet;
