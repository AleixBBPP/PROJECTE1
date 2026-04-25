import { Transaction } from '@/types/domain';

function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function calculateMonthlyForecast(transactions: Transaction[], now = new Date()) {
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.occurredAt);
    return (
      transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear
    );
  });

  const expenseSpent = monthTransactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const elapsedDays = now.getDate();
  const estimatedEndMonthExpense = elapsedDays > 0
    ? (expenseSpent / elapsedDays) * daysInMonth(now)
    : 0;

  return {
    spentSoFar: Number(expenseSpent.toFixed(2)),
    estimatedEndMonthExpense: Number(estimatedEndMonthExpense.toFixed(2))
  };
}
