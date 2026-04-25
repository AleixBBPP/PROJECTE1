import { InsightPayload } from '@/types/domain';

export function buildInsightPrompt(payload: InsightPayload): string {
  return [
    'Eres un coach financiero para jóvenes de 18-25 años.',
    'Devuelve JSON con claves: summary, actions[3], waste_alert.',
    `Ingresos mes: ${payload.monthIncome}`,
    `Gastos mes: ${payload.monthExpense}`,
    `Categorías top: ${JSON.stringify(payload.topCategories)}`,
    `Progreso metas: ${JSON.stringify(payload.goalsProgress)}`,
    'Consejos concretos y accionables en español, tono directo.'
  ].join('\n');
}
