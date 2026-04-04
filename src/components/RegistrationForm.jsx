import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import { MapPin, Briefcase, Clock, CalendarDays, ShieldAlert } from 'lucide-react';

const RegistrationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Bangalore',
    areaRisk: 'Medium Risk',
    category: 'Food Delivery',
    workingHours: 8,
    workingDays: 6,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      onSubmit(formData);
    }
  };

  return (
    <Card hover={false} className="w-full max-w-lg mx-auto border-t-4" style={{ borderTopColor: 'var(--primary)' }}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Gig Worker Registration</h2>
        <p className="text-sm text-muted">Step 1: Create your profile to calculate your parametric insurance policy.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold text-main mb-2 block">Full Name</label>
            <input 
              type="text" 
              name="name"
              required
              placeholder="E.g. Rahul Kumar" 
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded border bg-transparent text-black font-medium outline-none focus:border-black"
              style={{ borderColor: 'var(--border-light)' }}
            />
          </div>
          <div>
            <label className="text-sm font-bold text-main mb-2 block">Phone Number</label>
            <input 
              type="text" 
              name="phone"
              required
              maxLength={10}
              placeholder="10-digit number" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
              className="w-full p-3 rounded border bg-transparent text-black font-medium outline-none focus:border-black"
              style={{ borderColor: 'var(--border-light)' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-sm font-bold text-black mb-2 block flex items-center gap-1"><Briefcase size={16}/> Work Category</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 rounded border bg-transparent text-black font-medium outline-none focus:border-black"
              style={{ borderColor: 'var(--border-light)' }}
            >
              <option value="Food Delivery">Food Delivery</option>
              <option value="Quick Commerce">Quick Commerce (Zepto/Blinkit)</option>
              <option value="Ride-sharing">Ride-sharing (Uber/Ola)</option>
              <option value="Last Mile Logistics">Last Mile Logistics</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold text-black mb-2 block flex items-center gap-1"><MapPin size={16}/> City</label>
            <select 
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 rounded border bg-transparent text-black font-medium outline-none focus:border-black"
              style={{ borderColor: 'var(--border-light)' }}
            >
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-bold text-black mb-2 block flex items-center gap-1"><ShieldAlert size={16}/> Zone / Risk Area</label>
            <select 
              name="areaRisk"
              value={formData.areaRisk}
              onChange={handleChange}
              className="w-full p-3 rounded border bg-transparent text-black font-medium outline-none focus:border-black"
              style={{ borderColor: 'var(--border-light)' }}
            >
              <option value="Low Risk">Low Risk (Safe Zone)</option>
              <option value="Medium Risk">Medium Risk</option>
              <option value="High Risk">High Risk (Vulnerable)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="text-sm font-bold text-black mb-2 block flex items-center gap-1"><Clock size={16}/> Hours / Day</label>
             <input 
               type="number" 
               name="workingHours"
               min="1" max="24" required
               value={formData.workingHours}
               onChange={handleChange}
               className="w-full p-3 rounded border bg-transparent text-black font-medium outline-none focus:border-black"
               style={{ borderColor: 'var(--border-light)' }}
             />
           </div>
           <div>
             <label className="text-sm font-bold text-black mb-2 block flex items-center gap-1"><CalendarDays size={16}/> Days / Week</label>
             <input 
               type="number" 
               name="workingDays"
               min="1" max="7" required
               value={formData.workingDays}
               onChange={handleChange}
               className="w-full p-3 rounded border bg-transparent text-black font-medium outline-none focus:border-black"
               style={{ borderColor: 'var(--border-light)' }}
             />
           </div>
        </div>

        <Button fullWidth type="submit" className="mt-4" variant="primary" disabled={!formData.name || formData.phone.length < 10}>
          Generate Policy Offer
        </Button>
      </form>
    </Card>
  );
};

export default RegistrationForm;
