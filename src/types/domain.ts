export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string | null;
  occurredAt: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  streakDays: number;
  status: 'active' | 'completed' | 'paused';
}

export interface InsightPayload {
  monthIncome: number;
  monthExpense: number;
  topCategories: Array<{ category: string; amount: number }>;
  goalsProgress: Array<{ goal: string; progressPct: number }>;
}
