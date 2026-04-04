import React from 'react';
import Card from './Card';
import Badge from './Badge';
import { ShieldCheck, CalendarClock, History } from 'lucide-react';

const ClaimsSection = ({ claims }) => {
  return (
    <Card hover={false} className="w-full">
      <div className="flex items-center justify-between mb-6 pb-2 border-b" style={{ borderColor: 'var(--border-light)' }}>
         <div className="flex items-center gap-2">
            <Badge variant="success">Step 4: Claim Output</Badge>
            <h2 className="text-xl font-bold ml-2">Auto-Claims Ledger</h2>
         </div>
         <span className="text-xs text-muted font-bold flex items-center gap-1"><History size={14}/> {claims.length} Processed</span>
      </div>

      {claims.length === 0 ? (
        <div className="text-center p-8 text-muted rounded-lg border-dashed border-2" style={{ borderColor: 'var(--border-glass)' }}>
          <CalendarClock size={40} className="mx-auto mb-3 opacity-20" />
          <p className="font-bold text-sm">Awaiting Disruption Data</p>
          <p className="text-xs mt-1">Simulate an event to instantly generate a parametric claim.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {claims.map((claim) => (
             <div key={claim.id} className="p-4 rounded-lg animate-fade-in border-l-4" style={{ background: 'var(--bg-surface)', borderLeftColor: 'var(--success)', borderTop: '1px solid var(--border-glass)', borderRight: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                     <ShieldCheck size={18} className="text-success" />
                     <span className="font-bold text-sm">{claim.event}</span>
                  </div>
                  <Badge variant="success">Disbursement Sent</Badge>
                </div>
                
                <p className="text-success font-semibold text-sm mb-3">
                  System message: Disruption detected. ₹{claim.amount} credited as compensation.
                </p>

                <div className="flex justify-between text-xs text-muted">
                  <span>Tx ID: {claim.id}</span>
                  <span>{claim.time}</span>
                </div>
             </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ClaimsSection;
