const CATEGORY_KEYWORDS: Record<string, string[]> = {
  food: ['uber eats', 'mcdonald', 'burger', 'starbucks', 'restaurant', 'cafe', 'delivery'],
  transport: ['uber', 'lyft', 'metro', 'bus', 'gas', 'fuel', 'parking'],
  subscriptions: ['spotify', 'netflix', 'youtube', 'apple', 'prime', 'chatgpt'],
  education: ['course', 'udemy', 'coursera', 'book', 'notion'],
  income: ['salary', 'payroll', 'freelance', 'client', 'invoice'],
  shopping: ['amazon', 'zara', 'nike', 'store', 'shop']
};

export function detectCategory(description: string, type: 'income' | 'expense'): string {
  if (!description.trim()) return type === 'income' ? 'income' : 'other';

  const normalized = description.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return type === 'income' && category !== 'income' ? 'income' : category;
    }
  }

  return type === 'income' ? 'income' : 'other';
}
