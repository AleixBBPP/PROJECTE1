import { Card } from '@/components/ui/card';

interface MonthlyForecastProps {
  spentSoFar: number;
  estimatedEndMonthExpense: number;
}

export function MonthlyForecast({ spentSoFar, estimatedEndMonthExpense }: MonthlyForecastProps) {
  return (
    <Card title="Predicción mensual">
      <div className="mt-3 space-y-3">
        <p className="text-sm text-white/70">
          Gastado hasta hoy: <span className="font-semibold text-white">${spentSoFar.toFixed(2)}</span>
        </p>
        <p className="text-sm text-white/70">
          Estimado cierre de mes:{' '}
          <span className="font-semibold text-accent">${estimatedEndMonthExpense.toFixed(2)}</span>
        </p>
      </div>
    </Card>
  );
}
