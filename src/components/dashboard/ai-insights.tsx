'use client';

import { useState } from 'react';

interface AIInsightsProps {
  payload: {
    monthIncome: number;
    monthExpense: number;
    topCategories: Array<{ category: string; amount: number }>;
    goalsProgress: Array<{ goal: string; progressPct: number }>;
  };
}

export function AIInsights({ payload }: AIInsightsProps) {
  const [insight, setInsight] = useState('Pulsa "Analizar" para generar recomendaciones personalizadas.');
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/ai/insights', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setInsight(data.insight ?? 'No pudimos generar insights ahora mismo.');
    } catch {
      setInsight('No se pudo conectar al coach IA. Reintenta en unos segundos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-accent/40 bg-gradient-to-br from-surface to-[#18142a] p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Coach IA</h2>
        <button
          onClick={generateInsights}
          disabled={loading}
          className="rounded-lg bg-accent px-3 py-2 text-xs font-medium uppercase tracking-wide disabled:opacity-60"
        >
          {loading ? 'Analizando...' : 'Analizar'}
        </button>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-white/80">{insight}</p>
    </section>
  );
}
