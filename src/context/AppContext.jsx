import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const [walletBalance, setWalletBalance] = useState(0);
  const [activePlan, setActivePlan] = useState(null);
  const [earnings, setEarnings] = useState(12400);
  
  const [weatherCondition, setWeatherCondition] = useState('Clear ☀️');
  const [aqiLevel, setAqiLevel] = useState('Good (45) 🍃');
  const [riskLevel, setRiskLevel] = useState('Low');
  
  const [claims, setClaims] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const login = (userData) => {
    setUser(userData);
    addNotification('Welcome to GigShield AI', 'success');
  };
  
  const logout = () => {
    setUser(null);
  };

  const buyPlan = (plan) => {
    if (walletBalance >= plan.premium) {
      setWalletBalance(prev => prev - plan.premium);
      setActivePlan(plan);
      addNotification(`Successfully purchased ${plan.name} Plan`, 'success');
    } else {
      addNotification('Insufficient wallet balance. Please add money.', 'danger');
      throw new Error('Insufficient Funds');
    }
  };

  const addMoney = (amount) => {
    setWalletBalance(prev => prev + amount);
    addNotification(`Added ₹${amount} to wallet`, 'success');
  };

  const addNotification = (message, type = 'primary') => {
    const id = Date.now();
    setNotifications(prev => [{ id, message, type }, ...prev]);
    setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const simulateDisruption = (type) => {
    if (!activePlan) {
      addNotification('Disruption occurred, but you have no active insurance.', 'warning');
      setWeatherCondition('Heavy Torrential Rain 🌧️');
      setRiskLevel('High');
      return;
    }

    setWeatherCondition('Heavy Torrential Rain 🌧️');
    setRiskLevel('High');
    addNotification(`AI Detected ${type} disruption! Initiating claim...`, 'warning');
    
    setTimeout(() => {
      const claimAmount = activePlan.coverage;
      const newClaim = {
        id: `CLM-${Math.floor(Math.random() * 10000)}`,
        date: new Date().toISOString().split('T')[0],
        type: type,
        amount: claimAmount,
        status: 'Approved'
      };
      
      setClaims([newClaim, ...claims]);
      setWalletBalance(prev => prev + claimAmount);
      addNotification(`Parametric Triger Met! ₹${claimAmount} Auto-Payout to Wallet.`, 'success');
      setEarnings(prev => prev - 2400);
    }, 2500);
  };

  const resetSimulation = () => {
    setWeatherCondition('Clear ☀️');
    setAqiLevel('Good (45) 🍃');
    setRiskLevel('Low');
    setEarnings(12400);
  }

  const value = {
    user, login, logout,
    walletBalance, activePlan, earnings, buyPlan, addMoney,
    weatherCondition, aqiLevel, riskLevel,
    claims, notifications, simulateDisruption, resetSimulation
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
