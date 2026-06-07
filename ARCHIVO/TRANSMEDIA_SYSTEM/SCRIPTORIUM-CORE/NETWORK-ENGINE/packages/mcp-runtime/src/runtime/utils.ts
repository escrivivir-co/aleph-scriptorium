export function now(): number {
	return Date.now();
}

export function toRecord(args: unknown): Record<string, unknown> {
	return args && typeof args === 'object' && !Array.isArray(args)
		? (args as Record<string, unknown>)
		: {};
}

export function extractUri(args: readonly unknown[], fallback: string): string {
	for (const arg of args) {
		if (typeof arg === 'string') return arg;
		if (arg instanceof URL) return arg.toString();
		if (arg && typeof arg === 'object') {
			const candidate = (arg as { uri?: unknown; href?: unknown }).uri ?? (arg as { href?: unknown }).href;
			if (typeof candidate === 'string') return candidate;
		}
	}
	return fallback;
}
