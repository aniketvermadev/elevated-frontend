const CLOUDFLARE_WORKERS_MODULE = 'cloudflare:workers'

let cfEnvPromise: Promise<Record<string, string | undefined> | null> | null = null

async function getCloudflareEnv(): Promise<Record<string, string | undefined> | null> {
  if (!cfEnvPromise) {
    cfEnvPromise = import(/* @vite-ignore */ CLOUDFLARE_WORKERS_MODULE)
      .then((mod: unknown) => (mod as { env?: Record<string, string | undefined> }).env ?? null)
      .catch(() => null)
  }
  return cfEnvPromise
}

export async function getEnvVar(name: string): Promise<string | undefined> {
  const cfEnv = await getCloudflareEnv()
  if (cfEnv && cfEnv[name] !== undefined) return cfEnv[name]
  return process.env?.[name]
}