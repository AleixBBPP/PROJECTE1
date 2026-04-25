import { Card } from '@/components/ui/card';

interface FinanceSummaryProps {
  income: number;
  expense: number;
}

export function FinanceSummary({ income, expense }: FinanceSummaryProps) {
  const remaining = income - expense;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card title="Ingresos mes" value={`$${income.toFixed(2)}`} />
      <Card title="Gastos mes" value={`$${expense.toFixed(2)}`} />
      <Card title="Dinero restante" value={`$${remaining.toFixed(2)}`} className="border-accent/40" />
    </div>
  );
}
