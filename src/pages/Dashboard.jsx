import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { TrendingUp, CloudRain, Wind, AlertTriangle, ShieldCheck, ShieldAlert, ArrowRight, Zap, RefreshCw, Wallet } from 'lucide-react';

const Dashboard = () => {
  const { user, earnings, activePlan, weatherCondition, aqiLevel, riskLevel, walletBalance, resetSimulation } = useAppContext();
  const navigate = useNavigate();

  const getRiskColor = (level) => {
    switch(level) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      default: return 'success';
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      {/* Risk Alert Banner */}
      {riskLevel === 'High' && (
        <div className="glass-panel p-4 flex items-center justify-between" style={{ background: 'var(--danger-bg)', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
          <div className="flex items-center gap-4">
             <div className="p-2 bg-danger bg-opacity-20 rounded-full text-danger flex items-center justify-center animate-pulse" style={{ background: 'var(--danger)' }}>
                <AlertTriangle size={24} color="white" />
             </div>
             <div>
                <h3 className="font-bold text-danger text-lg m-0">Severe Disruption Detected</h3>
                <p className="text-sm font-medium mt-1">Current Condition: {weatherCondition}. Avoid outdoor travel. {activePlan ? 'Auto claim initiated.' : ''}</p>
             </div>
          </div>
          <Button variant="danger" size="sm" onClick={resetSimulation}><RefreshCw size={14}/> Reset Demo</Button>
        </div>
      )}

      {/* Top row: Earnings & Active Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Earnings Card */}
        <Card hover={false} className="flex flex-col justify-between" style={{ minHeight: '180px' }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm text-muted mb-1">Estimated Weekly Earnings</div>
              <div className="text-4xl font-bold flex items-center gap-2">
                ₹{earnings.toLocaleString()} <TrendingUp size={24} className={riskLevel === 'High' ? 'text-danger' : 'text-success'} />
              </div>
            </div>
            <div className="p-3 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
               <Badge variant={riskLevel === 'High' ? 'danger' : 'success'}>
                  {riskLevel === 'High' ? '-20% Income Hit' : 'On Track'}
               </Badge>
            </div>
          </div>
          <div className="text-sm text-muted flex items-center justify-between border-t pt-4" style={{ borderColor: 'var(--border-glass)' }}>
            <span>Projected loss due to weather:</span>
            <span className="font-bold text-main">₹{riskLevel === 'High' ? '2,400' : '0'}</span>
          </div>
        </Card>

        {/* Active Policy Card */}
        <Card hover={false} className="relative overflow-hidden" style={{ minHeight: '180px' }}>
          {activePlan ? (
             <div className="flex flex-col h-full justify-between z-10 relative">
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldCheck size={20} className="text-primary" />
                      <div className="text-sm font-bold text-primary tracking-widest uppercase">Active Plan</div>
                    </div>
                    <div className="text-2xl font-bold">{activePlan.name} Cover</div>
                  </div>
                  <Badge variant="primary">Active</Badge>
               </div>
               
               <div className="grid grid-cols-2 gap-4 border-t pt-4 mt-auto" style={{ borderColor: 'var(--border-glass)' }}>
                  <div>
                    <div className="text-xs text-muted mb-1">Weekly Premium</div>
                    <div className="font-semibold text-lg">₹{activePlan.premium}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted mb-1">Guaranteed Payout</div>
                    <div className="font-semibold text-lg text-success">₹{activePlan.coverage}</div>
                  </div>
               </div>
               
               {/* Background glowing shield effect */}
               <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
                  <ShieldCheck size={180} />
               </div>
             </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-full text-center p-2 z-10 relative">
                <ShieldAlert size={40} className="text-warning mb-3" />
                <h3 className="font-bold text-lg mb-1">No Active Protection</h3>
                <p className="text-sm text-muted mb-4">You are vulnerable to income loss from upcoming weather events.</p>
                <Button variant="primary" size="sm" onClick={() => navigate('/plans')}>Browse Plans <ArrowRight size={16} /></Button>
             </div>
          )}
        </Card>
      </div>

      {/* Real-time Environment Analytics */}
      <h2 className="text-xl font-bold mt-4 mb-2">Real-Time Risk Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
            <CloudRain size={24} className="text-primary" />
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wider mb-1">Current Weather</div>
            <div className="font-bold text-lg">{weatherCondition}</div>
          </div>
        </Card>
        
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
            <Wind size={24} className="text-success" />
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wider mb-1">AQI Status</div>
            <div className="font-bold text-lg">{aqiLevel}</div>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-surface)' }}>
            <Zap size={24} className="text-warning" />
          </div>
          <div className="flex-1">
             <div className="text-xs text-muted uppercase tracking-wider mb-1">AI Risk Score</div>
             <div className="flex justify-between items-center mb-1">
               <span className="font-bold text-lg tracking-wide">{riskLevel}</span>
             </div>
             <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-light)' }}>
               <div className="h-full rounded-full transition-all duration-1000" style={{ 
                 width: riskLevel === 'High' ? '90%' : riskLevel === 'Medium' ? '50%' : '15%',
                 background: `var(--${getRiskColor(riskLevel)})` 
               }} />
             </div>
          </div>
        </Card>
      </div>
      
      {/* Wallet Preview */}
      <Card hover={true} onClick={() => navigate('/wallet')} className="mt-4 flex items-center justify-between border border-transparent hover:border-primary">
         <div className="flex items-center gap-4">
            <div className="p-4 rounded-md" style={{ background: 'var(--primary)' }}>
               <Wallet size={32} color="white" />
            </div>
            <div>
               <div className="text-sm text-muted">Available Wallet Balance</div>
               <div className="text-3xl font-bold">₹{walletBalance.toLocaleString()}</div>
            </div>
         </div>
         <div className="text-primary font-bold flex items-center gap-1 group">
             Go to Wallet <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
         </div>
      </Card>
      
    </div>
  );
};

export default Dashboard;
