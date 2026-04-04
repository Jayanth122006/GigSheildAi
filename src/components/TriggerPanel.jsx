import React from 'react';
import Card from './Card';
import Button from './Button';
import Badge from './Badge';
import { CloudRain, Zap, Wind, AlertTriangle } from 'lucide-react';

const TriggerPanel = ({ onTrigger }) => {
  return (
    <Card hover={false} className="w-full relative overflow-hidden" style={{ borderTop: '4px solid var(--warning)' }}>
      <div className="text-center mb-6">
         <Badge variant="warning" className="mb-4 text-black">Step 3: Automated Monitoring</Badge>
         <h2 className="text-2xl font-bold mb-1">Oracle Triggers</h2>
         <p className="text-sm text-muted">Simulate hyper-local IoT/Satellite data confirming a disruption event.</p>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <Button 
           variant="secondary" 
           className="w-full flex items-center justify-start py-5 px-6 transition-all hover:border-primary/30" 
           onClick={() => onTrigger('Heavy Rain (>65mm)', 300)}
           style={{ border: '1px solid var(--border-glass)', borderRadius: '16px' }}
        >
           <div className="p-3 rounded-xl mr-4" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
             <CloudRain size={22} className="text-blue-500" />
           </div>
           <div className="text-left">
             <div className="font-bold text-main text-base">Severe Rain Storm</div>
             <div className="text-xs text-muted font-medium uppercase tracking-wider">IoT Sensor: Parametric ₹300</div>
           </div>
        </Button>

        <Button 
           variant="secondary" 
           className="w-full flex items-center justify-start py-5 px-6 transition-all hover:border-primary/30" 
           onClick={() => onTrigger('Heatwave (>43°C)', 300)}
           style={{ border: '1px solid var(--border-glass)', borderRadius: '16px' }}
        >
           <div className="p-3 rounded-xl mr-4" style={{ background: 'var(--warning-bg)' }}>
             <Zap size={22} className="text-warning" />
           </div>
           <div className="text-left">
             <div className="font-bold text-main text-base">Extreme Heatwave</div>
             <div className="text-xs text-muted font-medium uppercase tracking-wider">Satellite: Temp threshold ₹300</div>
           </div>
        </Button>

        <Button 
           variant="secondary" 
           className="w-full flex items-center justify-start py-5 px-6 transition-all hover:border-primary/30" 
           onClick={() => onTrigger('Cyclonic Wind (>80km/h)', 500)}
           style={{ border: '1px solid var(--border-glass)', borderRadius: '16px' }}
        >
           <div className="p-3 rounded-xl mr-4" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
             <AlertTriangle size={22} className="text-indigo-500" />
           </div>
           <div className="text-left">
             <div className="font-bold text-main text-base">Cyclonic Wind Gusher</div>
             <div className="text-xs text-muted font-medium uppercase tracking-wider">Anemometer: Auto-claim ₹500</div>
           </div>
        </Button>

        <Button 
           variant="secondary" 
           className="w-full flex items-center justify-start py-5 px-6 transition-all hover:border-primary/30" 
           onClick={() => onTrigger('Local Waterlogging', 200)}
           style={{ border: '1px solid var(--border-glass)', borderRadius: '16px' }}
        >
           <div className="p-3 rounded-xl mr-4" style={{ background: 'rgba(6, 182, 212, 0.1)' }}>
             <CloudRain size={22} className="text-cyan-500" />
           </div>
           <div className="text-left">
             <div className="font-bold text-main text-base">Localized Flooding</div>
             <div className="text-xs text-muted font-medium uppercase tracking-wider">Ground Sensor: Zone blocked ₹200</div>
           </div>
        </Button>

        <Button 
           variant="secondary" 
           className="w-full flex items-center justify-start py-5 px-6 transition-all hover:border-primary/30" 
           onClick={() => onTrigger('Severe AQI (>400)', 300)}
           style={{ border: '1px solid var(--border-glass)', borderRadius: '16px' }}
        >
           <div className="p-3 rounded-xl mr-4" style={{ background: 'var(--success-bg)' }}>
             <Wind size={22} className="text-success" />
           </div>
           <div className="text-left">
             <div className="font-bold text-main text-base">Hazardous Air Quality</div>
             <div className="text-xs text-muted font-medium uppercase tracking-wider">AQI Station: Direct Payout ₹300</div>
           </div>
        </Button>
      </div>
    </Card>
  );
};

export default TriggerPanel;
