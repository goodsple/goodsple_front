import axiosInstance from '../../../../api/axiosInstance';

export type UserStatsSummary = {
  totalUsers: number;
  todayJoined: number;
  todayWithdrawn: number;
  todayNet: number;
};

export type UserMonthlyStat = {
  month: string;
  joined: number;
  withdrawn: number;
  net: number;
};

export type UserStatsResponse = {
  summary: UserStatsSummary;
  monthlyStats: UserMonthlyStat[];
};

export type ReportStatsSummary = {
  todayReported: number;
  todayResolved: number;
  unresolvedTotal: number;
};

export type ReportMonthlyStat = {
  month: string;
  reported: number;
  resolved: number;
  resolveRate: number;
  unresolved: number;
};

export type ReportStatsResponse = {
  summary: ReportStatsSummary;
  monthlyStats: ReportMonthlyStat[];
};

export const fetchUserStats = async (months = 3): Promise<UserStatsResponse> => {
  const res = await axiosInstance.get('/admin/dashboard/users', { params: { months } });
  return res.data;
};

export const fetchReportStats = async (months = 3): Promise<ReportStatsResponse> => {
  const res = await axiosInstance.get('/admin/dashboard/reports', { params: { months } });
  return res.data;
};
