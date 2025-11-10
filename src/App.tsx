import { useState } from 'react';
import { InvestorPortal } from './components/InvestorPortal';
import { FarmerApp } from './components/FarmerApp';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginPage } from './components/LoginPage';
import { Toaster } from './components/ui/sonner';

export type UserRole = 'investor' | 'farmer' | 'admin' | null;

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {currentUser.role === 'investor' && (
          <InvestorPortal user={currentUser} onLogout={handleLogout} />
        )}
        {currentUser.role === 'farmer' && (
          <FarmerApp user={currentUser} onLogout={handleLogout} />
        )}
        {currentUser.role === 'admin' && (
          <AdminDashboard user={currentUser} onLogout={handleLogout} />
        )}
      </div>
      <Toaster />
    </>
  );
}

export default App;