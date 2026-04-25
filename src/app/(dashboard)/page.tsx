'use client';

import { AIInsights } from '@/components/dashboard/ai-insights';
import { FinanceSummary } from '@/components/dashboard/finance-summary';
import { GoalsOverview } from '@/components/dashboard/goals-overview';
import { MonthlyForecast } from '@/components/dashboard/monthly-forecast';
import { TransactionForm } from '@/components/dashboard/transaction-form';
import { TransactionList } from '@/components/dashboard/transaction-list';
import type { GoalProgress } from '@/hooks/use-dashboard-data';
import { useDashboardData } from '@/hooks/use-dashboard-data';

export default function DashboardPage() {
  const {
    transactions,
    summary,
    forecast,
    topCategories,
    goalsProgress,
    addTransaction,
    registerGoalContribution
  } = useDashboardData();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 p-6">
      <header>
        <p className="text-sm uppercase tracking-wider text-accent">Ambit</p>
        <h1 className="mt-1 text-3xl font-semibold">Dashboard inteligente</h1>
        <p className="mt-2 max-w-xl text-sm text-white/60">
          Controla dinero, metas y hábitos en una vista rápida. Diseñado para usar en menos de 2 minutos al día.
        </p>
      </header>

      <FinanceSummary income={summary.income} expense={summary.expense} />

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <TransactionForm onSubmit={addTransaction} />
        </div>
        <div className="lg:col-span-2">
          <TransactionList transactions={transactions} />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <MonthlyForecast
          spentSoFar={forecast.spentSoFar}
          estimatedEndMonthExpense={forecast.estimatedEndMonthExpense}
        />
        <GoalsOverview goals={goalsProgress} onQuickSave={(goalId) => registerGoalContribution(goalId, 10)} />
      </section>

      <AIInsights
        payload={{
          monthIncome: summary.income,
          monthExpense: summary.expense,
          topCategories,
          goalsProgress: goalsProgress.map((goal: GoalProgress) => ({
            goal: goal.title,
            progressPct: goal.progress
          }))
        }}
      />
    </main>
  );
}
