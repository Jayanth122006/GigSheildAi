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
           className="w-full flex items-center justify-start py-4" 
           onClick={() => onTrigger('Heavy Rain (>65mm)', 300)}
           style={{ border: '1px solid var(--border-glass)' }}
        >
           <div className="p-2 rounded-full mr-3 bg-blue-50">
             <CloudRain size={20} className="text-blue-500" />
           </div>
           <div className="text-left">
             <div className="font-bold text-main">Severe Rain Storm</div>
             <div className="text-xs text-muted">IoT: Parametric trigger ₹300</div>
           </div>
        </Button>

        <Button 
           variant="secondary" 
           className="w-full flex items-center justify-start py-4" 
           onClick={() => onTrigger('Heatwave (>43°C)', 300)}
           style={{ border: '1px solid var(--border-glass)' }}
        >
           <div className="p-2 rounded-full mr-3 bg-orange-50">
             <Zap size={20} className="text-orange-500" />
           </div>
           <div className="text-left">
             <div className="font-bold text-main">Extreme Heatwave</div>
             <div className="text-xs text-muted">Satellite: Temp threshold ₹300</div>
           </div>
        </Button>

        <Button 
           variant="secondary" 
           className="w-full flex items-center justify-start py-4" 
           onClick={() => onTrigger('Cyclonic Wind (>80km/h)', 500)}
           style={{ border: '1px solid var(--border-glass)' }}
        >
           <div className="p-2 rounded-full mr-3 bg-indigo-50">
             <AlertTriangle size={20} className="text-indigo-500" />
           </div>
           <div className="text-left">
             <div className="font-bold text-main">Cyclonic Wind Gusts</div>
             <div className="text-xs text-muted">Anemometer: Auto-claim ₹500</div>
           </div>
        </Button>

        <Button 
           variant="secondary" 
           className="w-full flex items-center justify-start py-4" 
           onClick={() => onTrigger('Local Waterlogging', 200)}
           style={{ border: '1px solid var(--border-glass)' }}
        >
           <div className="p-2 rounded-full mr-3 bg-cyan-50">
             <CloudRain size={20} className="text-cyan-500" />
           </div>
           <div className="text-left">
             <div className="font-bold text-main">Localized Flooding</div>
             <div className="text-xs text-muted">Ground Sensor: Zone blocked ₹200</div>
           </div>
        </Button>

        <Button 
           variant="secondary" 
           className="w-full flex items-center justify-start py-4" 
           onClick={() => onTrigger('Severe AQI (>400)', 300)}
           style={{ border: '1px solid var(--border-glass)' }}
        >
           <div className="p-2 rounded-full mr-3 bg-green-50">
             <Wind size={20} className="text-green-500" />
           </div>
           <div className="text-left">
             <div className="font-bold text-main">Hazardous Air Quality</div>
             <div className="text-xs text-muted">AQI Station: Direct Payout ₹300</div>
           </div>
        </Button>
      </div>
    </Card>
  );
};

export default TriggerPanel;
