import { ProgressRing } from '@/components/ui/progress-ring';

interface GoalItem {
  id: string;
  title: string;
  progress: number;
  streakDays: number;
}

interface GoalsOverviewProps {
  goals: GoalItem[];
  onQuickSave: (goalId: string) => void;
}

export function GoalsOverview({ goals, onQuickSave }: GoalsOverviewProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-surface p-5">
      <h2 className="text-lg font-semibold">Objetivos</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {goals.map((goal) => (
          <article key={goal.id} className="flex items-center gap-4 rounded-xl border border-white/10 p-3">
            <ProgressRing progress={goal.progress} />
            <div className="flex-1">
              <p className="font-medium">{goal.title}</p>
              <p className="text-sm text-white/60">{goal.progress}% completado</p>
              <p className="text-sm text-accent">🔥 {goal.streakDays} días de racha</p>
            </div>
            <button
              className="rounded-lg border border-white/20 px-2 py-1 text-xs text-white/80 transition hover:border-accent"
              onClick={() => onQuickSave(goal.id)}
            >
              +$10
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
