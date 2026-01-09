
import React, { useState } from 'react';
import { MoreHorizontal, Filter, Plus, UserPlus, Search, Download, Trash2, Edit2, CheckCircle } from 'lucide-react';
import { MOCK_TOKENS } from '../constants';
import { TokenStatus, View } from '../types';

interface TokenListProps {
  onAction: (message: string) => void;
  onNavigate: (view: View, message?: string) => void;
}

const TokenList: React.FC<TokenListProps> = ({ onAction, onNavigate }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const getStatusColor = (status: TokenStatus) => {
    switch(status) {
      case TokenStatus.WAITING: return 'bg-amber-100 text-amber-700 border-amber-200';
      case TokenStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-700 border-blue-200';
      case TokenStatus.COMPLETED: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case TokenStatus.CANCELLED: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleAction = (id: string, action: string) => {
    if (action === "Edit Record") {
        onNavigate('newToken', `Editing token ${id}`);
    } else if (action === "Marked as Completed") {
        onNavigate('dashboard', `Token ${id} successfully completed`);
    } else {
        onAction(`Token ${id}: ${action}`);
    }
    setActiveMenu(null);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Queue Management</h1>
          <p className="text-gray-500">Active and upcoming tokens for today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onAction("Opening advanced filters")}
            className="flex items-center space-x-2 px-4 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
          >
            <Filter size={18} />
            <span className="text-sm font-semibold">Filter</span>
          </button>
          <button 
            onClick={() => onNavigate('newToken')}
            className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
          >
            <UserPlus size={18} />
            <span className="text-sm font-semibold">Issue New Token</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
           <div className="relative flex-1 max-w-sm">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input 
               type="text" 
               placeholder="Filter results..." 
               className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-blue-100 transition-all"
               onChange={(e) => e.target.value.length > 2 && onAction(`Filtering for: ${e.target.value}`)}
             />
           </div>
           <button 
             onClick={() => onNavigate('reports')}
             className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-90"
             title="Download Data Report"
           >
             <Download size={18} />
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Token No.</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Patient Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Department</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Arrival</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Wait Time</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_TOKENS.map((token) => (
                <tr key={token.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onNavigate('newToken', `Viewing details for Token ${token.number}`)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-lg font-bold text-sm border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all active:scale-95"
                    >
                      {token.number}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onNavigate('newToken', `Viewing record: ${token.patientName}`)}
                      className="flex items-center space-x-3 hover:text-blue-600 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs border border-blue-100">
                        {token.patientName.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600">{token.patientName}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <button 
                      onClick={() => onAction(`Filtering by Dept: ${token.department}`)}
                      className="hover:underline decoration-blue-200"
                    >
                      {token.department}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border ${getStatusColor(token.status)}`}>
                      {token.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {token.arrivalTime}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${token.waitTime > 20 ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'}`}></div>
                      <span className={`text-sm font-bold ${token.waitTime > 20 ? 'text-red-600' : 'text-gray-600'}`}>{token.waitTime} mins</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(activeMenu === token.id ? null : token.id);
                      }}
                      className={`p-2 rounded-lg transition-all border border-transparent hover:border-gray-200 hover:bg-white active:scale-90 ${activeMenu === token.id ? 'bg-gray-100 border-gray-200' : ''}`}
                    >
                      <MoreHorizontal size={18} className="text-gray-400" />
                    </button>

                    {/* Quick Action Menu */}
                    {activeMenu === token.id && (
                      <div className="absolute right-6 top-12 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 py-2 animate-in zoom-in-95 fade-in duration-200 origin-top-right">
                        <button 
                          onClick={() => handleAction(token.number, "Marked as Completed")}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        >
                          <CheckCircle size={16} /> Complete Session
                        </button>
                        <button 
                          onClick={() => handleAction(token.number, "Edit Record")}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          <Edit2 size={16} /> Edit Record
                        </button>
                        <div className="my-1 border-t border-gray-50"></div>
                        <button 
                          onClick={() => handleAction(token.number, "Token cancelled")}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} /> Cancel Token
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Backdrop for menu to close it when clicking elsewhere */}
        {activeMenu && (
          <div 
            className="fixed inset-0 z-40 bg-transparent" 
            onClick={() => setActiveMenu(null)}
          />
        )}

        <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-tight">6 of 152 ACTIVE TOKENS</span>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => onAction("Loading previous page...")}
              className="px-4 py-2 text-xs font-black uppercase text-gray-300 bg-white border border-gray-100 rounded-xl cursor-not-allowed transition-all"
            >
              Prev
            </button>
            <button 
              onClick={() => onAction("Loading next page...")}
              className="px-4 py-2 text-xs font-black uppercase text-blue-600 bg-white border border-gray-100 rounded-xl hover:border-blue-300 hover:shadow-sm active:scale-95 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenList;
