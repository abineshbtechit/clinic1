
export enum TokenStatus {
  WAITING = 'Waiting',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface Token {
  id: string;
  number: string;
  patientName: string;
  department: string;
  status: TokenStatus;
  arrivalTime: string;
  waitTime: number; // in minutes
}

export interface DepartmentMetric {
  name: string;
  activeTokens: number;
  avgWaitTime: number;
  efficiency: number;
}

export interface DailyStats {
  hour: string;
  tokensIssued: number;
  completed: number;
}

export type View = 'dashboard' | 'tokens' | 'analytics' | 'settings' | 'profile' | 'newToken' | 'reports';
