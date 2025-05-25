import { Schema, model, Document } from 'mongoose';
import { DashboardData, Activity, WeeklyVisitor } from '../interfaces/DashboardData';

interface AnalyticDocument extends DashboardData, Document {}

const ActivitySchema = new Schema<Activity>({
  action: { type: String, required: true },
  time: { type: String, required: true },
  type: { type: String, enum: ['message', 'view', 'update', 'visitor'], required: true },
});

const WeeklyVisitorSchema = new Schema<WeeklyVisitor>({
  day: { type: String, required: true },
  visitors: { type: Number, required: true },
});

const AnalyticSchema = new Schema<AnalyticDocument>({
  totalVisitors: { type: Number, default: 0 },
  pageViews: { type: Number, default: 0 },
  messages: { type: Number, default: 0 },
  projects: { type: Number, default: 0 },
  visitorGrowth: { type: Number, default: 0 },
  messageGrowth: { type: Number, default: 0 },
  recentActivity: [ActivitySchema],
  weeklyVisitors: [WeeklyVisitorSchema],
});

export default model<AnalyticDocument>('Analytic', AnalyticSchema);