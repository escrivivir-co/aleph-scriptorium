export function getEnv(key: string, defaultValue: string): string {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  return defaultValue;
}
