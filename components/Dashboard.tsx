
import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  BrainCircuit,
  ArrowUpRight,
  ArrowDownRight,
  Download
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { MOCK_DAILY_STATS, MOCK_DEPT_METRICS, MOCK_TOKENS } from '../constants';
import { getClinicInsights } from '../services/geminiService';
import { View } from '../types';

interface DashboardProps {
  onAction: (message: string) => void;
  onNavigate: (view: View, message?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onAction, onNavigate }) => {
  const [aiInsights, setAiInsights] = useState<{ insights: string[], recommendation: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoading(true);
      const data = await getClinicInsights({
        daily: MOCK_DAILY_STATS,
        departments: MOCK_DEPT_METRICS,
        tokens: MOCK_TOKENS
      });
      setAiInsights(data);
      setIsLoading(false);
    };
    fetchInsights();
  }, []);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hospital Overview</h1>
          <p className="text-gray-500">Real-time status of your clinic's operations.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onNavigate('reports')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-200 flex items-center space-x-2 active:scale-95"
          >
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Tokens" 
          value="152" 
          trend="+12%" 
          trendUp={true} 
          icon={<Users className="text-blue-600" size={24} />} 
          color="bg-blue-50"
          onClick={() => onNavigate('tokens')}
        />
        <StatCard 
          title="Avg. Wait Time" 
          value="18 min" 
          trend="-4%" 
          trendUp={false} 
          icon={<Clock className="text-emerald-600" size={24} />} 
          color="bg-emerald-50"
          onClick={() => onNavigate('analytics')}
        />
        <StatCard 
          title="Completed Cases" 
          value="138" 
          trend="+8%" 
          trendUp={true} 
          icon={<CheckCircle2 className="text-amber-600" size={24} />} 
          color="bg-amber-50"
          onClick={() => onNavigate('tokens')}
        />
        <StatCard 
          title="Satisfaction" 
          value="94%" 
          trend="+1.2%" 
          trendUp={true} 
          icon={<TrendingUp className="text-indigo-600" size={24} />} 
          color="bg-indigo-50"
          onClick={() => onNavigate('reports')}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Token Volume Trend</h3>
            <select 
              onChange={(e) => onAction(`Range changed to: ${e.target.value}`)}
              className="bg-gray-50 border-none rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DAILY_STATS}>
                <defs>
                  <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5' }}
                />
                <Area type="monotone" dataKey="tokensIssued" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTokens)" />
                <Area type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Department Load</h3>
            <button 
              onClick={() => onNavigate('reports')}
              className="text-blue-600 text-xs font-bold hover:underline"
            >
              Details
            </button>
          </div>
          <div className="h-56 relative group">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_DEPT_METRICS}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="activeTokens"
                  onClick={(data) => onNavigate('tokens', `Viewing ${data.name} tokens`)}
                >
                  {MOCK_DEPT_METRICS.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke="none" 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-2xl font-black text-gray-800">28</span>
              <span className="text-[10px] uppercase font-bold text-gray-400">Total Active</span>
            </div>
          </div>
          <div className="space-y-3 mt-auto overflow-y-auto max-h-40 pr-1">
            {MOCK_DEPT_METRICS.map((dept, idx) => (
              <button 
                key={dept.name} 
                onClick={() => onNavigate('tokens', `Filtering by ${dept.name}`)}
                className="w-full flex items-center justify-between p-1 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                  <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">{dept.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-800">{dept.activeTokens}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights and Department Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gemini AI Insights */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
          <div className="flex items-center justify-between mb-6 relative">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <BrainCircuit className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-xl">AI Clinical Insights</h3>
            </div>
            <button 
              onClick={() => {
                onAction("Refreshing AI analysis...");
                setAiInsights(null);
                setTimeout(() => onAction("Insights updated successfully"), 1000);
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors active:rotate-180 duration-500"
              title="Refresh Insights"
            >
              <TrendingUp size={18} />
            </button>
          </div>
          
          <div className="space-y-4 relative">
            {isLoading ? (
               <div className="flex flex-col gap-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse"></div>
                 ))}
               </div>
            ) : (
              aiInsights?.insights.map((insight, idx) => (
                <div 
                  key={idx} 
                  onClick={() => onNavigate('analytics', `Exploring AI insight #${idx+1}`)}
                  className="flex items-start space-x-3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5 hover:bg-white/20 transition-all cursor-pointer hover:translate-x-1"
                >
                  <div className="mt-1 w-5 h-5 flex-shrink-0 flex items-center justify-center bg-blue-400/30 rounded-full text-[10px] font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-sm leading-relaxed">{insight}</p>
                </div>
              ))
            )}
            
            {!isLoading && aiInsights?.recommendation && (
              <div 
                className="mt-6 pt-6 border-t border-white/10 cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors"
                onClick={() => onNavigate('settings', "Opening system optimization settings")}
              >
                <p className="text-blue-100 text-[10px] uppercase tracking-wider font-black mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"></span>
                  Recommendation
                </p>
                <p className="text-sm font-medium">{aiInsights.recommendation}</p>
              </div>
            )}
          </div>
        </div>

        {/* Efficiency Chart */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Efficiency per Dept (%)</h3>
            <button 
              onClick={() => onNavigate('reports')}
              className="text-blue-600 text-xs font-bold hover:underline"
            >
              Full Report
            </button>
          </div>
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            {MOCK_DEPT_METRICS.map((dept) => (
              <div key={dept.name} className="space-y-2 group cursor-pointer" onClick={() => onNavigate('analytics', `Analyzing ${dept.name} performance`)}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{dept.name}</span>
                  <span className="text-sm font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{dept.efficiency}%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out group-hover:brightness-110"
                    style={{ width: `${dept.efficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, trendUp, icon, color, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group cursor-pointer active:scale-[0.98]"
  >
    <div className="flex items-start justify-between">
      <div className={`p-3 rounded-2xl ${color} transition-transform group-hover:scale-110 duration-300`}>
        {icon}
      </div>
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-[10px] font-black uppercase ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-800'}`}>
        {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        <span>{trend}</span>
      </div>
    </div>
    <div className="mt-4">
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</h4>
      <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);

export default Dashboard;
