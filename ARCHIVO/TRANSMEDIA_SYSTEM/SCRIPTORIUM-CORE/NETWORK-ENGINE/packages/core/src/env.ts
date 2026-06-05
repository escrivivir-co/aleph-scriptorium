export function getEnv(key: string, defaultValue: string): string {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  const value = env?.[key];
  if (value) {
    return value;
  }
  return defaultValue;
}
