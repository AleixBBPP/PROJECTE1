/**
 * Temporary ambient declarations so `npm run typecheck` can execute in constrained
 * environments where npm dependencies cannot be installed.
 *
 * Remove this file once package installation works in CI/dev.
 */

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare var process: {
  env: Record<string, string | undefined>;
};

declare module 'react' {
  export type ReactNode = any;
  export type FormEvent<T = any> = any;
  export type ChangeEvent<T = any> = any;
  export function useState<T>(initial: T): [T, (value: T | ((prev: T) => T)) => void];
  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
}

declare module 'next' {
  export interface NextConfig {
    [key: string]: any;
  }
}

declare module 'next/server' {
  export class NextRequest {
    json(): Promise<any>;
  }

  export class NextResponse {
    static json(body: any, init?: { status?: number }): NextResponse;
  }
}

declare module 'zod' {
  export const z: any;
}

declare module 'openai' {
  export default class OpenAI {
    constructor(options?: { apiKey?: string });
    responses: {
      create(input: any): Promise<{ output_text: string }>;
    };
  }
}

declare module '@supabase/supabase-js' {
  export function createClient(url: string, key: string): any;
}

declare module 'clsx' {
  export type ClassValue = any;
  export function clsx(...inputs: any[]): string;
}

declare module 'tailwind-merge' {
  export function twMerge(...classes: string[]): string;
}

declare module 'tailwindcss' {
  export interface Config {
    [key: string]: any;
  }
}
