import React from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { Users, Shield, Zap, AlertOctagon, Activity } from 'lucide-react';

const Admin = () => {
  return (
    <div className="animate-fade-in pb-10">
      <div className="mb-8 p-4 glass-panel border-secondary">
         <h2 className="text-2xl font-bold mb-2 text-secondary flex items-center gap-2"><Activity /> Global Command Center</h2>
         <p className="text-sm text-muted">Platform-wide analytics for GigShield AI underwriting and risk models.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card hover={false} className="p-4">
          <div className="text-sm text-muted mb-2 flex justify-between">Active Users <Users size={16}/></div>
          <div className="text-3xl font-bold">14,208</div>
          <div className="text-xs text-success flex mt-2 items-center"><span className="font-bold">+12%</span>&nbsp;this week</div>
        </Card>
        <Card hover={false} className="p-4 border-b-2 border-primary">
          <div className="text-sm text-muted mb-2 flex justify-between">Active Policies <Shield size={16} className="text-primary"/></div>
          <div className="text-3xl font-bold">12,450</div>
          <div className="text-xs text-main flex mt-2">87% coverage rate</div>
        </Card>
        <Card hover={false} className="p-4 border-b-2 border-success">
          <div className="text-sm text-muted mb-2 flex justify-between">Auto-Claim Payouts <Zap size={16} className="text-success"/></div>
          <div className="text-3xl font-bold">₹4.2M</div>
          <div className="text-xs text-main flex mt-2">0 manual interventions</div>
        </Card>
        <Card hover={false} className="p-4 border-b-2 border-danger">
          <div className="text-sm text-muted mb-2 flex justify-between">Fraud Blocked <AlertOctagon size={16} className="text-danger"/></div>
          <div className="text-3xl font-bold">428</div>
          <div className="text-xs text-danger mt-2">Isolation Forest Model Active</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hover={false} className="flex flex-col">
          <h3 className="font-bold mb-4">Risk Level Heatmap</h3>
          <div className="flex-1 rounded-lg overflow-hidden relative" style={{ minHeight: '300px', background: '#f8f9fa', border: '1px solid var(--border-glass)' }}>
             <div className="absolute inset-0 opacity-50" style={{ 
               backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }} />
             
             <div className="absolute w-32 h-32 rounded-full bg-danger opacity-50 blur-3xl top-10 left-10 animate-pulse" />
             <div className="absolute w-48 h-48 rounded-full bg-warning opacity-30 blur-3xl bottom-10 right-20" />
             <div className="absolute w-24 h-24 rounded-full bg-primary opacity-40 blur-2xl top-1/2 left-1/2" />
             
             <div className="absolute bottom-4 left-4 right-4 p-3 glass-panel text-xs flex justify-between items-center backdrop-blur-xl">
                <span>Bangalore Grid (Zone A)</span>
                <div className="flex gap-2">
                   <div className="flex items-center gap-1"><div className="w-2 h-2 bg-danger rounded-full"/> High</div>
                   <div className="flex items-center gap-1"><div className="w-2 h-2 bg-warning rounded-full"/> Med</div>
                   <div className="flex items-center gap-1"><div className="w-2 h-2 bg-success rounded-full"/> Low</div>
                </div>
             </div>
          </div>
        </Card>

        <Card hover={false} className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold">ML Prediction Stream</h3>
             <Badge variant="neutral" className="animate-pulse">Live</Badge>
          </div>
          <div className="p-4 rounded-md flex-1 font-mono text-xs overflow-y-auto" style={{ background: 'var(--bg-dark)', maxHeight: '300px', border: '1px solid var(--border-glass)' }}>
             <div className="text-muted pb-2">[SYS] Connecting to OWM API... OK</div>
             <div className="text-muted pb-2">[ML] Running Random Forest inference...</div>
             <div className="text-secondary pb-2">[PREDICT] Bangalore_South: Heatwave Prob: 0.12 (Low)</div>
             <div className="text-secondary pb-2">[PREDICT] Bangalore_North: Rain Prob: 0.88 (High)</div>
             <div className="text-warning pb-2">[ALERT] Trigger condition met for Zomato Workers in North Zone.</div>
             <div className="text-success pb-2">[ACTION] Expanding parametric bounds for Standard Tier.</div>
             <div className="text-muted pb-2">[SYS] Awaiting new data block...</div>
             <div className="text-muted pb-2">[SYS] Heartbeat OK</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
