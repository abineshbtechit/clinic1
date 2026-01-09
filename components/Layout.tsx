
import React, { useState } from 'react';
import { Menu, X, Bell, User, Search } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onViewChange: (view: View) => void;
  onNotify: (message: string, type?: 'success' | 'info') => void;
  onNavigate: (view: View, message?: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, onNotify, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8fafc]">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-4 h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="p-2 hover:bg-gray-100 active:scale-95 rounded-lg transition-transform"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <span className="font-bold text-gray-800">ClinicFlow</span>
        </div>
        <button 
          onClick={() => onNavigate('profile')}
          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:ring-2 hover:ring-blue-100 active:scale-95 transition-all"
        >
          <User size={20} className="text-gray-600" />
        </button>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden animate-in fade-in duration-200"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 hidden md:flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">C</div>
          <span className="font-bold text-xl text-gray-800 tracking-tight">ClinicFlow</span>
        </div>

        <nav className="px-4 mt-6 md:mt-0 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id as View);
                setIsSidebarOpen(false);
              }}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 active:scale-[0.98]
                ${activeView === item.id 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}
              `}
            >
              <span className={activeView === item.id ? 'text-blue-600' : ''}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {activeView === item.id && (
                <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => { onNavigate('profile'); setIsSidebarOpen(false); }}
          className="absolute bottom-8 left-4 right-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm group-hover:border-blue-200 transition-colors">
              <User size={20} className="text-gray-600 group-hover:text-blue-600" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-gray-800 truncate">Dr. Aris Jenkins</p>
              <p className="text-xs text-gray-500 truncate">Senior Admin</p>
            </div>
          </div>
        </button>

        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden p-2 hover:bg-gray-100 rounded-full transition-transform active:rotate-90"
        >
          <X size={20} />
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex items-center justify-between px-8 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search tokens, patients or departments..." 
                className="w-full bg-gray-50 border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
                onKeyDown={(e) => e.key === 'Enter' && onNotify(`Searching for: ${e.currentTarget.value}`, 'info')}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNotify("Opening notification center", 'info')}
              className="relative p-2.5 text-gray-500 hover:bg-gray-50 hover:text-blue-600 active:scale-95 rounded-xl transition-all"
            >
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-gray-100 mx-2"></div>
            <button 
              onClick={() => onNotify("Date range selector opened", 'info')}
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 hover:bg-gray-100 hover:border-gray-200 active:scale-95 transition-all"
            >
              <span>Today: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 overflow-y-auto flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
