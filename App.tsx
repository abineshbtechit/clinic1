
import React, { useState, useCallback } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TokenList from './components/TokenList';
import { View } from './types';
import { 
  BarChart3, 
  Settings, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  User, 
  Ticket, 
  FileText, 
  ChevronLeft,
  Shield,
  Bell,
  Globe,
  Database,
  Smartphone,
  CreditCard,
  CloudLightning,
  Trash2,
  Save,
  Clock,
  Building2,
  Users,
  // Fix: Added missing Download icon import
  Download
} from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeSettingTab, setActiveSettingTab] = useState('general');

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
          <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
            <h2 className="text-3xl font-black text-gray-900 mb-8">Control Center</h2>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Settings Nav */}
              <div className="w-full lg:w-72 flex-shrink-0">
                <div className="bg-white p-3 rounded-3xl border border-gray-100 shadow-sm space-y-1">
                  {[
                    { id: 'general', label: 'General', icon: <Globe size={18} /> },
                    { id: 'clinic', label: 'Clinic Setup', icon: <Building2 size={18} /> },
                    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
                    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
                    { id: 'billing', label: 'Plans & Billing', icon: <CreditCard size={18} /> },
                    { id: 'integrations', label: 'Integrations', icon: <CloudLightning size={18} /> },
                    { id: 'data', label: 'Data Management', icon: <Database size={18} /> },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSettingTab(tab.id)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200
                        ${activeSettingTab === tab.id 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}
                      `}
                    >
                      {tab.icon}
                      <span className="font-semibold text-sm">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings Content */}
              <div className="flex-1">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8">
                  {activeSettingTab === 'general' && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">General Settings</h3>
                        <p className="text-gray-500 text-sm">Update your workspace name, language, and display options.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Workspace Name</label>
                          <input type="text" defaultValue="ClinicFlow Central" className="w-full bg-gray-50 border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">System Language</label>
                          <select className="w-full bg-gray-50 border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer">
                            <option>English (United States)</option>
                            <option>Spanish (ES)</option>
                            <option>French (FR)</option>
                            <option>Hindi (IN)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-white rounded-xl shadow-sm"><Smartphone size={20} className="text-blue-600" /></div>
                            <div>
                              <p className="font-bold text-gray-800">Compact Mode</p>
                              <p className="text-xs text-gray-500">Show more information with smaller UI elements.</p>
                            </div>
                          </div>
                          <button onClick={() => notify('Compact mode toggled', 'info')} className="w-12 h-7 bg-blue-600 rounded-full relative transition-colors"><div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-md"></div></button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-white rounded-xl shadow-sm"><Clock size={20} className="text-indigo-600" /></div>
                            <div>
                              <p className="font-bold text-gray-800">24-Hour Format</p>
                              <p className="text-xs text-gray-500">Display time using 24-hour clock (e.g. 14:00).</p>
                            </div>
                          </div>
                          <button onClick={() => notify('Time format updated', 'success')} className="w-12 h-7 bg-gray-200 rounded-full relative transition-colors"><div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md"></div></button>
                        </div>
                      </div>

                      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
                        <button onClick={() => notify('Discarded changes', 'info')} className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">Discard</button>
                        <button onClick={() => notify('General settings saved', 'success')} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2">
                          <Save size={18} /> Save Settings
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSettingTab === 'clinic' && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Clinic Configuration</h3>
                        <p className="text-gray-500 text-sm">Manage operating hours, departments, and queue logic.</p>
                      </div>

                      <div className="space-y-6">
                         <div className="p-6 border border-gray-100 rounded-3xl">
                            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <Clock size={18} className="text-blue-500" /> Regular Business Hours
                            </h4>
                            <div className="space-y-3">
                              {['Monday - Friday', 'Saturday', 'Sunday'].map(day => (
                                <div key={day} className="flex items-center justify-between text-sm py-2">
                                  <span className="font-medium text-gray-600">{day}</span>
                                  <div className="flex items-center space-x-4">
                                    <button onClick={() => notify(`Opening hours for ${day} clicked`, 'info')} className="bg-gray-50 px-3 py-1.5 rounded-xl font-bold border border-gray-200 hover:border-blue-200 transition-all">08:00 AM - 08:00 PM</button>
                                    <button onClick={() => notify(`${day} status toggled`, 'info')} className="text-xs font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-1 rounded-md">Open</button>
                                  </div>
                                </div>
                              ))}
                            </div>
                         </div>

                         <div className="p-6 border border-gray-100 rounded-3xl">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                <Users size={18} className="text-blue-500" /> Active Departments
                              </h4>
                              <button onClick={() => notify('Adding new department', 'info')} className="text-blue-600 text-xs font-black uppercase hover:underline">Add New</button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              {['General Medicine', 'Pediatrics', 'Cardiology', 'Dermatology'].map(dept => (
                                <div key={dept} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl group">
                                  <span className="text-sm font-bold text-gray-700">{dept}</span>
                                  <button onClick={() => notify(`Editing ${dept}`, 'info')} className="p-1.5 hover:bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-all"><Settings size={14} className="text-gray-400" /></button>
                                </div>
                              ))}
                            </div>
                         </div>
                      </div>

                      <div className="flex justify-end">
                        <button onClick={() => notify('Clinic profile updated', 'success')} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">Update Clinic Profile</button>
                      </div>
                    </div>
                  )}

                  {activeSettingTab === 'notifications' && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Notification Center</h3>
                        <p className="text-gray-500 text-sm">Control how and when you receive system alerts.</p>
                      </div>

                      <div className="space-y-4">
                        {[
                          { title: 'New Token Alerts', desc: 'Push notification whenever a new patient joins the queue.', checked: true, color: 'bg-blue-500' },
                          { title: 'Long Wait Warnings', desc: 'Alert when a token wait time exceeds 30 minutes.', checked: true, color: 'bg-amber-500' },
                          { title: 'Daily Report Summary', desc: 'Email digest of previous day efficiency and stats.', checked: false, color: 'bg-emerald-500' },
                          { title: 'System Announcements', desc: 'Critical updates and downtime maintenance notices.', checked: true, color: 'bg-red-500' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-5 bg-gray-50 rounded-3xl group hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all">
                            <div className="flex items-start space-x-4">
                              <div className={`mt-1 w-2 h-2 rounded-full ${item.checked ? item.color : 'bg-gray-300'}`}></div>
                              <div>
                                <p className="font-bold text-gray-800">{item.title}</p>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => notify(`${item.title} toggled`, 'info')}
                              className={`w-12 h-7 rounded-full relative transition-all shadow-inner ${item.checked ? 'bg-blue-600' : 'bg-gray-200'}`}
                            >
                              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all ${item.checked ? 'right-1' : 'left-1'}`}></div>
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 flex items-center justify-between">
                        <p className="text-sm font-semibold text-blue-800">Test notification system settings</p>
                        <button onClick={() => notify('Test alert successful!', 'success')} className="bg-white text-blue-600 px-4 py-2 rounded-xl text-xs font-black uppercase shadow-sm border border-blue-200 hover:bg-blue-600 hover:text-white transition-all">Send Test</button>
                      </div>
                    </div>
                  )}

                  {activeSettingTab === 'security' && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Security & Access</h3>
                        <p className="text-gray-500 text-sm">Protect your account and manage active login sessions.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="p-6 bg-gray-50 rounded-3xl flex flex-col items-center text-center space-y-4">
                           <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Shield size={32} /></div>
                           <h4 className="font-bold text-gray-800">Two-Factor Authentication</h4>
                           <p className="text-xs text-gray-500">Add an extra layer of security to your account today.</p>
                           <button onClick={() => notify('2FA setup wizard opened', 'info')} className="w-full bg-white text-blue-600 py-3 rounded-2xl font-bold border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm">Enable Now</button>
                         </div>
                         
                         <div className="p-6 bg-gray-50 rounded-3xl flex flex-col items-center text-center space-y-4">
                           <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center"><Smartphone size={32} /></div>
                           <h4 className="font-bold text-gray-800">Login History</h4>
                           <p className="text-xs text-gray-500">Review all devices that have accessed this account.</p>
                           <button onClick={() => notify('Viewing active sessions', 'info')} className="w-full bg-white text-amber-600 py-3 rounded-2xl font-bold border border-amber-100 hover:bg-amber-600 hover:text-white transition-all shadow-sm">View Devices</button>
                         </div>
                      </div>

                      <div className="space-y-2 pt-6">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Change Administrative Password</p>
                        <div className="space-y-3">
                          <input type="password" placeholder="Current Password" className="w-full bg-gray-50 border-gray-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
                          <input type="password" placeholder="New Password" className="w-full bg-gray-50 border-gray-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
                          <button onClick={() => notify('Password updated successfully', 'success')} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black active:scale-95 transition-all">Update Password</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSettingTab === 'data' && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Data Management</h3>
                        <p className="text-gray-500 text-sm">Export clinic history or purge old patient logs.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <button onClick={() => notify('Exporting JSON snapshot...', 'info')} className="p-6 border border-gray-100 rounded-3xl hover:bg-gray-50 transition-all text-center space-y-3 active:scale-95">
                           <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl mx-auto flex items-center justify-center"><Download size={20} /></div>
                           <p className="text-sm font-bold text-gray-800">Full JSON Backup</p>
                         </button>
                         <button onClick={() => notify('Exporting PDF stats...', 'info')} className="p-6 border border-gray-100 rounded-3xl hover:bg-gray-50 transition-all text-center space-y-3 active:scale-95">
                           <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl mx-auto flex items-center justify-center"><FileText size={20} /></div>
                           <p className="text-sm font-bold text-gray-800">PDF Summary</p>
                         </button>
                         <button onClick={() => notify('Cloud sync initiated', 'success')} className="p-6 border border-gray-100 rounded-3xl hover:bg-gray-50 transition-all text-center space-y-3 active:scale-95">
                           <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl mx-auto flex items-center justify-center"><CloudLightning size={20} /></div>
                           <p className="text-sm font-bold text-gray-800">Cloud Sync</p>
                         </button>
                      </div>

                      <div className="pt-8 border-t border-red-50">
                        <h4 className="text-red-600 font-black uppercase text-xs tracking-widest mb-4">Danger Zone</h4>
                        <div className="p-6 bg-red-50/30 rounded-3xl border border-red-100 flex flex-col md:flex-row items-center justify-between gap-4">
                          <div>
                            <p className="font-bold text-red-800">Purge Patient History</p>
                            <p className="text-xs text-red-600/70">Permanently delete all token logs older than 1 year. This cannot be undone.</p>
                          </div>
                          <button onClick={() => notify('Are you sure? Confirming purge...', 'error')} className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-100">
                            <Trash2 size={18} /> Purge Logs
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fallback for other tabs */}
                  {!['general', 'clinic', 'notifications', 'security', 'data'].includes(activeSettingTab) && (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 animate-in fade-in duration-300">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300"><Settings size={32} /></div>
                      <h3 className="text-xl font-bold text-gray-800 capitalize">{activeSettingTab} Settings</h3>
                      <p className="text-gray-500 max-w-xs text-sm">We are fine-tuning this section. Please check back in a future update.</p>
                      <button onClick={() => notify('Requested beta access for ' + activeSettingTab, 'info')} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 active:scale-95 transition-all">Request Beta Access</button>
                    </div>
                  )}
                </div>
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
