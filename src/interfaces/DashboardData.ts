export interface DashboardData {
  totalVisitors: number;
  pageViews: number;
  messages: number;
  projects: number;
  visitorGrowth: number;
  messageGrowth: number;
  recentActivity: Activity[];
  weeklyVisitors: WeeklyVisitor[];
}

export interface Activity {
  action: string;
  time: string;
  type: 'message' | 'view' | 'update' | 'visitor';
}

export interface WeeklyVisitor {
  day: string;
  visitors: number;
}