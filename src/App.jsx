import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Plans from './pages/Plans';
import Wallet from './pages/Wallet';
import Admin from './pages/Admin';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Root App Component
function RootApp() {
  const { user } = useAppContext();
  
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<Layout />}>
           <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
           
           <Route path="/" element={
             <ProtectedRoute>
               <Dashboard />
             </ProtectedRoute>
           } />
           
           <Route path="/plans" element={
             <ProtectedRoute>
               <Plans />
             </ProtectedRoute>
           } />
           
           <Route path="/wallet" element={
             <ProtectedRoute>
               <Wallet />
             </ProtectedRoute>
           } />
           
           <Route path="/admin" element={
             <ProtectedRoute>
               <Admin />
             </ProtectedRoute>
           } />
           
           <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Wrapper with AppProvider
function App() {
  return (
    <AppProvider>
      <RootApp />
    </AppProvider>
  );
}

export default App;
