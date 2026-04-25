import { Card } from '@/components/ui/card';
import { Transaction } from '@/types/domain';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <Card title="Últimos movimientos">
      <div className="mt-3 space-y-2">
        {transactions.slice(0, 6).map((transaction) => (
          <article
            key={transaction.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2"
          >
            <div>
              <p className="text-sm font-medium">{transaction.description || 'Sin descripción'}</p>
              <p className="text-xs uppercase tracking-wide text-white/50">{transaction.category}</p>
            </div>
            <p className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </p>
          </article>
        ))}
      </div>
    </Card>
  );
}
