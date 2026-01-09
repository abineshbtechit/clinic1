
import React, { useState, useCallback } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TokenList from './components/TokenList';
import { View } from './types';
import { BarChart3, Settings, X, CheckCircle2, AlertCircle, Info, User, Ticket, FileText, ChevronLeft } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  }, []);

  const navigateTo = useCallback((view: View, message?: string) => {
    setActiveView(view);
    if (message) notify(message, 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [notify]);

  const BackButton = () => (
    <button 
      onClick={() => setActiveView('dashboard')}
      className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors mb-4 group"
    >
      <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
      <span className="font-medium">Back to Dashboard</span>
    </button>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onAction={(msg) => notify(msg, 'success')} onNavigate={navigateTo} />;
      case 'tokens':
        return <TokenList onAction={(msg) => notify(msg, 'info')} onNavigate={navigateTo} />;
      case 'newToken':
        return (
          <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-8 duration-500">
            <BackButton />
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Ticket size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Issue New Token</h2>
                  <p className="text-gray-500">Enter patient details to generate a queue number.</p>
                </div>
              </div>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigateTo('tokens', 'Token generated successfully!'); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Patient Name</label>
                    <input type="text" placeholder="Full Name" className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-100 outline-none transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Age</label>
                    <input type="number" placeholder="Years" className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-100 outline-none transition-all" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Department</label>
                  <select className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer">
                    <option>General Medicine</option>
                    <option>Pediatrics</option>
                    <option>Dermatology</option>
                    <option>Cardiology</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100">
                  Generate Token
                </button>
              </form>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="animate-in fade-in duration-500">
            <BackButton />
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-gray-900">Performance Reports</h2>
                <p className="text-gray-500">Review and download clinic efficiency metrics.</p>
              </div>
              <button onClick={() => notify('Downloading Master Report...', 'success')} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:bg-blue-700 transition-all active:scale-95">
                <FileText size={20} />
                <span>Download All</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Monthly Efficiency', 'Patient Satisfaction', 'Peak Hour Analysis', 'Staff Performance'].map(report => (
                <div key={report} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">{report}</h3>
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-blue-500 transition-colors">
                      <FileText size={20} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Generated on {new Date().toLocaleDateString()}</p>
                  <button onClick={() => notify(`Downloading ${report}...`, 'info')} className="w-full py-2 bg-gray-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                    View Report
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-500">
            <BackButton />
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
              <div className="px-8 pb-8 -mt-12">
                <div className="flex items-end space-x-6 mb-8">
                  <div className="w-32 h-32 bg-white rounded-3xl p-1 shadow-xl">
                    <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
                      <User size={64} className="text-gray-300" />
                    </div>
                  </div>
                  <div className="pb-4">
                    <h2 className="text-3xl font-black text-gray-900">Dr. Aris Jenkins</h2>
                    <p className="text-blue-600 font-bold">Chief Medical Administrator</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 border-b pb-2">Professional Info</h3>
                    <div className="flex justify-between text-sm"><span className="text-gray-500">Employee ID</span><span className="font-mono font-bold">EMP-99210</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-500">Department</span><span className="font-bold">Administration</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-500">Joined</span><span className="font-bold">May 2021</span></div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 border-b pb-2">Account Security</h3>
                    <button onClick={() => notify('Password reset link sent', 'success')} className="w-full py-2 text-left text-sm font-bold text-blue-600 hover:underline">Change Password</button>
                    <button onClick={() => notify('Enabling 2FA...', 'info')} className="w-full py-2 text-left text-sm font-bold text-blue-600 hover:underline">Enable Two-Factor Auth</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-20 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 shadow-inner">
              <BarChart3 size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Advanced Analytics</h2>
            <p className="text-gray-500 max-w-md">Detailed historical analytics and forecasting are coming soon in the next major update.</p>
            <button 
              onClick={() => notify("Module requested: Deep Analytics", 'info')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100"
            >
              Request Early Access
            </button>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-3xl font-black text-gray-900 mb-8">System Settings</h2>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-50">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-800">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive daily summary reports via email.</p>
                </div>
                <button onClick={() => notify('Notification preference updated', 'success')} className="w-12 h-6 bg-blue-600 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></button>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-800">Auto-Complete Tokens</h4>
                  <p className="text-sm text-gray-500">Automatically complete tokens after 2 hours of inactivity.</p>
                </div>
                <button onClick={() => notify('Auto-complete disabled', 'info')} className="w-12 h-6 bg-gray-200 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></button>
              </div>
              <div className="p-8">
                <button onClick={() => notify('All settings saved', 'success')} className="px-8 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black active:scale-95 transition-all">Save Global Settings</button>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard onAction={(msg) => notify(msg, 'success')} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Layout 
        activeView={activeView} 
        onViewChange={setActiveView}
        onNotify={notify}
        onNavigate={navigateTo}
      >
        {renderContent()}
      </Layout>

      {/* Global Notifications Container */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {notifications.map((n) => (
          <div 
            key={n.id} 
            className={`
              pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border animate-in slide-in-from-right-full duration-300
              ${n.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 
                n.type === 'error' ? 'bg-red-50 border-red-100 text-red-800' : 
                'bg-blue-50 border-blue-100 text-blue-800'}
            `}
          >
            {n.type === 'success' && <CheckCircle2 size={18} />}
            {n.type === 'error' && <AlertCircle size={18} />}
            {n.type === 'info' && <Info size={18} />}
            <span className="text-sm font-medium">{n.message}</span>
            <button 
              onClick={() => setNotifications(prev => prev.filter(item => item.id !== n.id))}
              className="ml-2 hover:bg-black/5 p-1 rounded-full transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
