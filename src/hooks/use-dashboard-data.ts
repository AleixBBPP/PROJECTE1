'use client';

import { useMemo, useState } from 'react';

import { detectCategory } from '@/lib/finance/categorize';
import { calculateMonthlyForecast } from '@/lib/finance/forecast';
import { Goal, Transaction, TransactionType } from '@/types/domain';

const seedTransactions: Transaction[] = [
  {
    id: 't1',
    userId: 'demo-user',
    amount: 2800,
    type: 'income',
    category: 'income',
    description: 'Salary startup internship',
    occurredAt: new Date().toISOString()
  },
  {
    id: 't2',
    userId: 'demo-user',
    amount: 54.2,
    type: 'expense',
    category: 'food',
    description: 'Uber Eats',
    occurredAt: new Date().toISOString()
  },
  {
    id: 't3',
    userId: 'demo-user',
    amount: 15.99,
    type: 'expense',
    category: 'subscriptions',
    description: 'Spotify',
    occurredAt: new Date().toISOString()
  }
];

const seedGoals: Goal[] = [
  {
    id: 'g1',
    userId: 'demo-user',
    title: 'Fondo de emergencia',
    targetAmount: 2000,
    currentAmount: 840,
    streakDays: 12,
    status: 'active'
  },
  {
    id: 'g2',
    userId: 'demo-user',
    title: 'Viaje verano',
    targetAmount: 1200,
    currentAmount: 720,
    streakDays: 7,
    status: 'active'
  }
];

export function useDashboardData() {
  const [transactions, setTransactions] = useState<Transaction[]>(seedTransactions);
  const [goals, setGoals] = useState<Goal[]>(seedGoals);

  const summary = useMemo(() => {
    const income = transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const expense = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return {
      income: Number(income.toFixed(2)),
      expense: Number(expense.toFixed(2)),
      remaining: Number((income - expense).toFixed(2))
    };
  }, [transactions]);

  const forecast = useMemo(() => calculateMonthlyForecast(transactions), [transactions]);

  const goalsProgress = useMemo(
    () =>
      goals.map((goal) => ({
        id: goal.id,
        title: goal.title,
        streakDays: goal.streakDays,
        progress: goal.targetAmount === 0 ? 0 : Math.round((goal.currentAmount / goal.targetAmount) * 100)
      })),
    [goals]
  );

  const topCategories = useMemo(() => {
    const categoryTotals = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce<Record<string, number>>((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] ?? 0) + transaction.amount;
        return acc;
      }, {});

    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount: Number(amount.toFixed(2)) }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
  }, [transactions]);

  const addTransaction = (payload: { amount: number; description: string; type: TransactionType }) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      userId: 'demo-user',
      amount: payload.amount,
      type: payload.type,
      description: payload.description,
      category: detectCategory(payload.description, payload.type),
      occurredAt: new Date().toISOString()
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const registerGoalContribution = (goalId: string, amount: number) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;

        return {
          ...goal,
          currentAmount: Number((goal.currentAmount + amount).toFixed(2)),
          streakDays: goal.streakDays + 1
        };
      })
    );
  };

  return {
    transactions,
    summary,
    forecast,
    topCategories,
    goalsProgress,
    addTransaction,
    registerGoalContribution
  };
}
