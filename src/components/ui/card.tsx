import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

interface CardProps {
  title: string;
  value?: string;
  className?: string;
  children?: ReactNode;
}

export function Card({ title, value, className, children }: CardProps) {
  return (
    <section className={cn('rounded-2xl border border-white/10 bg-surface p-5', className)}>
      <p className="text-sm text-white/60">{title}</p>
      {value ? <p className="mt-2 text-2xl font-semibold">{value}</p> : null}
      {children}
    </section>
  );
}
