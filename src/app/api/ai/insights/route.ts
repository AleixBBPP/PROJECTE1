import { NextResponse } from 'next/server';
import { z } from 'zod';

import { buildInsightPrompt } from '@/lib/ai/insight-prompt';
import { openai } from '@/lib/ai/openai-client';

const insightSchema = z.object({
  monthIncome: z.number().nonnegative(),
  monthExpense: z.number().nonnegative(),
  topCategories: z.array(z.object({ category: z.string(), amount: z.number() })),
  goalsProgress: z.array(z.object({ goal: z.string(), progressPct: z.number().min(0).max(100) }))
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = insightSchema.parse(body);

    const completion = await openai.responses.create({
      model: 'gpt-4.1-mini',
      input: buildInsightPrompt(payload)
    });

    return NextResponse.json({
      insight: completion.output_text
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'No se pudo generar insight', details: String(error) },
      { status: 400 }
    );
  }
}
