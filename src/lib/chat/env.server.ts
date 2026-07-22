export function getEnvVar(name: string): string | undefined {
  return process.env?.[name]
}