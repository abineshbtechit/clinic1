
import React from 'react';
import { 
  LayoutDashboard, 
  Ticket, 
  BarChart3, 
  Settings, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { Token, TokenStatus, DepartmentMetric, DailyStats } from './types';

export const MOCK_TOKENS: Token[] = [
  { id: '1', number: 'A-101', patientName: 'John Doe', department: 'General Medicine', status: TokenStatus.IN_PROGRESS, arrivalTime: '09:00 AM', waitTime: 15 },
  { id: '2', number: 'P-204', patientName: 'Jane Smith', department: 'Pediatrics', status: TokenStatus.WAITING, arrivalTime: '09:15 AM', waitTime: 30 },
  { id: '3', number: 'D-005', patientName: 'Robert Brown', department: 'Dermatology', status: TokenStatus.WAITING, arrivalTime: '09:20 AM', waitTime: 25 },
  { id: '4', number: 'G-301', patientName: 'Emily White', department: 'General Medicine', status: TokenStatus.COMPLETED, arrivalTime: '08:30 AM', waitTime: 12 },
  { id: '5', number: 'C-402', patientName: 'Michael Chen', department: 'Cardiology', status: TokenStatus.WAITING, arrivalTime: '09:30 AM', waitTime: 10 },
  { id: '6', number: 'P-205', patientName: 'Sarah Wilson', department: 'Pediatrics', status: TokenStatus.IN_PROGRESS, arrivalTime: '09:10 AM', waitTime: 20 },
];

export const MOCK_DEPT_METRICS: DepartmentMetric[] = [
  { name: 'General Medicine', activeTokens: 12, avgWaitTime: 18, efficiency: 92 },
  { name: 'Pediatrics', activeTokens: 8, avgWaitTime: 25, efficiency: 85 },
  { name: 'Dermatology', activeTokens: 5, avgWaitTime: 15, efficiency: 95 },
  { name: 'Cardiology', activeTokens: 3, avgWaitTime: 40, efficiency: 78 },
];

export const MOCK_DAILY_STATS: DailyStats[] = [
  { hour: '08:00', tokensIssued: 12, completed: 8 },
  { hour: '09:00', tokensIssued: 25, completed: 18 },
  { hour: '10:00', tokensIssued: 35, completed: 22 },
  { hour: '11:00', tokensIssued: 30, completed: 28 },
  { hour: '12:00', tokensIssued: 15, completed: 25 },
  { hour: '13:00', tokensIssued: 20, completed: 15 },
  { hour: '14:00', tokensIssued: 28, completed: 20 },
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'tokens', label: 'Tokens', icon: <Ticket size={20} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];
