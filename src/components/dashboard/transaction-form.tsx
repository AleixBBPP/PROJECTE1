'use client';

import { type ChangeEvent, type FormEvent, useState } from 'react';

import { Card } from '@/components/ui/card';
import type { TransactionType } from '@/types/domain';

interface TransactionFormProps {
  onSubmit: (payload: { amount: number; description: string; type: TransactionType }) => void;
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount <= 0) return;

    onSubmit({
      amount: parsedAmount,
      description,
      type
    });

    setAmount('');
    setDescription('');
  };

  return (
    <Card title="Nuevo movimiento">
      <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/20 p-1">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`rounded-lg px-3 py-2 text-sm ${
              type === 'expense' ? 'bg-white/10 text-white' : 'text-white/60'
            }`}
          >
            Gasto
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`rounded-lg px-3 py-2 text-sm ${
              type === 'income' ? 'bg-white/10 text-white' : 'text-white/60'
            }`}
          >
            Ingreso
          </button>
        </div>

        <input
          className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none ring-accent/40 focus:ring"
          value={description}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}
          placeholder="Descripción (ej. Uber Eats)"
        />

        <input
          className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none ring-accent/40 focus:ring"
          value={amount}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)}
          placeholder="Monto"
          inputMode="decimal"
        />

        <button className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
          Guardar en 1 click
        </button>
      </form>
    </Card>
  );
}
